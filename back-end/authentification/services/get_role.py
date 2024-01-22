
def get_role(obj):
    role_names = [role.name for role in obj.groups.all()]
    result_str = ''.join(role_names)
    if not role_names:
        return None

    return result_str


def get_gender(obj):
    return obj.gender.name