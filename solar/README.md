# SolAr

`solar/` is the backend of `fairing/`, which was developed with [Django](https://www.djangoproject.com/) and [Django Rest Framework](https://www.django-rest-framework.org/)

This subproject is the basis for any possible frontend like `fairing`.

Use the [Postman-Documentation](https://documenter.getpostman.com/view/13331140/TzRNFVaC) and run it locally for a detailed overview about the API.
Make sure the database is seeded with corresponding data.

## Requirements

Before using this subproject one must create the corresponding virtual environment if there is none.
Otherwise the virtual environment can be joined with the same command:

    $ pipenv shell

If the dependencies listed in `Pipfile` are not installed in the virtual environment they can be installed by using:

    $ pipenv install

If the database is not existent then the following command can be used to make all existing migrations:

    $ pipenv run python manage.py migrate

Afterwards this project should be ready to use.

## Environment

Before one can start this project a environment file must be defined regarding the mode in which this project should operate in.
Therefore the variables inside `.env` can be changed accordingly.

| Variable             | Development | Production          | Use                                                                    |
|:--------------------:|:-----------:|:-------------------:|:----------------------------------------------------------------------:|
| CORS_ORIGIN_ALLOW_ALL| True        | False               | Turn on/off cross-origin resource sharing                              |
| DEBUG                | True        | False               | For turn on/off the debug mode and the corresponding debug logging     |
| DJANGO_ALLOWED_HOSTS | *           | solar.marc-feger.de | List of strings representing the host/domain names this site can serve |
| SECRET_KEY           | ------      | ------              | For cryptographic signing. Should be a unique, unpredictable value.    |

### Development

For the development mode of this project one must specify an `.env` file like specified in the table above.
Any code changes will we validated and added after the automated refresh of the running service.

To start this project the following command can be used:

    $ pipenv run python manage.py runserver

### Database 

If any new database model has been added to the project one must add the migrations with:

    $ pipenv run python manage.py makemigrations
    
To make those migrations visible and to add them permanently to the database one must use:

    $ pipenv run python manage.py migrate
    
### Testing

Each application in this project contains test to validate the working code of this project.
To test everything one can use:

    $ pipenv run python manage.py test

To test specific applications one can use:

    $ pipenv run python manage.py <e.g. accounts or contents ...> 
