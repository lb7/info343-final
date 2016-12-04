import React from 'react';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl';
import { Link } from 'react-router';

// A template to be used for each recipe card
class CardTemplate extends React.Component{
    render(){
        return(
             <Card shadow={0} style={{ width: '320px', height: '320px', margin: 'auto' }}>
                <CardTitle expand style={{ color: '#fff', background: 'url(' + this.props.image + ') center / cover'}} />
                <CardText>
                    {this.props.title}
                </CardText>
                <CardActions border>
                    <Link to={'/recipe/' + this.props.id}>Go to Recipe</Link>
                </CardActions>
            </Card>
        );
    }
}
 export default CardTemplate;