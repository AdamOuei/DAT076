import React, {Component} from 'react';

export default class CreateRecipe extends Component {

    
      render() {
        return (
            <div>
                <p>Create Recipe</p>
            
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
            <input type="submit" value="Submit" />
          </form>
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