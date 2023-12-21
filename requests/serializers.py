from rest_framework import serializers, status
from users.models import UserModel
from django.utils import timezone
from datetime import timedelta
from .models import RequestModel, ResponseModel
import uuid

"""Request - POST Serializer"""


class RequestPostSerializer(serializers.Serializer):
    userid = serializers.CharField()
    resumelink = serializers.CharField()
    email = serializers.EmailField()
    description = serializers.CharField(required=False)

    def validate(self, data):
        # Existing validations
        if not UserModel.objects.filter(uid=data["userid"]).exists():
            raise serializers.ValidationError("User with given User ID does not exist.")

        # Validate email for requests in the last 15 days
        fifteen_days_ago = timezone.now() - timedelta(days=15)
        recent_requests = RequestModel.objects.filter(
            email=data.get("email"),
            userid=data.get("userid"),
            requestedat__gte=fifteen_days_ago,
        )
        if recent_requests.exists():
            raise Exception(
                "A request with this email has already been made to this mentor in the last 15 days."
            )

        return data

    def create(self, validated_data):
        new_request = RequestModel.objects.create(
            requestid=str(uuid.uuid4().hex),
            userid=validated_data["userid"],
            resumelink=validated_data["resumelink"],
            email=validated_data["email"],
            description=validated_data["resumelink"]
            if "resumelink" in validated_data.keys()
            else None,
        )
        new_request.save()
        return new_request


class ResponsePostSerializer(serializers.Serializer):
    requestid = serializers.CharField()
    fromuserid = serializers.CharField()
    responsemessage = serializers.CharField()

    def validate(self, data):
        # Validate request_id
        if data["requestid"]:
            if not RequestModel.objects.filter(requestid=data["requestid"]).exists():
                raise serializers.ValidationError("Invalid request ID")

        # Validate from user id
        if data["fromuserid"]:
            if not RequestModel.objects.filter(userid=data["fromuserid"]).exists():
                raise serializers.ValidationError("Invalid user ID")

        # Check if a response to it has already
        if (
            RequestModel.objects.filter(requestid=data["requestid"]).values()[0][
                "responded"
            ]
            is True
        ):
            raise serializers.ValidationError(
                "A response to this request has already been submitted"
            )

        return data

    def create(self, validated_data):
        new_response = ResponseModel.objects.create(
            responseid=str(uuid.uuid4().hex),
            requestid=validated_data["requestid"],
            fromuserid=validated_data["fromuserid"],
            responsemessage=validated_data["responsemessage"],
        )
        new_response.save()

        # Update the status of the requests
        RequestModel.objects.filter(requestid=validated_data["requestid"]).update(
            responded=True
        )

        return new_response
