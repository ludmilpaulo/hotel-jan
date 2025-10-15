from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        GUEST = "GUEST"
        STAFF = "STAFF"
        MANAGER = "MANAGER"
        ADMIN = "ADMIN"
    
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.GUEST)
    reset_token = models.CharField(max_length=32, blank=True, null=True)
    reset_token_expires = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
