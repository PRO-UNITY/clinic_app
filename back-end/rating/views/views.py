from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from main_services.main import UserRenderers, PaginationMethod
from main_services.pagination import StandardResultsSetPagination
from main_services.responses import (
    bad_request_response,
    success_response,
    success_created_response,
    unauthorized_response, success_deleted_response
)
from main_services.expected_fields import check_required_key
from rating.serializers.serializer import ReviewDoctorsSerializer, ReviewDoctorsCreateSerializer
from authentification.models import ReviewDoctors


class RatingListView(APIView, PaginationMethod):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        if not request.user.is_authenticated:
            return unauthorized_response("Token is not valid")
        if request.user.groups.filter(name='doctor').exists():
            reviews = ReviewDoctors.objects.select_related('doctor').filter(
                doctor=request.user
            )
            serializer = super().page(reviews, ReviewDoctorsSerializer, request)
            return success_response(serializer.data)

        reviews = ReviewDoctors.objects.select_related('user').filter(
            user=request.user
        )
        serializer = super().page(reviews, ReviewDoctorsSerializer, request)
        return success_response(serializer.data)

    def post(self, request):
        valid_fields = {'doctor', 'content', 'rating'}
        unexpected_fields = check_required_key(request, valid_fields)
        if unexpected_fields:
            return bad_request_response(f"Unexpected fields: {', '.join(unexpected_fields)}")

        serializer = ReviewDoctorsCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_created_response(serializer.data)
        return bad_request_response(serializer.errors)


class RatingDetailsView(APIView):
    permission_classes = [IsAuthenticated]
    render_classes = [UserRenderers]

    def get(self, request, pk):
        queryset = get_object_or_404(ReviewDoctors, pk=pk)
        serializer = ReviewDoctorsSerializer(queryset)
        return success_response(serializer.data)

    def put(self, request, pk):
        queryset = get_object_or_404(ReviewDoctors, pk=pk)
        serializer = ReviewDoctorsCreateSerializer(queryset, data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return success_response(serializer.data)
        return bad_request_response(serializer.errors)

    def delete(self, request, pk):
        queryset = get_object_or_404(ReviewDoctors, pk=pk)
        queryset.delete()
        return success_deleted_response("Review deleted")
