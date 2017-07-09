import store from '../app.store.reducer';
import {token} from '../Secret';

export const updateGithubUser = (user: string) => {
    store.dispatch({
        type: 'INPUT_CHANGE',
        payload: user
    });
};

export const toggleFilter = () => {
    store.dispatch({
        type: 'TOGGLE_FILTER'
    });
};

export const searchReposByUser = (user: string) => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://api.github.com/graphql');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'bearer ' + token);
    xhr.onload = () => {
        store.dispatch({
            type: 'DATA_RETRIEVED',
            payload: xhr.response
        });
    };

    xhr.send(constructQuery(user));
};

const constructQuery = (user: string) => `{
  "query": "query { \
    user(login:\\"${user}\\") { \
      repositories(first: 100) { \
        edges { \
          node { \
            name, \
            description, \
            pushedAt, \
            primaryLanguage { \
              name \
            }, \
            stargazers(first: 100) { \
              edges { \
                node { \
                  name \
                } \
              } \
            }, \
            forks(first: 100) { \
              edges { \
                node { \
                  nameWithOwner \
                } \
              } \
            } \
          } \
        } \
      } \
    } \
  }"
}`;