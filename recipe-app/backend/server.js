const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const User = require('./user.model');
const Recipe = require('./recipe.model');
const recipeRoutes = express.Router();
const userRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://recipe-user:recipe-password@cluster0-shard-00-00-tky9f.mongodb.net:27017,cluster0-shard-00-01-tky9f.mongodb.net:27017,cluster0-shard-00-02-tky9f.mongodb.net:27017/recipe-db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established succesfully");
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

userRoutes.post('/add', (req, res) => {
    let user = new User();
    user.id = req.body.id;
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(error => {
        if (error) return res.json({ success: false, error: error });
        console.log(user.id);
        console.log(user.name);
        return res.json({ success: true });
    });
});

recipeRoutes.post('/add', (req, res) => {
    console.log("In add recipe")
    let recipe = new Recipe();
    recipe.id = req.body.id;
    recipe.title = req.body.title;
    recipe.ingredients = req.body.ingredients;
    recipe.instructions = req.body.instructions;
    recipe.category = req.body.category;

    recipe.save(error => {
        if (error) return res.json({ success: false, error: error });
        console.log(recipe.category);
        return res.json({ success: true });
    });
});

recipeRoutes.get('/recipes', (req, res) => {
    Recipe.find((err, data) => {
        if(err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    });
});

recipeRoutes.get('getRecipe', (req, res) => {
    const {id} = req.body;
    Recipe.findById(id, (err, data) => {
        if(err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    })
})

app.use('/api/recipe', recipeRoutes);
app.use('/api/user', userRoutes);









/*
app.get('/', function (req, res) {
    res.send('Hello World');
});

app.post('/add', function (req, res) {
    connection.collection('recipe').insertOne(req.body, (error, result) => {
        if (error) return console.log(error);
        console.log("Added one recipe");
        console.log(req.body);
    });
});

app.post('/delete', function (req, res) {
    connection.collection('recipe').deleteOne({ "_id": req.body }, (error, result) => {
        if (error) return console.log(error);
        console.log("Deleted one recipe");
    });
});

app.get('/recipe', function (req, res) {
    connection.collection('recipe').findOne({ "_id": req.body }, (error, result) => {
        if (error) return console.log(error);
        console.log("Got one recipe");
    })
});

/*
app.use('/recipe', recipeRoutes);

recipeRoutes.route('/').get(function (req, res) {
    Recipe.find(function (err, recipe) {
        if (err) {
            console.log("Bajs");
        } else {
            res.json(recipe);
        }
    });
});

recipeRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Recipe.findById(id, function (err, recipe) {
        res.json(recipe);
    });
});

recipeRoutes.route('/add').post(function (req, res) {
    let recipe = new Recipe(req.body);
    recipe.save().then(recipe => {
        res.status(200).json({ 'recipe': 'recipe added successfully' });
        console.log(recipe);
    }).catch(err => {
        res.status(400).send('adding new recipe failed');
    });
});
*/
