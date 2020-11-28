from rest_framework import serializers
from drawingBoard import models
import random, string
# from rest_framework_mongoengine.serializers import DocumentSerializer

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
    # userCount = models.UserWorkSpace.objects.filter(workSpaceId =  workSpace.workSpaceId).count()
    userCount = serializers.SerializerMethodField()
    class Meta:
        model = models.Shape
        fields = ('id', 'typeOfShape', 'x1', 'x2', 'y1', 'y2', 'colour', 'thick', 'text','workSpaceId', 'userCount')

    def get_userCount(self,obj):
        return  models.UserWorkSpace.objects.filter(workSpace__workSpaceId = obj.workSpace.workSpaceId).count()

class UsersOnBoardSerializer(serializers.ModelSerializer):
    drawUserName = serializers.CharField(source='drawUser.name', read_only = True)
    class Meta:
        model = models.UserWorkSpace
        fields = ('drawUserName','isAdmin','isActive','isAllowed')

    # def create(self, validated_data):
        
# class DrawOnBoardSerializer(serializers.ModelSerializer):
    
#     workSpaceId = serializers.CharField(source='workSpace.workSpaceId', read_only = True)
#     class Meta:
#         model = models.Shape
#         fields = ('typeOfShape', 'x1', 'x2', 'y1', 'y2', 'colour', 'thick', 'text','workSpaceId')
    
#     # def create(self, validated_data):
#     #     print(validated_data)
#     #     shapes = models.UserWorkSpace.objects.bulk_create(validated_data["listOfShapes"])
#     #     return shapes

class DrawOnBoardSerializer(serializers.ModelSerializer):
    
    workSpaceId = serializers.CharField(source='workSpace.workSpaceId', read_only=False)
    class Meta:
        model = models.Shape
        fields = ('typeOfShape', 'x1', 'x2', 'y1', 'y2', 'colour', 'thick', 'text', 'workSpaceId')
    
    def create(self, validated_data):
        print("create")
        print(validated_data)
        workSpace_ = models.WorkSpace.objects.filter(workSpaceId = validated_data['workSpace']['workSpaceId'])[0]
        print(workSpace_)
        shape_ = models.Shape.objects.create(
            typeOfShape = validated_data['typeOfShape'], 
            x1 = validated_data['x1'], 
            x2 = validated_data['x2'], 
            y1 = validated_data['y1'], 
            y2 = validated_data['y2'], 
            colour = validated_data['colour'], 
            thick = validated_data['thick'], 
            text = validated_data['text'],
            workSpace = workSpace_
        )
        return shape_

# class DrawOnBoardSerializer(DocumentSerializer):
#     class Meta:
#         model = models.Shape
#         fields = ('id', 'typeOfShape', 'x1', 'x2', 'y1', 'y2', 'colour', 'thick', 'text','workSpaceId')
