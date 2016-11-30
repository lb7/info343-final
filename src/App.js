import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

//navigation mock-up will fix later
class NavigationLinks extends React.Component {
    render() {
        return (
            <nav>
                <h2>Navigation</h2>
                <ul className="list-unstyled">
                    <li><Link to="/" activeClassName="activeLink">Homepage</Link></li>
                    <li><Link to="recipe/:id" activeClassName="activeLink">Recipes</Link></li>
                    <li><Link to="search/results" activeClassName="activeLink">Search Results</Link></li>
                </ul>
            </nav>

        );
    }
}

export default App;
