import React, { Component } from "react";
import photo from './recipePhotos/default.jpg';
import StarRatingComponent from 'react-star-rating-component';
import { Card } from "react-bootstrap";
import { Button} from 'react-bootstrap';
import SvgIcon from '@material-ui/core/SvgIcon';



export default class MiniRecipe extends Component {

   constructor(props) {
        super(props);
        this.state = { 
            liked: false, 
            rating: 1, 
            recipe: {},
            isLoaded: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({ liked: !this.state.liked});
        console.log("Clicked");
    
    }

    componentDidMount(){
        //this.getDataFromDb();
    }

    /*getDataFromDb = () => {
        fetch("http://localhost:4000/api/recipe/getRecipe")
          .then(data => data.json())
          .then(res => 
            this.setState({ recipe: res.data, isLoaded: true }));
      };*/
    
    render() {

        const { rating } = this.state;

        const iconStyles = {
            marginLeft: 180,
            marginTop: -500,
            
        };

     

        const FavoriteIcon = (props) => (
            
            <SvgIcon {...props}>
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
            </SvgIcon>
        );

        let buttonText = this.state.liked? 'Unsave': 'Save';
        //if(!this.state.isLoaded) return <div>Sleep deprived</div>
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={photo}>
                    </Card.Img>
                <Card.Body style={{marginTop: '-30px'}}>
            
                <Button onClick={this.handleClick} className="like" style={iconStyles}>
                <i className="fa fa-heart"></i>&nbsp;
                {buttonText}</Button>
                
               
                

                    <Card.Title id="recipeTitle">Title typ</Card.Title>
                    <StarRatingComponent 
                        name="rate" 
                        editing={false}
                        starCount={5}
                        value={3}
                        />
                        <br/>
                    <Button variant="primary">Show recipe</Button>
                </Card.Body>
            </Card>


   
        );
    }
}
    