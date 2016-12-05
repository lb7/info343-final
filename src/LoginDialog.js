import React from 'react';
import 'dialog-polyfill';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Textfield} from 'react-mdl';
import DataController from './DataController';


class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            email: '',
            password: '',
            name: ''
        };
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signInCallback = this.signInCallback.bind(this);
    }

    handleOpenDialog() {
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false
        });
    }

    signInCallback(user) {
        DataController.setName(this.state.name);
        console.log('callback')
    }

    signIn() {
        DataController.signIn(this.state.email, this.state.password, this.signInCallback);
    }

    render() {
        return (
            <div>
                <Button colored onClick={this.handleOpenDialog} raised ripple>Sign In</Button>
                <Dialog open={this.state.openDialog}>
                    <DialogTitle>Sign In</DialogTitle>
                    <DialogContent>
                        <p>Type your username and password. If you don't have an account, one will be created for you.</p>
                        <Textfield
                            onChange={e => this.setState({name:e.target.value})}
                            value={this.state.name}
                            label="Display name"
                            floatingLabel
                            required
                        />
                        <Textfield
                            onChange={e => this.setState({email:e.target.value})}
                            value={this.state.email}
                            label="Email address"
                            floatingLabel
                            required
                        />
                        <Textfield
                            onChange={e => this.setState({password:e.target.value})}
                            value={this.state.password}
                            label="Password"
                            type="password"
                            floatingLabel
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.signIn}>Agree</Button>
                        <Button type='button' onClick={this.handleCloseDialog}>Disagree</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default LoginDialog;