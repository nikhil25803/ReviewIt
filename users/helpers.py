import jwt, os
from dotenv import load_dotenv
from datetime import datetime, timedelta


# Load environment variables
load_dotenv()
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

"""Encode Data into JWT Token"""


def encode(payload_data: dict, expiration_minutes: int = 5040) -> str:
    # Calculate expiration time
    expiration_time = datetime.utcnow() + timedelta(minutes=expiration_minutes)

    # Add expiration time to payload
    payload_data["exp"] = expiration_time

    # Encode the token with expiration
    token = jwt.encode(
        payload=payload_data, key=JWT_SECRET_KEY, algorithm=JWT_ALGORITHM
    )
    return token


"""Decode JWT Token into Python Readable Data"""


def decode(jwt_token: str):
    try:
        # Decode the token and automatically check for expiration
        token = jwt.decode(
            jwt=jwt_token, key=JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM]
        )

        # Check for the "uid" claim in the payload
        if "uid" in token:
            return {
                "is_expired": False,
                "uid": token["uid"],
                "username": token["username"],
            }
    except jwt.ExpiredSignatureError:
        return {"is_expired": True}
    except jwt.InvalidTokenError:
        return {"is_expired": True}

    # Return None if decoding fails or token is invalid
    return None
