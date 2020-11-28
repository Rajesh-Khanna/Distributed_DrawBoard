from django.shortcuts import render
from drawingBoard import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from drawingBoard import models

# Create your views here.
class CreateWorkSpace(APIView):

    def post(self, request, format=None):
        print('-------------->',request,'<-------------------')
        serializer = serializers.CreateWSSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JoinWorkSpace(APIView):

    def post(self, request, format=None):
        print('-------------->',request,'<-------------------')
        serializer = serializers.JoinWSSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateDrawBoard(generics.ListAPIView):

    serializer_class = serializers.UpdateWSSerializer
    model = serializer_class.Meta.model

    def get_queryset(self):
        print("Request Data:")
        print(self.request.data)
        lastId = self.request.data['lastEntityId']
        workSpaceId = self.request.data['workSpaceId']
        a = self.model.objects.filter(id__gte=lastId, workSpace__workSpaceId = workSpaceId)
        print(a)
        return self.model.objects.filter(id__gte=lastId, workSpace__workSpaceId = workSpaceId)
        

