from django.urls import path

from chat.views import views

urlpatterns = [
    path('rooms/', views.StartConversationView.as_view(), name='start_convo'),
    path('', views.ConversationView.as_view(), name='conversations'),
    path('conversation/<int:convo_id>/', views.GetConversationView.as_view(), name='get_conversation'),
    path('message_delete/<int:pk>/', views.DeleteChatSMSView.as_view()),
    path('appointment-message/<int:pk>/', views.AppointmentView.as_view())
]
