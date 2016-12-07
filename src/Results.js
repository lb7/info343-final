import React from 'react';
import DataController from './DataController';
import CardTemplate from './Card';
import {Spinner} from 'react-mdl';

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
             <div className='cardTemplate'>
                <CardTemplate image={recipe.image} title={recipe.title} id={recipe.id}/>
            </div>;
            cards.push(card);
        });
        this.setState({cards: cards});
    }

    search() {
        DataController.makeRequest('/recipes/searchComplex',
            this.props.location.search,
            this.searchCallback);
    }

    componentWillReceiveProps() {
        this.search();
    }

    componentWillMount() {
        this.search();
    }

    render() {
        return (
            <div className="cards-container">
                {this.state.cards.length > 0 ? this.state.cards : <p>There were no results matching your query.</p>}
            </div>
        )
    }
}
export default Results;