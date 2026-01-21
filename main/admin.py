from django.contrib import admin
from django.utils.html import format_html

from .models import ContactRequest

# Register your models here.


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ['_str', 'name', 'person_type', 'created_at']
    list_filter = ['person_type', 'car']
    search_fields = ['name', 'phone', 'email']

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    @admin.display(description='')
    def _str(self, obj):
        return format_html(f'<span class="nowrap">{str(obj)}</span>')

    @admin.display(description='Бюджет')
    def budget(self, obj):
        return format_html(f'<span>От {obj.budget_from or "-"} до {obj.budget_to or "-"}</span>')

    fieldsets = (
        ('Контактная информация', {'fields': ('name', 'phone', 'email', 'person_type')}),
        ('Общая автомобиле', {'fields': ('car', 'budget', 'created_at')})
    )
