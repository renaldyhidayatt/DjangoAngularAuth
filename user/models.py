from user.manager import MyUserManager
from django.db import models
from helpers.models import TrackingModel
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser
from django.utils import timezone
import jwt
from datetime import datetime, timedelta


from django.conf import settings


class User(AbstractBaseUser, PermissionsMixin, TrackingModel):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.
    Username and password are required. Other fields are optional.
    """

    ADMIN = 1
    MANAGER = 2
    EMPLOYEE = 3

    ROLE_CHOICES = ((ADMIN, "Admin"), (MANAGER, "Manager"), (EMPLOYEE, "Employee"))

    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        max_length=150,
        unique=True,
        help_text=(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": ("A user with that username already exists."),
        },
    )
    email = models.EmailField(blank=False, unique=True)

    role = models.PositiveSmallIntegerField(
        choices=ROLE_CHOICES, blank=True, null=True, default=7
    )
    is_staff = models.BooleanField(
        default=False,
        help_text=("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        default=True,
        help_text=(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )

    date_joined = models.DateTimeField(default=timezone.now)
    email_verified = models.BooleanField(
        default=False,
        help_text=("Designates whether this users email is verified. "),
    )
    objects = MyUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    @property
    def token(self):
        token = jwt.encode(
            {
                "username": self.username,
                "email": self.email,
                "role": self.role,
                "exp": datetime.utcnow() + timedelta(hours=24),
            },
            settings.SECRET_KEY,
            algorithm="HS256",
        )

        return token

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
