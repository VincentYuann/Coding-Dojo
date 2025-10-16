from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Table models for many-to-many relationships
# Students can enroll in multiple courses and courses can have multiple students
db.Table('enrollments',
    db.Column('student_id', db.Integer, db.ForeignKey('students.id')),
    db.Column('course_id', db.Integer, db.ForeignKey('courses.id'))
)


class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    grade_level = db.Column(db.Integer, nullable=False)
    courses = db.relationship('Course', back_populates="students", secondary='enrollments')

    def to_dict(self):
        return {
            'id': self.id, 
            'name': self.name,
            'grade_level': self.grade_level,
            'courses': [course.to_dict_simple() for course in self.courses]
            }
        
    def to_dict_simple(self):
        return {
            'id': self.id, 
            'name': self.name
            }


class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    number = db.Column(db.Integer, nullable=False)
    students = db.relationship('Student',  back_populates="courses", secondary='enrollments')

    def to_dict(self):
        return {
            'id': self.id, 
            'title': self.title, 
            'number': self.number,
            'students': [student.to_dict() for student in self.students]
            }
    
    def to_dict_simple(self):
        return {
            'id': self.id, 
            'title': self.title, 
            'number': self.number
            }