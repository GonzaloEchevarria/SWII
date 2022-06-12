'use strict';
const axios = require('axios').default;
const {XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');
var xpath = require('xpath'),
	parse5 = require('parse5');
const xmlser = require('xmlserializer');
const dom = require('xmldom').DOMParser;
/**
 * Obtener Un listado de nuevas recetas
 * Obtiene un listado con las nuevas recetas y sus enlaces
 *
 * returns news
 **/
exports.getNews = function() {
  return new Promise(function(resolve, reject) {
    axios.get("http://www.recetasycocina.net/rss/").then(function (response) {
		const options = { ignoreAttributes : false};
		const parser = new XMLParser(options);
		let rss = parser.parse(response.data);
		var d = [];
		for (var i = rss.rss.channel.item.length - 1; i >= 0; i--) {
			var element = rss.rss.channel.item[i];
			console.log(element);
			d.push(axios.get(element.link));
		}
		Promise.all(d).then((values) => {
			var data = [];
			for (var i = values.length - 1; i >= 0; i--) {
				var value = values[i];
				if(value.status != 200) {
					reject({codigo: 500, descripcion: "Se ha producido un error"});
					return;
				}
				//const node = xpath.fromPageSource(value.data);
				var doc = parse5.parse(value.data);
				const xhtml = xmlser.serializeToString(doc);
    			const d = new dom().parseFromString(xhtml);
    			const select = xpath.useNamespaces({"x": "http://www.w3.org/1999/xhtml"});
				var a = String(select("//text()[preceding-sibling::x:h2[//preceding-sibling::x:div[@class='registroDescripcion']] and following-sibling::x:h2[//preceding-sibling::x:div[@class='registroDescripcion']]]",d).toString());
				a = a.split("\t").join("").split("\n");
				a = a.filter((input) => {
					return input != "";
				});
				var image = select("//x:img[@itemprop='photo']/@src",d)[0];
				if(image != undefined) image = image.value;
				else image = null;
				data.push({
					Title: select("//x:h1[@itemprop='name']/text()",d).toString(),
					Image_Name: image,
					Instructions: select("//x:div[@itemprop='instructions']/text()",d).toString(),
					Ingredients: a
				});
			}
			resolve(data);
		})
    }).catch(function(error) {
	    console.log(error);
    	reject({codigo: 500, descripcion: "Se ha producido un error"});
    });
  });
}