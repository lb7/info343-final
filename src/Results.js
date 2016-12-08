import React from 'react';
import DataController from './DataController';
import CardTemplate from './Card';
import {Spinner} from 'react-mdl';

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            loaded: false
        };

        this.searchCallback = this.searchCallback.bind(this);
    }

    /**
     * Called when the search is completed. Populates all the cards.
     */
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
        this.setState({cards: cards, loaded: true});

    }

    /**
     * Makes the search request
     */
    search() {
        DataController.makeRequest('/recipes/searchComplex',
            this.props.location.search,
            this.searchCallback);
        this.setState({loaded: false});
    }

    componentWillReceiveProps() {
        this.search();
    }

    componentWillMount() {
        this.search();
    }

    render() {
        return (
            <div>
                { this.state.loaded ? (
                    <div className="cards-container">
                        {this.state.cards.length > 0 ? this.state.cards : <p>There were no results matching your query.</p>}
                    </div>
                    ) : (
                    <Spinner className="spinner"/>
                    )
                }
            </div>
        )
    }
}
export default Results;