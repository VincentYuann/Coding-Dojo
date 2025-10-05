from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# My app
app = Flask(__name__) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

# Database model for row of data
class Tasks(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	content = db.Column(db.String(100), nullable=False)
	complete = db.Column(db.Integer, default=0)
	created = db.Column(db.DateTime, default=datetime.utcnow)

	def __repr__(self) -> str:
		return f"{self.id}"

# Home page route
@app.route('/', methods = ['GET', 'POST'])
def index():
	# Add task
	if request.method == 'POST':
		currentTask = request.form['content']
		newTask = Tasks(content=currentTask)
		try:
			db.session.add(newTask)
			db.session.commit()
			return redirect('/')
		except Exception as e:	
			print(f"Error: {e}")
			return "Error: {e}"
	# See current tasks
	else:
		tasks = Tasks.query.order_by(Tasks.created).all()
		return render_template("index.html", tasks = tasks)

if __name__ == '__main__':
	with app.app_context():
		db.create_all()

	app.run(debug=True)