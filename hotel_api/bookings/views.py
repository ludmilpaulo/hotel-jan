from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from django.db.models import Q
from datetime import datetime, timedelta, date
from .models import Booking
from .serializers import BookingSerializer, BookingListSerializer
from .utils import send_booking_confirmation_email, generate_invoice_pdf
from rooms.models import Room


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().select_related('room')
    serializer_class = BookingSerializer
    
    def get_serializer_class(self):
        if self.action == 'list':
            return BookingListSerializer
        return BookingSerializer
    
    def perform_create(self, serializer):
        """Create booking and send confirmation email"""
        booking = serializer.save()
        
        # Send confirmation email
        try:
            email_sent = send_booking_confirmation_email(booking)
            if email_sent:
                booking.confirmation_email_sent = True
                booking.save()
        except Exception as e:
            print(f"Error sending confirmation email: {e}")
        
        return booking
    
    @action(detail=True, methods=['get'])
    def invoice(self, request, pk=None):
        """Generate and download invoice PDF"""
        booking = self.get_object()
        
        try:
            pdf = generate_invoice_pdf(booking)
            
            # Mark invoice as generated
            if not booking.invoice_generated:
                booking.invoice_generated = True
                booking.save()
            
            response = HttpResponse(pdf, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="invoice_{booking.booking_number}.pdf"'
            return response
        except Exception as e:
            return Response(
                {'error': f'Error generating invoice: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'])
    def resend_confirmation(self, request, pk=None):
        """Resend confirmation email"""
        booking = self.get_object()
        
        try:
            email_sent = send_booking_confirmation_email(booking)
            if email_sent:
                return Response({'message': 'Email de confirmação reenviado com sucesso!'})
            else:
                return Response(
                    {'error': 'Erro ao enviar email'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel a booking"""
        booking = self.get_object()
        
        if booking.status == 'cancelled':
            return Response({'error': 'Reserva já está cancelada'}, status=status.HTTP_400_BAD_REQUEST)
        
        booking.status = 'cancelled'
        booking.save()
        
        return Response({'message': 'Reserva cancelada com sucesso!'})
    
    @action(detail=False, methods=['get'])
    def my_bookings(self, request):
        """Get bookings by email"""
        email = request.query_params.get('email')
        if not email:
            return Response({'error': 'Email parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        bookings = Booking.objects.filter(email=email).select_related('room')
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get all upcoming bookings"""
        today = date.today()
        bookings = Booking.objects.filter(
            check_in__gte=today,
            status='confirmed'
        ).select_related('room')
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def room_availability(self, request):
        """
        Get room-specific availability
        Query params: room_id, start_date (optional), end_date (optional)
        """
        room_id = request.query_params.get('room_id')
        
        if not room_id:
            return Response({'error': 'room_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            room = Room.objects.get(id=room_id)
        except Room.DoesNotExist:
            return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Get date range (default: next 90 days)
        start_date_str = request.query_params.get('start_date')
        end_date_str = request.query_params.get('end_date')
        
        if start_date_str:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        else:
            start_date = date.today()
        
        if end_date_str:
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
        else:
            end_date = start_date + timedelta(days=90)
        
        # Get all bookings for this room in the date range
        bookings = Booking.objects.filter(
            room=room,
            check_out__gt=start_date,
            check_in__lt=end_date,
            status__in=['confirmed', 'pending']
        ).values('check_in', 'check_out', 'booking_number')
        
        # Get all unavailable dates
        unavailable_dates = []
        for booking in bookings:
            current_date = booking['check_in']
            while current_date < booking['check_out']:
                unavailable_dates.append(str(current_date))
                current_date += timedelta(days=1)
        
        return Response({
            'room_id': room.id,
            'room_name': room.name,
            'start_date': str(start_date),
            'end_date': str(end_date),
            'unavailable_dates': unavailable_dates,
            'bookings': list(bookings),
            'total_unavailable_days': len(set(unavailable_dates))
        })
