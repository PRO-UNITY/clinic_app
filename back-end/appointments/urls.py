from django.urls import path

from appointments.views import views


urlpatterns = [
    path('make_appointments/', views.MakeAppointmentsView.as_view(), name='make_appointments'),
    path('get_appointments/<int:pk>/', views.MakeAppointmentsDetailsView.as_view(), name='get_appointments'),
]