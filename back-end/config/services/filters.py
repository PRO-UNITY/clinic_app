from django.db.models import Q


def filter_by_category(queryset, request):
    category = request.query_params.get("category", [])
    if category:
        ids_category = [int(id_str) for id_str in category.split(",")]
        queryset = queryset.filter(Q(categories__in=ids_category))
    return queryset


def filter_by_first_name(queryset, request):
    first_name = request.query_params.get("first_name", "")
    if first_name:
        queryset = queryset.filter(Q(first_name__icontains=first_name))
    return queryset


def filter_by_last_name(queryset, request):
    last_name = request.query_params.get("last_name", "")
    if last_name:
        queryset = queryset.filter(Q(last_name__icontains=last_name))
    return queryset

