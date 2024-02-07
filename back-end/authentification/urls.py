from django.urls import path
from authentification.views import views


urlpatterns = [
    path('/send-code', views.SendSmsViews.as_view(), name='send_code'),
    path('/register', views.RegisterCustomUserViews.as_view(), name='register'),
    path('/login', views.LoginView.as_view(), name='login'),
    path('/verify', views.VerificationSmsCodeView.as_view(), name='verify'),
    path('/send-phone-to-password', views.SendCodeToPhoneView.as_view(), name='send-to-phone')
]