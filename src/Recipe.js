import React from 'react';
import { List, ListItem, ListItemAction, ListItemContent } from 'react-mdl';
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
            this.setState({
                similarRecipes: data
            });
        });
    }

    // format time that is more than 60 minutes
    prepTimeFormat(time) {
        if (time <= 60) {
            return time + ' minutes';
        } else if (time < 120) {
            return Math.round(time / 60) + ' hour & ' + (time % 60) + ' minutes';
        } else {
            return Math.round(time / 60) + ' hours & ' + (time % 60) + ' minutes';
        }
    }

    render() {
        var prepTime = this.prepTimeFormat(this.state.prepTime);
        return (
            <div className="banner">
                <header role="banner">
                    <h1 className="recipeTitle">{this.state.recipeTitle}</h1>
                    <h2>Serves: {this.state.servings}</h2>
                    <h2>Preparation Time: {prepTime}</h2>
                    <p>Recipe from {this.state.creditText}</p>
                    <a href={this.state.originalSource}>Link to source</a>
                </header>
                <img role="presentation" className="recipeImage" src={this.state.image} alt={this.state.title} />
                <IngredientList ingredients={this.state.ingredients} />
                <InstructionsList id={this.state.recipeId} />
                <div className="similarRecipeBox" />
                <SimilarRecipes recipes={this.state.similarRecipes} />
                <CommentForm id={this.state.recipeId} />
            </div>
        )
    }
}

// List of ingredients
// Parameter: Array of ingredients from current recipe
class IngredientList extends React.Component {
    render() {
        var ingredientsItem = this.props.ingredients.map(function (obj, index) {
            return <IngredientItem item={obj} key={index} />
        });

        return (
            <div>
                <h3>Ingredients:</h3>
                <div className="ingredient-container">
                    {ingredientsItem}
                </div>
            </div>
        );
    }
}

// A single ingredient
class IngredientItem extends React.Component {
    
    // limit the number of decimal places to two
    fixDecimal(amount) {
        var number = amount + '';
        if(number.length > 4) {
            return amount.toFixed(2);
        } else {
            return amount;
        }
    }

    render() {
        var string = this.fixDecimal(this.props.item.amount) + ' ' + this.props.item.unitLong + ' ' + this.props.item.name;

        return (
            <List className="ingredientItem">
                <ListItem>
                    <ListItemAction>
                        <img className="ingredientImg" src={this.props.item.image} alt={this.props.item.name} />
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
            <div>
                <h3>Instructions:</h3>
                <div className="instruction-container">
                    {instructionsItem}
                </div>
            </div>
        );
    }
}

// A single step in the instructions list
class InstructionsItem extends React.Component {
    render() {
        var filterSteps = this.props.section.steps.filter(function (obj) {
            return obj.step.length > 3;
        });
        var eachStep = filterSteps.map(function (obj, index) {
            return <ListItem key={index}>{index + 1 + ". " + obj.step}</ListItem>
        });

        return (
            <div>
                <List className="instructionItem">
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
            <div>
                <h3>You might also like:</h3>
                <div className="cards-container">
                    {recipeCards}
                </div>
            </div>
        );
    }
}

// A single recipe card
class RecipeCard extends React.Component {

    render() {

        return (
            <div className='cardTemplate'>
                <CardTemplate image={'https://spoonacular.com/recipeImages/' + this.props.recipe.image} title={this.props.recipe.title} id={this.props.recipe.id} />
            </div>
        );
    }
}


export default Recipe;