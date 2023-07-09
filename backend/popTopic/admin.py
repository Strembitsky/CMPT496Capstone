from django.contrib import admin
from .models import PopTopic

class PopTopicAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')
  
admin.site.register(PopTopic, PopTopicAdmin)