from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    # Si se requiere, se puede mostrar información adicional del usuario gestor
    manager = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'date_start', 'date_end', 'status', 'manager', 'created_at', 'updated_at']
