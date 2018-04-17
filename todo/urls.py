from django.urls import path

from .api.views import TaskViewSet
urlpatterns = [
    path('', TaskViewSet.as_view({'get': 'list', 'post': 'create', 'update': 'update'})),
    path('<int:pk>/', TaskViewSet.as_view({'delete':'destroy'}))
]