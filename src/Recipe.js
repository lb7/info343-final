import React from 'react';
import { List, ListItem, DataTable, TableHeader } from 'react-mdl';
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
            <div className="banner">
                <header role="banner">
                    <h1 className="recipeTitle">{this.state.recipeTitle}</h1>
                    <h2>Serves: {this.state.servings}</h2>
                    <h2>Preparation Time: {this.state.prepTime}</h2>
                </header>
                <img role="presentation" className="recipeImage" src={this.state.image} alt={this.state.title} />
                <IngredientList ingredients={this.state.ingredients} />
                <InstructionsList id={this.state.recipeId} />
                <div className="similarRecipeBox" />
                <SimilarRecipes recipes={this.state.similarRecipes} />
                <CommentForm id={this.state.recipeId} />
                <footer role="contentinfo">
                    <p>Recipe from {this.state.creditText}</p>
                    <a href={this.state.originalSource}>Link to source</a>
                </footer>
            </div>
        )
    }
}

// Table of ingredients
// Parameter: Array of ingredients from current recipe
class IngredientList extends React.Component {
    render() {
        var rowArray = [];
        this.props.ingredients.map(function (obj, index) {
            var quantityString = obj.amount + ' ' + obj.unitLong;
            var ingredientObj = {
                id: index,
                image: <img role="presentation" className="ingredientImage" src={obj.image} alt={obj.name} />,
                ingredient: obj.name,
                quantity: quantityString
            };
            return rowArray.push(ingredientObj)
        });

        return (
            <div>
                <h3>Ingredients</h3>
                <DataTable
                    shadow={5}
                    rowKeyColumn="id"
                    rows={rowArray}
                    >
                    <TableHeader name="image"></TableHeader>
                    <TableHeader name="ingredient">Ingredient(s)</TableHeader>
                    <TableHeader numeric name="quantity">Amount</TableHeader>
                </DataTable>
            </div>
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
        console.log(instructionsItem)

        return (
            <div className="container-instructions">
                <h3>Instructions:</h3>
                {instructionsItem}
            </div>
        );
    }
}

// A single step in the instructions list
class InstructionsItem extends React.Component {
    render() {
        var eachStep = this.props.section.steps.map(function (obj, index) {
            return <ListItem key={index}>{index + 1 + ". " + obj.step}</ListItem>
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
            <div>
                <h3>You might also like</h3>
                <div className="similarRecipes">
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