import React, {Component} from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



const options = [
  { label: 'Kyckling', value: 1},
  { label: 'Vegetariskt', value: 2},
  { label: 'Grekiskt', value: 3},
  { label: 'Fisk', value: 4},
  { label: 'Asiatiskt', value: 5},
];

export default class CreateRecipe extends Component {



      render() {
        return (
            <div>
                <p>Create Recipe</p>
                <div className="container">
                  <div className="row mt-5">
                    <div className="col-sm-12">
                      <form>
                        <label>
                          Title: 
                          <input type="text" />
                        </label>
                        <br/>
                        <label>
                            Ingredients: 
                            <textarea></textarea>
                        </label>
                        <br/>

                        <label>
                            Instructions: 
                            <textarea></textarea>
                        </label>
                        <br/>

                        <label>
                          Category: 
                          <ReactMultiSelectCheckboxes options={options} />
                      
                        </label>
                        <br/>
                        
                        <Link to="/dashboard">
                          <button type="button">
                                Create
                          </button>
                        </Link>

                
                        
                  
                  
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