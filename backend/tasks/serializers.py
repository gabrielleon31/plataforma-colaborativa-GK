from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Task

User = get_user_model()

class TaskSerializer(serializers.ModelSerializer):
    assigned_users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)
    assigned_usernames = serializers.SerializerMethodField()

    def get_assigned_usernames(self, obj):
        return [user.username for user in obj.assigned_users.all()]

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'due_date',
            'state',
            'priority',
            'project',
            'assigned_users',
            'assigned_usernames',
            'created_at',
            'updated_at'
        ]
