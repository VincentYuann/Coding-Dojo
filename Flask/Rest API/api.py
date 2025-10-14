from flask import Flask
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'school.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Create the database and the database tables
with app.app_context():
    db.create_all()

# API Endpoints
@app.route('/')
def index():
    return jsonify({"message": "Welcome to the student and course restful API!"})

# GET: Retrieves data from the server.
@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([{'id': student.id, 'name': student.name, 'grade_level': student.grade_level} for student in students])

# POST: Creates new data on the server.
@app.route('/courses', methods=['POST'])
def get_courses():
    courses = Course.query.all()
    return jsonify([{'id': course.id, 'title': course.title, 'number': course.number} for course in courses])

# PUT: Updates existing data on the server.
@app.route('/students', methods=['PUT'])
def add_student():

# DELETE: Removes data from the server.
@app.route('/courses', methods=['DELETE'])
def add_course():
    return jsonify({'message': 'Course added successfully!'}), 201

if __name__ == '__main__':
    app.run(debug=True)