from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializers import RequestPostSerializer, ResponsePostSerializer
from rest_framework import status

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
        try:
            validations = ResponsePostSerializer(data=incoming_data)
            if validations.is_valid(raise_exception=True):
                validations.save()
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
