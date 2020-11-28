from django.shortcuts import render
from drawingBoard import serializers
from rest_framework.views import APIView
# from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from drawingBoard import models
# from django.core.exceptions import ValidationError

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
        lastId = self.request.query_params.get('lastEntityId', None)
        workSpaceId = self.request.query_params.get('workSpaceId', None)
        return self.model.objects.filter(id__gt=lastId, workSpace__workSpaceId = workSpaceId)
        
# class DrawOnBoard(ModelViewSet):

#     # Call UpdateDrawBoard function here?
#     queryset = models.Shape.objects.all()
#     serializer_class = serializers.DrawOnBoardSerializer

#     def update(self, request):
#         print("Request :")
#         print(request)
#         data = request.data.get("listOfShapes")
#         print(data)
#         serializer = self.get_serializer(data = data)
#         self.perform_create(serializer)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
        # shapes = models.UserWorkSpace.objects.bulk_create(validated_data["listOfShapes"])
        # return shapes

    # def perform_create(self, serializer):
    #     print(self.request.data)
    #     """Save the post data when creating a new movie."""
    #     serializer.save()

    # def post(self, request, format=None):
    #     print('-------------->',request,'<-------------------')
    #     serializer = serializers.DrawOnBoardSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DrawListOnBoard(APIView):

    def post(self, request, format=None):
        print('-------------->',request,'<-------------------')
        data = request.data
        shapes_ = data["listOfShapes"]
        for shape_ in shapes_:
            serializer = serializers.DrawOnBoardSerializer(data=shape_)
            if serializer.is_valid():
                serializer.save()
            print(shape_)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DrawOnBoard(APIView):

    def post(self, request, format=None):
        print('-------------->',request,'<-------------------')
        print(request.data)
        serializer = serializers.DrawOnBoardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)