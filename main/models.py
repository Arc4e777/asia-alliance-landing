from django.db import models

# Create your models here.


class ContactRequest(models.Model):
    PERSON_TYPE_CHOICES = (
        ('individual', 'Физ. лицо'),
        ('company', 'Юр. лицо')
    )

    name = models.CharField(max_length=255, verbose_name='Имя')
    phone = models.CharField(max_length=255, verbose_name='Телефон')
    email = models.EmailField(verbose_name='Почта')
    person_type = models.CharField(max_length=50, choices=PERSON_TYPE_CHOICES, verbose_name='Тип клиента')

    car = models.CharField(null=True, blank=True, max_length=255, verbose_name='Автомобиль')
    budget_from = models.BigIntegerField(null=True, blank=True, verbose_name='От')
    budget_to = models.BigIntegerField(null=True, blank=True, verbose_name='До')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'

    def __str__(self):
        return f'Заявка #{self.id}'
