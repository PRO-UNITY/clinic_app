from eskiz_sms import EskizSMS


def send_sms(phone, code_s):
    email = "Ibroxim.2001@mail.ru"
    password = "MQVib4PtVRhLOpjYcfRZRbEesmuxDWInZaEtSlaX"
    eskiz = EskizSMS(email=email, password=password)
    eskiz.send_sms(
                    phone,
                    f"Sms kod {code_s}",
                    from_whom="4546",
                    callback_url=None
                    )