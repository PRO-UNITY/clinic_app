import datetime
from rest_framework import serializers
from authentification.models import (
    CustomUser,
    MakeAppointments, Notification
)
from appointments.services.services import create_notification




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
        create_notification('PATIENT_SENT_APPOINTMENT', make_appointments, self.context['request'])
        return make_appointments


    def update(self, instance, validated_data):
        date_data = validated_data.pop('date')
        time_data = validated_data.pop('time')
        doctor = validated_data.pop('doctor')
        user = self.context['request'].user
        timestamp = datetime.datetime.combine(date_data, time_data)
        check_doctor = MakeAppointments.objects.filter(doctor=doctor, timestamp=timestamp).exists()
        if check_doctor:
            raise serializers.ValidationError({'msg': "Doctor is busy at this time"})

        instance.timestamp = timestamp
        instance.doctor = doctor
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        create_notification('PATIENT_SENDING_BACK_APPOINTMENT', instance, self.context['request'])
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
            CustomUser.objects.filter(id=obj.user.id).values('id', 'first_name', 'last_name', 'avatar', 'categories__name',
                                                             'gender'))[0]

    def get_doctor(self, obj):
        return list(
            CustomUser.objects.filter(id=obj.doctor.id).values('id', 'first_name', 'last_name', 'avatar', 'categories__name',
                                                             'gender'))[0]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if 'user' in representation and 'avatar' in representation['user']:
            logo_path = representation['user']['avatar']
            if logo_path and request:
                representation['user']['avatar'] = request.build_absolute_uri('/media/'+logo_path)

        if 'doctor' in representation and 'avatar' in representation['doctor']:
            logo_path = representation['doctor']['avatar']
            if logo_path and request:
                representation['doctor']['avatar'] = request.build_absolute_uri('/media/'+logo_path)

        return representation


