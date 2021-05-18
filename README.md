# <img src="https://solar.marc-feger.de/static/media/logo.d75338ab.jpg" alt="drawing" width="100"/> Social linked Arguments

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
Make sure to use the corresponding virtual environment for `solar/` and make sure to run the command in the right location.
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

## Production

Again, make sure that the appropriate environment variables from `solar/` and `fairing/` have been set for production mode.

If the entire project is to be put into production mode, then if there is no folder `certbot/` with an existing SSL certificate, `init-letsencrypt.sh` must be downloaded.
This can be done by using the following command:

	 $ curl -L https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh > init-letsencrypt.sh

Accordingly, the `domains` and `data_path` fields in `init-letsencrypt.sh` must be adjusted to meet the specifications in `docker-compose.prod.yml`.
Also, the `docker-compose` calls must be modified s.t. `docker-compose.prod.yml` is used.

`letsencrypt.sh` can then be run as follows:

	$ chmod +x init-letsencrypt.sh
	$ ./init-letsencrypt.sh

This will create an initial certificate in `certbot/`.

After doing this, the entire project is up and running and can be used to renew certificates or reboot using the following command.

	$ docker-compose -f docker-compose.prod.yml restart

However, if a certificate already exists and the project has not yet been started, the entire project can be started using the following command.

	$ docker-compose -f docker-compose.prod.yml up -d
