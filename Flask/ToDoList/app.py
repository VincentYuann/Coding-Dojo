from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# My app
app = Flask(__name__, instance_relative_config=True)
app.secret_key = "dajhsdwkajdjoiwu8293490234ij12iIJ@#)(!J@@_)JKE"

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///toDoListDatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# Database model for row of data
class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(25), nullable=False, unique=True)
	password_hash = db.Column(db.String(150), nullable=False)
	
	tasks = db.relationship('Tasks', back_populates='users')

	def set_password(self, password):
		self.password_hash = generate_password_hash(password)

	def check_password(self, password):
		return check_password_hash(self.password_hash, password)
	

class Tasks(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	content = db.Column(db.String(100), nullable=False)
	complete = db.Column(db.Integer, default=0)
	created = db.Column(db.DateTime, default=datetime.utcnow)
	users_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	
	users = db.relationship('User', back_populates='tasks')

	def __repr__(self) -> str:
		return f"{self.id}"
	

with app.app_context():
	db.create_all()

# ---------------------------------- Routes ---------------------------------- #
# Login route
@app.route('/', methods=['GET', 'POST'])
def index():
	if "username" in session:
		return redirect(url_for('home'))
	return render_template('login.html')


@app.route('/login', methods = ['POST'])
def login():
	username = request.form['username']
	password = request.form['password']
	user = User.query.filter_by(username=username).first()
	
	if user and user.check_password(password):
		session['username'] = username
		return redirect(url_for('home'))
	else:
		return render_template('login.html', error="Invalid username or password")


# Register route
@app.route('/register', methods = ['POST'])
def register():
	username = request.form['username']
	password = request.form['password']
	user = User.query.filter_by(username=username).first()

	if user:
		return render_template('login.html', error="Username already exists")
	else:
		new_user = User(username=username)
		new_user.set_password(password)
		db.session.add(new_user)
		db.session.commit()
		session['username'] = username
		return redirect(url_for('home'))


# logoout route
@app.route('/logout')
def logout():
	session.pop("username", None)
	return redirect(url_for('login'))


# Home page route
@app.route('/home', methods = ['GET', 'POST'])
def home():
	# Add task
	if request.method == 'POST':
		currentTask = request.form['content']
		newTask = Tasks(content=currentTask)
		try:
			db.session.add(newTask)
			db.session.commit()
			return redirect(url_for('home'))
		# Exception is a base class for all built-in exceptions in Python 
		# as e assigns the actual exception object to e, so you can see the error message or inspect it.
		except Exception as e:	
			print(f"Error: {e}")
			return "Error: {e}"
	# See current tasks
	else:
		tasks = Tasks.query.order_by(Tasks.created).all()
		return render_template("home.html", tasks=tasks)


# Delete task
@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
	deleteTask = Tasks.query.get_or_404(id)
	try:
		db.session.delete(deleteTask)
		db.session.commit()
		return redirect(url_for('home'))
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
			return redirect(url_for('home'))
		except Exception as e:
			print(f"Error: {e}")
			return "Error: {e}"
	# By clicking <a> link, you always "get", so you will land in the edit page
	else:
		return render_template('edit.html', task=task)


if __name__ == '__main__':
	app.run(debug=True)