from django.urls import path
from .views import ProjectListCreateView, ProjectDetailView, ProjectListView

urlpatterns = [
    path('', ProjectListCreateView.as_view(), name='project-list-create'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('', ProjectListView.as_view(), name='project-list'),
]
