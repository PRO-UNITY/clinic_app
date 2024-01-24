from rest_framework import serializers

from authentification.models import (
    CustomUser,
    ReviewDoctors,
)


class ReviewDoctorsSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    doctor = serializers.SerializerMethodField()

    class Meta:
        model = ReviewDoctors
        fields = [
            "id",
            "doctor",
            "user",
            "content",
            "rating",
            "create_at",
        ]

    def get_user(self, obj):
        return list(CustomUser.objects.filter(id=obj.user.id).values('id', 'first_name', 'last_name', 'avatar', 'categories', 'gender'))[0]

    def get_doctor(self, obj):
        return list(CustomUser.objects.filter(id=obj.doctor.id).values('id', 'first_name', 'last_name', 'avatar', 'categories', 'gender'))[0]


class ReviewDoctorsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewDoctors
        fields = [
            "id",
            "doctor",
            "user",
            "content",
            "rating",
            "create_at",
        ]
        extra_kwargs = {
            "doctor": {"required": True},
            "content": {"required": True},
            "rating": {"required": True},
            "create_at": {"required": True},
        }

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user
        validated_data["user"] = user
        return super().create(validated_data)
