import React from 'react';
import {Textfield, Button} from 'react-mdl';
import DataController from './DataController';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: ''
        }
    }

    render() {
        return (
            <div>
                <h2>Comments</h2>
                <Textfield
                    onChange={e => this.setState({comment:e.target.value})}
                    value={this.state.comment}
                    label="Leave a comment..."
                    rows={3}
                />
                <Button onClick={() => DataController.submitComment(this.props.id, this.state.comment)}>Submit</Button>
            </div>
        )
    }
}

export default CommentForm;