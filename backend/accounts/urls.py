from django.urls import path
from .views import (
    UserCreateView, ProtectedView, UserListView,
    get_me, list_users, UserDetail
)

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('protected/', ProtectedView.as_view(), name='protected'),
    path('users/me/', get_me),
    path('users/admin/', list_users),  # ruta admin separada
    path('users/<int:pk>/', UserDetail.as_view()),
]
