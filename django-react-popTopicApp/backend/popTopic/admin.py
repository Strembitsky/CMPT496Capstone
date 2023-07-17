from django.contrib import admin
from .models import PopTopic, Order
import json
from django.utils.safestring import mark_safe

class PopTopicAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'genre', 'size', 'image', 'price', 'dateCreated', 'dateReleased', 'outOfStock', 'quantity')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'city', 'zipCode', 'cardNumber', 'expiration', 'cvv', 'email', 'order_date', 'processed')

    def get_order_summary(self, obj):
        cart_items = ""
        for item in obj.cart:
            nut_item = item['cartItem']
            cart_items += '(' + str(item['quantity']) + ") " + nut_item['title'] + '<br>'
        return mark_safe(cart_items)

    get_order_summary.short_description = 'Order Summary'

    def change_view(self, request, object_id, form_url='', extra_context=None):
        obj = self.get_object(request, object_id)
        extra_context = extra_context or {}
        extra_context['order_summary'] = self.get_order_summary(obj)
        return super().change_view(request, object_id, form_url=form_url, extra_context=extra_context)

admin.site.register(PopTopic, PopTopicAdmin)
admin.site.register(Order, OrderAdmin)