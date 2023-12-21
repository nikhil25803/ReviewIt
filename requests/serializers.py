from rest_framework import serializers, status
from users.models import UserModel
from django.utils import timezone
from datetime import timedelta
from .models import RequestModel
import uuid
from django.http import JsonResponse

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
