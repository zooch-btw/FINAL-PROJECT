from flask import Flask, render_template, abort, request, jsonify, redirect, url_for
import os  # For handling file paths
import datetime  # For working with dates and times
import logging  # For logging events and errors
import hashlib  # For hashing data (e.g., passwords)
import secrets  # For generating cryptographically secure random numbers

# Initialize Flask application
app = Flask(__name__)

# Configure logging (optional, but highly recommended)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Secret key for session management (very important for security!)
# Generate a strong secret key and store it securely (e.g., environment variable)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", secrets.token_hex(24))  # Use environment variable or generate a random key

# --- Custom Error Handling ---
@app.errorhandler(404)
def page_not_found(error):
    """Handles 404 errors (page not found)."""
    logging.warning(f"404 error: {request.url} not found")
    return render_template('404.html', error=error), 404  # Create a 404.html template

@app.errorhandler(500)
def internal_server_error(error):
    """Handles 500 errors (internal server error)."""
    logging.error(f"500 error: {error}")
    return render_template('500.html', error=error), 500  # Create a 500.html template

# --- Route Definitions ---

@app.route('/')
def home():
    """
    Renders the home page (index.html).

    Code review comment: Ensure the template file exists in the 'templates' folder to avoid runtime errors.
    """
    try:
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return render_template('index.html', current_time=current_time)  # Pass data to the template
    except Exception as e:
        # Code review comment: Added error handling to catch issues like missing template files.
        logging.exception("Error rendering index.html") # Log the full exception traceback
        abort(500, description=f"Error rendering template: {e}")

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template('about.html') # Create an about.html template

@app.route('/do-something', methods=['GET', 'POST'])  # Allow both GET and POST requests
def do_something():
    """
    Handles a button click or form submission.

    Code review comment: Ensure the logic here is robust and handles edge cases if expanded in the future.
    """
    try:
        if request.method == 'POST':
            # Example: Process form data
            form_data = request.form
            name = form_data.get('name', 'Anonymous')  # Get 'name' from the form, default to 'Anonymous'
            logging.info(f"Form submitted with name: {name}")
            message = f"Hello, {name}! You submitted the form."
            return render_template('result.html', message=message) # Create a result.html template
        else:
            # Handle GET request (e.g., display a form)
            return render_template('do_something.html') # Create a do_something.html template
    except Exception as e:
        # Code review comment: Added error handling to catch unexpected issues during execution.
        logging.exception("Error processing do_something request") # Log the full exception traceback
        abort(500, description=f"Error processing request: {e}")

@app.route('/api/data')
def get_data():
    """
    Returns some data as JSON.  Example of a simple API endpoint.
    """
    data = {
        'message': 'This is some data from the API!',
        'timestamp': datetime.datetime.now().isoformat()
    }
    return jsonify(data)

@app.route('/profile/<username>')
def show_profile(username):
    """
    Displays a user profile.  Demonstrates URL parameters.
    """
    # In a real application, you would fetch user data from a database here.
    user_data = {'username': username, 'bio': 'A sample user profile.'}
    return render_template('profile.html', user=user_data) # Create a profile.html template

@app.route('/login', methods=['GET', 'POST'])
def login():
    """
    Handles user login.  Demonstrates form handling and basic authentication.
    **Important:** This is a simplified example and should not be used in production without proper security measures.
    """
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        # **VERY IMPORTANT:**  Never store passwords in plain text!
        # Hash the password before storing it in a database.
        # Use a library like bcrypt or scrypt for proper password hashing.

        # **INSECURE EXAMPLE:**  For demonstration purposes only!
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

        # In a real application, you would compare the entered username and hashed password
        # against values stored in a database.

        if username == 'testuser' and hashed_password == hashlib.sha256('password'.encode('utf-8')).hexdigest(): # **INSECURE**
            # **INSECURE:**  Store user information in a session (use Flask-Login for a robust solution)
            session['username'] = username
            logging.info(f"User {username} logged in successfully.")
            return redirect(url_for('home'))  # Redirect to the home page after successful login
        else:
            error = 'Invalid username or password'
            logging.warning(f"Failed login attempt for user: {username}")
            return render_template('login.html', error=error) # Create a login.html template
    else:
        return render_template('login.html') # Create a login.html template

from flask import session

@app.route('/logout')
def logout():
    """Logs the user out by removing the username from the session."""
    username = session.pop('username', None)  # Remove username from session, if it exists
    if username:
        logging.info(f"User {username} logged out.")
    return redirect(url_for('home'))

# --- Main Execution ---
if __name__ == '__main__':
    # Code review comment: Debug mode is enabled for development but should be disabled in production.
    # In production, use a WSGI server like Gunicorn or uWSGI.
    app.run(debug=True) #  Set debug=False in production!