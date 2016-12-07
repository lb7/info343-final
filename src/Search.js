import React from 'react';
import { Link } from 'react-router';
import { Button, Textfield, Icon } from 'react-mdl';

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
            maxProtein: '',
            expand: false
        };

        this.trimParams = this.trimParams.bind(this);
        this.toggleExpand = this.toggleExpand.bind(this);
    }

    toggleExpand() {
        if (this.state.expand) {
            this.setState({expand: false});
        } else {
            this.setState({expand: true});
        }
    }

    trimParams() {
        let params = {};
        for (let key in this.state) {
            if (this.state[key]) {
                params[key] = this.state[key];
            }
        }

        return params;
    }


    render() {
        return (
            <div className="adv-search">
                <h1>Advanced Search</h1>
                <div className="advanced-search">
                    <div className="adv-search-fields" >
                        <Textfield
                            onChange={e => { this.setState({ query: e.target.value }) } }
                            value={this.state.query}
                            label="Recipe name"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => { this.setState({ cuisine: e.target.value }) } }
                            value={this.state.cuisine}
                            label="Cuisine type"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => { this.setState({ includeIngredients: e.target.value }) } }
                            value={this.state.includeIngredients}
                            label="Include ingredients"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => { this.setState({ intolerances: e.target.value }) } }
                            value={this.state.intolerances}
                            label="Allergies"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => { this.setState({ diet: e.target.value }) } }
                            value={this.state.diet}
                            label="Diet type (vegetarian, vegan, etc.)"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => { this.setState({ excludeIngredients: e.target.value }) } }
                            value={this.state.excludeIngredients}
                            label="Exclude ingredients"
                            className="searchInput"
                            floatingLabel
                            />
                    </div>

                    <div onClick={this.toggleExpand} id="nutrient-expand">
                        <span>Nutrient Search</span>
                        <Icon name="arrow_drop_down" className={this.state.expand ? 'rotatable' +
                        ' rotated' : 'rotatable'} style={{fontSize: '16px'}}/>
                    </div>

                    <div className={this.state.expand ? 'adv-search-fields expandable expand' : 'adv-search-fields expandable'} id="nutrient-fields">
                        <Textfield
                            onChange={e => this.setState({ minCalories: e.target.value })}
                            value={this.state.minCalories}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Minimum calories"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => this.setState({ maxCalories: e.target.value })}
                            value={this.state.maxCalories}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Maximum calories"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => this.setState({ minCarbs: e.target.value })}
                            value={this.state.minCarbs}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Minimum carbs"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => this.setState({ maxCarbs: e.target.value })}
                            value={this.state.maxCarbs}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Maximum carbs"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => this.setState({ minFat: e.target.value })}
                            value={this.state.minFat}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Minimum fat"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => this.setState({ maxFat: e.target.value })}
                            value={this.state.maxFat}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Maximum fat"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => this.setState({ minProtein: e.target.value })}
                            value={this.state.minProtein}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Minimum protein"
                            className="searchInput"
                            floatingLabel
                            />
                        <Textfield
                            onChange={e => this.setState({ maxProtein: e.target.value })}
                            value={this.state.maxProtein}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Maximum protein"
                            className="searchInput"
                            floatingLabel
                            />
                    </div>
                </div>
                <Link to={{ pathname: '/search/results', query: this.trimParams() }}>
                    <Button role="button" aria-label="search button" raised colored>Search</Button>
                </Link>
            </div>
        )
    }
}

export default Search;