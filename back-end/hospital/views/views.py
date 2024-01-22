
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404, redirect, reverse
from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from authentification.models import Hospital
from authentification.serializer.serializer import (
    CustomUserListSerializer,
    SendSmsCodeSerializer
)
from authentification.views.views import check_expected_fields
from main_services.main import get_token_for_user, UserRenderers
from main_services.responses import (
    bad_request_response,
    success_response,
    success_created_response,
    user_not_found_response,
    unauthorized_response
)
from hospital.serializer.serializer import HospitalSerializer, HospitalCreateSerializer
from main_services.swaggers import swagger_extend_schema, swagger_schema
from main_services.main import PaginationMethod


@swagger_extend_schema(fields={'name', 'address', 'phone', 'author', 'logo'}, description="Register")
@swagger_schema(serializer=HospitalCreateSerializer)
class HospitalViews(APIView, PaginationMethod):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]

    def get(self, request):
        hospitals = Hospital.objects.all()
        serializer = HospitalSerializer(hospitals, many=True, context={'request': request})
        return success_response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return unauthorized_response("Token is not valid")

        valid_fields = {'name', 'address', 'phone', 'author', 'logo'}
        unexpected_fields = check_expected_fields(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        serializer = HospitalCreateSerializer(data=request.data, context={'request':request, 'user': request.user, 'logo': request.FILES.get('logo', None)})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_created_response(serializer.data)
        return bad_request_response(serializer.errors)


@swagger_schema(serializer=HospitalSerializer)
class HospitalDetailsViews(APIView):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]

    def get(self, request, pk):
        hospital = get_object_or_404(request.user.hospital, pk=pk)
        serializer = HospitalSerializer(hospital, context={'request': request})
        return success_response(serializer.data)

    def put(self, request, pk):
        hospital = get_object_or_404(request.user.hospital, pk=pk)
        serializer = HospitalCreateSerializer(hospital, data=request.data, partial=True, context={'user': request.user, 'logo': request.FILES.get('logo', None)})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_response(serializer.data)
        return bad_request_response(serializer.errors)

    def delete(self, request, pk):
        hospital = get_object_or_404(request.user.hospital, pk=pk)
        hospital.delete()
        return success_response("Hospital deleted")