import 'whatwg-fetch';
import 'es6-promise';
import * as firebase from 'firebase';

class DataController {

    /**
     * Makes a request to the api
     * @param endpoint The api endpoint to request from, e.g. "/search/results"
     * @param parameters The parameters to pass to the request. Either in object form or a formatted string
     * @param callback The function to call when the request is completed
     */
    static makeRequest(endpoint, parameters, callback) {
        const baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';
        const key = 'i7gEqPMlZGmshfpAA5Rtot8sVzWvp1BSR8ijsnBtIWIgxXFuDE';

        let paramString = '';

        if (typeof parameters === 'object') {
            paramString = '?';

            for (let key in parameters) {
                paramString += key + '=' + parameters[key] + '&';
            }
        } else {
            paramString = parameters;
        }

        //Set headers, omit credentials to avoid CORS headaches
        let request = new Request(baseUrl + endpoint + paramString, {
            credentials: 'omit',
            headers: new Headers({
                'X-Mashape-Key': key,
                'Accept': 'application/json'
            })
        });

        fetch(request).then(response => {
            return response.json();
        }).then(json => {
            callback(json);
        })
    }

    /**
     * Signs the user in with the given email and password
     */
    static signIn(email, password, callback) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            callback(user);
        }).catch(e => {
            if (e.code === 'auth/user-not-found') { //Create the account if it doesn't already exist
                this.createUser(email, password, callback);
            }
            console.log(e.message)

        })
    }

    /**
     * Sign the user out
     */
    static signOut() {
        firebase.auth().signOut();
    }

    /**
     * Create the user account
     */
    static createUser(email, password, callback) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
            callback(user);
        }).catch(e => {
            console.log(e.message);
        });
    }

    /**
     * Set the user's display name
     */
    static setName(name) {
        if (!this.getUser().displayName) {
            this.getUser().updateProfile({displayName: name, photoURL: null})
        }
    }

    /**
     * Returns the current user, null if no user is signed in
     */
    static getUser() {
        return firebase.auth().currentUser;
    }

    /**
     * Submits the given comment for the given recipe id.
     */
    static submitComment(id, comment) {
        let user = this.getUser();

        firebase.database().ref('recipes/' + id).push({
            uid: user.uid,
            displayName: user.displayName,
            comment: comment
        })
    }

    /**
     * Gets the comments for the given recipes
     */
    static getComments(id, callback) {
        firebase.database().ref('recipes/' + id).on('value', snapshot => callback(snapshot));
    }

    /**
     * Register a listener for authentication changes
     */
    static registerAuthListener(callback) {
        firebase.auth().onAuthStateChanged(callback);
    }
}



export default DataController;