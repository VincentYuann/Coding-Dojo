from ..models import db, Student, Course
from flask import Blueprint, jsonify

enroll_bp = Blueprint('enroll', __name__)


@enroll_bp.route('/<int:student_id>/courses/<int:course_id>', methods=['POST'])
def enroll_student_in_course(student_id, course_id):
    student = Student.query.get_or_404(student_id)
    course = Course.query.get_or_404(course_id)

    if course in student.courses:
        return jsonify({'message': 'Student already enrolled in this course!'}), 400

    student.courses.append(course)
    db.session.commit()

    return jsonify(student.to_dict()), 201