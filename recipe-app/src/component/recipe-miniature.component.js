import React, { Component } from "react";
import photo from "./recipePhotos/default.jpg";
import StarRatingComponent from "react-star-rating-component";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../AppProvider";

export default class MiniRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      rating: 1,
      recipe: {},
      isLoaded: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.showRecipe = this.showRecipe.bind(this);
  }

  showRecipe() {
    this.props.method(this.props.recipe);
  }

  handleClick() {
    !this.state.saved
      ? axios.post("http://localhost:4000/api/user/addSavedRecipe", {
          email: this.context.user.email,
          _id: this.props.recipe._id
        })
      : axios.post("http://localhost:4000/api/user/deleteSavedRecipe", {
          email: this.context.user.email,
          _id: this.props.recipe._id
        });
    this.setState({ saved: !this.state.saved });
  }

  render() {
    const { rating } = this.state;

    const iconStyles = {
      marginLeft: 180,
      marginTop: -500
    };

    const FavoriteIcon = props => (
      <SvgIcon {...props}>
        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
      </SvgIcon>
    );

    let buttonText = this.state.saved ? "Unsave" : "Save";
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={photo} />
        <Card.Body style={{ marginTop: "-30px" }}>
          <Button
            onClick={this.handleClick}
            className="like"
            style={iconStyles}
          >
            <i className="fa fa-heart" />
            &nbsp;
            {buttonText}
          </Button>

          <Card.Title id="recipeTitle">{this.props.recipe.title}</Card.Title>
          <StarRatingComponent
            name="rate"
            editing={false}
            starCount={5}
            value={3}
          />
          <br />
          <Button onClick={this.showRecipe} variant="primary">
            <Link to="/recipe" style={{ color: "white" }}>
              Show Recipe
            </Link>
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MiniRecipe.contextType = AppContext;
