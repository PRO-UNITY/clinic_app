from django.urls import path
from rating.views import views


urlpatterns = [
    path('', views.RatingListView.as_view()),
    path('rating/<int:pk>', views.RatingDetailsView.as_view()),
]