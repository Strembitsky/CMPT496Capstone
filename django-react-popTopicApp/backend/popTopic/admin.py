from django.contrib import admin
from .models import PopTopic, Order

class PopTopicAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'genre', 'size', 'image', 'price', 'dateCreated', 'dateReleased', 'outOfStock', 'quantity')

class OrdersAdmin(admin.ModelAdmin):
  list = ('cart', 'name', 'address', 'city', 'zipCode', 'cardNumber', 'expiration', 'cvv', 'email', 'order_date')
  
admin.site.register(PopTopic, PopTopicAdmin)
admin.site.register(Order, OrdersAdmin)