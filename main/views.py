from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic.edit import FormView

from .forms import ContactForm
from .models import ContactRequest
from .tasks import send_contact_request, send_contact_request_to_telegram

# Create your views here.


def index(request):
    return render(request, 'main/index.html', {'form': ContactForm()})


class ContactView(FormView):
    http_method_names = ['post']
    form_class = ContactForm

    def form_valid(self, form):
        cd = form.cleaned_data
        car = None

        if cd.get('car_brand') is not None:
            car = cd['car_brand']

        if cd.get('car_model') is not None:
            car = car + ' ' + cd['car_model']

        contact_request = ContactRequest.objects.create(
            name=cd['name'],
            phone=cd['phone'],
            email=cd['email'],
            person_type=cd['person_type'],
            car=car,
            budget_from=cd.get('budget_from'),
            budget_to=cd.get('budget_to')
        )
        send_contact_request.delay(contact_request.pk)
        send_contact_request_to_telegram.delay(contact_request.pk)

        return JsonResponse({'success': True})

    def form_invalid(self, form):
        return JsonResponse(form.errors, status=400)
