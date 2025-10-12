# 🚀 Dashboards Quick Start

## ⚡ 60-Second Guide

### Admin Dashboard
```
URL: http://localhost:3000/admin

Features:
✅ View all bookings, rooms, guests
✅ Create/Edit/Delete rooms
✅ Cancel bookings
✅ Download invoices
✅ Resend confirmation emails
✅ Real-time statistics
```

### User Dashboard
```
URL: http://localhost:3000/dashboard

Access: Enter your email (from any booking you made)

Features:
✅ View all your bookings
✅ Download invoices
✅ Check reward points (100 pts/booking)
✅ See loyalty level (Bronze→Diamond)
✅ Track total spending
```

---

## 🎯 Quick Actions

### Admin:
| Action | Where | How |
|--------|-------|-----|
| View Stats | `/admin` | Dashboard shows all metrics |
| Manage Bookings | `/admin/bookings` | Search, filter, cancel, resend emails |
| Add Room | `/admin/rooms` | Click "Adicionar Quarto" button |
| Edit Room | `/admin/rooms` | Click "Editar" on any room |
| Delete Room | `/admin/rooms` | Click "Deletar" on any room |
| View Guests | `/admin/guests` | See all guests with stats |
| Download Invoice | `/admin/bookings` | Click download icon |

### User:
| Action | Where | How |
|--------|-------|-----|
| Login | `/dashboard` | Enter your email |
| View Bookings | `/dashboard` | Automatic after login |
| Download Invoice | `/dashboard` | Click "Fatura" button |
| Check Rewards | `/dashboard/rewards` | See points and level |
| Logout | Any page | Click "Sair" button |

---

## 📊 Pages Created

### Admin (4 pages):
1. `/admin` - Dashboard with statistics
2. `/admin/bookings` - Bookings management
3. `/admin/rooms` - Rooms CRUD
4. `/admin/guests` - Guests list

### User (2 pages):
1. `/dashboard` - Main dashboard with bookings
2. `/dashboard/rewards` - Loyalty program

---

## 🎨 Features Summary

### Admin Can:
- ✅ View real-time statistics
- ✅ Manage all bookings (view, cancel, resend)
- ✅ Full CRUD on rooms
- ✅ See guest statistics
- ✅ Search and filter data
- ✅ Download invoices
- ✅ Resend confirmation emails

### Users Can:
- ✅ View their booking history
- ✅ Download invoices
- ✅ Earn reward points
- ✅ Check loyalty level
- ✅ Track spending
- ✅ See upcoming stays

---

## 🔥 Test It Now!

### Test Admin:
```bash
# 1. Open browser
http://localhost:3000/admin

# 2. Explore:
- See statistics dashboard
- Click "Reservas" → view all bookings
- Click "Quartos" → add/edit rooms
- Click "Hóspedes" → see guests
```

### Test User:
```bash
# 1. Open browser
http://localhost:3000/dashboard

# 2. Enter email from any booking you made
# (or use: test@example.com if you made a test booking)

# 3. Explore:
- See your bookings
- Download invoices
- Check rewards points
- View loyalty level
```

---

## 💡 Pro Tips

1. **Admin Search**: Type booking number, name, or email to find bookings fast
2. **User Email**: Your email is saved in localStorage (no need to re-enter)
3. **Invoices**: Click download icon/button to get PDF instantly
4. **Rewards**: 100 points per confirmed booking
5. **Levels**: Bronze (0), Silver (200), Gold (500), Diamond (1000) points
6. **Mobile**: All dashboards work perfectly on phones!

---

## 🎉 That's It!

You now have a complete hotel management system with:
- 🎛️ **Admin Dashboard** for management
- 👤 **User Dashboard** for guests
- 🏆 **Rewards Program** built-in
- 📧 **Email Notifications**
- 📄 **PDF Invoices**
- 📊 **Real-time Statistics**

**All fully integrated and ready to use!** 🚀

