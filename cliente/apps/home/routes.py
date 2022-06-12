# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""
import json

from apps.connectors.Connector import getRecetas, putReceta, getReceta, postReceta, deleteReceta, getNewsRecetas, \
    getNutricional
from apps.home import blueprint
from flask import render_template, request, redirect, url_for, flash, get_flashed_messages, jsonify
from jinja2 import TemplateNotFound

from apps.home.Forms import RecipeForm, NutricionalForm


@blueprint.route('/')
def home():
    return redirect(url_for('home_blueprint.index'))

@blueprint.route('/recetas', methods=['GET'])
def recetas():
    try:
        if "page" in request.args:
            try:
                page = int(request.args["page"])
            except:
                page =1
                flash("Numero de pagina no valido", category="error")
        else:
            page=1
        res = getRecetas(page=page)
        if res.status_code ==200:
            res = res.json()
        else:
            flash(res.json()["descripcion"], category="error")
            res = None
    except:
        flash("Se ha producido un error al conectarse a la API", category="error")
        res = None
    return render_template('home/recetas.html', data=res,segment='recetas')


@blueprint.route('/receta', methods=['GET','POST'])
def new_receta():
    form = RecipeForm()

    if form.validate_on_submit():
        a = dict()
        a["Title"] = form.Title.data
        a["Image_Name"] = form.Image_Name.data if form.Image_Name.data != "" else None
        a["Instructions"] = form.Instructions.data.replace("\r\n", "\n")
        a["Ingredients"] = form.Ingredients.data.split("\r\n")
        response = postReceta(json.dumps(a))
        if response.status_code==201:
            flash("Receta creada correctamente", category="success")
            return redirect(url_for('home_blueprint.edit_receta', id=response.json()["id"]))
        else:
            flash(response.json()["descripcion"], "error")
    return render_template('home/crear_receta.html', segment='new_receta', form=form)


@blueprint.route('/receta/<int:id>', methods=['GET','POST'])
def edit_receta(id):
    form = RecipeForm()
    if form.validate_on_submit():
        a = dict()
        a["Title"] = form.Title.data
        a["Image_Name"] = form.Image_Name.data
        a["Instructions"] = form.Instructions.data.replace("\r\n", "\n")
        a["Ingredients"] = form.Ingredients.data.split("\r\n")
        response = putReceta(json.dumps(a), id)
        if response.status_code == 200:
            flash("Receta editada correctamente", category="success")
        else:
            flash("Error en el servidor: " + response.json()["descripcion"], "error")
            return redirect(url_for('home_blueprint.recetas'))
    a = getReceta(id)
    if a.status_code == 200:
        data = a.json()
        data["Ingredients"] = "\r\n".join(data["Ingredients"])
    else:
        flash("Error en el servidor: " + a.json()["descripcion"], "error")
        return redirect(url_for('home_blueprint.recetas'))
    form.Title.data = data["Title"]
    form.Instructions.data = data["Instructions"]
    form.Ingredients.data = data["Ingredients"]
    form.Image_Name.data = data["Image_Name"]
    return render_template('home/editar_receta.html',id=id, segment='new_receta', form=form)

@blueprint.route('/receta/<int:id>/remove', methods=['GET','POST'])
def delete_receta(id):
    response = deleteReceta(id)
    if response.status_code==200:
        flash("Receta eliminada correctamente", "success")
        return redirect(url_for('home_blueprint.recetas'))
    else:
        flash(response.json()["descripcion"], "error")
        return redirect(url_for('home_blueprint.edit_receta'))

@blueprint.route('/news')
def news():
    try:
        res = getNewsRecetas()
        if res.status_code == 200:
            res = res.json()
        else:
            flash(res.json()["descripcion"], category="error")
            res = None
    except:
        flash("Se ha producido un error al conectarse a la API", category="error")
        res = None
    return render_template('home/nuevas_recetas.html', data=res, segment='news')

@blueprint.route('/nutricional', methods=['GET','POST'])
def nutricional():
    form = NutricionalForm()
    data=None
    if form.validate_on_submit():
        response = getNutricional(form.ingrediente.data)
        if response.status_code == 200:
            data = response.json()
        else:
            flash(response.json()["descripcion"], category="error")
    return render_template('home/nutricional.html', form=form, data=data, segment='nutricional')

@blueprint.route('/index')
def index():
    return render_template('home/index.html', segment='index')


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None
@blueprint.errorhandler(404)
def error404(err):
    return render_template("home/page-404.html"), 404