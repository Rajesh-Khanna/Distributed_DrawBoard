from django.urls import path
from drawingBoard import  views

urlpatterns = [
    path('createWorkSpace/',views.CreateWorkSpace.as_view()),
    path('joinWorkSpace/',views.JoinWorkSpace.as_view()),
    path('updateDrawBoard/',views.UpdateDrawBoard.as_view()),
    # path('drawOnBoard/',views.DrawOnBoard.as_view({'post': 'list'}))
    path('drawOnBoard/',views.DrawOnBoard.as_view()),
    path('usersOnBoard/',views.UsersOnBoard.as_view()),
    path('drawAllOnBoard/',views.DrawListOnBoard.as_view())
]
