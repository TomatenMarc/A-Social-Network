import os
from setuptools import find_packages, setup

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as readme:
    README = readme.read()

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name='sofame',
    version='0.0.2.20',
    packages=find_packages(),
    include_package_data=True,
    license='MIT License',
    description='A simple SOcial FrAMEork to enable the development of social networks sites with Django.',
    long_description=README,
    long_description_content_type="text/markdown",
    url='http://www.marc-feger.de/',
    author='Marc Feger',
    author_email='yourname@example.com',
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Framework :: Django :: 3.1',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 3.9'
    ],
)
