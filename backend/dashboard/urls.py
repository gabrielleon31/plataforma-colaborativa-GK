from django.urls import path
from .views import TaskStatsView

urlpatterns = [
    path('task-stats/', TaskStatsView.as_view(), name='task-stats'),
]
