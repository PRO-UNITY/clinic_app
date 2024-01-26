from rest_framework import serializers
from authentification.models import (
    Hospital
)


class HospitalCreateSerializer(serializers.ModelSerializer):


    class Meta:
        model = Hospital
        fields = [
            "id",
            "name",
            "address",
            "phone",
            "logo",
            "create_at",
        ]
        extra_kwargs = {
            'name': {'required': True},
            'address': {'required': True},
            'phone': {'required': True},
            'logo': {'required': True},
        }

    def create(self, validated_data):
        user = self.context.get('user')
        logo = self.context.get('logo')
        hospital = Hospital.objects.create(**validated_data)
        hospital.author = user
        hospital.logo = logo
        hospital.save()
        return hospital

    def update(self, instance, validated_data):
        if self.context.get('logo') == None:
            instance.logo = instance.avatar
        instance.logo = self.context.get('logo')
        instance = super(HospitalCreateSerializer, self).update(instance, validated_data)
        instance.save()
        return instance


class HospitalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hospital
        fields = [
            "id",
            "name",
            "address",
            "phone",
            "logo",
            "create_at",
        ]

