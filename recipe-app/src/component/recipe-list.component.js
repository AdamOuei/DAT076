import React, { Component } from "react";
import MiniRecipe from "./recipe-miniature.component";
import { AppContext } from "../AppProvider";
import { CardColumns } from "react-bootstrap";

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

    formatCategories() {
        let res = [];
        this.props.categories.forEach(element => {
            res.push(element.category);
        });
        return res;
    }

    render() {
        let filter =
            this.props.filter.length < 1
                ? this.formatCategories()
                : this.props.filter;
        if (!this.state.isLoaded) return <div>Loading...</div>;
        return (
            <div>
                <div className="wrapper">
                    <div id="hamburger">
                        <button
                            type="button"
                            id="sidebarCollapse"
                            className="navbar-btn"
                            onClick={this.props.showMenu}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                    <div id="user">
                        <AppContext.Consumer>
                            {context => <p>Hej{context.user.name}!</p>}
                        </AppContext.Consumer>
                    </div>
                </div>
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
                <style>{`
                    .wrapper {
                        width: 100%;
                        overflow: hidden;
                    }
                    #hamburger {
                        float;
                    }
                    #user {
                        margin-left: 270px;
                    }
                `}</style>
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
                    crossorigin="anonymous"
                />
            </div>
        );
    }
}

RecipeList.context = AppContext;
