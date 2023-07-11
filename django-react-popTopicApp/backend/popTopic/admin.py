from django.contrib import admin
from .models import PopTopic

class PopTopicAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'genre', 'size', 'image', 'price,' 'outOfStock')
  
admin.site.register(PopTopic, PopTopicAdmin)