
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from appointments.serializer.serializer import MakeAppointmentsSerializer, MakeAppointmentsPatientSerializer
from authentification.models import MakeAppointments, Notification
from main_services.swaggers import swagger_extend_schema, swagger_schema
from main_services.expected_fields import check_required_key
from main_services.main import PaginationMethod
from main_services.pagination import StandardResultsSetPagination
from main_services.roles import custom_user_has_patient_role
from main_services.main import UserRenderers
from main_services.responses import (
    bad_request_response,
    success_response,
    success_created_response,
    success_deleted_response
)
from appointments.services.services import doctor_busy_days, filter_by_status_id, create_notification, filter_by_calendar, filter_by_time


@swagger_extend_schema(fields={"doctor", "date", 'time', 'content'}, description="Make Appointments")
@swagger_schema(serializer=MakeAppointmentsSerializer)
class MakeAppointmentsView(APIView, PaginationMethod):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['date', 'time']

    def get(self, request):
        user = request.user
        if custom_user_has_patient_role(user):
            make_appointments = MakeAppointments.objects.filter(user=user).order_by('-id')
            serializer = super().page(make_appointments, MakeAppointmentsPatientSerializer, request)
            return success_response(serializer.data)

        make_appointments = MakeAppointments.objects.filter(doctor=user).order_by('-id')
        make_appointments = filter_by_calendar(make_appointments, request)
        make_appointments = filter_by_time(make_appointments, request)
        busy_dates = doctor_busy_days(request)
        serializer = super().page(make_appointments, MakeAppointmentsPatientSerializer, request)
        return success_response({'busy_days': busy_dates, 'data':serializer.data})


    def post(self, request):
        valid_fields = {"doctor", "date", 'time', 'content'}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        serializer = MakeAppointmentsSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_created_response(serializer.data)
        return bad_request_response(serializer.errors)


@swagger_extend_schema(fields={"doctor", "date", 'time', 'content'}, description="Make Appointments Details")
@swagger_schema(serializer=MakeAppointmentsSerializer)
class MakeAppointmentsDetailsView(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']

    def get(self, request, pk):
        queryset = get_object_or_404(MakeAppointments, pk=pk)
        serializer = MakeAppointmentsPatientSerializer(queryset, context={'request': request})
        return success_response(serializer.data)

    def put(self, request, pk):
        valid_fields = {"doctor", "date", 'time', 'content'}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        instance = get_object_or_404(MakeAppointments, pk=pk)
        serializer = MakeAppointmentsSerializer(instance, data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_response(serializer.data)
        return bad_request_response(serializer.errors)

    def patch(self, request, pk):
        instance = get_object_or_404(MakeAppointments, pk=pk)
        instance = filter_by_status_id(instance, request)
        if instance is None:
            return bad_request_response("Status is invalid")
        serializer = MakeAppointmentsPatientSerializer(instance, context={'request': request})
        return success_response(serializer.data)


    def delete(self, request, pk):
        instance = get_object_or_404(MakeAppointments, pk=pk)
        instance.delete()
        create_notification = Notification.objects.create(
            notification_type='PATIENT_CANCELLED_APPOINTMENT',
            appointments=instance.id,
            user=request.user
        )
        return success_deleted_response("Deleted")


