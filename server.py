from flask import Flask, request
from flask_restful import Resource, Api

import random

import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

app = Flask(__name__)
api = Api(app)

# Configure Brevo API client
configuration = sib_api_v3_sdk.Configuration()
configuration.api_key['api-key'] = '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'  # Replace with your Brevo API key

# Create an instance of the API class
api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))

class SendEmail(Resource):
    def put(self):
        try:
            json_data = request.get_json(force=True)
            print(json_data)
        except ApiException as e:
            pass
    def post(self):
        try:
            json_data = request.get_json(force=True)  # Force=True ensures JSON parsing
            # Define email details
            print(json_data)
            sender = {"name": "rushil gupta", "email": "rushiling121@gmail.com"}  # Replace with your verified sender email
            to = [{"email": json_data.get("email"), "name": "Recipient Name"}]
            subject = "Test Email"
            otp = random.randint(100000,999999)
            print(otp)
            with open("email.html", "r") as file:
                html_content = file.read().replace("/n", "").replace("CONSIDER THIS A PLACEHOLDER FOR OTP", str(otp))

            # Create the email options
            send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
                to=to,
                sender=sender,
                subject=subject,
                html_content=html_content
            )

            # Send the email
            result = api_instance.send_transac_email(send_smtp_email)

            return {"DataReceived" : True, "MailSent" : True, "MailInfo" : str(result), "Mailotp":otp}, 200

        except ApiException as e:
            return{"DataReceived" : True, "MailSent" : False, "MailError" : str(e)}, 500

# Define the endpoint and the resource
api.add_resource(SendEmail, '/api/')

if __name__ == '__main__':
    app.run(debug=True)
