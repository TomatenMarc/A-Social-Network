FROM python:3.9-alpine
ENV PYTHONUNBUFFERED 1
RUN apk update && \
    apk add --virtual build-deps gcc python3-dev musl-dev build-base linux-headers && \
    apk add jpeg-dev zlib-dev libjpeg pcre-dev
WORKDIR /code
COPY Pipfile ./
RUN pip install pipenv
COPY Pipfile Pipfile.lock ./
RUN pipenv install
COPY . ./
RUN apk del build-deps
