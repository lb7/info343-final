import React from 'react';
import { List, ListItem, ListItemAction, ListItemContent, Card, CardTitle, CardText, CardActions } from 'react-mdl';
import { Link } from 'react-router';
import DataController from './DataController';
import CardTemplate from './Card';
import CommentForm from './CommentForm';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalSource: '',
            creditText: '',
            recipeId: '',
            recipeTitle: '',
            prepTime: '',
            image: '',
            servings: '',
            ingredients: [],
            similarRecipes: []
        };
        this.fetchData = this.fetchData.bind(this);
        this.fetchSimilarData = this.fetchSimilarData.bind(this);

    }

    componentWillMount() {
        this.setData();
    }

    componentWillReceiveProps() {
        this.setData();
    }

    setData() {
        var id = this.props.params.id;
        this.setState({ recipeId: id }, () => {
            console.log(`recipeId: ${this.state.recipeId}`);
            this.fetchData(this.state.recipeId);
            this.fetchSimilarData(this.state.recipeId);
        });

        //Scrolls the page to the top.
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    // fetch recipe information based on recipe id
    fetchData(id) {
        DataController.makeRequest('/recipes/' + id + '/information', {}, data => {
            this.setState({
                originalSource: data.sourceUrl,
                creditText: data.creditText,
                recipeId: data.id,
                recipeTitle: data.title,
                prepTime: data.readyInMinutes,
                image: data.image,
                servings: data.servings,
                ingredients: data.extendedIngredients
            });
        });
    }

    //fetch similar recipes based on current recipe id
    fetchSimilarData(id) {
        DataController.makeRequest('/recipes/' + id + '/similar', {}, data => {
            console.log(data);
            this.setState({
                similarRecipes: data
            });
        });
    }

    render() {
        return (
            <div>
                <header role="banner">
                    <h1 className="recipeTitle">{this.state.recipeTitle}</h1>
                    <h2>Serves: {this.state.servings}</h2>
                    <h2>Preparation Time: {this.state.prepTime}</h2>
                </header>
                <img className="recipeImage" src={this.state.image} alt="recipe image" />
                <IngredientList ingredients={this.state.ingredients} />
                <InstructionsList id={this.state.recipeId} />
                <SimilarRecipes recipes={this.state.similarRecipes} />
                <CommentForm id={this.state.recipeId}/>
                <footer role="contentinfo">
                    <p>Recipe from {this.state.creditText}</p>
                    <a href={this.state.originalSource}>Link to source</a>
                </footer>
            </div>
        )
    }
}

// List of ingredients
// Parameter: Array of ingredients from current recipe
class IngredientList extends React.Component {
    render() {
        var ingredientItems = this.props.ingredients.map(function (obj, index) {
            return <IngredientItem item={obj} key={index} />
        });

        return (
            <div className="container">
                <h3 className="subtitle">Ingredients:</h3>
                {ingredientItems}
            </div>
        );
    }
}

// A single ingredient
class IngredientItem extends React.Component {
    render() {
        var string = this.props.item.amount + ' ' + this.props.item.unitLong + ' ' + this.props.item.name;

        return (
            <List style={{ width: '1000px' }}>
                <ListItem>
                    <ListItemAction>
                        <img className="ingredientImg" src={this.props.item.image} alt="ingredient image" />
                    </ListItemAction>
                    <ListItemContent>{string}</ListItemContent>
                </ListItem>
            </List>
        );
    }
}

// List of instructions
// Parameter: Current recipe id
class InstructionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instructionsArray: []
        };
        this.fetchData = this.fetchData.bind(this);
        this.fetchData(this.props.id);
    }

    // fetch detailed instructions for current recipe
    fetchData(id) {
        DataController.makeRequest('/recipes/' + id + '/analyzedInstructions', {}, data => {
            this.setState({ instructionsArray: data })
        });
    }

    render() {
        var instructionsItem = this.state.instructionsArray.map(function (obj, index) {
            return <InstructionsItem section={obj} key={index} />
        });

        return (
            <div className="container">
                <h3>Instructions:</h3>
                {instructionsItem}
            </div>
        );
    }
}

// A single step in the instructions list
class InstructionsItem extends React.Component {
    render() {
        var eachStep = this.props.section.steps.map(function (obj) {
            return <ListItem>{obj.step}</ListItem>
        });

        return (
            <div>
                <div>{this.props.section.name}</div>
                <List>
                    {eachStep}
                </List>
            </div>
        );
    }
}

// Similar recipe cards
// Parameter: Array of similar recipes
class SimilarRecipes extends React.Component {

    render() {
        var recipeCards = this.props.recipes.map(function (recipeObj) {
            return <RecipeCard recipe={recipeObj} key={recipeObj.id} />
        });

        return (
            <div className="similarRecipes">
                {recipeCards}
            </div>
        );
    }
}

// A single recipe card
class RecipeCard extends React.Component {

    render() {

        return (
            <div className = 'cardTemplate'>
                <CardTemplate image = {'https://spoonacular.com/recipeImages/'+ this.props.recipe.image} title = {this.props.recipe.title} id = {this.props.recipe.id}/>
            </div>
        );
    }
}


export default Recipe;