from rest_framework import serializers

from authentification.models import CustomUser, Notification, MakeAppointments
from chat.models import Conversation, Message
from chat.service.service import doctor_master_message_notification, patient_client_message_notification
from main_services.roles import (
    custom_user_has_doctor_role,
    custom_user_has_patient_role, custom_user_has_client_role, custom_user_has_master_role
)

class MessageSerializer(serializers.ModelSerializer):
    text = serializers.CharField(required=True)

    class Meta:
        model = Message
        fields = ['id', "sender", 'text', 'conversation_id', 'timestamp']

    def create(self, validated_data):
        sender = self.context.get('request')
        conversation = self.context.get('conversation')
        if conversation.is_activate == False:
            raise serializers.ValidationError({'error': 'Conversation is not active'})
        create_message = Message.objects.create(**validated_data)
        create_message.sender = sender.user
        create_message.conversation_id = conversation
        create_message.save()
        if sender:
            conversation = create_message.conversation_id
            if conversation.initiator == sender.user:
                patient_client_message_notification(sender.user, conversation, create_message)
            elif conversation.receiver == sender.user:
                doctor_master_message_notification(sender.user, conversation, create_message)
        return create_message


class ConversationListSerializer(serializers.ModelSerializer):
    initiator = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    class Meta:
        model = Conversation
        fields = ['id', 'initiator', 'receiver', 'appointments', 'is_activate', 'type']

    def get_type(self, obj):
        if custom_user_has_patient_role(self.context.get('request').user):
            return 'receiver'
        if custom_user_has_doctor_role(self.context.get("request").user):
            return 'initiator'

    def get_initiator(self, obj):
        return list(
            CustomUser.objects.filter(id=obj.initiator.id).values('id', 'first_name', 'last_name', 'avatar', 'categories__name',
                                                             'gender'))[0]

    def get_receiver(self, obj):
        return list(
            CustomUser.objects.filter(id=obj.receiver.id).values('id', 'first_name', 'last_name', 'avatar', 'categories__name',
                                                             'gender'))[0]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if 'initiator' in representation and 'avatar' in representation['initiator']:
            logo_path = representation['initiator']['avatar']
            if logo_path and request:
                representation['initiator']['avatar'] = request.build_absolute_uri('/media/'+logo_path)

        if 'receiver' in representation and 'avatar' in representation['receiver']:
            logo_path = representation['receiver']['avatar']
            if logo_path and request:
                representation['receiver']['avatar'] = request.build_absolute_uri('/media/'+logo_path)

        return representation

class MessageListSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    sender_type = serializers.SerializerMethodField()
    class Meta:
        model = Message
        fields = ['id', 'sender', 'text', 'sender_type', 'timestamp']

    def get_sender(self, obj):
        return list(
            CustomUser.objects.filter(id=obj.sender.id).values('id', 'first_name', 'last_name', 'avatar', 'categories__name',
                                                             'gender'))[0]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if 'sender' in representation and 'avatar' in representation['sender']:
            logo_path = representation['sender']['avatar']
            if logo_path and request:
                representation['sender']['avatar'] = request.build_absolute_uri('/media/'+logo_path)

        return representation

    def get_sender_type(self, obj):

        client = custom_user_has_client_role(self.context.get('request').user)
        patient = custom_user_has_patient_role(self.context.get('request').user)
        master = custom_user_has_master_role(self.context.get('request').user)
        doctor = custom_user_has_doctor_role(self.context.get('request').user)

        conversation = obj.conversation_id
        user = obj.sender
        if user:
            if patient or client:
                if conversation.initiator == user:

                    return 'initiator'
                elif conversation.receiver == user:
                    return 'receiver'
            if doctor or master:
                if conversation.initiator == user:
                    return 'receiver'
                elif conversation.receiver == user:
                    return 'initiator'
        return 'unknown'


class ConversationSerializer(serializers.ModelSerializer):
    initiator = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()
    message_set = MessageListSerializer(many=True)

    class Meta:
        model = Conversation
        fields = ['id', 'initiator', 'receiver', 'message_set']

    def get_initiator(self, obj):
        return list(
            CustomUser.objects.filter(id=obj.initiator.id).values('id', 'first_name', 'last_name', 'avatar', 'categories__name',
                                                             'gender'))[0]

    def get_receiver(self, obj):
        return list(
            CustomUser.objects.filter(id=obj.receiver.id).values('id', 'first_name', 'last_name', 'avatar', 'categories__name',
                                                             'gender'))[0]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if 'initiator' in representation and 'avatar' in representation['initiator']:
            logo_path = representation['initiator']['avatar']
            if logo_path and request:
                representation['initiator']['avatar'] = request.build_absolute_uri('/media/'+logo_path)

        if 'receiver' in representation and 'avatar' in representation['receiver']:
            logo_path = representation['receiver']['avatar']
            if logo_path and request:
                representation['receiver']['avatar'] = request.build_absolute_uri('/media/'+logo_path)

        return representation


class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    appointments = serializers.SerializerMethodField()
    class Meta:
        model = Notification
        fields = [
            'id',
            'notification_type',
            'appointments',
            'is_seen',
            'user',
            'created_at'
        ]

    def get_user(self, obj):
        return list(
            CustomUser.objects.filter(id=obj.user.id).values('id', 'first_name', 'last_name', 'avatar', 'categories__name'))[0]

    def get_appointments(self, obj):
        return list(
            MakeAppointments.objects.filter(id=obj.appointments.id).values('id', 'status', 'create_at')
        )[0]
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if 'user' in representation and 'avatar' in representation['user']:
            logo_path = representation['user']['avatar']
            if logo_path and request:
                representation['user']['avatar'] = request.build_absolute_uri('/media/'+logo_path)

        return representation

