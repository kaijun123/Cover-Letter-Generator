from flask import (
    Flask,
    request,
    Response,
)
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
import util

# Load environment variables from a .env file located in the same directory.
load_dotenv()

# Initialize a Flask application. Flask is used to create and manage the web server.
app = Flask(__name__)

# Apply CORS to the Flask app which allows it to accept requests from all domains.
# This is especially useful during development and testing.
CORS(app)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize the generative model with the specified model name.
# This model will be used to process user inputs and generate responses.
model = genai.GenerativeModel(model_name="gemini-1.5-flash")


@app.route("/generate", methods=["POST"])
def generate():
    """Processes user input and returns AI-generated responses.

    This function handles POST requests to the '/chat' endpoint. It expects a JSON payload
    containing a user message and an optional conversation history. It returns the AI's
    response as a JSON object.

    Args:
        None (uses Flask `request` object to access POST data)

    Returns:
        A JSON object with a key "text" that contains the AI-generated response.
    """
    # Parse the incoming JSON data into variables.
    data = request.json
    name = data.get("name", "")
    company = data.get("company", "")
    industry = data.get("industry", "")
    role = data.get("role", "")
    role_type = data.get("role_type", "")
    experiences = data.get("experiences", "")
    reason = data.get("reason", "")

    # Generate the message
    message = util.generate_message(
        name, company, industry, role, role_type, experiences, reason
    )
    response = model.generate_content(message)

    return {"text": response.text}


# Configure the server to run on port 9000.
if __name__ == "__main__":
    app.run(port=os.getenv("PORT"))
