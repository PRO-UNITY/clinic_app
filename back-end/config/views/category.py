
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404, redirect, reverse
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from main_services.main import get_token_for_user, UserRenderers
from main_services.responses import (
    bad_request_response,
    success_response,
    success_created_response,
    user_not_found_response,
    unauthorized_response
)
from main_services.roles import custom_user_has_client_role, custom_user_has_patient_role, custom_user_has_admin_role
from main_services.swaggers import swagger_extend_schema, swagger_schema
from main_services.expected_fields import check_required_key
from authentification.models import Categories
from authentification.serializer.serializer import (
    CategoriesSerializer,
)


@swagger_extend_schema(fields={"name", "logo"}, description="Category")
@swagger_schema(serializer=CategoriesSerializer)
class CategoryViews(APIView):

    def get(self, request):
        print(request.user.groups.all())
        if custom_user_has_client_role(request.user):
            category = Categories.objects.select_related('groups').filter(
                Q(groups__name='master')
            )
            serializer = CategoriesSerializer(category, many=True, context={'request': request})
            return success_response(serializer.data)
        if custom_user_has_patient_role(request.user):
            category = Categories.objects.select_related('groups').filter(
                Q(groups__name='doctor')
            )
            serializer = CategoriesSerializer(category, many=True, context={'request': request})
            return success_response(serializer.data)
        if custom_user_has_admin_role(request.user):
            category = Categories.objects.all()
            serializer = CategoriesSerializer(category, many=True, context={'request': request})
            return success_response(serializer.data)



    def post(self, request):
        valid_fields = {"name", "logo"}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        serializer = CategoriesSerializer(data=request.data, context={'logo': request.FILES.get('logo'), 'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_created_response(serializer.data)
        return bad_request_response(serializer.errors)


@swagger_extend_schema(fields={"name", "logo"}, description="Category Details")
@swagger_schema(serializer=CategoriesSerializer)
class CategoryDetailViews(APIView):
    def get(self, request, pk):
        category = get_object_or_404(Categories, pk=pk)
        serializer = CategoriesSerializer(category, context={'request': request})
        return success_response(serializer.data)

    def put(self, request, pk):
        valid_fields = {"name", "logo"}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        category = get_object_or_404(Categories, pk=pk)
        serializer = CategoriesSerializer(category, data=request.data, context={'logo': request.FILES.get('logo'), 'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_response(serializer.data)
        return bad_request_response(serializer.errors)

    def delete(self, request, pk):
        category = get_object_or_404(Categories, pk=pk)
        category.delete()
        return success_response("Deleted")




