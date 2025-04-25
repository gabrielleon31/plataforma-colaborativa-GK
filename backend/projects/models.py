from django.db import models
from django.conf import settings  # Para referenciar el modelo de usuario configurado

class Project(models.Model):
    STATUS_CHOICES = (
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('finalizado', 'Finalizado'),
    )
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date_start = models.DateField()
    date_end = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='activo')
    
    # Se puede relacionar el proyecto con el usuario gestor (o el creador)
    manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='projects'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
