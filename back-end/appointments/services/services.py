
def filter_by_status_id(queryset, request):
    status_id = request.query_params.get('status_id', '')
    status_id = int(status_id)
    if status_id == 1:
        queryset.status = 'CANCELLED'
        queryset.save()
        return queryset
    elif status_id == 2:
        queryset.status = 'IN_QUEUE'
        queryset.save()
        return queryset
    elif status_id == 3:
        queryset.status = 'ONGOING'
        queryset.save()
        return queryset
    elif status_id == 4:
        queryset.status = 'COMPLETED'
        queryset.save()
        return queryset
    return None