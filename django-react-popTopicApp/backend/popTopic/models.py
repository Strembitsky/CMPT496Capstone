from django.db import models
from django.utils import timezone
from django.utils.safestring import mark_safe

# Create your models here.
class PopTopic(models.Model):
   title = models.CharField(max_length=100)
   description = models.TextField()
   genre = models.TextField()
   size = models.TextField()
   image = models.ImageField(upload_to='', blank=True, null=True)
   price = models.DecimalField(max_digits=6, decimal_places=2)
   dateCreated = models.DateField(auto_now_add=True)
   dateReleased = models.DateField(default=timezone.now)
   outOfStock = models.BooleanField(default=False)
   quantity = models.IntegerField(default=1)

   def __str__(self):
     return self.title

class Order(models.Model):
    cart = models.JSONField(default=dict)
    name = models.CharField(max_length=100)
    address = models.TextField()
    city = models.CharField(max_length=100)
    zipCode = models.CharField(max_length=20)
    cardNumber = models.CharField(max_length=20)
    expiration = models.CharField(max_length=10)
    cvv = models.CharField(max_length=10)
    email = models.EmailField()
    order_date = models.DateTimeField(default=timezone.now)
    processed = models.BooleanField(default=False)

    def __str__(self):
        return f"Order {self.pk}"