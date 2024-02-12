from rest_framework import serializers
from authentification.models import (
    SavedDoctors, CustomUser
)


class SavedDoctorsSerializer(serializers.ModelSerializer):

    class Meta:
        model = SavedDoctors
        fields = [
            "id",
            "doctor",
            "user",
            "create_at",
        ]
        extra_kwargs = {
            "doctor": {"required": True},
        }

    def create(self, validated_data):
        user = self.context['request'].user
        doctor = validated_data.pop('doctor')
        saved_doctor = SavedDoctors.objects.create(doctor=doctor, user=user)
        return saved_doctor

    def update(self, instance, validated_data):
        instance.doctor = validated_data.get('doctor', instance.doctor)
        instance.save()
        return instance


class SavedDoctorsDetailSerializer(serializers.ModelSerializer):
    doctor = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = SavedDoctors
        fields = [
            "id",
            "doctor",
            "user",
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

        # Access the request from the serializer context
        request = self.context.get('request')

        # Modify the logo field to use the full URL
        if 'user' in representation and 'avatar' in representation['user']:
            logo_path = representation['user']['avatar']
            if logo_path and request:
                representation['user']['avatar'] = request.build_absolute_uri('/clinic/media/'+logo_path)

        if 'doctor' in representation and 'avatar' in representation['doctor']:
            logo_path = representation['doctor']['avatar']
            if logo_path and request:
                representation['doctor']['avatar'] = request.build_absolute_uri('/clinic/media/'+logo_path)

        return representation
