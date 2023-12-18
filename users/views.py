from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserModel
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    UserProfileUpdateSerialzer,
)
from rest_framework import status
from .helpers import encode, decode

"""User API Ping Test"""


@api_view(http_method_names=["GET"])
def user_index(request):
    user_object = UserModel.objects.filter(username="nikhil25803").values()[0]
    print(user_object)
    details = {
        "status": 200,
        "message": "Project ReviewIt",
        "github": "https://github.com/nikhil25803/ReviewIt",
    }
    return JsonResponse(data=details)


"""User API - User Authentication (For both registration and validation)"""


class UserAuthentication(APIView):
    # Method POST - For Registration/Login
    def post(self, request):
        incoming_data = request.data

        # If user exists - Login Else - Register
        if UserModel.objects.filter(uid=incoming_data["uid"]).exists():
            user_object = UserModel.objects.filter(uid=incoming_data["uid"]).first()
            serialied_data = UserLoginSerializer(user_object)
            if serialied_data:
                encoded_data = encode(payload_data=serialied_data.data)
                return JsonResponse(
                    data={
                        "token": encoded_data,
                        "status": status.HTTP_200_OK,
                        "message": "User has been loggedin.",
                    }
                )

            return JsonResponse(
                data={
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Unable to fetch user details.",
                }
            )

        else:
            validation = UserRegistrationSerializer(data=incoming_data)
            if validation.is_valid(raise_exception=True):
                validation.save()
                user_object = UserModel.objects.filter(uid=incoming_data["uid"]).first()
                serialied_data = UserLoginSerializer(user_object)
                encoded_data = encode(payload_data=serialied_data.data)
                return JsonResponse(
                    data={
                        "token": encoded_data,
                        "status": status.HTTP_200_OK,
                        "message": "User has been registered and loggedin.",
                    }
                )
            return JsonResponse(
                data={
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Unable to register user.",
                }
            )


"""Uer API - User Profile"""


class UserProfile(APIView):

    """Fetch User Profile"""

    def get(self, request):
        # Get query parameter and headers from the request
        username = request.GET.get("username")
        headers = dict(request.headers)

        # Fetch Authorization key from the headers which is apparently a JWT token
        if "Authorization" in headers.keys():
            jwt_token = headers["Authorization"]

            # Decode the JWT Token
            decoded_data = decode(jwt_token)

            # Fetch user details based on the username provided
            user_object = UserModel.objects.filter(username=username).values()[0]

            #  If token is valid
            if decoded_data and decoded_data["is_expired"] is False:
                # If requested user is loggedin as well
                if user_object["uid"] == decoded_data["uid"]:
                    # Serialized data for logged-in user
                    serialized_data = UserProfileSerializer(user_object)
                    return JsonResponse(
                        {
                            "data": serialized_data.data,
                            "status": status.HTTP_200_OK,
                            "loggedin_user": True,
                        }
                    )
                else:
                    # The requested user is not loggedin
                    serialized_data = UserProfileSerializer(user_object)
                    return JsonResponse(
                        {
                            "data": serialized_data.data,
                            "status": status.HTTP_200_OK,
                            "loggedin_user": True,
                        }
                    )
        return Response(
            {
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Unable to fetch profile data",
            }
        )

    """Update User Profile"""

    def patch(self, request):
        # Get query parameter and headers from the request
        username = request.GET.get("username")
        headers = dict(request.headers)

        # Get request body
        incoming_data = request.data

        # Fetch Authorization key from the headers which is apparently a JWT token
        if "Authorization" in headers.keys():
            jwt_token = headers["Authorization"]

            # Decode the JWT Token
            decoded_data = decode(jwt_token)

            # Fetch user data to authorization
            user_details = UserModel.objects.filter(username=username).values()[0]

            #  If token is valid
            if decoded_data and decoded_data["is_expired"] is False:
                # If requested user is loggedin as well
                if user_details["uid"] == decoded_data["uid"]:
                    # Serialize and save the data
                    user_object = UserModel.objects.filter(
                        uid=decoded_data["uid"]
                    ).first()
                    serialized_data = UserProfileUpdateSerialzer(
                        user_object, data=incoming_data, partial=True
                    )
                    if serialized_data.is_valid(raise_exception=True):
                        serialized_data.save()
                        return Response(serialized_data.data, status=status.HTTP_200_OK)
                    return Response(
                        serialized_data.errors, status=status.HTTP_400_BAD_REQUEST
                    )
        return JsonResponse(
            {
                "status": status.HTTP_401_UNAUTHORIZED,
                "message": "You are not authorized to make this request",
            }
        )
