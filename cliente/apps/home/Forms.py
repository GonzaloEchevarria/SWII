from flask_wtf import FlaskForm
from jinja2 import Markup
from wtforms.fields import StringField, HiddenField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, NumberRange


class RecipeForm(FlaskForm):
    Title = StringField('Titulo',validators=[DataRequired()])
    Image_Name = StringField('Imagen')
    Instructions = TextAreaField('Instrucciones',validators=[DataRequired()])
    Ingredients = TextAreaField('Ingredientes',validators=[DataRequired()])
    submit_value = Markup('Guardar')
    submit = SubmitField(submit_value)

class NutricionalForm(FlaskForm):
    ingrediente = StringField('Alimento',validators=[DataRequired()])
    submit_value = Markup('Buscar')
    submit = SubmitField(submit_value)