from django.contrib import admin
from .models import PopTopic

class PopTopicAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'genre', 'size', 'outOfStock')
  
admin.site.register(PopTopic, PopTopicAdmin)