
from django.shortcuts import get_object_or_404, redirect, reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from appointments.serializer.serializer import MakeAppointmentsSerializer, MakeAppointmentsPatientSerializer
from authentification.models import MakeAppointments
from main_services.main import UserRenderers
from main_services.responses import (
    bad_request_response,
    success_response,
    success_created_response,
    unauthorized_response
)
from main_services.swaggers import swagger_extend_schema, swagger_schema
from main_services.expected_fields import check_required_key
from main_services.main import PaginationMethod
from main_services.pagination import StandardResultsSetPagination



@swagger_extend_schema(fields={"doctor", "date", 'time', 'content'}, description="Make Appointments")
@swagger_schema(serializer=MakeAppointmentsSerializer)
class MakeAppointmentsView(APIView, PaginationMethod):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        if not request.user.is_authenticated:
            return unauthorized_response()
        user = request.user
        make_appointments = MakeAppointments.objects.filter(user=user).order_by('-id')

        serializer = super().page(make_appointments, MakeAppointmentsPatientSerializer, request)
        return success_response(serializer.data)


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

    def delete(self, request, pk):
        instance = get_object_or_404(MakeAppointments, pk=pk)
        instance.delete()
        return success_response("Deleted")