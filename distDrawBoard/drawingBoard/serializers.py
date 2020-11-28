from rest_framework import serializers
from drawingBoard import models
import random, string

class CreateWSSerializer(serializers.ModelSerializer):
    # workSpace = WorkSpaceSerializer()
    name = serializers.CharField(source='drawUser.name')
    userId = serializers.CharField(source='drawUser.userId', read_only = True)
    workSpaceId = serializers.CharField(source='workSpace.workSpaceId', read_only = True)
    workSpaceURL = serializers.CharField(source='workSpace.workSpaceURL', read_only = True)

    class Meta:
        model = models.UserWorkSpace
        fields = ('name', 'userId', 'workSpaceId', 'workSpaceURL')

    def create(self, validated_data):
        randId = ''
        while(True):
            randId = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(64))
            if not models.DrawUser.objects.filter(userId = randId).exists():
                break
        print(validated_data)
        user = models.DrawUser.objects.create(
            name=validated_data['drawUser']['name'],
            userId=randId
        )

        wid = ''
        while(True):
            wid = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(64))
            if not models.WorkSpace.objects.filter(workSpaceId = wid).exists():
                break
        wurl = ''
        while(True):
            wurl = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(64))
            if not models.WorkSpace.objects.filter(workSpaceURL = wurl).exists():
                break
        workSpace_ = models.WorkSpace.objects.create(
            workSpaceId=wid,
            workSpaceURL=wurl
        )

        userWorkSpace = models.UserWorkSpace.objects.create(
            workSpace = workSpace_,
            drawUser = user,
            isAdmin = 0,
            isActive = 0,
            isAllowed = 0
        )
        return userWorkSpace

class JoinWSSerializer(serializers.ModelSerializer):

    name = serializers.CharField(source='drawUser.name')
    workSpaceURL = serializers.CharField(source='workSpace.workSpaceURL')
    userId = serializers.CharField(source='drawUser.userId', read_only = True)
    workSpaceId = serializers.CharField(source='workSpace.workSpaceId', read_only = True)

    class Meta:
        model = models.UserWorkSpace
        fields = ('name', 'workSpaceId', 'userId', 'workSpaceURL')

    def create(self, validated_data):
        randId = ''
        while(True):
            randId = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(64))
            if not models.DrawUser.objects.filter(userId = randId).exists():
                break
        print(validated_data)

        user = models.DrawUser.objects.create(
            name=validated_data['drawUser']['name'],
            userId=randId
        )
        workSpace_ = models.WorkSpace.objects.filter(workSpaceURL = validated_data['workSpace']['workSpaceURL'])[0]
        print(workSpace_)
        userWorkSpace = models.UserWorkSpace.objects.create(
            workSpace = workSpace_,
            drawUser = user,
            isAdmin = 0,
            isActive = 0,
            isAllowed = 0
        )
        return userWorkSpace

class UpdateWSSerializer(serializers.ModelSerializer):

    workSpaceId = serializers.CharField(source='workSpace.workSpaceId', read_only = True)
    class Meta:
        model = models.Shape
        fields = ('id', 'typeOfShape', 'x1', 'x2', 'y1', 'y2', 'colour', 'thick', 'text','workSpaceId')
    # def create(self, validated_data):
        