from django.db.models import Avg, OuterRef, Subquery
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
    SmsHistory, ReviewDoctors, SavedDoctors,
)
from authentification.services.get_role import get_role, get_gender
from authentification.services.generate_code import generate_sms_code, generate_password
from authentification.services.send_sms import send_sms
from hospital.serializer.serializer import HospitalSerializer


class GenderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Gender
        fields = [
            "id",
            "name",
        ]


class CategoriesSerializer(serializers.ModelSerializer):

    doctors_set = serializers.SerializerMethodField()

    class Meta:
        model = Categories
        fields = [
            "id",
            'logo',
            "name",
            'doctors_set'
        ]

    def get_doctors_set(self, obj):
        doctors = (
            CustomUser.objects.filter(categories=obj)
            .annotate(rating=Avg('doctorRating__rating'))
            .values('id', 'first_name', 'last_name', 'avatar', 'phone', 'gender', 'rating')
        )
        return list(doctors)

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        request = self.context.get('request')

        if 'doctors_set' in representation:
            for doctor in representation['doctors_set']:
                if 'avatar' in doctor and doctor['avatar']:
                    doctor['avatar'] = request.build_absolute_uri('/media/' + doctor['avatar'])
        return representation

    def create(self, validated_data):
        create = Categories.objects.create(**validated_data)
        create.logo = self.context.get('logo')
        create.save()
        return create

    def update(self, instance, validated_data):
        if self.context.get('logo') == None:
            instance.logo = instance.logo
        instance.logo = self.context.get('logo')
        instance.set_password(validated_data['password'])
        instance = super(CategoriesSerializer, self).update(instance, validated_data)
        instance.save()
        return instance


class CustomUserListSerializer(serializers.ModelSerializer):
    gender = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()
    hospital = HospitalSerializer(read_only=True)
    role = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = [
            "id", 'first_name', 'last_name', 'phone', 'date_of_birth',
            'address', 'information', 'gender', 'categories', 'hospital',
            'avatar', 'role', 'email', 'reviews', 'content', 'is_saved',
            'experience'

        ]

    def get_role(self, obj):
        return get_role(obj)

    def get_gender(self, obj):
        return obj.gender.name if obj.gender else "No selected gender"

    def get_categories(self, obj):
        return obj.categories.name if obj.categories else "No selected category"

    def get_reviews(self, obj):
        get_rating = ReviewDoctors.objects.filter(doctor=obj).aggregate(Avg('rating'))
        avg_rating = get_rating.get('rating__avg')
        return avg_rating if avg_rating is not None else 0

    def get_content(self, obj):
        get_contents = ReviewDoctors.objects.filter(doctor=obj).values('content', 'user')
        return list(get_contents)

    def get_is_saved(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return SavedDoctors.objects.filter(doctor=obj, user=user).exists()
        return False


class SendSmsCodeSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(max_length=30, required=True, validators=[UniqueValidator(queryset=CustomUser.objects.all())])
    password = serializers.CharField(max_length=30, required=True)
    groups = serializers.IntegerField(required=True)

    class Meta:
        model = CustomUser
        fields = ["phone", 'password', 'groups']

    def validate(self, data):
        phone = data.get("phone")
        password = data.get("password")

        if not phone and not password:
            raise serializers.ValidationError("Phone or Password is required")
        return data

    def create(self, validated_data):
        phone = validated_data.get("phone")
        password = validated_data.get("password")
        groups = validated_data.get("groups")
        code = generate_sms_code()

        create_patient = CustomUser.objects.create_user(phone=phone, password=password)
        try:
            role = Group.objects.get(id=groups)
            create_patient.groups.add(role)
            create_patient.save()
        except ObjectDoesNotExist:
            return serializers.ValidationError({'error': "Invalid role"})

        try:
            send_sms(create_patient.phone, code)
        except BadRequest as e:
            raise serializers.ValidationError({'error': f"Failed to send SMS. {str(e)}"})

        create_sms_history = SmsHistory.objects.create(user=create_patient, code=code)

        return create_patient


class RegisterSerializer(serializers.ModelSerializer):


    class Meta:
        model = CustomUser
        fields = [
            "id",
            'phone', 'first_name', 'last_name', 'address', 'information',
            'gender', 'categories', 'date_of_birth', 'avatar', 'experience', "is_staff"
        ]

    def create(self, validated_data):
        hospital = self.context.get('request').user.hospital
        create_user = CustomUser.objects.create_user(**validated_data)
        create_user.avatar = self.context.get('avatar')
        create_user.set_password(generate_password())
        create_user.hospital = hospital
        create_user.save()

        return create_user

    def update(self, instance, validated_data):

        if self.context.get('avatar') == None:
            instance.avatar = instance.avatar

        instance.avatar = self.context.get('avatar')
        instance = super(RegisterSerializer, self).update(instance, validated_data)
        instance.save()
        return instance


class IncorrectCredentialsError(serializers.ValidationError):
    pass

class UnverifiedAccountError(serializers.ValidationError):
    pass


class LoginSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(max_length=50, min_length=2)
    password = serializers.CharField(max_length=50, min_length=1)

    class Meta:
        model = get_user_model()
        fields = ("phone", "password")

    def validate(self, data):
        phone = data.get("phone")
        password = data.get("password")
        user = self.authenticate_user(phone, password)
        self.validate_user(user)

        data["user"] = user
        return data

    def authenticate_user(self, phone, password):
        return authenticate(phone=phone, password=password)

    def validate_user(self, user):
        if not user or not user.is_active:
            raise IncorrectCredentialsError({"error": "Incorrect phone or password"})

        if not user.is_staff:
            raise UnverifiedAccountError({"error": "Your account is not verified yet. Verify and try again."})

