from Flask import Flask
from sqlalchemy import SQLAlchemy

app = Flask(__name__) 

app.route('/')
def index():
	return 'Hello, Flask!'

if __name__ == '__main__':
	app.run(debug=True)
	print("Hello World")