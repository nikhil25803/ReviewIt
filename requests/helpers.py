import boto3
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
import os

load_dotenv()


# AWS Data
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = os.getenv("AWS_S3_REGION_NAME")


def upload_file_to_s3(file):
    if not file:
        return None

    # Defining Bucket name and Object name
    bucket_name = AWS_STORAGE_BUCKET_NAME
    object_name = file.name

    # Upload the file
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=AWS_S3_REGION_NAME,
    )
    try:
        # Include the subdirectory in the object name
        full_object_name = f"resume/{object_name}"
        response = s3_client.upload_fileobj(file, bucket_name, full_object_name)
    except NoCredentialsError:
        return None

    return f"https://{bucket_name}.s3.ap-south-1.amazonaws.com/resume/{object_name}"
