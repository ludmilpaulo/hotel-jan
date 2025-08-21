from django.db import models

class Room(models.Model):
    ROOM_TYPES = [
        ("standard", "Quarto Standard"),
        ("deluxe", "Quarto Deluxe"),
        ("suite", "Suite Presidencial"),
    ]

    name = models.CharField(max_length=100)
    room_type = models.CharField(max_length=20, choices=ROOM_TYPES)
    description = models.TextField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name
