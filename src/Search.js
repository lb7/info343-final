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
            diet: '',
            minCalories: '',
            maxCalories: '',
            minCarbs: '',
            maxCarbs: '',
            minFat: '',
            maxFat: '',
            minProtein: '',
            maxProtein: ''
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
                </div>
                <div>
                    <Textfield
                        onChange={e => {this.setState({minCalories:e.target.value})}}
                        value={this.state.minCalories}
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input is not a number!"
                        label="Recipe name"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({maxCalories:e.target.value})}}
                        value={this.state.maxCalories}
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input is not a number!"
                        label="Recipe name"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({minCarbs:e.target.value})}}
                        value={this.state.minCarbs}
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input is not a number!"
                        label="Recipe name"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({maxCarbs:e.target.value})}}
                        value={this.state.maxCarbs}
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input is not a number!"
                        label="Recipe name"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({minFat:e.target.value})}}
                        value={this.state.minFat}
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input is not a number!"
                        label="Recipe name"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({maxFat:e.target.value})}}
                        value={this.state.maxFat}
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input is not a number!"
                        label="Recipe name"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({minProtein:e.target.value})}}
                        value={this.state.minProtein}
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input is not a number!"
                        label="Recipe name"
                        className="searchInput"
                        floatingLabel
                    />
                    <Textfield
                        onChange={e => {this.setState({maxProtein:e.target.value})}}
                        value={this.state.maxProtein}
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input is not a number!"
                        label="Recipe name"
                        className="searchInput"
                        floatingLabel
                    />
                </div>
                <Link to={{pathname: '/search/results', query: this.state}}>
                    <Button raised colored>Search</Button>
                </Link>
            </div>
        )
    }
}

export default Search;