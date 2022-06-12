import requests
from flask import current_app


def getRecetas(page=1, search=None):
    servidor_url = current_app.config['API_SERVER']
    page_size = 10
    params = {
        "page": page,
        "page_size": page_size
    }
    if search:
        params["search"] = search
    response = requests.get("{}/recetas".format(servidor_url), params=params)
    return response


def postReceta(receta):
    servidor_url = current_app.config['API_SERVER']
    response = requests.post("{}/recetas".format(servidor_url), headers={"Content-Type": "application/json"},
                             data=receta)
    return response


def getReceta(id):
    servidor_url = current_app.config['API_SERVER']
    response = requests.get("{}/recetas/{}".format(servidor_url, str(id)))
    return response


def putReceta(receta, id):
    servidor_url = current_app.config['API_SERVER']
    response = requests.put("{}/recetas/{}".format(servidor_url, str(id)),
                             headers={"Content-Type": "application/json"}, data=receta)
    return response

def deleteReceta(id):
    servidor_url = current_app.config['API_SERVER']
    response = requests.delete("{}/recetas/{}".format(servidor_url, str(id)))
    return response


def getNewsRecetas():
    servidor_url = current_app.config['API_SERVER']
    response = requests.get("{}/recetas/news".format(servidor_url))
    return response

def getNutricional(alimento):
    servidor_url = current_app.config['API_SERVER']
    response = requests.get("{}/nutricional_info".format(servidor_url), params={"ingrediente": alimento})
    return response
