from flask import Flask
from .models import db
from .routes.main_route import main_bp
from .routes.student_routes import student_bp
from .routes.course_routes import course_bp
from .routes.enrollments import enroll_bp
import os

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    # --- Configuration ---
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///school.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JSON_SORT_KEYS'] = False # To preserve the dictionary key orders in JSON responses
    
    # --- Initialize Extensions ---
    db.init_app(app)

    # --- Register Blueprints ---
    app.register_blueprint(main_bp)
    app.register_blueprint(student_bp, url_prefix='/students')
    app.register_blueprint(course_bp, url_prefix='/courses')
    app.register_blueprint(enroll_bp, url_prefix='/enroll/students')

    return app