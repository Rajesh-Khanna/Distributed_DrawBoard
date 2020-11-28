from django.shortcuts import render
from drawingBoard import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

# Create your views here.
class CreateWorkSpace(APIView):

    def post(self, request, format=None):
        print('-------------->',request,'<-------------------')
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UpdateDrawBoard(generics.ListAPIView):
#     serializer_class = PurchaseSerializer

#     def get_queryset(self):
#         lastId = self.request.lastEntitiyId
#         return Shape.objects.filter(id__gte=lastId, workSpaceId__WorkSpaceId = )
