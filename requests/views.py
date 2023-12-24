from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializers import RequestPostSerializer, ResponsePostSerializer
from rest_framework import status
from users.helpers import decode, send_email_function
from users.models import UserModel
from .models import RequestModel

"""Request Service Ping Test"""


@api_view(http_method_names=["GET"])
def requests_index(request):
    return JsonResponse(data={"status": 200, "message": "Request Service Ping Test"})


"""Request - POST View"""


class RequestPostView(APIView):
    def post(self, request):
        # Getting the incoming data
        incoming_data = request.data

        try:
            validations = RequestPostSerializer(data=incoming_data)
            if validations.is_valid(raise_exception=True):
                validations.save()
                try:
                    # Get iser data
                    mentor_data = UserModel.objects.filter(
                        uid=incoming_data["userid"]
                    ).values()[0]
                    response = send_email_function(
                        data={
                            "subject": "Review It : New request received!",
                            "to": mentor_data["email"],
                            "mentor_username": mentor_data["name"],
                            "name": incoming_data["name"],
                            "email": incoming_data["email"],
                            "message": incoming_data["description"],
                        },
                        purpose="request",
                    )
                except Exception:
                    pass
                return JsonResponse(
                    data={
                        "status": status.HTTP_202_ACCEPTED,
                        "message": "Successfully submitted the request.",
                    }
                )
            return JsonResponse(
                data={
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Unable to complete the request.",
                }
            )
        except Exception as e:
            return JsonResponse(
                data={
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": f"{e}",
                }
            )


"""Response - POST View"""


class ResponsePostView(APIView):
    def post(self, request):
        # Getting the incoming data
        incoming_data = request.data

        # Validate JWT Token
        headers = dict(request.headers)

        headers_jwt = (
            headers["Authorization"] if "Authorization" in headers.keys() else None
        )
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

            # Check if the legit user is making the requests
            if not decoded_data["uid"] == incoming_data["fromuserid"]:
                return JsonResponse(
                    {
                        "status": status.HTTP_400_BAD_REQUEST,
                        "message": "You are not authorized to make a submission to this request",
                    }
                )
            try:
                validations = ResponsePostSerializer(data=incoming_data)
                if validations.is_valid(raise_exception=True):
                    validations.save()
                    try:
                        # Fetching request data
                        request_data = RequestModel.objects.filter(
                            requestid=incoming_data["requestid"]
                        ).values()[0]

                        # Fetching mentor data
                        mentor_data = UserModel.objects.filter(
                            uid=incoming_data["fromuserid"]
                        ).values()[0]
                        response = send_email_function(
                            data={
                                "subject": "Review It : New response received!",
                                "to": request_data["email"],
                                "name": request_data["name"],
                                "mentor_name": mentor_data["name"],
                                "mentor_email": mentor_data["email"],
                                "review": incoming_data["responsemessage"],
                                "resume": request_data["resumelink"],
                            },
                            purpose="response",
                        )
                    except Exception:
                        pass
                    return JsonResponse(
                        data={
                            "status": status.HTTP_202_ACCEPTED,
                            "message": "Successfully submitted the response.",
                        }
                    )
                return JsonResponse(
                    data={
                        "status": status.HTTP_400_BAD_REQUEST,
                        "message": "Unable to submit the response.",
                    }
                )
            except Exception as e:
                return JsonResponse(
                    data={
                        "status": status.HTTP_400_BAD_REQUEST,
                        "message": f"{e}",
                    }
                )
        return JsonResponse(
            data={
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Token Not Provided.",
            }
        )
