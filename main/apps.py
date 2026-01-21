from django.contrib import admin
from django.apps import AppConfig


def unregister_celery_beat() -> None:
    from django_celery_beat.models import (
        PeriodicTask,
        ClockedSchedule,
        CrontabSchedule,
        IntervalSchedule,
        SolarSchedule
    )

    admin.site.unregister(PeriodicTask)
    admin.site.unregister(ClockedSchedule)
    admin.site.unregister(CrontabSchedule)
    admin.site.unregister(IntervalSchedule)
    admin.site.unregister(SolarSchedule)


class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'main'
    verbose_name = 'Основное'

    def ready(self):
        unregister_celery_beat()
