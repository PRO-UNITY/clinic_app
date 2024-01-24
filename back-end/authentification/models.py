from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, phone, password=None, **extra_fields):
        if not phone:
            raise ValueError("The Phone field must be set")
        phone = self.normalize_email(phone)
        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(phone, password, **extra_fields)


class Categories(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    logo = models.ImageField(upload_to="logo/", null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "table_categories"
        verbose_name = "Categories"
        verbose_name_plural = "Categories"


class Gender(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "table_gender"
        verbose_name = "Gender"
        verbose_name_plural = "Gender"


class Hospital(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    logo = models.ImageField(upload_to="logo/", null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True,
                               related_name="authorHospital")
    create_at = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "table_hospital"
        verbose_name = "Hospital"
        verbose_name_plural = "Hospitals"


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=True, blank=False)
    phone = models.CharField(max_length=30, unique=True, blank=False, null=True)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE, null=True, blank=True)
    categories = models.ForeignKey(Categories, on_delete=models.CASCADE, null=True, blank=True)
    information = models.TextField(null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    avatar = models.ImageField(upload_to="avatar/", null=True, blank=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["phone"]

    def __str__(self):
        return self.phone

    class Meta:
        db_table = "table_user"
        verbose_name = "CustomUser"
        verbose_name_plural = "CustomUsers"


class SmsHistory(models.Model):
    code = models.IntegerField(null=True, blank=True)
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="smscode",
    )

    class Meta:
        db_table = "table_sms_history"
        verbose_name = "History User code"
        verbose_name_plural = "History User codes"


class ReviewDoctors(models.Model):
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True, related_name="doctorRating")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True, related_name="userRating")
    rating = models.IntegerField(null=True, blank=True, default=0)
    content = models.TextField(null=True, blank=True)
    create_at = models.DateField(auto_now_add=True, null=True, blank=True)

    class Meta:
        db_table = "table_review_doctors"
        verbose_name = "Review Doctor"
        verbose_name_plural = "Review Doctors"


STATUS_TYPES = (
    ('IN_PROGRESS', 'IN_PROGRESS'),
    ('IN_QUEUE', 'IN_QUEUE'),
    ('CANCELLED', 'CANCELLED'),
    ('ONGOING', 'ONGOING'),
    ('COMPLETED', 'COMPLETED'),
)


class MakeAppointments(models.Model):
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True,
                               related_name="doctorAppointment")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True,
                             related_name="userAppointment")
    content = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=255, choices=STATUS_TYPES, default='IN_PROGRESS')
    timestamp = models.DateTimeField(null=True, blank=True)
    create_at = models.DateField(auto_now_add=True, null=True, blank=True)

    class Meta:
        db_table = "table_make_appointment"
        verbose_name = "Make Appointment"
        verbose_name_plural = "Make Appointments"
