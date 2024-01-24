from django.shortcuts import get_object_or_404, redirect, reverse
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from authentification.models import CustomUser
from authentification.serializer.serializer import (
    CustomUserListSerializer,
    RegisterSerializer,
)
from main_services.main import UserRenderers, PaginationMethod
from main_services.pagination import StandardResultsSetPagination
from main_services.responses import (
    bad_request_response,
    success_response,
    success_created_response,
    user_not_found_response,
    unauthorized_response
)
from main_services.swaggers import swagger_extend_schema, swagger_schema
from main_services.expected_fields import check_required_key
from config.services.filters import (
    filter_by_first_name,
    filter_by_last_name,
    filter_by_category
)

@swagger_extend_schema(fields={'name', 'address', 'phone', 'author', 'logo'}, description="Custom User Profile")
@swagger_schema(serializer=RegisterSerializer)
class ProfileViews(APIView):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]

    def get(self, request):
        serializer = CustomUserListSerializer(request.user)
        return success_response(serializer.data)

    def put(self, request):
        if not request.user.is_authenticated:
            return unauthorized_response("Token is not valid")

        valid_fields = {'phone', 'first_name', 'last_name', 'address', 'information', 'gender', 'categories', 'date_of_birth', 'avatar', 'password'}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        serializer = RegisterSerializer(request.user, data=request.data, partial=True,
                                              context={'avatar': request.FILES.get('avatar', None), 'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_response(serializer.data)
        return bad_request_response(serializer.errors)

    def delete(self, request):
        request.user.delete()
        return success_response("User deleted")


@swagger_extend_schema(fields={'name', 'address', 'phone', 'author', 'logo'}, description="Custom User Details")
@swagger_schema(serializer=RegisterSerializer)
class CustomUserDetailsViews(APIView):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]

    def get(self, request, pk):
        user = get_object_or_404(CustomUser, pk=pk)
        serializer = CustomUserListSerializer(user, context={'request': request, 'user': user})
        return success_response(serializer.data)

    def put(self, request, pk):
        if not request.user.is_authenticated:
            return unauthorized_response("Token is not valid")

        valid_fields = {'phone', 'first_name', 'last_name', 'address', 'information', 'gender', 'categories',
                        'date_of_birth', 'avatar', 'password'}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        user = get_object_or_404(CustomUser, pk=pk)
        serializer = RegisterSerializer(user, data=request.data, partial=True,
                                              context={'avatar': request.FILES.get('avatar', None), 'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_response(serializer.data)
        return bad_request_response(serializer.errors)

    def delete(self, request, pk):
        user = get_object_or_404(CustomUser, pk=pk)
        user.delete()
        return success_response("User deleted")


@swagger_extend_schema(fields={}, description="Doctors")
@swagger_schema(serializer=CustomUserListSerializer)
class DoctorsViews(APIView, PaginationMethod):
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name', 'category']

    def get(self, request):
        queryset = CustomUser.objects.prefetch_related('groups').filter(groups__name__in=['doctor']).order_by('id')
        queryset = filter_by_first_name(queryset, request)
        queryset = filter_by_last_name(queryset, request)
        queryset = filter_by_category(queryset, request)
        serializer = super().page(queryset, CustomUserListSerializer, request)
        return success_response(serializer.data)


@swagger_extend_schema(fields={}, description="Patients")
@swagger_schema(serializer=CustomUserListSerializer)
class PatientsViews(APIView, PaginationMethod):
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name']

    def get(self, request):
        queryset = CustomUser.objects.prefetch_related('groups').filter(groups__name__in=['patient']).order_by('id')
        queryset = filter_by_first_name(queryset, request)
        queryset = filter_by_last_name(queryset, request)
        serializer = super().page(queryset, CustomUserListSerializer, request)
        return success_response(serializer.data)


