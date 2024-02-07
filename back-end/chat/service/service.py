from authentification.models import Notification
from main_services.roles import (
    custom_user_has_patient_role,
    custom_user_has_doctor_role,
    custom_user_has_master_role,
    custom_user_has_client_role
)


def doctor_master_message_notification(user, conversation, create_message):
    if custom_user_has_master_role(user):
        notification_sent = Notification.objects.create(
            notification_type='MESSAGE_MASTER_SENT',
            appointments=conversation.appointments,
            user=create_message.conversation_id.receiver,
        )
        return notification_sent
    if custom_user_has_doctor_role(user):
        notification_sent = Notification.objects.create(
            notification_type='MESSAGE_DOCTOR_SENT',
            appointments=conversation.appointments,
            user=create_message.conversation_id.receiver,
        )
        return notification_sent


def patient_client_message_notification(user, conversation, create_message):
    if custom_user_has_client_role(user):
        notification_sent = Notification.objects.create(
            notification_type='MESSAGE_CLIENT_SENT',
            appointments=conversation.appointments,
            user=create_message.conversation_id.initiator,
        )
        return notification_sent
    if custom_user_has_patient_role(user):
        notification_sent = Notification.objects.create(
            notification_type='MESSAGE_PATIENT_SENT',
            appointments=conversation.appointments,
            user=create_message.conversation_id.initiator,
        )
        return notification_sent