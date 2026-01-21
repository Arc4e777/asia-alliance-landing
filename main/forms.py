from django import forms
from phonenumber_field.formfields import PhoneNumberField


class ContactForm(forms.Form):
    name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Ваше имя',
                'id': 'name'
            }
        ),
        required=True
    )
    phone = PhoneNumberField(
        region='RU',
        widget=forms.TextInput(
            attrs={
                'id': 'phone',
                'type': 'tel',
                'placeholder': 'Ваш номер телефона'
            }
        ),
        required=True
    )
    email = forms.EmailField(
        widget=forms.EmailInput(
            attrs={
                'placeholder': 'Ваша почта',
                'id': 'email'
            }
        ),
        required=True
    )
    person_type = forms.ChoiceField(choices=(('individual', 'individual'), ('company', 'company')), required=True)

    car_brand = forms.CharField(required=False)
    car_model = forms.CharField(required=False)
    budget_from = forms.IntegerField(
        widget=forms.NumberInput(
            attrs={'placeholder': 'От'}
        ),
        min_value=0,
        required=False
    )
    budget_to = forms.IntegerField(
        widget=forms.NumberInput(
            attrs={'placeholder': 'До'}
        ),
        min_value=0,
        required=False
    )

    confirm_privacy = forms.BooleanField(widget=forms.CheckboxInput(), required=True)
