import jwt, os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from django.conf import settings
from django.core.mail import send_mail, EmailMultiAlternatives

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


def send_email_function(data: dict, purpose: str) -> bool:
    """
    Welcome Email - Requirements(subject, name/username, to)
    """
    if purpose == "welcome":
        try:
            SUBJECT, FROM, TO = (
                data["subject"],
                settings.EMAIL_HOST_USER,
                data["to"],
            )
            text_content = f"""Welcome to Review It {data['name']}\nOn Review It, users connect with
          mentors like you worldwide for personalized resume feedback. A free
          and open-source platform. Elevate your professional story, whether
          you're entering the job market or making a career change.\n\nHere are some things you can do:\n- Complete and share your profile on socials.\n
          - Your profile section is one stop for all your needs.\n
          - You can also track and filters your current and past records.\n"""
            html_content = f"""<!DOCTYPE html>
<html>
  <head> </head>
  <body
    style="
      font-family: Arial, sans-serif;
      margin: 10px;
      padding: 0 10px;
      background-color: #111827;
    "
  >
    <div
      style="
        max-width: 500px;
        margin: 0 auto;
        background-color: #111827;
        color: #eeeeee;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      "
    >
      <div style="text-align: center; padding-bottom: 20px">
        <h1>Welcome to <span style="color: #eab308">Review It!</span></h1>
      </div>
      <div style="line-height: 1.6; color: #eeeeee">
        <p>Hello <span style="color: #eab308">{data["name"]}</span></p>
        <p>
          On <span style="color: #eab308">Review It!</span>, users connect with
          mentors like you worldwide for personalized resume feedback. A free
          and open-source platform. Elevate your professional story, whether
          you're entering the job market or making a career change.
        </p>
        <p>Here are some things you can do:</p>
        <ul>
          <li>Complete and share your profile on socials.</li>
          <li>Your profile section is one stop for all your needs.</li>
          <li>You can also track and filters your current and past records.</li>
        </ul>
        <p>
          If you have any questions, feel free to
          <a
            href="mailto:nikofficial25@gmail.com"
            style="cursor: pointer; color: #eeeeee"
            >Contact us</a
          >.
        </p>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p>
            <strong
              ><a
                href="https://www.linkedin.com/in/nikhil25803/"
                target="_blank"
                style="cursor: pointer; color: #eeeeee"
                >LinkedIn</a
              ></strong
            >
            |
            <strong
              ><a
                href="https://github.com/nikhil25803"
                target="_blank"
                style="cursor: pointer; color: #eeeeee"
                >GitHub</a
              ></strong
            >
            |
            <strong
              ><a
                href="https://twitter.com/humans_write"
                target="_blank"
                style="cursor: pointer; color: #eeeeee"
                >Twitter</a
              ></strong
            >
          </p>
        </div>
      </div>
      <div
        style="
          text-align: center;
          padding-top: 20px;
          font-size: 12px;
          color: #999999;
        "
      >
        <p>&copy; [2023] Review It. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
"""
            msg = EmailMultiAlternatives(SUBJECT, text_content, FROM, [TO])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return True
        except Exception as e:
            return False

    """
    Email on Request - Requirements(Subject, Mentor, Name, Email, Request Description)
    """

    if purpose == "request":
        try:
            SUBJECT, FROM, TO = (
                data["subject"],
                settings.EMAIL_HOST_USER,
                data["to"],
            )
            text_content = f"""New Request Received"""
            html_content = f"""<!DOCTYPE html>
<html>
  <head> </head>
  <body
    style="
      font-family: Arial, sans-serif;
      margin: 10px;
      padding: 0 10px;
      background-color: #111827;
    "
  >
    <div
      style="
        max-width: 500px;
        margin: 0 auto;
        background-color: #111827;
        color: #eeeeee;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      "
    >
      <div style="text-align: center; padding-bottom: 20px">
        <h1>Received a new<span style="color: #eab308"> Request!</span></h1>
      </div>
      <div style="line-height: 1.6; color: #eeeeee">
        <p>Hello {data["mentor_username"]}</p>
        <p>
          Looks like you got a one more resume to review, spare some time to
          help them.
        </p>
        <p>
          <p style="color: #eab308">Request Details</p>
          <p><span style="color: #eab308;">Name</span> - {data["name"]}</p>
          <p><span style="color: #eab308;">Email</span> - {data["email"]}</p>
          <p><span style="color: #eab308;">Message</span> - {data["message"]}</p>
        </p>
        <p>You can submit your review at profile dashboard.</p>
        <p>
          If you have any questions, feel free to
          <a
            href="mailto:nikofficial25@gmail.com"
            style="cursor: pointer; color: #eeeeee"
            >Contact us</a
          >.
        </p>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p>
            <strong
              ><a
                href="https://www.linkedin.com/in/nikhil25803/"
                target="_blank"
                style="cursor: pointer; color: #eeeeee"
                >LinkedIn</a
              ></strong
            >
            |
            <strong
              ><a
                href="https://github.com/nikhil25803"
                target="_blank"
                style="cursor: pointer; color: #eeeeee"
                >GitHub</a
              ></strong
            >
            |
            <strong
              ><a
                href="https://twitter.com/humans_write"
                target="_blank"
                style="cursor: pointer; color: #eeeeee"
                >Twitter</a
              ></strong
            >
          </p>
        </div>
      </div>
      <div
        style="
          text-align: center;
          padding-top: 20px;
          font-size: 12px;
          color: #999999;
        "
      >
        <p>&copy; [2023] Review It. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

"""
            msg = EmailMultiAlternatives(SUBJECT, text_content, FROM, [TO])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return True
        except Exception as e:
            return False

    """Email on Response"""
    if purpose == "response":
        try:
            SUBJECT, FROM, TO = (
                data["subject"],
                settings.EMAIL_HOST_USER,
                data["to"],
            )
            text_content = f"""New Response Received"""
            html_content = f"""<!DOCTYPE html>
<html>
  <head> </head>
  <body
    style="
      font-family: Arial, sans-serif;
      margin: 10px;
      padding: 0 10px;
      background-color: #111827;
    "
  >
    <div
      style="
        max-width: 500px;
        margin: 0 auto;
        background-color: #111827;
        color: #eeeeee;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      "
    >
      <div style="text-align: center; padding-bottom: 20px">
        <h1>New <span style="color: #eab308"> Response!</span></h1>
      </div>
      <div style="line-height: 1.6; color: #eeeeee">
        <p>Hello {data["name"]}</p>
        <p>
          Looks like you received a review on your <a href="{data["resume"]}" target="_blank">Resume</a>. Let's see what they think about it.
        </p>
        <p>
          <p style="color: #eab308">Response Details</p>
          <p><span style="color: #eab308;">Mentor's Name</span> - {data['mentor_name']}</p>
          <p><span style="color: #eab308;">Mentor's Email</span> - {data['mentor_email']}</p>
          <p><span style="color: #eab308;">Mentor's Message</span> - {data["review"]}</p>

        </p>

        <p>
          If you have any questions, feel free to
          <a
            href="mailto:nikofficial25@gmail.com"
            style="cursor: pointer; color: #eeeeee"
            >Contact us</a
          >.
        </p>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p>
            <strong
              ><a
                href="https://www.linkedin.com/in/nikhil25803/"
                target="_blank"
                style="cursor: pointer; color: #eeeeee"
                >LinkedIn</a
              ></strong
            >
            |
            <strong
              ><a
                href="https://github.com/nikhil25803"
                target="_blank"
                style="cursor: pointer; color: #eeeeee"
                >GitHub</a
              ></strong
            >
            |
            <strong
              ><a
                href="https://twitter.com/humans_write"
                target="_blank"
                style="cursor: pointer; color: #eeeeee"
                >Twitter</a
              ></strong
            >
          </p>
        </div>
      </div>
      <div
        style="
          text-align: center;
          padding-top: 20px;
          font-size: 12px;
          color: #999999;
        "
      >
        <p>&copy; [2023] Review It. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
"""
            msg = EmailMultiAlternatives(SUBJECT, text_content, FROM, [TO])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return True
        except Exception as e:
            return False

    """Email on Feedback"""
    if purpose == "feedback":
        try:
            SUBJECT, FROM, TO = (
                data["subject"],
                settings.EMAIL_HOST_USER,
                data["to"],
            )
            text_content = f"""New Feedback Received"""
            html_content = f"""<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div>
      <div style="text-align: center; padding-bottom: 20px">
        <h1>New feedback <span style="color: #eab308"> received!</span></h1>
      </div>
      <p>
      <h3>From - {data["email"]}</h3>
      <p>Feedback - {data["feedback"]}</p>
      </p>
    </div>
  </body>
</html>
"""
            msg = EmailMultiAlternatives(SUBJECT, text_content, FROM, [TO])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return True
        except Exception as e:
            return False
    return False
