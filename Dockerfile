FROM python:3.9-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /code
COPY Pipfile ./
RUN pip install pipenv
COPY Pipfile Pipfile.lock ./
RUN pipenv install
COPY . ./
