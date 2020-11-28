from django.db import models

# Create your models here.
class DrawUser(models.Model):
    name = models.CharField(max_length=32,default='user')
    userId = models.CharField(max_length=64, primary_key=True)

    def __str__(self):
        return self.name

class WorkSpace(models.Model):
    workSpaceId = models.CharField(max_length=64, primary_key=True)
    workSpaceURL = models.CharField(max_length=64)

    def __str__(self):
        return self.workSpaceId

class Shape(models.Model):
    typeOfShape = models.CharField(max_length=16)
    x1 = models.IntegerField()
    x2 = models.IntegerField()
    y1 = models.IntegerField()
    y2 = models.IntegerField()
    colour = models.CharField(max_length=16, default="blue")
    thick = models.IntegerField()
    text = models.CharField(max_length=256)
    workSpace = models.ForeignKey('WorkSpace', on_delete=models.CASCADE)

    def __str__(self):
        return self.typeOfShape

class UserWorkSpace(models.Model):
    workSpace = models.ForeignKey('WorkSpace', on_delete=models.CASCADE)
    drawUser = models.ForeignKey('DrawUser',on_delete=models.CASCADE)    
    isAdmin = models.BooleanField()
    isActive = models.BooleanField()
    isAllowed = models.BooleanField()

    def __str__(self):
        return self.isAdmin
