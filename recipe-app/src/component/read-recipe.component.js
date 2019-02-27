import React, { Component } from 'react';
import axios from 'axios';

export default class Recipe extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: null,
            ingredients: null,
            instructions: null,
            //picture: null,

        }
    };

    componentDidMount(){
        axios.get("http://localhost:4000/api/recipe/getRecipe")
            .then(res => {
                this.setState({ 
                    name: res.body.title, 
                    ingredients: res.body.ingredients,
                    instructions: res.body.instructions});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return(
            <div>
                <div>
                    <h2>{this.state.name}</h2>
                </div>
                <div>
                    <p>{this.state.ingredients}</p>
                </div>
                <div>
                    <p>{this.state.instructions}</p>
                </div>
            </div>
        )
    }
}