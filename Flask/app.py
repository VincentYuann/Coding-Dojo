from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

# My app
app = Flask(__name__) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class MyModel(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80), unique=True, nullable=False)

	def __repr__(self):
		return f'<MyModel {self.name}>'

# Home page route
@app.route('/')
def index():
	return render_template("index.html")

if __name__ == '__main__':
	app.run(debug=True)