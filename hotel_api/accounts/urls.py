from django.urls import path
from . import views

urlpatterns = [
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/profile/', views.user_profile, name='profile'),
    path('auth/update-profile/', views.update_profile, name='update-profile'),
    path('auth/change-password/', views.change_password, name='change-password'),
    path('auth/check/', views.check_auth, name='check-auth'),
    path('auth/role/', views.get_user_role, name='user-role'),
    path('auth/forgot-password/', views.forgot_password, name='forgot-password'),
    path('auth/reset-password/', views.reset_password, name='reset-password'),
]
