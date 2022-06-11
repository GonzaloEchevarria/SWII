'use strict';


/**
 * Obtener información nutricional de un alimento
 * obtiene información nutricional de un alimento
 *
 * ingrediente alimento Nombre del alimento
 * returns nutricional
 **/
exports.getNutricional = function(ingrediente) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "protein" : 6.027456183070403,
  "cholesterol" : 1.4658129805029452,
  "calories" : 5.962133916683182,
  "sugar" : 0.8008281904610115
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

