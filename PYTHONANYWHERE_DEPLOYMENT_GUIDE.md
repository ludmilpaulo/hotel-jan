# PythonAnywhere Deployment Guide - Hotel Jan

## 🚀 Production Deployment Steps

### 1. Pull Latest Changes
```bash
cd ~/hotel-jan
git pull origin main
```

### 2. Install/Update Dependencies
```bash
cd ~/hotel-jan/hotel_api
pip install -r requirements.txt
```

### 3. Run Database Migrations
```bash
python manage.py migrate
```

### 4. Collect Static Files
```bash
python manage.py collectstatic --noinput
```

### 5. Create Static Files Directory (if needed)
```bash
mkdir -p ~/hotel-jan/hotel_api/staticfiles
mkdir -p ~/hotel-jan/hotel_api/static
```

### 6. Restart Web App
- Go to PythonAnywhere Dashboard
- Click on your web app
- Click "Reload" button

## 🔧 Configuration Applied

### Django Settings Updated:
- ✅ `STATIC_ROOT = BASE_DIR / 'staticfiles'`
- ✅ `STATICFILES_DIRS = [BASE_DIR / 'static']`
- ✅ `DEBUG = False` (Production mode)
- ✅ `ALLOWED_HOSTS = ['taki.pythonanywhere.com', 'localhost', '127.0.0.1']`
- ✅ `FRONTEND_URL = 'https://hotel-jan.vercel.app'`

### Security Settings Added:
- ✅ XSS Protection
- ✅ Content Type Sniffing Prevention
- ✅ HSTS (HTTP Strict Transport Security)
- ✅ Secure Session Cookies
- ✅ CSRF Protection
- ✅ Frame Options

## 📁 Directory Structure
```
~/hotel-jan/
├── hotel_api/
│   ├── staticfiles/          # Collected static files
│   ├── static/              # Additional static files
│   ├── media/               # User uploaded files
│   ├── db.sqlite3          # Database
│   └── manage.py
└── frontend/               # Next.js frontend (separate deployment)
```

## 🔍 Troubleshooting

### If collectstatic fails:
```bash
# Check if directories exist
ls -la ~/hotel-jan/hotel_api/

# Create missing directories
mkdir -p ~/hotel-jan/hotel_api/staticfiles
mkdir -p ~/hotel-jan/hotel_api/static

# Try collectstatic again
python manage.py collectstatic --noinput
```

### If web app doesn't start:
1. Check PythonAnywhere error logs
2. Verify all dependencies are installed
3. Ensure database migrations are applied
4. Check ALLOWED_HOSTS configuration

### If API returns 500 errors:
1. Check Django logs in PythonAnywhere
2. Verify database connection
3. Check SECRET_KEY and other settings
4. Ensure all apps are properly installed

## 🧪 Test Commands

### Test API Endpoints:
```bash
# Test basic API
curl -I https://taki.pythonanywhere.com/api/rooms/

# Test authentication
curl -X POST https://taki.pythonanywhere.com/api/auth/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin_test", "password": "admin123456"}'
```

### Test User Creation:
```bash
curl -X POST https://taki.pythonanywhere.com/api/auth/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "test@example.com",
    "password": "test123456",
    "password_confirm": "test123456",
    "first_name": "Test",
    "last_name": "User",
    "role": "GUEST"
  }'
```

## 📊 Current Status

### ✅ Working Features:
- User authentication and registration
- Room management (CRUD operations)
- Booking system (create, view, manage)
- Invoice generation (PDF)
- Contact form
- Email notifications
- Role-based permissions (ADMIN, MANAGER, STAFF, GUEST)

### 🔧 Test Data Available:
- **Admin**: `admin_test` / `admin123456`
- **Manager**: `manager_test` / `manager123456`
- **Staff**: `staff_test` / `staff123456`
- **Guest**: `guest_test` / `guest123456`

### 🏨 Test Rooms:
- Quarto 101 (Standard) - $150/night
- Quarto 201 (Deluxe) - $250/night
- Suite 301 (Suite) - $500/night

## 🚨 Important Notes

1. **Static Files**: Must run `collectstatic` after any changes
2. **Database**: SQLite is used for simplicity, consider PostgreSQL for production
3. **Email**: Currently using console backend, configure SMTP for production emails
4. **Security**: All security headers are enabled for production
5. **CORS**: Currently allows all origins, restrict for production if needed

## 📞 Support

If you encounter any issues:
1. Check PythonAnywhere error logs
2. Verify all steps in this guide
3. Test API endpoints individually
4. Check Django admin panel at `/admin/`

## 🎯 Next Steps

1. Configure SMTP email settings for production
2. Set up database backups
3. Monitor application performance
4. Consider upgrading to PostgreSQL
5. Set up SSL certificate renewal monitoring

---

**Status**: ✅ Production Ready
**Last Updated**: October 16, 2025
**Version**: 1.0.0
