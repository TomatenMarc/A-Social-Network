FROM python:3.9-alpine
ENV PYTHONUNBUFFERED 1
RUN apk update && \
    apk add --virtual build-deps gcc python3-dev musl-dev && \
    apk add jpeg-dev zlib-dev libjpeg
WORKDIR /code
COPY Pipfile ./
RUN pip install pipenv
COPY Pipfile Pipfile.lock ./
RUN pipenv install
COPY ../solar ./
RUN apk del build-deps
