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
    image = models.URLField(blank=True, null=True)  # Keep for backward compatibility

    def __str__(self):
        return self.name

class RoomImage(models.Model):
    room = models.ForeignKey(Room, related_name='images', on_delete=models.CASCADE)
    image_url = models.URLField()
    alt_text = models.CharField(max_length=200, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.room.name} - Image {self.order}"
