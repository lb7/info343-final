import React from 'react';
import { List, ListItem, ListItemAction, ListItemContent, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import { hashHistory } from 'react-router';
import DataController from './DataController';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalSource: '',
            recipeId: '',
            recipeTitle: '',
            prepTime: '',
            image: '',
            servings: '',
            ingredients: []
        };
        this.fetchData = this.fetchData.bind(this);

    }

    componentWillMount() {
        var id = this.props.params.id;
        this.setState({ recipeId: id }, () => {
            console.log(`recipeId: ${this.state.recipeId}`);
            this.fetchData(this.state.recipeId);
        });

    }

    fetchData(id) {
        DataController.makeRequest('/recipes/' + id + '/information', {}, data => {
            this.setState({
                originalSource: data.sourceUrl,
                recipeId: data.id,
                recipeTitle: data.title,
                prepTime: data.readyInMinutes,
                image: data.image,
                servings: data.servings,
                ingredients: data.extendedIngredients
            });
        });
    }

    fetchSimilarData(id) {
        DataController.makeRequest('/recipes/' + id + '/information', {}, data => {
            this.setState({
                originalSource: data.sourceUrl,
                recipeId: data.id,
                recipeTitle: data.title,
                prepTime: data.readyInMinutes,
                image: data.image,
                servings: data.servings,
                ingredients: data.extendedIngredients
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
                <SimilarRecipes id={this.state.recipeId} click={this.fetchSimilarData} />
                <footer role="contentinfo">
                </footer>
            </div>
        )
    }
}

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

class IngredientItem extends React.Component {
    render() {
        var string = this.props.item.amount + ' ' + this.props.item.unitLong + ' of ' + this.props.item.name;

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

class InstructionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instructionsArray: []
        };
        this.fetchData = this.fetchData.bind(this);
        this.fetchData(this.props.id);
    }

    fetchData(id) {
        DataController.makeRequest('/recipes/' + id + '/analyzedInstructions', {}, data => {
            //console.log(data);
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

class InstructionsItem extends React.Component {
    render() {
        var eachStep = this.props.section.steps.map(function (obj) {
            //var string = 'step ' + obj.number + ' ' + obj.step;
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

class SimilarRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            similarRecipes: []
        };
        this.fetchData = this.fetchData.bind(this);
        this.fetchData(this.props.id);
    }

    fetchData(id) {
        DataController.makeRequest('/recipes/' + id + '/similar', {}, data => {
            console.log(data);
            this.setState({ similarRecipes: data });
        });
    }

    render() {
        var clickCallback = this.props.click;
        var shortArray = this.state.similarRecipes.slice(0, 4);
        var recipeCards = shortArray.map(function (recipeObj) {
            return <RecipeCard recipe={recipeObj} key={recipeObj.id} callback={clickCallback} />
        });

        return (
            <div className="similarRecipes">
                {recipeCards}
            </div>
        );
    }
}

class RecipeCard extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         recipe: {}
    //     };
    //     this.fetchData = this.fetchData.bind(this);
    //     this.fetchData(this.props.recipe.id);
    // }

    // fetchData(id) {
    //     DataController.makeRequest('/recipes/' + id + '/information', {}, data => {
    //         this.setState({recipe: data});
    //     });
    // }

    handleClick() {
       // hashHistory.push('/recipe/' + this.state.recipe.id);
       this.props.callback(this.props.recipe.id);
    }

    render() {

        return (
            <Card shadow={0} style={{ width: '320px', height: '320px', margin: 'auto' }}>
                <CardTitle expand style={{ color: '#fff', background: 'url('+ this.props.recipe.image +') bottom right 15% no-repeat #46B6AC' }}></CardTitle>
                <CardText>
                    {this.state.props.title}
                </CardText>
                <CardActions border>
                    {/*<Link to={'/recipe/'+ this.props.recipe.id}>Go to Recipe</Link>*/}
                    <Button onClick={(e) => this.handleClick(e)} colored>Go to Recipe</Button>
                </CardActions>
            </Card>
        );
    }
}


export default Recipe;