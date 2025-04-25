from django.db import models
from projects.models import Project  
from tasks.models import Task     

class Archivo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True, null=True, related_name='archivos')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, blank=True, null=True, related_name='archivos')
    
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='archivos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
