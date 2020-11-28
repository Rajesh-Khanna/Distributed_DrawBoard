from django.urls import path
from drawingBoard import  views

urlpatterns = [
    path('createWorkSpace/',views.CreateWorkSpace.as_view()),
]
