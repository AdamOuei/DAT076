import React, { Component } from "react";
import axios from "axios";
import MiniRecipe from "./recipe-miniature.component";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import EditUser from "./edit-user";
import { AppContext } from "../AppProvider";



export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Sigge Catson",
      email: "ciggzigg@bajs.se",
      password: "",
      saved: ["5c82a99079f5751970b1fde6", "5c82cf202e2f5c28c5c6e23a"],
      savedRecipes: [],
      created: ["5c82cf202e2f5c28c5c6e23a", "5c82a99079f5751970b1fde6"],
      createdRecipes: [],
      isLoaded: false,
    };
  }


  componentWillMount() {
    this.checkIfLoggedIn();
  }




  checkIfLoggedIn() {
    if (!this.context.isLoggedIn) {
      this.props.history.push("/");
    }
  }


  //Get whole recipes from the users saved id
  setSavedRecipes() {
    for (var i = 0; i < this.state.saved.length; i++) {

      this.getRecipeById(this.state.saved[i], "saved");
    }
  }

  //Get whole recipes from the users created id
  setCreatedRecipes() {
    for (var i = 0; i < this.state.created.length; i++) {

      this.getRecipeById(this.state.created[i], "created");
    }
  }

  //Get recipes by id
  getRecipeById(num, type) {
    console.log("In get recipe by id");

    axios.post("http://localhost:4000/api/recipe/getRecipeById", { _id: num })
      .then(res => {
        if (type === "saved") {
          this.setState({ savedRecipes: this.state.savedRecipes.concat(res.data) })
        } else {
          this.setState({ createdRecipes: this.state.createdRecipes.concat(res.data) })
        }

        /*   if(this.state.saved.length === this.state.savedRecipes.length){
               this.setState({isLoaded: true});
               
               
           }
       */
      })
  }

  /*   getUserInfo(userName){
         axios.post("http://localhost:4000/api/user/getUserInfoTest", {name: userName})
         .then(res => {
             this.setState({ created: res.data.created, saved: res.data.saved});
         })
         
     }
 
 */
  componentDidMount() {
    this.setSavedRecipes();
    this.setCreatedRecipes();

  }



  render() {
    // if(!this.state.isLoaded) return (<div>Loading...</div>); 
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
        <div id="saved">
          <h1>Saved recipes</h1>
          <div>
            {this.state.savedRecipes.map(recipe => (<MiniRecipe key={recipe.data._id} recipe={recipe.data} method={this.props.method} />))}
          </div>
        </div>
        <div id="created">
          <h1>Recipes created by you</h1>
          <div>
            {this.state.createdRecipes.map(recipe => (<MiniRecipe key={recipe.data._id} recipe={recipe.data} method={this.props.method} />))}
          </div>
        </div>


      </div>

    );
  }
}

UserProfile.contextType = AppContext;

