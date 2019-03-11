import React, { Component } from "react";
import MiniRecipe from "./recipe-miniature.component";
import { AppContext } from "../AppProvider";
import { Card, CardGroup, CardDeck, CardColumns } from "react-bootstrap";

export default class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: {},
            isLoaded: false
        };
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb = () => {
        fetch("http://localhost:4000/api/recipe/recipes")
            .then(data => data.json())
            .then(res => this.setState({ recipes: res.data, isLoaded: true }));
    };

    render() {
        let filter =
            this.props.filter.length < 1
                ? this.props.categories
                : this.props.filter;
        if (!this.state.isLoaded) return <div>Loading...</div>;
        return (
            <div>
                <AppContext.Consumer>
                    {context => <p>Hej {context.user.name}!</p>}
                </AppContext.Consumer>
                <CardColumns>
                {this.state.recipes
                    .filter(recipe =>
                        recipe.category.some(
                            cat => filter.indexOf(cat.label) >= 0
                        )
                    )
                    .map(recipe => (
                        <MiniRecipe
                            key={recipe._id}
                            recipe={recipe}
                            method={this.props.method}
                        />
                    ))}
                    </CardColumns>
            </div>
        );
    }
}

RecipeList.context = AppContext;
