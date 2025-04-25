from django.urls import path
from .views import TaskListCreateView, TaskDetailView, TasksByProjectView

urlpatterns = [
    path('', TaskListCreateView.as_view(), name='task-list-create'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('by-project/<int:project_id>/', TasksByProjectView.as_view(), name='tasks-by-project'),
]
