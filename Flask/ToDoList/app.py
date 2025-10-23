from flask import Flask, render_template, request, redirect, url_for, session, flash
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


# --- DATABASE MODELS ---
class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(25), nullable=False, unique=True)
	password_hash = db.Column(db.String(150), nullable=False)
	
	# Points to the owner attribute on the Task model
	tasks = db.relationship('Task', back_populates='owner', cascade="all, delete-orphan")

	def set_password(self, password):
		self.password_hash = generate_password_hash(password)

	def check_password(self, password):
		return check_password_hash(self.password_hash, password)
	

class Task(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	content = db.Column(db.String(100), nullable=False)
	complete = db.Column(db.Integer, default=0)
	created = db.Column(db.DateTime, default=datetime.utcnow)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	
	# A Task has one owner, which points back to the tasks attribute list on the User model
	owner = db.relationship('User', back_populates='tasks')

	def __repr__(self) -> str:
		return f"{self.id}"
	

with app.app_context():
	db.create_all()

# ---------------------------------- ROUTES ---------------------------------- #
@app.route('/', methods=['GET'])
def index():
	if "username" in session:
		return redirect(url_for('home'))
	else:
		submitted_username = session.pop('submitted_username', None)
		if not submitted_username:
			submitted_username = ''
		
		users = User.query.all()
		return render_template('login.html', users=users, submitted_username=submitted_username)


# Login route
@app.route('/login', methods=['POST'])
def login():
	username = request.form.get('username')
	password = request.form.get('password')
	user = User.query.filter_by(username=username).first()

	if user and user.check_password(password):
		session['username'] = username
		return redirect(url_for('home'))
	else:
		# Flash an error message and redirect to prevent reload bug.
		flash("Invalid username or password")
		session['submitted_username'] = username
		return redirect(url_for('index'))


# Register route
@app.route('/register', methods=['POST'])
def register():
	username = request.form.get('username', '').strip()
	password = request.form.get('password', '').strip()

	user = User.query.filter_by(username=username).first()
	if user:
		# Flash an error message and redirect.
		flash("Username already exists")
		return redirect(url_for('index'))

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
	user = session.pop("username", None)
	flash(f"You have been logged out, <strong>{user}</strong>")
	# Redirect to the main page
	return redirect(url_for('index'))


# Home page route
@app.route('/home', methods=['GET', 'POST'])
def home():
	if 'username' not in session:
		return redirect(url_for('index'))

	user = User.query.filter_by(username=session['username']).first()
	if not user:
		# If user was deleted or session is invalid, log out
		return redirect(url_for('logout'))
	
	# Add task
	if request.method == 'POST':
		currentTask = request.form['content']
		# Associate the task with the user (owner)
		newTask = Task(content=currentTask, owner=user)
		try:
			db.session.add(newTask)
			db.session.commit()
			return redirect(url_for('home'))
		except Exception as e:  
			print(f"Error: {e}")
			return "Error: {e}"
	# See current tasks
	else:
		# Filter the tasks to only show those owned by the logged in current user
		tasks = Task.query.filter_by(owner=user).order_by(Task.created).all()
		return render_template("home.html", tasks=tasks, username=f"<strong>{session['username']}</strong>")


# Delete task
@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
	# Ensure the task belongs to the current user before deleting
	user = User.query.filter_by(username=session['username']).first()
	deleteTask = Task.query.get_or_404(id)
	
	if deleteTask.owner != user:
		# If someone tries to delete a task that isn't theirs, abort.
		return "Unauthorized", 403

	try:
		db.session.delete(deleteTask)
		db.session.commit()
		return redirect(url_for('home'))
	except Exception as e:
		print(f"Error: {e}")
		return "Error: {e}"
	
# Delete user account
@app.route('/delete_user', methods=['POST'])
def delete_user():
	if 'username' not in session:
		return redirect(url_for('index'))

	try:
		user_to_delete = User.query.filter_by(username=session['username']).first()
		
		if user_to_delete:
			db.session.delete(user_to_delete)
			db.session.commit()

			# Log them out
			deleted_user = session.pop("username", None)
			flash(f"Account <strong>'{deleted_user}'</strong> deleted successfully.")
			
		return redirect(url_for('index'))
			
	except Exception as e:
		print(f"Error deleting user: {e}")
		db.session.rollback()
		return "Error deleting account.", 500


# Update task
@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
	user = User.query.filter_by(username=session['username']).first()
	task = Task.query.get_or_404(id)

	# Ensure the task belongs to the current user before updating
	if task.owner != user:
		return "Unauthorized", 403

	if request.method == 'POST':
		task.content = request.form['content']
		try:
			db.session.commit()
			return redirect(url_for('home'))
		except Exception as e:
			print(f"Error: {e}")
			return "Error: {e}"
	else:
		return render_template('edit.html', task=task)

if __name__ == '__main__':
	app.run(debug=True)
