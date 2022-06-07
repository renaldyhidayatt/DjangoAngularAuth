from user import views
from django.urls import path


urlpatterns = [
    path("register", views.RegisterAPIView.as_view(), name="register"),
    path("login", views.LoginAPIView.as_view(), name="login"),
    path("user", views.UserListApiView.as_view(), name="user"),
    path("getUser", views.AuthUserApiView.as_view(), name="getUser"),
]
