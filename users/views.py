from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserModel
from .serializers import UserRegistrationSerializer, UserLoginSerializer
from rest_framework import status


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
                return Response(data=serialied_data.data, status=status.HTTP_200_OK)

            return Response(
                {
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": serialied_data.errors,
                }
            )

        else:
            validation = UserRegistrationSerializer(data=incoming_data)
            if validation.is_valid(raise_exception=True):
                validation.save()
                return Response(
                    {
                        "status": status.HTTP_202_ACCEPTED,
                        "message": "User has been registered",
                    }
                )
            return Response(
                {"status": status.HTTP_400_BAD_REQUEST, "message": validation.errors}
            )
