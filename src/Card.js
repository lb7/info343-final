import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl';
import { Link } from 'react-router';

// A template to be used for each recipe card
class CardTemplate extends React.Component {
    render() {
        return (
            <Card shadow={3}>
                <CardTitle expand style={{ color: '#8cb0f2', background: 'url(' + this.props.image + ') center / cover' }} />
                <CardText style={{ background: '#fff' }}>
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