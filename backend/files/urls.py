from django.urls import path
from .views import ArchivoListCreateView, ArchivoDetailView

urlpatterns = [
    path('', ArchivoListCreateView.as_view(), name='archivo-list-create'),
    path('<int:pk>/', ArchivoDetailView.as_view(), name='archivo-detail'),
]
