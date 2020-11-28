from django.db import models

# Create your models here.
class DrawUser(models.Model):
    name = models.CharField(max_length=32,default='user')
    userId = models.CharField(max_length=64)

    def __str__(self):
        return self.name

class WorkSpace(models.Model):
    WorkSpaceId = models.CharField(max_length=64, primary_key=True)
    WorkSpaceURL = models.CharField(max_length=64)

    def __str__(self):
        return self.WorkSpaceId

class Shape(models.Model):
    typeOfShape = models.CharField(max_length=8)
    x1 = models.IntegerField()
    x2 = models.IntegerField()
    y1 = models.IntegerField()
    y2 = models.IntegerField()
    radius = models.IntegerField()
    text = models.CharField(max_length=256)
    WorkSpace = models.ForeignKey('WorkSpace', on_delete=models.CASCADE)

    def __str__(self):
        return self.typeOfShape

class userWorkSpace(models.Model):
    WorkSpace = models.ForeignKey('WorkSpace', on_delete=models.CASCADE)
    drawUser = models.ForeignKey('DrawUser',on_delete=models.CASCADE)    
    isAdmin = models.BooleanField()
    isActive = models.BooleanField()
    isAllowed = models.BooleanField()

    def __str__(self):
        return self.isAdmin
