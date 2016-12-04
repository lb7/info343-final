import React from 'react';
import DataController from './DataController';
import CardTemplate from './Card';

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };

        this.searchCallback = this.searchCallback.bind(this);
    }

    searchCallback(response) {
        let recipes = response.results;
        let cards = [];

        recipes.forEach(recipe => {
            let card =
             <div className = 'cardTemplate'>
                <CardTemplate image = {recipe.image} title = {recipe.title} id = {recipe.id}/>
            </div>
                // <li key={recipe.title}>
                //     <img src={recipe.image} width={128} height={128}/>
                //     <p>{recipe.title}</p>
                // </li>;
            cards.push(card);
        });
        this.setState({cards: cards});
    }

    componentWillMount() {
        DataController.makeRequest('/recipes/searchComplex',
            this.props.location.search,
            this.searchCallback);
    }

    render() {
        return (
            <div>
                <ul>{this.state.cards}</ul>
            </div>
        )
    }
}
export default Results;