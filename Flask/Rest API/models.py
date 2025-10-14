from flask import jsonify
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Table models for many-to-many relationships
# Students can enroll in multiple courses and courses can have multiple students
db.Table('enrollments',
    db.Column('student_id', db.Integer, db.ForeignKey('student.id')),
    db.Column('course_id', db.Integer, db.ForeignKey('course.id'))
)

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    grade_level = db.Column(db.Integer, nullable=False)
    course = db.relationship('Course', back_populates="students", secondary='enrollments', backref=db.backref('students', lazy=True))

    def __repr__(self):
        return jsonify({'id': self.id, 'username': self.username, 'email': self.email})
    
class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    number = db.Column(db.Integer, nullable=False)
    student = db.relationship('Student',  back_populates="course", secondary='enrollments', backref=db.backref('courses', lazy=True))

    def __repr__(self):
        return jsonify({'id': self.id, 'title': self.title, 'content': self.content, 'user_id': self.user_id})