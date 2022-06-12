# Practica SW2
## First Steps
### 1 .Clone the git repo

```
git clone https://github.com/GonzaloEchevarria/SWII.git
cd SWII
```
### 2.Create the DB
> You have to create a MongoDB Database (You can use MongoDB Compass)
### 3.Load data in the DB
> Using MongoDB Compass, create an collection called 'recetas' and import the data from output.json to the collection

### 3.Download images for client (Optional, but Recomended)
> Please, [download](https://www.kaggle.com/datasets/pes12017000148/food-ingredients-and-recipe-dataset-with-images?resource=download) de Dataset.

> Copy the images of the Food Images directory in the zip file to `cliente/apps/static/recipes`

## ✨ Quick Start Server
### 1 .Install the requeriments
Depending on your operating system,make a virtual environment to avoid messing with your machine's primary dependencies
>You have to be in SWII directory
```
cd server
npm install
```
### 2. Configure the config data --CHECK!!!!!!!!!!!!

>Change the values as you need

Applies for macOS/Linux

```nano .env```

### 3. Run the application 

```
npm start
```

## ✨ Quick Start Cliente

### 1 .Create an environment
Depending on your operating system,make a virtual environment to avoid messing with your machine's primary dependencies
>You have to be in SWII directory
```
cd cliente
python3 -m venv venv
```
### 2 .Activate the environment
Navigate to the project folder and activate the environment

**Windows** 

```venv\Scripts\activate```
          
**macOS/Linux**

```. venv/bin/activate```
or
```source venv/bin/activate```

### 3 .Install the requirements

Applies for windows/macOS/Linux

```pip install -r requirements.txt```

### 4 Configure the config data --CHECK!!!!!!!!!!!!

>Change the values as you need

Applies for macOS/Linux

```nano .env```

### 5. Run the application 

```
set FLASK_APP=run
flask run
```
OR 
`python run.py`
