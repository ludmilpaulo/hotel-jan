# 🚀 Hotel Jan - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Start Backend (Django)
```bash
cd hotel_api
python3 manage.py runserver
```
✅ Server starts at `http://localhost:8000`

### Step 2: Start Frontend (Next.js)
```bash
cd frontend
npm run dev
```
✅ App starts at `http://localhost:3000`

### Step 3: Visit the App
Open: **http://localhost:3000**

---

## 🎯 Quick Test

### Make a Test Booking

1. **Go to:** http://localhost:3000/reservas
2. **Select a room** (click on any room card)
3. **Choose dates** (click calendar)
4. **Fill form:**
   - Name: Test User
   - Email: test@example.com
   - Phone: +244 914 260 030
   - Guests: 2
5. **Click:** "Confirmar Reserva"
6. **See:** Confirmation modal with booking number
7. **Download:** Invoice PDF (click button)

### Check Email (Development)
Look in **Terminal 1** (Django server) - you'll see the HTML email printed!

---

## 📋 What You Get

### 🎨 Frontend Features
✅ **Modern Reservation Page** with room selection  
✅ **Room-Specific Availability** calendar  
✅ **Real-time Price Calculation**  
✅ **Booking Confirmation Modal**  
✅ **PDF Invoice Download**  
✅ **Professional UI/UX**  

### 🔧 Backend Features
✅ **Automatic Email Notifications**  
✅ **PDF Invoice Generation**  
✅ **Room Availability API**  
✅ **Booking Number System** (HJ-YYYYMMDD-XXXX)  
✅ **Status Tracking** (confirmed, cancelled, etc.)  
✅ **Payment Status** (pending, paid, refunded)  

---

## 🔍 Key API Endpoints

### Create Booking
```bash
POST http://localhost:8000/api/bookings/
{
  "room": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "+244 914 260 030",
  "guests": 2,
  "check_in": "2025-10-15",
  "check_out": "2025-10-18"
}
```

### Check Room Availability
```bash
GET http://localhost:8000/api/bookings/room_availability/?room_id=1
```

### Download Invoice
```bash
GET http://localhost:8000/api/bookings/{id}/invoice/
```

---

## 📧 Email Configuration

### Development (Current)
Emails print to console ✅ Already configured!

### Production (Future)
Edit `hotel_api/hotel_api/settings.py`:
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
```

---

## 📚 Full Documentation

| File | Description |
|------|-------------|
| **INTEGRATION_COMPLETE.md** | Complete implementation guide |
| **API_DOCUMENTATION.md** | All API endpoints reference |
| **IMPROVEMENTS.md** | All UI/UX improvements |
| **README_UPDATES.md** | User guide & features |

---

## 🎉 You're Ready!

Your hotel booking system is **fully integrated** with:
- ✅ Email notifications
- ✅ PDF invoices
- ✅ Room availability
- ✅ Professional UI
- ✅ Mobile responsive
- ✅ Production ready

**Start making bookings now!** 🏨✨

---

**Quick Links:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/

