# Generated by Django 5.0.1 on 2024-01-31 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0004_notification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='notification_type',
            field=models.CharField(choices=[('PATIENT_SENT_APPOINTMENT', 'PATIENT_SENT_APPOINTMENT'), ('PATIENT_CANCELLED_APPOINTMENT', 'PATIENT_CANCELLED_APPOINTMENT'), ('PATIENT_SENDING_BACK_APPOINTMENT', 'PATIENT_SENDING_BACK_APPOINTMENT'), ('DOCTOR_CONFIRMED_APPOINTMENT', 'DOCTOR_CONFIRMED_APPOINTMENT'), ('DOCTOR_CANCELLED_APPOINTMENT', 'DOCTOR_CANCELLED_APPOINTMENT'), ('APPOINTMENT_IN_QUEUE', 'APPOINTMENT_IN_QUEUE'), ('APPOINTMENT_IS_COMPLETED', 'APPOINTMENT_IS_COMPLETED'), ('MESSAGE_PATIENT_SENT', 'MESSAGE_PATIENT_SENT'), ('MESSAGE_DOCTOR_SENT', 'MESSAGE_DOCTOR_SENT')], max_length=255),
        ),
    ]