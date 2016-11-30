import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Router} from 'react-router';

class App extends React.Component {
    render() {
        return (
            <div>
             <main className="container">
          <div className="row">
            <div className="col-xs-3">
              <NavigationLinks />
        </div>
            </div>
            </main>
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
                    <li><Link to="/" >Homepage</Link></li>
                </ul>
            </nav>

        );
    }
}
export default App;
