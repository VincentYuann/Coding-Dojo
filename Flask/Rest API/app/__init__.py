from flask import Flask
from .models import db
from .routes.main_route import main_bp
from .routes.student_routes import student_bp
from .routes.course_routes import course_bp
import os

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    basedir = os.path.abspath(os.path.dirname(__file__))

    # --- Configuration ---
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'school.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # --- Initialize Extensions ---
    db.init_app(app)

    # --- Register Blueprints ---
    app.register_blueprint(main_bp)
    app.register_blueprint(student_bp, url_prefix='/students')
    app.register_blueprint(course_bp, url_prefix='/courses')

    return app