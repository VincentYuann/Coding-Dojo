from flask import Blueprint, jsonify, request
from ..models import db, Course

course_bp = Blueprint('course', __name__)


# Only POST, DELETE, or ERROR returns an http status code other than 200
@course_bp.route('/', methods=['POST'])
def add_course():
    data = request.get_json()
    new_course = Course(title=data['title'], number=data['number'])

    db.session.add(new_course)
    db.session.commit()

    return jsonify({'message': 'Course added successfully!'}), 201


@course_bp.route('/', methods=['GET'])
def get_courses():
    courses = Course.query.all()

    return jsonify([courses.to_dict() for course in courses])


@course_bp.route('/<int:id>', methods=['GET'])
def get_course(id):
    course = Course.query.get_or_404(id)

    return jsonify(course.to_dict())
    

@course_bp.route('/<int:id>', methods=['DELETE'])
def delete_course(id):
    course = Course.query.get_or_404(id)
    
    db.session.delete(course)
    db.session.commit()

    return jsonify({'message': 'Course deleted successfully!'}), 204