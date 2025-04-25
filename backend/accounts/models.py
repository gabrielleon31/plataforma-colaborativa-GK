from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Administrador'),
        ('gestor', 'Gestor'),
        ('colaborador', 'Colaborador'),
    )
    rol = models.CharField(max_length=20, choices=ROLE_CHOICES, default='colaborador')

    def __str__(self):
        return self.username
