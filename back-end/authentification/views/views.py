
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404, redirect, reverse
from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from authentification.models import SmsHistory
from authentification.serializer.serializer import (
    CustomUserListSerializer,
    SendSmsCodeSerializer, RegisterSerializer, LoginSerializer
)
from main_services.main import get_token_for_user, UserRenderers
from main_services.responses import (
    bad_request_response,
    success_response,
    success_created_response,
    user_not_found_response,
    unauthorized_response
)
from main_services.swaggers import swagger_extend_schema, swagger_schema


def check_expected_fields(request, valid_fields):
    pass


@swagger_extend_schema(fields={"phone", "password"}, description="Register")
@swagger_schema(serializer=SendSmsCodeSerializer)
class SendSmsViews(APIView):

    def post(self, request):
        valid_fields = {"phone", "password"}
        unexpected_fields = check_expected_fields(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        serializer = SendSmsCodeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.instance
            token = get_token_for_user(user)
            return success_created_response(token)
        return bad_request_response(serializer.errors)


@swagger_extend_schema(fields={"code"}, description="Register")
@swagger_schema(serializer=SendSmsCodeSerializer)
class VerificationSmsCodeView(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def put(self, request):
        valid_fields = {"code"}
        unexpected_fields = check_expected_fields(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        if not request.user.is_authenticated:
            return unauthorized_response("Token is invalid")

        if "code" not in request.data:
            return bad_request_response("Code key is missing in the request data")

        sms_code = request.data["code"]
        user = request.user

        try:
            check_code = self.get_latest_sms_code(user)

            if check_code and check_code.code == int(sms_code):
                self.activate_user(check_code.user)
                token = get_token_for_user(check_code.user)
                return Response({"token": token})

            return bad_request_response("The verification code was entered incorrectly")

        except ObjectDoesNotExist:
            return bad_request_response("Object does not exist")

    def get_latest_sms_code(self, user):
        return SmsHistory.objects.select_related("user").filter(Q(user=user)).last()

    def activate_user(self, user):
        user.is_staff = True
        user.save()


@swagger_extend_schema(fields={'phone', 'first_name', 'last_name', 'address', 'information', 'gender', 'categories', 'date_of_birth', 'avatar', 'password'}, description="Register")
@swagger_schema(serializer=RegisterSerializer)
class RegisterCustomUserViews(APIView):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]

    def post(self, request):
        if not request.user.is_authenticated:
            return unauthorized_response("Token is not valid")

        valid_fields = {'phone', 'first_name', 'last_name', 'address', 'information', 'gender', 'categories', 'date_of_birth', 'avatar', 'password'}
        unexpected_fields = check_expected_fields(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        serializer = RegisterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.instance
            token = get_token_for_user(user)
            return success_created_response(token)
        return bad_request_response(serializer.errors)


@swagger_extend_schema(fields={"phone", "password"}, description="Login")
@swagger_schema(serializer=SendSmsCodeSerializer)
class LoginView(APIView):

    def post(self, request, *args, **kwargs):
        expected_fields = set(["phone", "password"])
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - expected_fields

        if unexpected_fields:
            return bad_request_response(
                f"Unexpected fields: {', '.join(unexpected_fields)}"
            )

        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        token = self.generate_user_token(user)

        return success_response(token)

    def get_serializer(self, *args, **kwargs):
        return LoginSerializer(*args, **kwargs)

    def generate_user_token(self, user):
        return get_token_for_user(user)