from rest_framework import serializers
from .models import Archivo

class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = ['id', 'name', 'file', 'project', 'task', 'uploaded_at']
