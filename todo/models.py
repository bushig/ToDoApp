from django.db import models

class Task(models.Model):
    text = models.CharField(max_length=500)
    is_complete = models.BooleanField(default=False)
