from django.db.models import fields
from django.shortcuts import render
from rest_framework import serializers
from user import models
from user.models import User


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "role")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
        )

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ("email", "password", "token")
        read_only_fields = ["token"]
