import React from 'react';
import 'dialog-polyfill';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Textfield} from 'react-mdl';
import DataController from './DataController';


class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            user: DataController.getUser(),
            email: '',
            password: '',
            name: ''
        };
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.signIn = this.signIn.bind(this);
        this.authListener = this.authListener.bind(this);

        DataController.registerAuthListener(this.authListener);
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

    signIn() {
        DataController.signIn(this.state.email, this.state.password, () => {
            DataController.setName(this.state.name)
        });
        this.handleCloseDialog();
    }

    authListener(user) {
        this.setState({user: user});
    }

    render() {
        //let user = DataController.getUser();

        return (
            <div>
                <Button colored onClick={this.state.user ? DataController.signOut : this.handleOpenDialog} raised ripple>
                    {this.state.user ? 'Sign Out' : 'Sign In'}
                </Button>
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
                        <Button type='button' onClick={this.signIn}>Sign In</Button>
                        <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default LoginDialog;