import React from 'react';
import { hashHistory } from 'react-router'
import DataController from './DataController';
import CardTemplate from './Card'
import {Spinner} from 'react-mdl';

class HomePage extends React.Component {

    render() {
        return (
            <div className="homepage">
                < RandomRecipeList />
            </div >
        )
    }
}

// Creates 12 random recipe cards with links to recipe pages
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
            this.setState({ results: data.recipes });
        });
    }

    render() {
        var randomRecipes = this.state.results;
        var withInstructions = randomRecipes.filter((recipe) => {
            return recipe.instructions !== null;
        });
        var recipeCards = withInstructions.slice(0, 12).map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe.id} />
        });

        return (
            <div>
            { this.state.results.length > 0 ? (
                    <div className="random-recipes">
                        <h2>Explore New Recipes!</h2>
                        <div className="cards-container">
                            {recipeCards}
                        </div>
                    </div>
                ) : (
                    <Spinner className="spinner"/>
                )
            }
            </div>
        )
    }
}

// Creates recipe card template
class RecipeCard extends React.Component {

    handleClick() {
        hashHistory.push('/recipe/' + this.props.recipe.id);
    }
    render() {
        var recipe = this.props.recipe;

        return (
            <div className='cardTemplate'>
                <CardTemplate image={recipe.image} title={recipe.title} id={recipe.id} />
            </div>
        );
    }
}

export default HomePage;

