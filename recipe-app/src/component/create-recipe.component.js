import React, { Component } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

const options = [
  { label: "Kyckling", value: 1 },
  { label: "Vegetariskt", value: 2 },
  { label: "Grekiskt", value: 3 },
  { label: "Fisk", value: 4 },
  { label: "Asiatiskt", value: 5 }
];

export default class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    /*Preliminary strings, change to lists if possible, or parse them*/
    this.state = {
      title: "",
      ingredients: "",
      instructions: "",
      categories: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    console.log(event.target);
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log("Recipe created");
    console.log(`Title: ${this.state.title}`);
  };

  render() {
    return (
      /*TODO: Make into a form so that we can setStates above*/

      <div>
        <p>Create Recipe</p>
        <div className="container">
          <div className="row mt-5">
            <div className="col-sm-12">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Title:
                  <input
                    id="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <label>
                  Ingredients:
                  <textarea
                    id="ingredients"
                    value={this.state.ingredients}
                    onChange={this.handleChange}
                  />
                </label>
                <br />

                <label>
                  Instructions:
                  <textarea
                    id="instructions"
                    value={this.state.instructions}
                    onChange={this.handleChange}
                  />
                </label>
                <br />

                <label>
                  Category:
                  <ReactMultiSelectCheckboxes options={options} />
                </label>
                <br />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*   render() {
        return (
            <div>
                <p>CreateRecipe</p>
            </div>
        )
    } 
   
}
 */
