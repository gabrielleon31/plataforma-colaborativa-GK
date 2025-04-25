from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Archivo
from .serializers import ArchivoSerializer

class ArchivoListCreateView(generics.ListCreateAPIView):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer
    permission_classes = [permissions.IsAuthenticated]


class ArchivoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer
    permission_classes = [permissions.IsAuthenticated]
