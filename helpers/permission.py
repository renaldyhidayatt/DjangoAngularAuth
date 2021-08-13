from user.models import User
from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role != 1


class IsManagerOrAdmin(BasePermission):
    def has_permission(self, request, view):
        is_manager = request.user.role
        if is_manager:
            return True
