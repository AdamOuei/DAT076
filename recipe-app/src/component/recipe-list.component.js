import React, { Component } from "react";
import MiniRecipe from "./recipe-miniature.component";
import { AppContext } from "../AppProvider";
import { CardColumns } from "react-bootstrap";
import axios from "axios";
import { HamburgerButton } from "react-hamburger-button";

export default class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: {},
            savedRecipes: [],
            open: true,
            isLoaded: false,
            savedLoaded: false
        };
        this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getSavedRecipes();
        this.getDataFromDb();
        this.props.showMenu();
    }

    componentWillUnmount() {
        this.props.closeMenu();
    }

    isRecipeSaved(id) {
        for (let i = 0; i < this.state.savedRecipes.length; i++) {
            if (this.state.savedRecipes[i] === id) {
                console.log(id);
                console.log(this.state.savedRecipes[i])
                return true;
            }
        }
        return false;
    }

    getSavedRecipes() {
        axios
            .post("http://localhost:4000/api/user/getUserInfo", {
                email: localStorage.getItem("userEmail")
            })
            .then(res => res.request.response)
            .then(res => {
                this.setState({
                    savedRecipes: JSON.parse(res).data.saved,
                    savedLoaded: true
                });
                console.log(this.state.savedRecipes);
            });
    }

    handleClick() {
        this.props.showMenu();
        this.setState({
            open: !this.state.open
        });
    }

    getDataFromDb = () => {
        fetch("http://localhost:4000/api/recipe/recipes")
            .then(data => data.json())
            .then(res => {
                this.setState({ recipes: res.data, isLoaded: true });
            });
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
        if (!this.state.isLoaded || !this.state.savedLoaded)
            return <div>Loading...</div>;
        return (
            <div>
                <div className="wrapper">
                    <div id="hamburger">
                        <HamburgerButton
                            open={this.state.open}
                            onClick={this.handleClick.bind(this)}
                            width={18}
                            height={15}
                            strokeWidth={1}
                            color="black"
                            animationDuration={0.5}
                        />
                    </div>
                    <div id="user">
                        <AppContext.Consumer>
                            {context => {
                                if (context.isLoggedIn) {
                                    return <p>Welcome {context.user.name}!</p>;
                                } else {
                                    return (
                                        <p>
                                            Please login to enjoy all our
                                            awesome features
                                        </p>
                                    );
                                }
                            }}
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
                                saved={this.isRecipeSaved(recipe._id)}
                            />
                        ))}
                </CardColumns>
                <style>{`
                    .wrapper {
                        width: 100%;
                        overflow: hidden;
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }
                    #hamburger {
                        width: 40px !important;
                        height: 40px !important;
                        float;
                        z-index:999;
                        background: #e0e0e0;
                        border-radius: 50%;
                        box-shadow: 2px 2px 2px grey;
                    }
                    #hamburger div {
                        margin: auto;
                        margin-top: 12px;
                    }

                    #user {
                        width: 100%;
                        text-align: center;
                    }
                    #user p {
                        text-align: center;
                    }
                `}</style>
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
                    crossOrigin="anonymous"
                />
            </div>
        );
    }
}

RecipeList.context = AppContext;
