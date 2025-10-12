"""
Utility functions for booking management
"""
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from io import BytesIO
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from datetime import datetime


def send_booking_confirmation_email(booking):
    """
    Send booking confirmation email to guest
    """
    subject = f'Confirmação de Reserva - Hotel Jan #{booking.booking_number}'
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = booking.email
    
    # Context for email template
    context = {
        'booking': booking,
        'hotel_name': 'Hotel Jan',
        'hotel_address': 'Rua Hotel Jan Camama, Talatona, Belas, Angola',
        'hotel_phone': '+244 914 260 030',
        'hotel_email': 'reservas@hoteljan.co.ao',
    }
    
    # Render HTML email
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #EAB308 0%, #CA8A04 100%); 
                       color: black; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
            .booking-details {{ background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }}
            .detail-row {{ display: flex; justify-content: space-between; padding: 10px 0; 
                          border-bottom: 1px solid #eee; }}
            .detail-label {{ font-weight: bold; color: #666; }}
            .detail-value {{ color: #333; }}
            .total {{ background: #EAB308; color: black; padding: 15px; border-radius: 8px; 
                     font-size: 18px; font-weight: bold; text-align: center; margin: 20px 0; }}
            .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; }}
            .button {{ background: #EAB308; color: black; padding: 12px 30px; 
                      text-decoration: none; border-radius: 8px; display: inline-block; 
                      font-weight: bold; margin: 20px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✅ Reserva Confirmada!</h1>
                <p style="margin: 0;">Número da Reserva: <strong>{booking.booking_number}</strong></p>
            </div>
            
            <div class="content">
                <p>Olá <strong>{booking.name}</strong>,</p>
                <p>Obrigado por escolher o Hotel Jan! Sua reserva foi confirmada com sucesso.</p>
                
                <div class="booking-details">
                    <h3 style="margin-top: 0; color: #EAB308;">Detalhes da Reserva</h3>
                    
                    <div class="detail-row">
                        <span class="detail-label">Número da Reserva:</span>
                        <span class="detail-value">{booking.booking_number}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Quarto:</span>
                        <span class="detail-value">{booking.room.name}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Check-in:</span>
                        <span class="detail-value">{booking.check_in.strftime('%d/%m/%Y')} às 14:00</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Check-out:</span>
                        <span class="detail-value">{booking.check_out.strftime('%d/%m/%Y')} até 12:00</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Noites:</span>
                        <span class="detail-value">{booking.nights}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Hóspedes:</span>
                        <span class="detail-value">{booking.guests}</span>
                    </div>
                    
                    {f'<div class="detail-row"><span class="detail-label">Pedidos Especiais:</span><span class="detail-value">{booking.special_requests}</span></div>' if booking.special_requests else ''}
                </div>
                
                <div class="total">
                    Total: Kz {booking.total_price:,.2f}
                </div>
                
                <h3 style="color: #EAB308;">O Que Esperar</h3>
                <ul>
                    <li>Check-in a partir das 14:00 no dia {booking.check_in.strftime('%d/%m/%Y')}</li>
                    <li>Check-out até às 12:00 no dia {booking.check_out.strftime('%d/%m/%Y')}</li>
                    <li>Wi-Fi gratuito em todo o hotel</li>
                    <li>Pequeno-almoço incluído (7:00 - 10:00)</li>
                    <li>Estacionamento privado gratuito</li>
                </ul>
                
                <h3 style="color: #EAB308;">Precisa de Ajuda?</h3>
                <p>Nossa equipe está disponível 24/7:</p>
                <p>
                    📞 Telefone: {context['hotel_phone']}<br>
                    📧 Email: {context['hotel_email']}<br>
                    📍 Endereço: {context['hotel_address']}
                </p>
                
                <p style="margin-top: 30px;">Aguardamos ansiosamente sua chegada!</p>
                <p><strong>Equipe Hotel Jan</strong></p>
            </div>
            
            <div class="footer">
                <p>Hotel Jan - Talatona, Belas, Angola</p>
                <p>Este é um email automático, por favor não responda.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Create email
    email = EmailMultiAlternatives(subject, '', from_email, [to_email])
    email.attach_alternative(html_content, "text/html")
    
    try:
        email.send()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


def generate_invoice_pdf(booking):
    """
    Generate PDF invoice for booking
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                           rightMargin=72, leftMargin=72,
                           topMargin=72, bottomMargin=18)
    
    # Container for the 'Flowable' objects
    elements = []
    
    # Define styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#EAB308'),
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#CA8A04'),
        spaceAfter=12,
    )
    
    # Hotel Header
    elements.append(Paragraph("HOTEL JAN", title_style))
    elements.append(Paragraph("Talatona, Belas, Angola", styles['Normal']))
    elements.append(Paragraph("Tel: +244 914 260 030", styles['Normal']))
    elements.append(Paragraph("Email: reservas@hoteljan.co.ao", styles['Normal']))
    elements.append(Spacer(1, 0.3*inch))
    
    # Invoice Title
    elements.append(Paragraph(f"FATURA / INVOICE", heading_style))
    elements.append(Paragraph(f"Nº: {booking.booking_number}", styles['Normal']))
    elements.append(Paragraph(f"Data: {datetime.now().strftime('%d/%m/%Y')}", styles['Normal']))
    elements.append(Spacer(1, 0.3*inch))
    
    # Guest Information
    elements.append(Paragraph("DADOS DO HÓSPEDE / GUEST INFORMATION", heading_style))
    guest_data = [
        ['Nome / Name:', booking.name],
        ['Email:', booking.email],
        ['Telefone / Phone:', booking.phone],
    ]
    guest_table = Table(guest_data, colWidths=[2*inch, 4*inch])
    guest_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(guest_table)
    elements.append(Spacer(1, 0.3*inch))
    
    # Booking Details
    elements.append(Paragraph("DETALHES DA RESERVA / BOOKING DETAILS", heading_style))
    booking_data = [
        ['Descrição / Description', 'Quantidade / Qty', 'Preço / Price', 'Total'],
        [booking.room.name, '', '', ''],
        [f'Check-in: {booking.check_in.strftime("%d/%m/%Y")}', '', '', ''],
        [f'Check-out: {booking.check_out.strftime("%d/%m/%Y")}', '', '', ''],
        [f'{booking.nights} noites / nights', f'{booking.nights}', f'Kz {float(booking.room.price_per_night):,.2f}', f'Kz {booking.total_price:,.2f}'],
        ['', '', 'Subtotal:', f'Kz {booking.total_price:,.2f}'],
        ['', '', 'Impostos (Incluídos):', 'Kz 0.00'],
        ['', '', 'TOTAL:', f'Kz {booking.total_price:,.2f}'],
    ]
    
    booking_table = Table(booking_data, colWidths=[2.5*inch, 1*inch, 1.5*inch, 1.5*inch])
    booking_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#EAB308')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
        ('ALIGN', (1, 0), (-1, -1), 'RIGHT'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('GRID', (0, 0), (-1, -4), 1, colors.grey),
        ('LINEBELOW', (2, -3), (-1, -3), 1, colors.grey),
        ('LINEBELOW', (2, -2), (-1, -2), 1, colors.grey),
        ('LINEABOVE', (2, -1), (-1, -1), 2, colors.black),
        ('FONTNAME', (2, -1), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (2, -1), (-1, -1), 12),
        ('BACKGROUND', (2, -1), (-1, -1), colors.HexColor('#FEF3C7')),
    ]))
    elements.append(booking_table)
    elements.append(Spacer(1, 0.5*inch))
    
    # Payment Information
    elements.append(Paragraph("INFORMAÇÕES DE PAGAMENTO / PAYMENT INFORMATION", heading_style))
    elements.append(Paragraph(f"Status: {booking.get_payment_status_display()}", styles['Normal']))
    elements.append(Spacer(1, 0.3*inch))
    
    # Terms and Conditions
    elements.append(Paragraph("TERMOS E CONDIÇÕES / TERMS & CONDITIONS", heading_style))
    terms = """
    - Check-in: 14:00 | Check-out: 12:00<br/>
    - Cancelamento gratuito até 48h antes / Free cancellation up to 48h before<br/>
    - Pequeno-almoço incluído / Breakfast included<br/>
    - Wi-Fi gratuito / Free Wi-Fi<br/>
    """
    elements.append(Paragraph(terms, styles['Normal']))
    elements.append(Spacer(1, 0.5*inch))
    
    # Footer
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=8,
        textColor=colors.grey,
        alignment=TA_CENTER
    )
    elements.append(Paragraph("Obrigado por escolher o Hotel Jan! / Thank you for choosing Hotel Jan!", footer_style))
    elements.append(Paragraph("www.hoteljan.co.ao", footer_style))
    
    # Build PDF
    doc.build(elements)
    
    # Get the value of the BytesIO buffer
    pdf = buffer.getvalue()
    buffer.close()
    
    return pdf


def calculate_booking_total(room, check_in, check_out):
    """
    Calculate total price for booking
    """
    nights = (check_out - check_in).days
    total = nights * float(room.price_per_night)
    return total

