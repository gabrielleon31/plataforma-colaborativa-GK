from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated



# Vista para listar y crear proyectos
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Asigna el usuario autenticado como gestor del proyecto
        serializer.save(manager=self.request.user)

# Vista para obtener, actualizar o eliminar un proyecto
class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProjectListView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
