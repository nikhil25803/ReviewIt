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
    UserDashboardSerializer,
)
from rest_framework import status
from .helpers import encode, decode

"""User API Ping Test"""


@api_view(http_method_names=["GET"])
def user_index(request):
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
        query_username = request.GET.get("username")
        headers = dict(request.headers)

        # First, validate that the username exists or not
        if not UserModel.objects.filter(username=query_username).exists():
            return JsonResponse(
                {
                    "data": None,
                    "status": status.HTTP_404_NOT_FOUND,
                    "message": "User doesnot exist.",
                }
            )

        # Setting innitail value for authorization purpose
        headers_uid = headers["Uid"] if "Uid" in headers.keys() else None
        headers_username = headers["Username"] if "Username" in headers.keys() else None
        headers_jwt = (
            headers["Authorization"] if "Authorization" in headers.keys() else None
        )

        # What kind of data we need to share
        profile_data, dashboard_data = False, False

        # Fetch Authorization key from the headers which is apparently a JWT token
        if headers_jwt:
            # Decode the JWT Token
            decoded_data = decode(headers_jwt)

            #  If token is valid
            if decoded_data["is_expired"] is True:
                return JsonResponse(
                    {
                        "status": status.HTTP_400_BAD_REQUEST,
                        "message": "JWT Token is expired. Please login again",
                    }
                )

            # If uid and username mathced from decoded data as well as query then user is requesting profile data
            if (
                headers_uid == decoded_data["uid"]
                and headers_username == decoded_data["username"]
                and decoded_data["username"] == query_username
            ):
                profile_data = True
            else:
                dashboard_data = True
        else:
            dashboard_data = True

        # If request is for profile data
        if profile_data is True and dashboard_data is False:
            # Fetch user details based on the username provided
            user_object = UserModel.objects.filter(username=query_username).values()[0]

            # Serialized data for logged-in user
            serialized_data = UserProfileSerializer(user_object)

            # Populating reposne lists with some more information
            response_data = serialized_data.data
            requests, response = response_data["requests"], response_data["response"]

            for _obj in response:
                request_key = _obj["requestid"]
                for _req in requests:
                    if _req["requestid"] == request_key:
                        _obj["avatar"] = _req["avatar"]
                        _obj["name"] = _req["name"]
                        _obj["email"] = _req["email"]
                        _obj["resumelink"] = _req["resumelink"]
                        _obj["description"] = _req["description"]

            return JsonResponse(
                {
                    "data": response_data,
                    "status": status.HTTP_200_OK,
                    "message": "Fetched profile data",
                }
            )

        # If request is for dashboard data
        if dashboard_data is True and profile_data is False:
            # Fetch user details based on the username provided
            user_object = UserModel.objects.filter(username=query_username).values()[0]

            # Serialized data for logged-in user
            serialized_data = UserDashboardSerializer(user_object)
            return JsonResponse(
                {
                    "data": serialized_data.data,
                    "status": status.HTTP_200_OK,
                    "message": "Fetched dashboard data",
                }
            )

        # Else case
        return Response(
            {
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Unable to fetch profile data",
            }
        )

    """Update User Profile"""

    def patch(self, request):
        # Get query parameter and headers from the request
        query_username = request.GET.get("username")
        headers = dict(request.headers)

        # Setting innitail value for authorization purpose
        headers_uid = headers["Uid"] if "Uid" in headers.keys() else None
        headers_username = headers["Username"] if "Username" in headers.keys() else None
        headers_jwt = (
            headers["Authorization"] if "Authorization" in headers.keys() else None
        )

        # Get request body
        incoming_data = request.data

        # Fetch Authorization key from the headers which is apparently a JWT token
        if headers_jwt:
            # Decode the JWT Token
            decoded_data = decode(headers_jwt)

            #  If token is valid
            if decoded_data["is_expired"] is True:
                return JsonResponse(
                    {
                        "status": status.HTTP_400_BAD_REQUEST,
                        "message": "JWT Token is expired. Please login again",
                    }
                )

            # If uid and username mathced from decoded data as well as query then user is updating his profile
            if (
                headers_uid == decoded_data["uid"]
                and headers_username == decoded_data["username"]
                and decoded_data["username"] == query_username
            ):
                user_object = UserModel.objects.filter(uid=decoded_data["uid"]).first()
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
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "You are not authorized to make this request",
            }
        )
