FROM python:3.8

WORKDIR /tri-nit-app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

RUN pip3 install flask-cors

COPY . .

CMD ["python3", "__init__.py"]