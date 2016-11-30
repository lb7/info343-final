import React from 'react';
import { hashHistory } from 'react-router'

class HomePage extends React.Component {

    render() {
        return (
            <div className="homepage">
                <header className="logo">
                    <h1>Logo</h1>
                </header >
                <p>placeholder for search bar</p>
                <p>Welcome message...</p>
                < RandomRecipeList />
            </div >
        )
    }
}


class RandomRecipeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [
                {
                    "id": 98730,
                    "usedIngredientCount": 3,
                    "missedIngredientCount": 5,
                    "likes": 0,
                    "title": "Jalapeno Burger",
                    "image": "https://spoonacular.com/recipeImages/jalapeno-burger-2-98730.jpg",
                    "imageType": "jpg",
                    "calories": 481,
                    "protein": "24g",
                    "fat": "26g",
                    "carbs": "39g"
                },
                {
                    "id": 98668,
                    "usedIngredientCount": 3,
                    "missedIngredientCount": 6,
                    "likes": 0,
                    "title": "Wisconsin Badger Burger",
                    "image": "https://spoonacular.com/recipeImages/wisconsin-badger-burger-2-98668.jpg",
                    "imageType": "jpg",
                    "calories": 956,
                    "protein": "54g",
                    "fat": "68g",
                    "carbs": "30g"
                },
                {
                    "id": 268478,
                    "usedIngredientCount": 3,
                    "missedIngredientCount": 7,
                    "likes": 0,
                    "title": "BBQ Burgers \"Jibarito Style\"",
                    "image": "https://spoonacular.com/recipeImages/BBQ-Burgers-Jibarito-Style-268478.jpg",
                    "imageType": "jpg",
                    "calories": 384,
                    "protein": "23g",
                    "fat": "18g",
                    "carbs": "35g"
                },
                {
                    "id": 480050,
                    "usedIngredientCount": 3,
                    "missedIngredientCount": 7,
                    "likes": 0,
                    "title": "The All American Classic Bacon Cheese Burger",
                    "image": "https://spoonacular.com/recipeImages/The-All-American-Classic-Bacon-Cheese-Burger-480050.jpg",
                    "imageType": "jpg",
                    "calories": 777,
                    "protein": "42g",
                    "fat": "58g",
                    "carbs": "20g"
                },
                {
                    "id": 485845,
                    "usedIngredientCount": 3,
                    "missedIngredientCount": 8,
                    "likes": 0,
                    "title": "In-N-Out Burger Copycat",
                    "image": "https://spoonacular.com/recipeImages/In-N-Out-Burger-Copycat-485845.jpg",
                    "imageType": "jpg",
                    "calories": 525,
                    "protein": "26g",
                    "fat": "39g",
                    "carbs": "17g"
                },
                {
                    "id": 98388,
                    "usedIngredientCount": 3,
                    "missedIngredientCount": 8,
                    "likes": 0,
                    "title": "Stuffed Bacon-Cheddar BBQ Burger",
                    "image": "https://spoonacular.com/recipeImages/stuffed-bacon-cheddar-bbq-burger-2-98388.jpg",
                    "imageType": "jpg",
                    "calories": 1048,
                    "protein": "53g",
                    "fat": "69g",
                    "carbs": "51g"
                },
                {
                    "id": 337028,
                    "usedIngredientCount": 3,
                    "missedIngredientCount": 10,
                    "likes": 0,
                    "title": "Double Decker Burger",
                    "image": "https://spoonacular.com/recipeImages/double-decker-burger-337028.jpeg",
                    "imageType": "jpeg",
                    "calories": 862,
                    "protein": "37g",
                    "fat": "59g",
                    "carbs": "45g"
                }
            ]
        }
    }

    render() {

        var randomRecipes = this.state.results;

        var recipeCards = randomRecipes.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe.id} />
        })

        return (
            <div className="random-recipes">
                <h2>Random Recipes for the Week</h2>
                <div className="cards-container">
                    {recipeCards}
                </div>
            </div>
        )
    }
}


class RecipeCard extends React.Component {

    handleClick() {
        console.log("You clicked on");
        //hashHistory.push('/recipe/');
    }
    render() {
        var recipe = this.props.recipe;

        return (
            <div className="card">
                <div className="content">
                    <img src={recipe.image} alt={recipe.title} />
                    <p>{recipe.title}</p>
                    <button className="button" onClick={(e) => this.handleClick(e)}>Learn More</button>
                </div>
            </div>
        );
    }
}

export default HomePage;

