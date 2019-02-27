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

userRoutes.post('/getUserInfo', (req, res) => {
    User.findOne({ "name": "Hanna" }, (error, result) => {
        if (error) {
            return res.json({ success: false, error: error });
        }
        return res.json({ success: true, data: result });
    })
})

userRoutes.post('/update', (req, res) => {
    const { email, name, password } = req.body;
    console.log(email);
    User.findOneAndUpdate({ email: email }, { name: name, password: password }, (error) => {
        if (error) return res.json({ success: false, error: error })
        return res.json({ success: true });
    })
})

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
    })
})

app.use('/api/recipe', recipeRoutes);
app.use('/api/user', userRoutes);