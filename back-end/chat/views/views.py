# from django.contrib.auth.models import User
# from django.db.models import Q
# from django.shortcuts import get_object_or_404
# from django.shortcuts import redirect, reverse
# from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
#
# from authentification.models import CustomUser
# from chat.models import (
#     Conversation,
#     Message
# )
# from main_services.main import UserRenderers, PaginationMethod
# from chat.utils.serializers import (
#     ConversationListSerializer,
#     ConversationSerializer, MessageSerializer, MessageListSerializer
# )
# from main_services.pagination import StandardResultsSetPagination
# # from notification.models import (
# #     Notification
# # )a
#
#
# class StartConversationView(APIView):
#     render_classes = [UserRenderers]
#     perrmisson_class = [IsAuthenticated]
#
#     def post(self, request):
#         if not request.user.is_authenticated:
#             return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
#
#         data = request.data
#
#         # get doctor username here
#         username = data['username']
#
#         # check the user is or not in databases
#         try:
#             participant = CustomUser.objects.get(username=username)
#         except User.DoesNotExist:
#             return Response({'message': 'You cannot chat with a non existent user'})
#         # ------------------------------------
#         # we are checked (Patient and Doctor) or (Doctor and Patient) chat group has or not
#         conversation = Conversation.objects.filter(Q(initiator=request.user, receiver=participant) |
#                                                    Q(initiator=participant, receiver=request.user))
#         # -----------------------------------
#         # We are check groups is have or not, and if room is does not we will create new room
#         if conversation.exists():
#             return Response({"message": "Conversation already exists"}, status=status.HTTP_200_OK)
#         else:
#             conversation = Conversation.objects.create(initiator=request.user, receiver=participant)
#             return Response(ConversationSerializer(instance=conversation).data, status=status.HTTP_200_OK)
#
#
# class GetConversationView(APIView, PaginationMethod):
#     render_classes = [UserRenderers]
#     pagination_class = StandardResultsSetPagination
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ["text"]
#
#     def get(self, request, convo_id):
#         if not request.user.is_authenticated:
#             return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
#
#         text = request.query_params.get("text", None)
#         if text:
#             conversation = Message.objects.select_related('conversation_id').filter(
#                 Q(conversation_id=convo_id), Q(text__icontains=text)
#             )
#             page = self.paginate_queryset(conversation)
#             if page is not None:
#                 serializer = MessageListSerializer(page, many=True, context={'request': request})
#                 return self.get_paginated_response(serializer.data)
#             serializer = MessageListSerializer(conversation, many=True, context={'request': request})
#
#             return Response(serializer.data, status=status.HTTP_200_OK)
#
#         conversation = get_object_or_404(Conversation, id=convo_id)
#         messages = conversation.message_set.all()  # Retrieve all messages for the conversation
#         page = self.paginate_queryset(messages)
#         if page is not None:
#             serializer = MessageListSerializer(page, many=True, context={'request': request})
#             return self.get_paginated_response(serializer.data)
#
#         serializer = ConversationSerializer(conversation, context={'request': request})
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#
#     def put(self, request, convo_id):
#         if not request.user.is_authenticated:
#             return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
#         conversation = get_object_or_404(Conversation, id=convo_id)
#         serializer = MessageSerializer(data=request.data, context={
#             "request": request,
#             "conversation": conversation
#         })
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# # class ConversationView(APIView, PaginationMethod):
#     render_classes = [UserRenderers]
#     pagination_class = StandardResultsSetPagination
#
#     def get(self, request):
#         if not request.user.is_authenticated:
#             return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
#         conversation_list = Conversation.objects.filter(Q(initiator=request.user) |
#                                                         Q(receiver=request.user))
#         # serializer = ConversationListSerializer(instance=conversation_list, many=True)
#         serializer = super().page(conversation_list, ConversationListSerializer, request)
#
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#
# class DeleteChatSMSView(APIView):
#     render_classes = [UserRenderers]
#     permission = [IsAuthenticated]
#
#     def delete(self, request, pk):
#         if not request.user.is_authenticated:
#             return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
#         queryset = get_object_or_404(Message, id=pk).delete()
#         return Response({'msg': "Message Deleted successfully"}, status=status.HTTP_200_OK)
#
#
#
