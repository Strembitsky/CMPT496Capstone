from django.db import models
from django.utils import timezone
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