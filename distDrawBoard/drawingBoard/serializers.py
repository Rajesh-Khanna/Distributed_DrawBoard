from rest_framework import serializers
from drawingBoard import models
import random, string

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DrawUser
        fields = ('name', 'userId')
        read_only_fields = ('userId', )

    def create(self, validated_data):
        print('create: ', validated_data)
        randId = ''
        while(True):
            randId = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(64))
            if not models.DrawUser.objects.filter(userId = randId).exists():
                break
        user = models.DrawUser.objects.create(
            name=validated_data['name'],
            userId=randId
        )
        return user