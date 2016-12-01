import React from 'react';
import { hashHistory } from 'react-router'
import DataController from './DataController';

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
            results: []
     };
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        this.fetchData();
        console.log(this.state);
    }

    fetchData() {
        DataController.makeRequest('/recipes/random', '?limitLicense=false&number=7', data => {
            console.log(data);
            this.setState({results: data });
        });
    }

    render() {
        var randomRecipes = this.state.results.recipes;
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

