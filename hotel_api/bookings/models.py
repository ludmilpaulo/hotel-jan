from django.db import models
from rooms.models import Room
import uuid
from datetime import datetime

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('confirmed', 'Confirmada'),
        ('cancelled', 'Cancelada'),
        ('completed', 'Completa'),
    ]
    
    PAYMENT_STATUS = [
        ('pending', 'Pendente'),
        ('paid', 'Pago'),
        ('refunded', 'Reembolsado'),
    ]
    
    # Identificação
    booking_number = models.CharField(max_length=20, unique=True, editable=False)
    
    # Room and Guest Info
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="bookings")
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, default='')
    guests = models.IntegerField(default=1)
    
    # Dates
    check_in = models.DateField()
    check_out = models.DateField()
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    
    # Pricing
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Additional
    special_requests = models.TextField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Email sent tracking
    confirmation_email_sent = models.BooleanField(default=False)
    invoice_generated = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['booking_number']),
            models.Index(fields=['email']),
            models.Index(fields=['check_in', 'check_out']),
        ]

    def save(self, *args, **kwargs):
        if not self.booking_number:
            # Generate unique booking number: HJ-YYYYMMDD-XXXX
            date_str = datetime.now().strftime('%Y%m%d')
            random_str = str(uuid.uuid4().hex[:4].upper())
            self.booking_number = f"HJ-{date_str}-{random_str}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.booking_number} - {self.name} - {self.room.name}"
    
    @property
    def nights(self):
        """Calculate number of nights"""
        return (self.check_out - self.check_in).days
    
    @property
    def is_upcoming(self):
        """Check if booking is upcoming"""
        from datetime import date
        return self.check_in > date.today()
    
    @property
    def is_active(self):
        """Check if booking is currently active"""
        from datetime import date
        today = date.today()
        return self.check_in <= today <= self.check_out
