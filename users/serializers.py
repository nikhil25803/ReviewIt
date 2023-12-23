from rest_framework import serializers
from .models import UserModel
from requests.models import RequestModel, ResponseModel

"""User Registration Serializer"""


class UserRegistrationSerializer(serializers.Serializer):
    uid = serializers.CharField()
    username = serializers.CharField()
    email = serializers.EmailField()
    name = serializers.CharField()
    avatar = serializers.CharField()

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
            avatar=data["avatar"],
        )

        new_user.save()
        return new_user


"""User Login Serializer"""


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["uid", "username"]


"""
User Profile Data
- Need to send to authenticated user only
- Need one Request and Response serializer for this as well
"""


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestModel
        exclude = ["userid"]


class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseModel
        exclude = ["fromuserid"]


class UserProfileSerializer(serializers.ModelSerializer):
    # Fetching requetss made by this user
    requests = serializers.SerializerMethodField()

    # Fetcing all the response made by the user
    response = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        exclude = ["uid", "id"]

    # Method to fetch requests
    def get_requests(self, obj):
        # Filter requests that belong to this user
        requests = RequestModel.objects.filter(userid=obj["uid"])

        requests_serializer = RequestSerializer(requests, many=True)

        return requests_serializer.data

    # Method to fetch responses
    def get_response(self, obj):
        # Filter the responses submitted by this user
        response = ResponseModel.objects.filter(fromuserid=obj["uid"])

        response_serializer = ResponseSerializer(response, many=True)

        return response_serializer.data


"""User Dashboard Data"""


class UserDashboardSerializer(serializers.ModelSerializer):
    # Get count of total requests
    requestCount = serializers.SerializerMethodField()

    # Get count of total response
    responseCount = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        exclude = ["id"]

    # Method to calculate count
    def get_requestCount(self, obj):
        # Total requests
        requests = RequestModel.objects.filter(userid=obj["uid"]).values()
        return f"{len(requests)}"

    # Method to calculate count
    def get_responseCount(self, obj):
        # Total requests
        response = ResponseModel.objects.filter(fromuserid=obj["uid"]).values()
        return f"{len(response)}"


"""User Profile - Update (PATCH Method)"""


class UserProfileUpdateSerialzer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["name", "bio", "about", "linkedin", "github", "avatar"]
