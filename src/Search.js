import React from 'react';
import {Link} from 'react-router';
import {Button, Textfield} from 'react-mdl';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            cuisine: '',
            includeIngredients: '',
            excludeIngredients: '',
            intolerances: '',
            diet: ''
        }
    }

    render() {
        return (
            <div>
                <h1>Advanced Search</h1>
                <div>
                    <Textfield
                        onChange={e => {this.setState({query:e.target.value})}}
                        value={this.state.query}
                        label="Recipe name"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({cuisine:e.target.value})}}
                        value={this.state.cuisine}
                        label="Cuisine type"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({includeIngredients:e.target.value})}}
                        value={this.state.includeIngredients}
                        label="Include ingredients"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({intolerances:e.target.value})}}
                        value={this.state.intolerances}
                        label="Allergies"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({diet:e.target.value})}}
                        value={this.state.diet}
                        label="Diet type (vegetarian, vegan, etc.)"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({excludeIngredients:e.target.value})}}
                        value={this.state.excludeIngredients}
                        label="Exclude ingredients"
                        className="searchInput"
                        floatingLabel
                    />

                    <Link to={{pathname: '/search/results', query: this.state}}>
                        <Button raised colored>Search</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Search;