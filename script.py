from flask import Flask, render_template, abort

app = Flask(__name__)

@app.route('/')
def home():
    # Code review comment -> Ensure the template file exists in the 'templates' folder to avoid runtime errors.
    try:
        return render_template('index.html')
    except Exception as e:
        # Code review comment -> Added error handling to catch issues like missing template files.
        abort(500, description=f"Error rendering template: {e}")

@app.route('/do-something')
def do_something():
    # Code review comment -> Ensure the logic here is robust and handles edge cases if expanded in the future.
    try:
        # Your Python logic here
        return "You clicked the button! Python code executed."
    except Exception as e:
        # Code review comment -> Added error handling to catch unexpected issues during execution.
        abort(500, description=f"Error processing request: {e}")

if __name__ == '__main__':
    # Code review comment -> Debug mode is enabled for development but should be disabled in production.
    app.run(debug=True)
