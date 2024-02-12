# Instructions for running the project

## Installation

To install the app, you need to have the following requirements:

- Python min version 3.11
- pip min version 21.3
- virtualenv min version 20.8
- PostgreSQL min version 13.4

After you have installed the requirements, you can install the app by following the steps below:

1. Unzip the file
2. Open the terminal and navigate to the project folder
3. Install virtual environment:
	https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/
	python3 -m venv .venv
	source .venv/bin/activate

4. Installing the project package:
	python3 -m pip install -r requirements.txt

5. Create Database postgres:
	sudo su postgres
	psql
	Create Database clincs;
	\q
	exit

6. Migrate database, createsuperuser and run project:

	python3 manage.py migrate
	python3 manage.py createsuperuser
	python3 manage.py runserver

You can follow the official Django documentation for more information on how to install the app.
https://docs.djangoproject.com/en/3.2/

	
