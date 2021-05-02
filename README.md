# Social linked Arguments

This project is the implementation of a minimal social argumentative network, which was made in the context of the master thesis: "Online argumentation and social media: What they can learn from each other".

The entire project was divided into two parts, which can be viewed separately.

For the respective individual documentations the appropriate `README.md` is to be called in the folders `solar/` respectively in `fairing/`.
There are instructions on how to start the respective subprojects as well as information on the environment variables and the respective characteristics themselves.

# Requirements :construction_worker:

This project is divided into the backend `solar/` and the frontend `fairing/`.
Accordingly, separate arrangements must be made for `solar/` and `fairing/`.

## IDEs

* [PyCharm](https://www.jetbrains.com/de-de/pycharm/)
* [Webstorm](https://www.jetbrains.com/de-de/webstorm/)

## Infrastructure :whale: 
* [Docker](https://www.docker.com/) >= 19.03.13
* [Docker-Compose](https://docs.docker.com/compose/) >= 1.27.4

## fairing/ :rocket:
* [npm](https://www.npmjs.com/) >= 7.7.6

## solar/ :sun_with_face:
* [Pipenv](https://github.com/pypa/pipenv) >= 2020.8.13
* [Python](https://www.python.org/) >= 3.9.0

# Getting things started :running:

There are several variants of how this project can be driven.
However, before both variants can be used, it is essential to ensure that the instructions in the respective subprojects `solar/` and `fairing/` have been taken into account.
Furthermore, one must join the corresponding virtual environment with all python packages installed.  

## Development

For local development, the corresponding part in `solar/` or `fairing/` must be seen in advance and the respective environment variables must be set in the corresponding subprojects.
In addition, the database entries must also be set accordingly for `solar/`.
To do this, you can also look in the corresponding `README.md`.
If these environment variables are set accordingly, both subprojects can be started as follows:

### Fairing

	$ npm --prefix fairing/ run start

### Solar

	$ pipenv run python solar/manage.py runserver

### Docker

To run both subprojects with [Docker](https://www.docker.com/) to test the production mode, a so-called [configuration](https://www.jetbrains.com/help/pycharm/run-debug-configuration.html) can be created within [PyCharm](https://www.jetbrains.com/de-de/pycharm/).

This configuration must ensure that `fairing/` is built before executing `docker-compose.dev.yml`.
For this purpose, the `build` option in `fairing/` can be selected under `Before launch` via `npm`.
In addition, the exercise variables for production operation must be set in `fairing/`.

Otherwise this can also be done manually using:

	$ npm -prefix fairing/ run build
	$ docker-compose -f docker-compose.dev.yml up
