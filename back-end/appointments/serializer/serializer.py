import datetime

from django.db.models import Avg
from django.utils import timezone
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import Group
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ObjectDoesNotExist
from eskiz_sms.exceptions import BadRequest
from django.contrib.auth.backends import ModelBackend

from authentification.models import (
    Gender,
    CustomUser,
    Categories,
    SmsHistory, ReviewDoctors,
    MakeAppointments
)
from authentification.services.get_role import get_role, get_gender
from authentification.services.generate_code import generate_sms_code, generate_password
from authentification.services.send_sms import send_sms
from hospital.serializer.serializer import HospitalSerializer



class MakeAppointmentsSerializer(serializers.ModelSerializer):
    date = serializers.DateField(write_only=True, format="%Y-%m-%d", required=True)
    time = serializers.TimeField(write_only=True, format="%H:%M", required=True)

    class Meta:
        model = MakeAppointments
        fields = [
            "id",
            "doctor",
            "user",
            "date",
            'time',
            'timestamp',
            "content",
            "status",
            "create_at",
        ]
        extra_kwargs = {
            "doctor": {"required": True},
            'content': {'required': True},
        }

    def create(self, validated_data):
        date_data = validated_data.pop('date')
        time_data = validated_data.pop('time')
        doctor = validated_data.pop('doctor')

        timestamp = datetime.datetime.combine(date_data, time_data)
        check_doctor = MakeAppointments.objects.filter(doctor=doctor, timestamp=timestamp).exists()
        if check_doctor:
            raise serializers.ValidationError({'msg': "Doctor is busy at this time"})

        user = self.context['request'].user

        make_appointments = MakeAppointments.objects.create(doctor=doctor, user=user, timestamp=timestamp,
                                                            **validated_data)
        return make_appointments


    def update(self, instance, validated_data):
        date_data = validated_data.pop('date')
        time_data = validated_data.pop('time')
        doctor = validated_data.pop('doctor')

        timestamp = datetime.datetime.combine(date_data, time_data)
        check_doctor = MakeAppointments.objects.filter(doctor=doctor, timestamp=timestamp).exists()
        if check_doctor:
            raise serializers.ValidationError({'msg': "Doctor is busy at this time"})

        instance.timestamp = timestamp, instance.timestamp
        instance.doctor = doctor, instance.doctor
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance


class MakeAppointmentsPatientSerializer(serializers.ModelSerializer):
    doctor = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = MakeAppointments
        fields = [
            "id",
            "doctor",
            "user",
            "timestamp",
            "content",
            "status",
            "create_at",
        ]

    def get_user(self, obj):
        return list(
            CustomUser.objects.filter(id=obj.user.id).values('id', 'first_name', 'last_name', 'avatar', 'categories',
                                                             'gender'))[0]

    def get_doctor(self, obj):
        return list(
            CustomUser.objects.filter(id=obj.doctor.id).values('id', 'first_name', 'last_name', 'avatar', 'categories',
                                                             'gender'))[0]




