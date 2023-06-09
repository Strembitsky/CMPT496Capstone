from rest_framework import serializers
from .models import PopTopic

class PopTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopTopic
        fields = ('id' ,'title', 'description', 'genre', 'size', 'image', 'price', 'dateCreated', 'dateReleased', 'outOfStock', 'quantity')