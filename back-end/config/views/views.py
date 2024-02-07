from django.shortcuts import get_object_or_404
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from authentification.models import CustomUser, SavedDoctors, Gender, Notification
from authentification.serializer.serializer import (
    CustomUserListSerializer,
    RegisterSerializer,
    GenderSerializer,
)
from main_services.main import UserRenderers, PaginationMethod
from main_services.pagination import StandardResultsSetPagination
from main_services.responses import (
    bad_request_response,
    success_response,
    success_created_response,
    success_deleted_response
)
from main_services.swaggers import swagger_extend_schema, swagger_schema
from main_services.expected_fields import check_required_key
from config.services.filters import (
    filter_by_first_name,
    filter_by_last_name,
    filter_by_category
)
from config.serializer.serializer import (
    SavedDoctorsSerializer,
    SavedDoctorsDetailSerializer
)
from main_services.roles import (
    custom_user_has_patient_role,
    custom_user_has_doctor_role, custom_user_has_master_role, custom_user_has_client_role
)
from chat.utils.serializers import NotificationSerializer
from appointments.services.services import (
    filter_by_patient_notification,
    filter_by_doctor_notification, filter_by_master_notification, filter_by_client_notification,
)

class GenderView(APIView):
    def get(self, request):
        queryset = Gender.objects.all()
        serializer = GenderSerializer(queryset, many=True)
        return success_response(serializer.data)


@swagger_extend_schema(fields={'name', 'address', 'phone', 'author', 'logo'}, description="Custom User Profile")
@swagger_schema(serializer=RegisterSerializer)
class ProfileViews(APIView):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]

    def get(self, request):
        serializer = CustomUserListSerializer(request.user, context={'request': request} )
        return success_response(serializer.data)

    def put(self, request):
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
        return success_deleted_response("User deleted")


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
        return success_deleted_response("User deleted")


@swagger_extend_schema(fields={}, description="Doctors")
@swagger_schema(serializer=CustomUserListSerializer)
class DoctorsViews(APIView, PaginationMethod):
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name', 'categories']

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


class SavedDoctorsView(APIView, PaginationMethod):
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]

    def get(self, request):
        queryset = SavedDoctors.objects.select_related('user').filter(user=request.user).order_by('-id')
        serializer = super().page(queryset, SavedDoctorsDetailSerializer, request)
        return success_response(serializer.data)

    def post(self, request):
        valid_fields = {"doctor"}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        serializer = SavedDoctorsSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_created_response(serializer.data)
        return bad_request_response(serializer.errors)


class SavedDoctorsDetailView(APIView):
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]

    def get(self, request, pk):
        queryset = get_object_or_404(SavedDoctors, pk=pk)
        serializer = SavedDoctorsDetailSerializer(queryset, context={'request': request})
        return success_response(serializer.data)

    def delete(self, request, pk):
        queryset = get_object_or_404(SavedDoctors, pk=pk)
        queryset.delete()
        return success_deleted_response("Deleted")


class NotificationView(APIView, PaginationMethod):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        if custom_user_has_master_role(request.user):
            notification = Notification.objects.select_related('appointments').filter(appointments__doctor=request.user, is_seen=False)
            notification = filter_by_master_notification(notification)
            serializer = super().page(notification, NotificationSerializer, request)
            return success_response(serializer.data)

        if custom_user_has_client_role(request.user):
            notification = Notification.objects.select_related('appointments').filter(appointments__user=request.user, is_seen=False)
            notification = filter_by_client_notification(notification)
            serializer = super().page(notification, NotificationSerializer, request)
            return success_response(serializer.data)

        if custom_user_has_doctor_role(request.user):
            notification = Notification.objects.select_related('appointments').filter(appointments__doctor=request.user, is_seen=False)
            notification = filter_by_doctor_notification(notification)
            serializer = super().page(notification, NotificationSerializer, request)
            return success_response(serializer.data)

        if custom_user_has_patient_role(request.user):
            notification = Notification.objects.select_related('appointments').filter(appointments__user=request.user, is_seen=False)
            notification = filter_by_patient_notification(notification)
            serializer = super().page(notification, NotificationSerializer, request)
            return success_response(serializer.data)

        return success_response('No Notification')


class NotificationDetailsView(APIView):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]

    def get(self, request, pk):
        queryset = get_object_or_404(Notification, pk=pk)
        queryset.is_seen = True
        queryset.save()
        serializer = NotificationSerializer(queryset)
        return success_response(serializer.data)


class MastersView(APIView, PaginationMethod):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name', 'categories']

    def get(self, request):
        queryset = CustomUser.objects.prefetch_related('groups').filter(groups__name__in=['master']).order_by('id')
        queryset = filter_by_first_name(queryset, request)
        queryset = filter_by_last_name(queryset, request)
        queryset = filter_by_category(queryset, request)
        serializer = super().page(queryset, CustomUserListSerializer, request)
        return success_response(serializer.data)