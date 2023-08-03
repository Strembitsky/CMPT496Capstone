from rest_framework import serializers
from .models import PopTopic, Order

class PopTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopTopic
        fields = ('id' ,'title', 'description', 'genre', 'size', 'image', 'price', 'dateCreated', 'dateReleased', 'outOfStock', 'quantity', 'generalType')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'