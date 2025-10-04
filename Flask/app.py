from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

# My app
app = Flask(__name__) 

# Home page route
@app.route('/')
def index():
	return render_template("index.html")

if __name__ == '__main__':
	app.run(debug=True)