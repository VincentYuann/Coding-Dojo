from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# My app
app = Flask(__name__) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///toDoListDatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database model for row of data
class Tasks(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	content = db.Column(db.String(100), nullable=False)
	complete = db.Column(db.Integer, default=0)
	created = db.Column(db.DateTime, default=datetime.utcnow)

	def __repr__(self) -> str:
		return f"{self.id}"
	
with app.app_context():
	db.create_all()

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
			return redirect(url_for('index'))
		# Exception is a base class for all built-in exceptions in Python 
		# as e assigns the actual exception object to e, so you can see the error message or inspect it.
		except Exception as e:	
			print(f"Error: {e}")
			return "Error: {e}"
	# See current tasks
	else:
		tasks = Tasks.query.order_by(Tasks.created).all()
		return render_template("index.html", tasks = tasks)

# Delete task
@app.route('/delete/<int:id>')
def delete(id):
	deleteTask = Tasks.query.get_or_404(id)
	try:
		db.session.delete(deleteTask)
		db.session.commit()
		return redirect(url_for('index'))
	except Exception as e:
		print(f"Error: {e}")
		return "Error: {e}"

# Update task
@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
	task = Tasks.query.get_or_404(id)
	if request.method == 'POST':
		task.content = request.form['content']
		try:
			db.session.commit()
			return redirect(url_for('index'))
		except Exception as e:
			print(f"Error: {e}")
			return "Error: {e}"
	# By clicking <a> link, you always "get", so you will land in the edit page
	else:
		return render_template('edit.html', task = task)

if __name__ == '__main__':
	app.run()