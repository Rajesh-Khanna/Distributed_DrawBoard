from django.urls import path
from drawingBoard import  views

urlpatterns = [
    path('createWorkSpace/',views.CreateWorkSpace.as_view()),
    path('joinWorkSpace/',views.JoinWorkSpace.as_view()),
    path('updateDrawBoard/',views.UpdateDrawBoard.as_view()),
]
