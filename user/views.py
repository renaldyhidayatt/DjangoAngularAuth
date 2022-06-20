from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework import response, status
from rest_framework.views import APIView

# from user import serializers
from user.serializers import RegisterSerializer, LoginSerializer, UserListSerializer
from django.contrib.auth import authenticate
from user.models import User
from helpers.permission import IsAdmin


class AuthUserApiView(APIView):
    permission_classes = (IsAdmin,)

    def get(self, request):
        user = request.user
        serializer = UserListSerializer(user)
        responses = {
            "success": True,
            "status_code": status.HTTP_200_OK,
            "message": "Successfully fetched Users",
            "users": serializer.data,
        }
        return response.Response(responses, status=status.HTTP_200_OK)


class UserListApiView(APIView):
    serializer_class = UserListSerializer
    permission_classes = (IsAdmin)

    def get(self, request):

       
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        
        return response.Response(serializer.data, status=status.HTTP_200_OK)


class RegisterAPIView(GenericAPIView):

    authentication_classes = []
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(GenericAPIView):
    authentication_classes = []

    serializer_class = LoginSerializer

    def post(self, request):
        email = request.data.get("email", None)
        password = request.data.get("password", None)

        user = authenticate(username=email, password=password)

        if user:
            serializer = self.serializer_class(user)

            return response.Response(serializer.data, status=status.HTTP_200_OK)
        return response.Response({"message": "Invalid credentials, try again"})
