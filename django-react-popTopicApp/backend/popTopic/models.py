from django.db import models

# Create your models here.
class PopTopic(models.Model):
   title = models.CharField(max_length=100)
   description = models.TextField()
   genre = models.TextField()
   size = models.TextField()
   image = models.ImageField(upload_to='', blank=True, null=True)
   price = models.DecimalField(max_digits=6, decimal_places=2)
   outOfStock = models.BooleanField(default=False)

   def _str_(self):
     return self.title