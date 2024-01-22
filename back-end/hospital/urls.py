from django.urls import path
from hospital.views import views


urlpatterns = [
    path('/hospital', views.HospitalViews.as_view()),
    path('/hospital/<int:pk>', views.HospitalDetailsViews.as_view()),
]

