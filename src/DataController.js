import 'whatwg-fetch';
import 'es6-promise';
import * as firebase from 'firebase';

class DataController {
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

    static signIn(email, password, callback) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            callback(user);
        }).catch(e => {
            if (e.code === 'auth/user-not-found') {
                this.createUser(email, password, callback);
            }
            console.log(e.message)

        })
    }

    static signOut() {
        firebase.auth().signOut();
    }

    static createUser(email, password, callback) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
            callback(user);
        }).catch(e => {
            console.log(e.message);
        });
    }

    static setName(name) {
        if (!this.getUser().displayName) {
            this.getUser().updateProfile({displayName: name, photoURL: null})
        }
    }

    static getUser() {
        return firebase.auth().currentUser;
    }

    static submitComment(id, comment) {
        let user = this.getUser();

        firebase.database().ref('recipes/' + id).push({
            uid: user.uid,
            displayName: user.displayName,
            comment: comment
        })
    }

    static getComments(id, callback) {
        firebase.database().ref('recipes/' + id).on('value', snapshot => callback(snapshot));
    }

    static registerAuthListener(callback) {
        firebase.auth().onAuthStateChanged(callback);
    }
}



export default DataController;