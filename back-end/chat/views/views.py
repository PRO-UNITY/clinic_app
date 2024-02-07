from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from authentification.models import CustomUser, MakeAppointments
from chat.models import (
    Conversation,
    Message
)
from main_services.main import UserRenderers, PaginationMethod
from chat.utils.serializers import (
    ConversationListSerializer,
    ConversationSerializer, MessageSerializer, MessageListSerializer
)
from main_services.pagination import StandardResultsSetPagination
from main_services.roles import (
    custom_user_has_patient_role,
    custom_user_has_doctor_role, custom_user_has_client_role, custom_user_has_master_role
)
from main_services.responses import (
    success_response,
    bad_request_response
)


class StartConversationView(APIView, PaginationMethod):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        if custom_user_has_client_role(request.user):
            queryset = Conversation.objects.select_related('initiator').filter(
                        initiator=request.user
                )
            serializer = super().page(queryset, ConversationListSerializer, request)
            return success_response(serializer.data)
        if custom_user_has_master_role(request.user):
            queryset = Conversation.objects.select_related('receiver').filter(
                    receiver=request.user
                )
            serializer = super().page(queryset, ConversationListSerializer, request)
            return success_response(serializer.data)

        if custom_user_has_patient_role(request.user):
            queryset = Conversation.objects.select_related('initiator').filter(
                initiator=request.user
            )
            serializer = super().page(queryset, ConversationListSerializer, request)
            return success_response(serializer.data)

        if custom_user_has_doctor_role(request.user):
            queryset = Conversation.objects.select_related('receiver').filter(
                receiver=request.user
            )
            serializer = super().page(queryset, ConversationListSerializer, request)
            return success_response(serializer.data)
        return success_response("No active Room")

    def post(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data

        username = data['username']
        try:
            participant = CustomUser.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'message': 'You cannot chat with a non existent user'})
        conversation = Conversation.objects.filter(Q(initiator=request.user, receiver=participant) |
                                                   Q(initiator=participant, receiver=request.user))
        if conversation.exists():
            return Response({"message": "Conversation already exists"}, status=status.HTTP_200_OK)
        else:
            conversation = Conversation.objects.create(initiator=request.user, receiver=participant)
            return Response(ConversationSerializer(instance=conversation).data, status=status.HTTP_200_OK)


class GetConversationView(APIView, PaginationMethod):
    render_classes = [UserRenderers]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["text"]

    def get(self, request, convo_id):
        if not request.user.is_authenticated:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)

        text = request.query_params.get("text", None)
        if text:
            conversation = Message.objects.select_related('conversation_id').filter(
                Q(conversation_id=convo_id), Q(text__icontains=text)
            )
            page = self.paginate_queryset(conversation)
            if page is not None:
                serializer = MessageListSerializer(page, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)
            serializer = MessageListSerializer(conversation, many=True, context={'request': request})

            return Response(serializer.data, status=status.HTTP_200_OK)

        conversation = get_object_or_404(Conversation, id=convo_id)
        messages = conversation.message_set.all()
        page = self.paginate_queryset(messages)
        if page is not None:
            serializer = MessageListSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = ConversationSerializer(conversation, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


    def put(self, request, convo_id):
        if not request.user.is_authenticated:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        conversation = get_object_or_404(Conversation, id=convo_id)
        serializer = MessageSerializer(data=request.data, context={
            "request": request,
            "conversation": conversation
        })
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConversationView(APIView, PaginationMethod):
    render_classes = [UserRenderers]
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        conversation_list = Conversation.objects.filter(Q(initiator=request.user) |
                                                        Q(receiver=request.user))
        serializer = super().page(conversation_list, ConversationListSerializer, request)

        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteChatSMSView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def delete(self, request, pk):
        if not request.user.is_authenticated:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        queryset = get_object_or_404(Message, id=pk).delete()
        return Response({'msg': "Message Deleted successfully"}, status=status.HTTP_200_OK)


class AppointmentView(APIView, PaginationMethod):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get(self, request, pk):
        queryset = get_object_or_404(MakeAppointments, pk=pk)
        try:
            conversation_data = Conversation.objects.get(
                appointments=queryset
            )
            serializer = ConversationListSerializer(conversation_data, context={'request': request})
            return success_response(serializer.data)
        except ObjectDoesNotExist:
            return bad_request_response("No Message")
