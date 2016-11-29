import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export class Recipe extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

export class HomePage extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

export class Search extends React.Component {
    render() {
        return (
            <div>Search</div>
        )
    }
}

export class Results extends React.Component {
    render() {
        return (
            <div>Results</div>
        )
    }
}

export default App;
