# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from flask import Flask
from importlib import import_module
from flask_bootstrap import Bootstrap






def register_blueprints(app):
    module = import_module('apps.home.routes')
    app.register_blueprint(module.blueprint)


def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    register_blueprints(app)
    Bootstrap(app)
    return app
