from flask import Blueprint, jsonify, request
from ..models import db, Student

student_bp = Blueprint('student', __name__)


# Only POST, DELETE, or ERROR returns an http status code other than 200
@student_bp.route('/', methods=['POST'])
def add_student():
    data = request.get_json()
    new_student = Student(name=data['name'], grade_level=data['grade_level'])
    
    db.session.add(new_student)
    db.session.commit()
    
    return jsonify(new_student.to_dict()), 201


@student_bp.route('/', methods=['GET'])
def get_all_student():
    students = Student.query.all()

    return jsonify([student.to_dict() for student in students])


@student_bp.route('/<int:id>', methods=['GET'])
def get_student(id):
    student = Student.query.get_or_404(id)

    return jsonify(student.to_dict())


@student_bp.route('/<int:id>', methods=['PATCH'])
def update_student(id):
    student = Student.query.get_or_404(id)
    data = request.get_json()

    if 'name' in data:
        student.name = data['name']
    if 'grade_level' in data:
        student.grade_level = data['grade_level']

    db.session.commit()

    return jsonify(student.to_dict())


@student_bp.route('/<int:id>', methods=['GET'])
def delete_student(id):
    student = Student.query.get_or_404(id)
    
    db.session.delete(student)
    db.session.commit()

    return jsonify({'message': 'Student deleted successfully!'}), 204