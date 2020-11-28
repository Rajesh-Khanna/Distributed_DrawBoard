from django.db import models

# Create your models here.
class DrawUser(models.Model):
    name = models.CharField(max_length=32,default='user')
    userId = models.CharField(max_length=64)

    def __str__(self):
        return self.name