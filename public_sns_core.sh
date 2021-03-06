#!/bin/bash
mkdir pypi/sofame
touch pypi/sofame/__init__.py
cp -r solar/accounts solar/authentication solar/contents solar/media solar/search pypi/sofame
cd pypi/
python setup.py sdist -d package/