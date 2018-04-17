from rest_framework import viewsets

from ..models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
       A viewset for viewing and editing task instances.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
