from django.shortcuts import render
from .serializers import PopTopicSerializer 
from rest_framework import viewsets      
from .models import PopTopic                 

class PopTopicView(viewsets.ModelViewSet):  
    serializer_class = PopTopicSerializer   
    queryset = PopTopic.objects.all()     
