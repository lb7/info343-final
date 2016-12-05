import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Router} from 'react-router';
import {Button, Textfield} from 'react-mdl';
import LoginDialog from './LoginDialog';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };
        this.stateUpdate = this.stateUpdate.bind(this);
    }

  //add searchCallBack from results

    stateUpdate(input) {
        this.setState({query: input});
    }

    render() {
        return (
            <div>
                <main className="container">
                    <div className="row">
                        <div className="col-xs-3">
                            <NavigationLinks />
                            <SearchBar query = {this.state.query} callback={this.stateUpdate}/>
                            <Link to={{pathname: '/search/results', query: this.state}}>
                                <Button raised colored>Search</Button>
                            </Link>
                            <Link to='/search'>
                                <Button raised colored>Advanced Search</Button>
                            </Link>
                        </div>
                    </div>
                    <LoginDialog openDialog={this.state.openDialog}/>
                </main>
                {this.props.children}
            </div>
        )
    }
}

class NavigationLinks extends React.Component {
    render() {
        return (
            <nav>
                <h2>Navigation</h2>
                <ul className="list-unstyled">
                    <li><Link to="/" >Homepage</Link></li>
                </ul>
            </nav>

        );
    }
}

class SearchBar extends React.Component{

    handleChange(e) {
        console.log(e.target.value);
        this.props.callback(e.target.value);
    }

    render(){
        return (
            <div>
              <Textfield
                        onChange={(e) => {this.handleChange(e)}}
                        value={this.props.query}
                        label="Search"
                        className="searchInput"
                        floatingLabel
                    />
                    
            </div>
        );
    }
}

export default App;
