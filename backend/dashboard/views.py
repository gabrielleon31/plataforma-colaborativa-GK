from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from tasks.models import Task

class TaskStatsView(APIView):
    """
    Retorna estadísticas básicas sobre las tareas.
    """
    def get(self, request):
        total_tasks = Task.objects.count()
        pending = Task.objects.filter(state='pendiente').count()
        in_progress = Task.objects.filter(state='en_progreso').count()
        completed = Task.objects.filter(state='completada').count()
        
        data = {
            'total_tasks': total_tasks,
            'pending': pending,
            'in_progress': in_progress,
            'completed': completed,
        }
        return Response(data)

