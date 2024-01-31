from random import randint
import secrets
import string


def generate_sms_code():
    return randint(100000, 999999)


def generate_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(characters) for _ in range(length))
    return password
