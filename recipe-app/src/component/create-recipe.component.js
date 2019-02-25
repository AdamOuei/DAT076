import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

export default class CreateRecipe extends Component {

    addRecipe(data) {
        console.log("Hej");
        return fetch('http://localhost:4000/add', {
            method: 'POST',
            mode: 'CORS',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => err);
    }

    render() {
        return (
            <div>
                <p>CreateRecipe</p>
                <form onSubmit={this.addRecipe}>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}