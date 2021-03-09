#!/bin/bash
#mkdir pypi/sofame
touch pypi/__init__.py
cp -r solar/accounts solar/authentication solar/contents solar/media solar/search pypi/
cd pypi/
python setup.py sdist -d package/
twine check package/*
twine upload --repository-url https://test.pypi.org/legacy/ --skip-existing --non-interactive -u ${PYPI_USER} -p ${PYPI_PWD} package/*