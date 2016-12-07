import React from 'react';
import { Link } from 'react-router';
import { Button, Textfield, Navigation, Drawer, Content, Layout, Header } from 'react-mdl';
import { FooterLinkList, FooterSection, Footer } from 'react-mdl';
import LoginDialog from './LoginDialog';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''

        };
        this.stateUpdate = this.stateUpdate.bind(this);
    }

    // updates state based on user search
    stateUpdate(input) {
        this.setState({ query: input });
    }

    render() {
        return (
            <div>
                <NavigationLinks />
                <div className="searchContainer">
                    <SearchBar query={this.state.query} callback={this.stateUpdate} />
                    <div className="buttons">
                        <Link to={{ pathname: '/search/results', query: this.state }}>
                            <Button className="searchButton" raised colored>Search</Button>
                        </Link>
                        <Link to='/search'>
                            <Button className="advancedButton" raised colored>Advanced Search</Button>
                        </Link>
                    </div>
                </div>
                <div className="login-button">
                    <LoginDialog openDialog={this.state.openDialog} />
                </div>
                {this.props.children}
                <div className="footer">
                    <CommonFooter />
                </div>
            </div>
        )
    }
}

// Quicklinks to categories and Homepage link
class NavigationLinks extends React.Component {
    render() {
        return (
            <div style={{ height: '300px', position: 'relative' }}>
                <Layout fixedHeader style={{ background: 'url(http://www.altaromablog.it/wp-content/uploads/2014/11/roma-food-3.jpg) center / cover' }}>
                    <Header className="headerTitle" transparent title="Cook This, Not That!" style={{ color: 'white' }}>
                        <Navigation>
                            <Link className="headerText" to='/'>Homepage</Link>
                        </Navigation>
                    </Header>
                    <Drawer title="Quick Links">
                        <Navigation>
                            <Link to={{ pathname: '/search/results', query: { query: 'christmas' } }}>Winter Holiday Recipes</Link>
                            <Link to={{ pathname: '/search/results', query: { query: 'appetizer' } }}>Appetizers</Link>
                            <Link to={{ pathname: '/search/results', query: { query: 'breakfast' } }}>Breakfast</Link>
                            <Link to={{ pathname: '/search/results', query: { query: 'dinner' } }}>Dinner</Link>
                            <Link to={{ pathname: '/search/results', query: { query: 'drinks' } }}>Drinks</Link>
                            <Link to={{ pathname: '/search/results', query: { query: 'dessert' } }}>Desserts</Link>
                        </Navigation>
                    </Drawer>
                    <Content />
                </Layout>
            </div>
        );
    }
}

// common searchbar in all pages
class SearchBar extends React.Component {

    handleChange(e) {
        this.props.callback(e.target.value);
    }

    render() {
        return (
            <div className="searchBar">
                <Textfield
                    onChange={(e) => { this.handleChange(e) } }
                    value={this.props.query}
                    label="Search"
                    className="searchInput"
                    floatingLabel
                    />

            </div>
        );
    }
}

// common footer in all pages
class CommonFooter extends React.Component {
    render() {
        return (
            <Footer size="mini">
                <FooterSection type="left" logo="How to Cook That">

                    <FooterLinkList>
                        <a href="https://spoonacular.com/food-api">API Credits: Spoonacular</a>
                        <a href="http://www.altaromablog.it/">Photo Credit: Alta Roma Blog</a>
                    </FooterLinkList>
                </FooterSection>
            </Footer>
        );
    }
}

export default App;

