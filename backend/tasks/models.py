from django.db import models
from django.conf import settings
from projects.models import Project  # Asegúrate de que el modelo Project esté definido y accesible

class Task(models.Model):
    STATE_CHOICES = (
        ('pendiente', 'Pendiente'),
        ('en_progreso', 'En progreso'),
        ('completada', 'Completada'),
    )

    PRIORITY_CHOICES = (
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('alta', 'Alta'),
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateField()
    state = models.CharField(max_length=20, choices=STATE_CHOICES, default='pendiente')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='media')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    # Permite asignar uno o más usuarios a la tarea
    assigned_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='assigned_tasks', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
