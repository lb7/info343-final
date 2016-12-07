import React from 'react';
import {Textfield, Button} from 'react-mdl';
import DataController from './DataController';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            comments: [],
            user: DataController.getUser()
        };

        this.getComments = this.getComments.bind(this);
        this.commentsCallback = this.commentsCallback.bind(this);

        DataController.registerAuthListener(user => this.setState({user: user}));
    }

    componentDidMount() {
        DataController.getComments(this.props.id, this.commentsCallback);
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
                {this.state.user ? (
                    <div className="comment-form">
                        <h2>Comments</h2>
                        <Textfield className="comment-field"
                            onChange={e => this.setState({comment:e.target.value})}
                            value={this.state.comment}
                            label="Leave a comment..."
                            rows={3}
                        />
                        <Button className="comment-submit-button" onClick={() => DataController.submitComment(this.props.id, this.state.comment)}>Submit</Button>
                    </div>
                ) : (
                    <p>You need to sign in to leave a comment</p>
                )}
                {this.state.comments}
            </div>
        )
    }
}

class Comment extends React.Component {
    render() {
        return (
            <div>
                <p className="userName">{this.props.name}</p>
                <p className="comments">{this.props.text}</p>
            </div>
        );
    }
}

export default CommentForm;