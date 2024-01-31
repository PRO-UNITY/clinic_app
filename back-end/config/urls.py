from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.views.static import serve
from drf_spectacular.views import SpectacularAPIView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from config.views import views
from config.views import category

admin.site.site_url = None
schema_view = get_schema_view(
    openapi.Info(
        title="Clinics Backend",
        default_version="v1",
        description="Clinics Backend",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path(
        "swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("admin/", admin.site.urls),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "docs/",
        TemplateView.as_view(
            template_name="doc.html", extra_context={"schema_url": "api_schema"}
        ),
        name="swagger-ui",
    ),

    path('auth', include('authentification.urls')),
    path('hospital', include('hospital.urls')),
    path('review/', include('rating.urls')),
    path('chat/', include('chat.urls')),
    path('appointment/', include('appointments.urls')),
    path('profile', views.ProfileViews.as_view()),
    path('profile/<int:pk>', views.CustomUserDetailsViews.as_view()),
    path('doctors/', views.DoctorsViews.as_view()),
    path('patients/', views.PatientsViews.as_view()),
    path('category/', category.CategoryViews.as_view()),
    path('category/<int:pk>', category.CategoryDetailViews.as_view()),
    path('saved', views.SavedDoctorsView.as_view()),
    path('saved/<int:pk>', views.SavedDoctorsDetailView.as_view()),
    path('gender', views.GenderView.as_view()),
    path('notification/', views.NotificationView.as_view()),
    path('notification/<int:pk>/', views.NotificationDetailsView.as_view()),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [
    re_path(
        r"^media/(?P<path>.*)$",
        serve,
        {
            "document_root": settings.MEDIA_ROOT,
        },
    ),
]