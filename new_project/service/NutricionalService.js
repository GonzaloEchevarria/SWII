'use strict';
const axios = require('axios').default;

/**
 * Obtener información nutricional de un alimento
 * obtiene información nutricional de un alimento
 *
 * ingrediente alimento Nombre del alimento
 * returns nutricional
 **/
exports.getNutricional = function(ingrediente) {
  return new Promise(function(resolve, reject) {
    const options = {
      method: 'GET',
      url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
      params: {query: ingrediente},
      headers: {
        'X-RapidAPI-Key': '4de6801946msh80f3af068ca5b2dp12455fjsn40865fb6d7c9',
        'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      if(response.data.items.length == 0) reject({codigo: 404, descripcion: "No se ha encontrado ningún alimento con ese nombre."});
      else {
        let elemento = response.data.items[0];
        resolve(
        {
          protein: elemento.protein_g,
        cholesterol: elemento.cholesterol_mg,
        calories: elemento.calories,
        sugar: elemento.sugar_g,
        racion: elemento.serving_size_g
        });
      }
    }).catch(function (error) {
      console.error(error);
      reject({codigo: 500, descripcion: "Se ha producido un error"});
    });
  });
}

