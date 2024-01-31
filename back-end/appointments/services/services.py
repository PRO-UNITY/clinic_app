from django.db.models import Q
from django.db.models.functions import ExtractHour, ExtractMinute
from django.utils.dateparse import parse_date, parse_time
from authentification.models import Notification, MakeAppointments
from chat.models import Conversation


def create_conversation(appointment):
    initiator = appointment.user
    receiver = appointment.doctor

    conversation = Conversation.objects.filter(initiator=initiator, receiver=receiver, appointments=appointment)
    if not conversation:
        conversation = Conversation.objects.create(initiator=initiator, receiver=receiver, appointments=appointment)
        notification_sent = Notification.objects.create(
            notification_type='DOCTOR_CONFIRMED_APPOINTMENT',
            appointments=appointment,
            user=receiver,
        )
    else:
        conversation = conversation.first()
        conversation.is_activate = True
        conversation.save()
        notification_sent = Notification.objects.create(
            notification_type='DOCTOR_CONFIRMED_APPOINTMENT',
            appointments=appointment,
            user=receiver,
        )
    return conversation


def complete_conversation(appointment):
    initiator = appointment.user
    receiver = appointment.doctor
    conversation = Conversation.objects.filter(initiator=initiator, receiver=receiver, appointments=appointment, is_activate=True).first()
    conversation.is_activate = False
    conversation.save()
    return conversation


def create_notification(param, queryset, request):
    create = Notification.objects.create(
        notification_type=param,
        appointments=queryset,
        user=request.user
    )
    return create


def filter_by_status_id(queryset, request):
    status_id = request.query_params.get('status_id', '')
    status_id = int(status_id)
    if status_id == 1:
        queryset.status = 'CANCELLED'
        queryset.save()
        create_notification('DOCTOR_CANCELLED_APPOINTMENT', queryset, request)
        return queryset
    elif status_id == 2:
        queryset.status = 'IN_QUEUE'
        queryset.save()
        create_conversation(queryset)
        create_notification('APPOINTMENT_IN_QUEUE', queryset, request)
        return queryset
    elif status_id == 3:
        queryset.status = 'COMPLETED'
        complete_conversation(queryset)
        queryset.save()
        create_notification('APPOINTMENT_IS_COMPLETED', queryset, request)
        return queryset
    return None


def filter_by_doctor_notification(queryset):
    queryset = queryset.filter(
        Q(notification_type='PATIENT_SENT_APPOINTMENT') |
        Q(notification_type='PATIENT_CANCELLED_APPOINTMENT') |
        Q(notification_type='PATIENT_SENDING_BACK_APPOINTMENT') |
        Q(notification_type='MESSAGE_PATIENT_SENT')
    ).order_by("-id")
    return queryset


def filter_by_patient_notification(queryset):
    queryset = queryset.filter(
        Q(notification_type='APPOINTMENT_IS_ONGOING') |
        Q(notification_type='DOCTOR_CANCELLED_APPOINTMENT') |
        Q(notification_type='APPOINTMENT_IS_COMPLETED') |
        Q(notification_type='DOCTOR_CONFIRMED_APPOINTMENT') |
        Q(notification_type='MESSAGE_DOCTOR_SENT')
    ).order_by("-id")
    return queryset


def filter_by_calendar(queryset, request):
    date = request.query_params.get('date', None)
    if date:
        queryset = queryset.filter(timestamp__date=parse_date(date))
    return queryset


def filter_by_time(queryset, request):
    time_str = request.query_params.get('time', None)
    if time_str:
        parsed_time = parse_time(time_str)
        if parsed_time:
            queryset = queryset.annotate(
                hour=ExtractHour('timestamp'),
                minute=ExtractMinute('timestamp')
            ).filter(hour=parsed_time.hour, minute=parsed_time.minute)
    return queryset

def doctor_busy_days(request):
    user = request.user
    return MakeAppointments.objects.select_related('doctor').filter(doctor=user).values('timestamp')