from rest_framework import serializers
from .models import Booking
from rooms.models import Room
from datetime import date
from .utils import calculate_booking_total

class BookingSerializer(serializers.ModelSerializer):
    room_name = serializers.CharField(source='room.name', read_only=True)
    room_type = serializers.CharField(source='room.room_type', read_only=True)
    nights = serializers.IntegerField(read_only=True)
    is_upcoming = serializers.BooleanField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'booking_number', 'room', 'room_name', 'room_type',
            'name', 'email', 'phone', 'guests', 
            'check_in', 'check_out', 'nights',
            'status', 'payment_status', 'total_price',
            'special_requests', 'created_at', 'updated_at',
            'is_upcoming', 'is_active',
            'confirmation_email_sent', 'invoice_generated'
        ]
        read_only_fields = ['booking_number', 'total_price', 'created_at', 'updated_at']

    def validate(self, data):
        room = data.get("room")
        check_in = data.get("check_in")
        check_out = data.get("check_out")
        guests = data.get("guests", 1)
        
        # Validate check-in date is not in the past
        if check_in < date.today():
            raise serializers.ValidationError(
                {"check_in": "Não é possível reservar no passado."}
            )

        # Validate check-in is before check-out
        if check_in >= check_out:
            raise serializers.ValidationError(
                {"check_out": "A data de saída deve ser depois da entrada."}
            )
        
        # Validate minimum stay (1 night)
        nights = (check_out - check_in).days
        if nights < 1:
            raise serializers.ValidationError(
                {"check_out": "Estadia mínima de 1 noite."}
            )
        
        # Validate guests count
        if guests < 1 or guests > 6:
            raise serializers.ValidationError(
                {"guests": "Número de hóspedes deve ser entre 1 e 6."}
            )

        # Check for overlapping bookings (exclude cancelled ones)
        overlapping = Booking.objects.filter(
            room=room,
            check_in__lt=check_out,
            check_out__gt=check_in
        ).exclude(status='cancelled')
        
        # If updating, exclude current booking
        if self.instance:
            overlapping = overlapping.exclude(id=self.instance.id)

        if overlapping.exists():
            reserved_ranges = [
                {
                    "check_in": str(b.check_in),
                    "check_out": str(b.check_out),
                    "booking_number": b.booking_number
                }
                for b in overlapping
            ]
            raise serializers.ValidationError({
                "error": "Esse quarto já está reservado nesse período.",
                "reserved": reserved_ranges,
                "message": "Por favor, escolha outras datas disponíveis."
            })

        return data
    
    def create(self, validated_data):
        # Calculate total price
        room = validated_data['room']
        check_in = validated_data['check_in']
        check_out = validated_data['check_out']
        total_price = calculate_booking_total(room, check_in, check_out)
        validated_data['total_price'] = total_price
        validated_data['status'] = 'confirmed'
        
        return super().create(validated_data)


class BookingListSerializer(serializers.ModelSerializer):
    """Simplified serializer for listing bookings"""
    room_name = serializers.CharField(source='room.name', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'booking_number', 'room_name', 'name', 'check_in', 'check_out', 'status', 'total_price']
