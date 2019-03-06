import React, { Component } from "react";
import axios from "axios";
import MiniRecipe from "./recipe-miniature.component";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import EditUser from './edit-user';

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            savedRecipes: {},
            ownRecipes: {}
        }
    }

    render() {
        return (
            <div id="userProfile">
                <div id="UserInfo">
                    <h1>User Info</h1>
                    <h3 id="userName">{this.state.name}</h3>
                    <p>Email: {this.state.email}</p>
                    <Router>
                        <div>
                            <Link to="/editUser">
                                <button>Edit info</button>
                            </Link>
                            <Route path="/editUser" component={EditUser} />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

/*
<div id="savedRecipes">
         <h1>Saved recipes</h1>
         <div>
         {this.state.savedRecipes.map(recipe => (<MiniRecipe key={recipe._id} recipe={recipe} />))}
         </div>
        </div>

        <div id="ownRecipes">
            <h1>Recipes created by you</h1>
            <div>
            {this.state.createdRecipes.map(recipe => (<MiniRecipe key={recipe._id} recipe={recipe} />))}
            </div>
        </div>
*/