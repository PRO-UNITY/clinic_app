
def custom_user_has_patient_role(user):
    return str(user.groups.values_list('name', flat=True).first()) == 'patient'


def custom_user_has_doctor_role(user):
    return str(user.groups.values_list('name', flat=True).first()) == 'doctor'


def custom_user_has_admin_role(user):
    return str(user.groups.values_list('name', flat=True).first()) == 'admin'