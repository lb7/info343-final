import React from 'react';
import {Textfield, Button} from 'react-mdl';
import DataController from './DataController';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            comments: []
        };

        this.getComments = this.getComments.bind(this);
        this.commentsCallback = this.commentsCallback.bind(this);
    }

    componentWillMount() {
        this.getComments();
    }

    componentWillReceiveProps() {
        this.getComments();
    }

    getComments() {
        DataController.getComments(this.props.id, this.commentsCallback);
    }

    commentsCallback(snapshot) {
        let comments = [];

        snapshot.forEach(child => {
            let comment = <Comment name={child.val().displayName} text={child.val().comment} />;
            comments.push(comment);
        });

        this.setState({comments: comments});
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
                {this.state.comments}
            </div>
        )
    }
}

class Comment extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.name}: {this.props.text}</p>
            </div>
        );
    }
}

export default CommentForm;