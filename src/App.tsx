import * as R from 'ramda';
import * as React from 'react';
import {view as repoView} from './repos/View';
import {Repository} from './repos/Types';
import {view as userInputView} from './userEntry/View';
import store from './app.store.reducer';
import {
    searchReposByUser,
    toggleFilter,
    updateGithubUser } from './userEntry/Actions';
// import * as Data from './data';
import {AppState} from './app.store.reducer';
import './App.css';

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const appState: AppState = this.props.appstate;

        return (
            <div className="App">
                {userInputView(appState.githubUser, appState.isFiltered, onInputChange, onSubmit(appState), toggleFilter)}
                {graphQlDataToView(this.props.appstate)}
            </div>
        );
    }
}

const onInputChange = (event) => {
    updateGithubUser(event.target.value);
};

const onSubmit = R.curry((appState: AppState, event: any) => {
    event.preventDefault();

    searchReposByUser(appState.githubUser);
});

const jsonToRepositories = (appState: AppState): Repository[] => {
    if (appState.graphqlData && appState.graphqlData.data && appState.graphqlData.data.user && appState.graphqlData.data.user.repositories && appState.graphqlData.data.user.repositories.edges) {
        const repos = appState.graphqlData.data.user.repositories.edges;

        return repos.map(repoJsonToRepository(appState.githubUser));
    } else {
        return [];
    }
};

const repoJsonToRepository = R.curry((owner: string, json: any): Repository | null => {
    if (json.node) {
        const repo = json.node;
        let stars = 0;
        let forks = 0;

        if (repo.stargazers && repo.stargazers.edges) {
            stars = repo.stargazers.edges.length;
        }
        if (repo.forks && repo.forks.edges) {
            stars = repo.forks.edges.length;
        }

        return {
            owner: owner,
            name: repo.name,
            description: repo.description,
            language: repo.primaryLanguage ? repo.primaryLanguage.name : undefined,
            stars: stars,
            forks: forks,
            lastPushed: new Date(repo.pushedAt)
        };
    } else {
        return null;
    }
});

const ninetyDaysAgo = (new Date()).getTime() - (1000 * 60 * 60 * 24 * 90);
const filterRepos = (repo: Repository) => {
    const isFiltered = store.getState().isFiltered;

    return isFiltered ? repo.lastPushed.getTime() >= ninetyDaysAgo : true;
};

const graphQlDataToView = R.compose(
  R.map(repoView),
  R.filter(filterRepos),
  jsonToRepositories
);

export default App;

// TODO: use remote data type