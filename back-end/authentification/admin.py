from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from import_export.admin import ImportExportModelAdmin

from authentification.models import (
    CustomUser,
    Gender,
    Categories,
    SmsHistory,
    Hospital,
    ReviewDoctors,
    MakeAppointments,
    SavedDoctors, Notification
)


class CustomUserAdmin(ImportExportModelAdmin, UserAdmin):
    model = CustomUser
    list_display = ['email', 'phone', 'is_active', 'is_staff',]
    search_fields = ['email', 'phone']
    ordering = ['email']
    fieldsets = (
        (None, {'fields': ('first_name', 'last_name', 'email', 'phone', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                    'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Personal Information', {'fields': ('address', 'hospital', 'gender', 'categories', 'information', 'date_of_birth', 'avatar')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone', 'password1', 'password2'),
        }),
    )


class GenderAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['id', 'name']


class CategoriesAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['id', 'name']


class HospitalAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['id', 'name', 'address', 'phone', 'author', 'logo']


class ReviewDoctorsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['id', 'doctor', 'user', 'content', 'rating', 'create_at']


class MakeAppointmentsAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'user', 'content', 'status', 'timestamp', 'create_at')


admin.site.register(MakeAppointments, MakeAppointmentsAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Gender, GenderAdmin)
admin.site.register(Categories, CategoriesAdmin)
admin.site.register(SmsHistory)
admin.site.register(Hospital, HospitalAdmin)
admin.site.register(ReviewDoctors, ReviewDoctorsAdmin)
admin.site.register(SavedDoctors)
admin.site.register(Notification)
