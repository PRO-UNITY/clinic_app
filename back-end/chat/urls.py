# from django.urls import path
#
# from chat.views import views
#
# urlpatterns = [
#     # create room
#     path('create_room/', views.StartConversationView.as_view(), name='start_convo'),
#     # get room on initiator and receiver
#     path('', views.ConversationView.as_view(), name='conversations'),
#     # get conversation  all messages
#     path('conversation/<int:convo_id>/', views.GetConversationView.as_view(), name='get_conversation'),
#
#     path('message_delete/<int:pk>/', views.DeleteChatSMSView.as_view()),
#
#
# ]
