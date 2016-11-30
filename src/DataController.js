import 'whatwg-fetch';
import 'es6-promise';

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
}

export default DataController;