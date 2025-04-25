from django.http import JsonResponse

def home(request):
    return JsonResponse({"mensaje": "Bienvenido a la API de Plataforma Colaborativa"})
