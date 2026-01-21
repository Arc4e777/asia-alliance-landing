from celery import shared_task

from django.conf import settings
from django.core.mail import send_mail
from django.utils.html import strip_tags

from smtplib import SMTPDataError

from .models import ContactRequest


@shared_task(
    autoretry_for=(SMTPDataError, ),
    retry_kwargs={
        'max_retries': 6,
        'countdown': 10
    }
)
def send_contact_request(request_id):
    contact_request = ContactRequest.objects.get(id=request_id)
    html_message = f'''
    <h2>Заявка #{request_id}</h2>

    Имя: <b>{contact_request.name}</b><br>
    Телефон: <b>{contact_request.phone}</b><br>
    Почта: <b>{contact_request.email}</b><br>
    Тип клиента: <b>{contact_request.get_person_type_display()}</b><br>
    Машина: <b>{contact_request.car or "-"}</b><br>
    Бюджет: От <b>{contact_request.budget_from or "-"}</b> до <b>{contact_request.budget_to or "-"}</b>
    '''
    message = strip_tags(html_message)

    send_mail(
        f'Заявка #{request_id}',
        message,
        settings.EMAIL_HOST_USER,
        [settings.CONTACT_FORM_EMAIL],
        auth_user=settings.EMAIL_HOST_USER,
        auth_password=settings.EMAIL_HOST_PASSWORD,
        html_message=html_message
    )
