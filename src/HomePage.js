import React from 'react';
import { hashHistory } from 'react-router'
import DataController from './DataController';
import CardTemplate from './Card'

class HomePage extends React.Component {

    render() {
        return (
            <div className="homepage">
                {/*<header className="logo">
                    <h1>Logo</h1>
                </header >
                <p>placeholder for search bar</p>
                <p>Welcome message...</p>*/}
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
    }

    fetchData() {
        DataController.makeRequest('/recipes/random', '?limitLicense=false&number=25', data => {
            this.setState({results: data.recipes });
        });
    }

    render() {
        var randomRecipes = this.state.results;
        var withInstructions = randomRecipes.filter((recipe) => {
            return recipe.instructions !== null;
        });
        var recipeCards = withInstructions.slice(0,12).map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe.id} />
        });

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
        console.log("You clicked on", this.props.recipe.id);
        hashHistory.push('/recipe/' + this.props.recipe.id);
    }
    render() {
        var recipe = this.props.recipe;

        return (
            <div className = 'cardTemplate'>
                <CardTemplate image = {recipe.image} title = {recipe.title} id = {recipe.id}/>
            </div>
        );
    }
}

export default HomePage;

