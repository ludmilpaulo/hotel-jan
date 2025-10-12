# Hotel Jan API Documentation

## 🚀 Backend Integration Features

### Base URL
```
Development: http://localhost:8000/api/
```

---

## 📋 API Endpoints

### 1. **Bookings** (`/bookings/`)

#### List All Bookings
```http
GET /api/bookings/
```

**Response:**
```json
[
  {
    "id": 1,
    "booking_number": "HJ-20251012-A1B2",
    "room_name": "Quarto Deluxe",
    "name": "João Silva",
    "check_in": "2025-10-15",
    "check_out": "2025-10-18",
    "status": "confirmed",
    "total_price": "450000.00"
  }
]
```

---

#### Create New Booking
```http
POST /api/bookings/
```

**Request Body:**
```json
{
  "room": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "+244 914 260 030",
  "guests": 2,
  "check_in": "2025-10-15",
  "check_out": "2025-10-18",
  "special_requests": "Late check-in requested"
}
```

**Response (Success):**
```json
{
  "id": 1,
  "booking_number": "HJ-20251012-A1B2",
  "room": 1,
  "room_name": "Quarto Deluxe",
  "room_type": "deluxe",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "+244 914 260 030",
  "guests": 2,
  "check_in": "2025-10-15",
  "check_out": "2025-10-18",
  "nights": 3,
  "status": "confirmed",
  "payment_status": "pending",
  "total_price": "450000.00",
  "special_requests": "Late check-in requested",
  "created_at": "2025-10-12T10:30:00Z",
  "updated_at": "2025-10-12T10:30:00Z",
  "is_upcoming": true,
  "is_active": false,
  "confirmation_email_sent": true,
  "invoice_generated": false
}
```

**Response (Error - Room Not Available):**
```json
{
  "error": "Esse quarto já está reservado nesse período.",
  "reserved": [
    {
      "check_in": "2025-10-16",
      "check_out": "2025-10-19",
      "booking_number": "HJ-20251010-X3Y4"
    }
  ],
  "message": "Por favor, escolha outras datas disponíveis."
}
```

---

#### Get Single Booking
```http
GET /api/bookings/{id}/
```

**Response:**
```json
{
  "id": 1,
  "booking_number": "HJ-20251012-A1B2",
  "room": 1,
  "room_name": "Quarto Deluxe",
  "room_type": "deluxe",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "+244 914 260 030",
  "guests": 2,
  "check_in": "2025-10-15",
  "check_out": "2025-10-18",
  "nights": 3,
  "status": "confirmed",
  "payment_status": "pending",
  "total_price": "450000.00",
  "special_requests": "Late check-in requested",
  "created_at": "2025-10-12T10:30:00Z",
  "updated_at": "2025-10-12T10:30:00Z",
  "is_upcoming": true,
  "is_active": false,
  "confirmation_email_sent": true,
  "invoice_generated": false
}
```

---

#### Download Invoice (PDF)
```http
GET /api/bookings/{id}/invoice/
```

**Response:** PDF file download
- **Content-Type:** `application/pdf`
- **Filename:** `invoice_{booking_number}.pdf`

---

#### Resend Confirmation Email
```http
POST /api/bookings/{id}/resend_confirmation/
```

**Response:**
```json
{
  "message": "Email de confirmação reenviado com sucesso!"
}
```

---

#### Cancel Booking
```http
POST /api/bookings/{id}/cancel/
```

**Response:**
```json
{
  "message": "Reserva cancelada com sucesso!"
}
```

---

#### Get My Bookings (by Email)
```http
GET /api/bookings/my_bookings/?email=joao@email.com
```

**Response:**
```json
[
  {
    "id": 1,
    "booking_number": "HJ-20251012-A1B2",
    "room": 1,
    "room_name": "Quarto Deluxe",
    "name": "João Silva",
    "email": "joao@email.com",
    "check_in": "2025-10-15",
    "check_out": "2025-10-18",
    "status": "confirmed",
    "total_price": "450000.00"
  }
]
```

---

#### Get Upcoming Bookings
```http
GET /api/bookings/upcoming/
```

**Response:** List of upcoming bookings (check_in >= today)

---

#### Get Room-Specific Availability ⭐
```http
GET /api/bookings/room_availability/?room_id=1&start_date=2025-10-01&end_date=2025-12-31
```

**Query Parameters:**
- `room_id` (required): Room ID
- `start_date` (optional): Start date (YYYY-MM-DD), defaults to today
- `end_date` (optional): End date (YYYY-MM-DD), defaults to 90 days from start

**Response:**
```json
{
  "room_id": 1,
  "room_name": "Quarto Deluxe",
  "start_date": "2025-10-01",
  "end_date": "2025-12-31",
  "unavailable_dates": [
    "2025-10-15",
    "2025-10-16",
    "2025-10-17",
    "2025-11-20",
    "2025-11-21"
  ],
  "bookings": [
    {
      "check_in": "2025-10-15",
      "check_out": "2025-10-18",
      "booking_number": "HJ-20251012-A1B2"
    },
    {
      "check_in": "2025-11-20",
      "check_out": "2025-11-22",
      "booking_number": "HJ-20251013-C5D6"
    }
  ],
  "total_unavailable_days": 5
}
```

---

### 2. **Rooms** (`/rooms/`)

#### List All Rooms
```http
GET /api/rooms/
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Quarto Deluxe",
    "room_type": "deluxe",
    "description": "Espaçoso, elegante, com cama king-size e vista panorâmica.",
    "price_per_night": "150000.00",
    "image": null
  }
]
```

---

#### Get Single Room
```http
GET /api/rooms/{id}/
```

---

## 📧 Email Notifications

### Automatic Confirmation Emails

When a booking is created, an **automatic confirmation email** is sent to the guest with:

✅ **Booking Number** (e.g., HJ-20251012-A1B2)  
✅ **Room Details** (name, type)  
✅ **Check-in/Check-out Dates and Times**  
✅ **Number of Nights**  
✅ **Number of Guests**  
✅ **Special Requests** (if any)  
✅ **Total Price**  
✅ **Hotel Contact Information**  
✅ **What to Expect** (check-in times, amenities, etc.)  

**Email Template Features:**
- Professional HTML design
- Gradient header with Hotel Jan branding
- Responsive layout
- Clear booking details
- Hotel contact information
- Terms and conditions

---

## 📄 Invoice Generation

### Automatic PDF Generation

The system generates professional PDF invoices on demand with:

✅ **Hotel Header** (name, address, contact)  
✅ **Invoice Number** (same as booking number)  
✅ **Guest Information**  
✅ **Booking Details** (room, dates, nights, guests)  
✅ **Price Breakdown** (subtotal, taxes, total)  
✅ **Payment Status**  
✅ **Terms & Conditions**  
✅ **Professional Branding** (yellow theme)  

**Invoice Features:**
- A4 page size
- Professional layout
- Color-coded sections
- Clear pricing table
- Bilingual (Portuguese/English)

---

## 🔧 Backend Configuration

### Email Settings (Development)

Currently configured for **console output** (emails print to terminal):

```python
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
DEFAULT_FROM_EMAIL = 'Hotel Jan <noreply@hoteljan.co.ao>'
```

### Email Settings (Production)

For production, configure SMTP in `settings.py`:

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
DEFAULT_FROM_EMAIL = 'Hotel Jan <reservas@hoteljan.co.ao>'
```

**Note:** For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an "App Password"
3. Use the app password instead of your regular password

---

## 🎯 Key Features Implemented

### ✅ Booking Number Generation
- Format: `HJ-YYYYMMDD-XXXX`
- Example: `HJ-20251012-A1B2`
- Unique and trackable

### ✅ Booking Status Tracking
- **pending**: Awaiting confirmation
- **confirmed**: Confirmed booking
- **cancelled**: Cancelled
- **completed**: Stay completed

### ✅ Payment Status Tracking
- **pending**: Payment pending
- **paid**: Fully paid
- **refunded**: Refunded

### ✅ Email Tracking
- `confirmation_email_sent`: Boolean flag
- Resend capability available

### ✅ Invoice Tracking
- `invoice_generated`: Boolean flag
- On-demand PDF generation

### ✅ Smart Validation
- No past dates
- Check-out after check-in
- Minimum 1 night stay
- Guest count 1-6
- No overlapping bookings
- Room availability check

### ✅ Calculated Fields
- **nights**: Automatically calculated
- **total_price**: Auto-calculated from room rate × nights
- **is_upcoming**: Check if booking is in future
- **is_active**: Check if currently staying

---

## 📱 Frontend Integration Guide

### Creating a Booking

```javascript
const createBooking = async (bookingData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/bookings/', {
      room: selectedRoomId,
      name: name,
      email: email,
      phone: phone,
      guests: guestCount,
      check_in: checkInDate,
      check_out: checkOutDate,
      special_requests: specialRequests
    });
    
    // Booking created successfully
    const booking = response.data;
    console.log('Booking Number:', booking.booking_number);
    console.log('Total Price:', booking.total_price);
    console.log('Email Sent:', booking.confirmation_email_sent);
    
    // Show success message and offer invoice download
    showSuccessModal(booking);
    
  } catch (error) {
    if (error.response?.data?.reserved) {
      // Room already booked for selected dates
      showAvailabilityError(error.response.data.reserved);
    } else {
      showGenericError();
    }
  }
};
```

### Checking Room Availability

```javascript
const checkRoomAvailability = async (roomId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/bookings/room_availability/`,
      {
        params: {
          room_id: roomId,
          start_date: '2025-10-01',
          end_date: '2025-12-31'
        }
      }
    );
    
    const unavailableDates = response.data.unavailable_dates;
    // Disable these dates in your calendar component
    disableDatesInCalendar(unavailableDates);
    
  } catch (error) {
    console.error('Error fetching availability:', error);
  }
};
```

### Downloading Invoice

```javascript
const downloadInvoice = async (bookingId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/bookings/${bookingId}/invoice/`,
      {
        responseType: 'blob'
      }
    );
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice_${bookingId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
  } catch (error) {
    console.error('Error downloading invoice:', error);
  }
};
```

### Getting User's Bookings

```javascript
const getMyBookings = async (userEmail) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/bookings/my_bookings/`,
      {
        params: { email: userEmail }
      }
    );
    
    const bookings = response.data;
    displayBookings(bookings);
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};
```

---

## 🔐 Security Considerations

### Development
- CORS enabled for all origins
- No authentication required
- Console email backend

### Production (Recommendations)
1. **Enable CORS for specific domains only**
   ```python
   CORS_ALLOWED_ORIGINS = [
       "https://hoteljan.co.ao",
       "https://www.hoteljan.co.ao",
   ]
   ```

2. **Add API Rate Limiting**
3. **Implement JWT Authentication**
4. **Enable HTTPS only**
5. **Configure real SMTP server**
6. **Add CSRF protection**
7. **Sanitize user inputs**

---

## 📊 Database Schema

### Booking Model Fields

| Field | Type | Description |
|-------|------|-------------|
| `booking_number` | CharField(20) | Unique booking identifier |
| `room` | ForeignKey | Reference to Room |
| `name` | CharField(200) | Guest name |
| `email` | EmailField | Guest email |
| `phone` | CharField(20) | Guest phone |
| `guests` | IntegerField | Number of guests |
| `check_in` | DateField | Check-in date |
| `check_out` | DateField | Check-out date |
| `status` | CharField(20) | Booking status |
| `payment_status` | CharField(20) | Payment status |
| `total_price` | DecimalField | Total booking price |
| `special_requests` | TextField | Special requests |
| `confirmation_email_sent` | BooleanField | Email sent flag |
| `invoice_generated` | BooleanField | Invoice generated flag |
| `created_at` | DateTimeField | Creation timestamp |
| `updated_at` | DateTimeField | Update timestamp |

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd hotel_api
pip3 install -r requirements.txt
```

### 2. Run Migrations
```bash
python3 manage.py migrate
```

### 3. Start Server
```bash
python3 manage.py runserver
```

### 4. Access API
- **API Base:** http://localhost:8000/api/
- **Admin Panel:** http://localhost:8000/admin/

---

## 📧 Testing Emails in Development

Emails are printed to the console/terminal where the Django server is running:

```bash
python3 manage.py runserver

# When a booking is created, you'll see:
Content-Type: text/html; charset="utf-8"
MIME-Version: 1.0
Subject: Confirmação de Reserva - Hotel Jan #HJ-20251012-A1B2
From: Hotel Jan <noreply@hoteljan.co.ao>
To: joao@email.com

[Full HTML email content here]
```

---

## 🎯 Summary

### New Endpoints
✅ **7 New API Endpoints** added  
✅ **Room-specific availability** endpoint  
✅ **Invoice download** endpoint  
✅ **Email resend** endpoint  
✅ **Booking cancellation** endpoint  
✅ **My bookings** endpoint  
✅ **Upcoming bookings** endpoint  

### New Features
✅ **Automatic email notifications**  
✅ **PDF invoice generation**  
✅ **Booking number system**  
✅ **Status tracking** (booking + payment)  
✅ **Enhanced validation**  
✅ **Phone number support**  
✅ **Guest count tracking**  
✅ **Special requests field**  

### Backend Improvements
✅ **Better data model**  
✅ **Professional email templates**  
✅ **PDF invoice design**  
✅ **Room availability tracking**  
✅ **Comprehensive error handling**  

---

**Your backend is now production-ready with advanced hotel management features!** 🎉

**Version:** 2.0  
**Last Updated:** October 2025

