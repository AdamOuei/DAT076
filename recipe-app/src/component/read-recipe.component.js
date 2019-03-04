import React, { Component } from 'react';


export default class RecipeRead extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: this.props.recipe.title,
            ingredients: this.props.recipe.ingredients,
            instructions: this.props.recipe.instructions,
            //picture: null,
        }
    };

    render() {
        return(
            <div>
                <div>
                    <h2>{this.state.title}</h2>
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