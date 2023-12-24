from rest_framework import serializers, status
from users.models import UserModel
from django.utils import timezone
from datetime import timedelta
from .models import RequestModel, ResponseModel
import uuid
import os
from reviewit import settings
from .helpers import upload_file_to_s3

"""Request - POST Serializer"""


class RequestPostSerializer(serializers.Serializer):
    userid = serializers.CharField()
    email = serializers.EmailField()
    name = serializers.CharField()
    avatar = serializers.CharField()
    description = serializers.CharField(required=False)
    file = serializers.FileField()

    def validate_file(self, value):
        """
        Check that the file is a PDF and its size is less than 1 MB.
        """
        extension = os.path.splitext(value.name)[1]
        valid_extensions = [".pdf"]
        if not extension.lower() in valid_extensions:
            raise serializers.ValidationError(
                "Unsupported file extension. Only PDF files are allowed."
            )

        # Check file size
        max_file_size = 1 * 1024 * 1024  # 1 MB
        if value.size > max_file_size:
            raise serializers.ValidationError(
                "File size too large. Size should not exceed 1 MB."
            )

        return value

    def validate(self, data):
        # Existing validations
        if not UserModel.objects.filter(uid=data["userid"]).exists():
            raise serializers.ValidationError("User with given User ID does not exist.")

        # Validate email for requests in the last 15 days
        fifteen_days_ago = timezone.now() - timedelta(days=7)
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
        # The file is automatically saved to S3 via Django Storages
        resume = validated_data.get("file")
        file_url = None
        try:
            if resume:
                response = upload_file_to_s3(file=resume)
                if response:
                    file_url = response
                else:
                    raise serializers.ValidationError("Unable to upload file.")
        except Exception:
            raise serializers.ValidationError("Error while uploading file")

        # Once file upload is successful and all validation are made make a new request
        new_request = RequestModel.objects.create(
            requestid=str(uuid.uuid4().hex),
            userid=validated_data["userid"],
            avatar=validated_data["avatar"],
            name=validated_data["name"],
            resumelink=file_url,
            email=validated_data["email"],
            description=validated_data["description"]
            if "description" in validated_data.keys()
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
                raise Exception("Invalid request ID")

        # Validate from user id
        if data["fromuserid"]:
            if not RequestModel.objects.filter(userid=data["fromuserid"]).exists():
                raise Exception("Invalid user ID")

        # Check if a response to it has already
        if (
            RequestModel.objects.filter(requestid=data["requestid"]).values()[0][
                "responded"
            ]
            is True
        ):
            raise Exception("A response to this request has already been submitted")

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
