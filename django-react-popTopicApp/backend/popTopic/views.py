from django.shortcuts import render
from .serializers import PopTopicSerializer, OrderSerializer
from rest_framework import viewsets      
from .models import PopTopic, Order                

class PopTopicView(viewsets.ModelViewSet):  
    serializer_class = PopTopicSerializer   
    queryset = PopTopic.objects.all()     

class OrderView(viewsets.ModelViewSet):  
    serializer_class = OrderSerializer   
    queryset = Order.objects.all()     

