from rest_framework import serializers
from .models import UserModel


"""User Registration Serializer"""


class UserRegistrationSerializer(serializers.Serializer):
    uid = serializers.CharField()
    username = serializers.CharField()
    email = serializers.EmailField()
    name = serializers.CharField()

    # Validate incoming data for registration
    def validate(self, data):
        # Validate UID
        if data["uid"]:
            if UserModel.objects.filter(uid=data["uid"]).exists():
                raise serializers.ValidationError(detail="UID provided already exists")

        # Validate Username
        if data["username"]:
            if UserModel.objects.filter(username=data["username"]).exists():
                raise serializers.ValidationError(
                    detail="User with same username exists"
                )

        # Validate Email
        if data["email"]:
            if UserModel.objects.filter(email=data["email"]).exists():
                raise serializers.ValidationError(
                    detail="This email is already registered"
                )

        return data

    # Create a new user object if all the provided data is valid
    def create(self, data):
        new_user = UserModel.objects.create(
            uid=data["uid"],
            username=data["username"],
            email=data["email"],
            name=data["name"],
        )

        new_user.save()
        return new_user


"""User Login Serializer"""


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        exclude = ["uid"]


"""User Profile - Fetch"""


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        exclude = ["uid"]


"""User Profile - Update (PATCH Method)"""


class UserProfileUpdateSerialzer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["name", "bio", "about", "linkedin", "github"]
