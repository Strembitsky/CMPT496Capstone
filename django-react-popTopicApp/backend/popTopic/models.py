from django.db import models

# Create your models here.
class PopTopic(models.Model):
   title = models.CharField(max_length=100)
   description = models.TextField()
   genre = models.TextField()
   size = models.TextField()
   outOfStock = models.BooleanField(default=False)

   def _str_(self):
     return self.title