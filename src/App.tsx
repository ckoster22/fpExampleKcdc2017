import * as R from 'ramda';
import * as React from 'react';
import {view as repoView} from './repos/View';
import {view as userInputView} from './userEntry/View';
import {Repository} from './repos/Types';
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
        let view;

        switch (appState.data.kind) {
            case 'Initial':
                view = <span>About to retrieve repository data..</span>;
                break;
            case 'Retrieving':
                view = <span>Retrieving. Please wait..</span>;
                break;
            case 'Success':
                const repoViews = appState.data.repositories
                                .filter(repoFilter(appState.isFiltered))
                                .map(repoView);
                if (repoViews.length > 0) {
                    view = repoViews;
                } else {
                    view = <span>No repositories :(</span>;
                }
                break;
            case 'Failure':
                view = <span>There was a problem retrieving the repositories. ({appState.data.message})</span>;
                break;
        }

        return (
            <div className="App">
                {userInputView(appState.githubUser, appState.isFiltered, onInputChange, onSubmit(appState), toggleFilter)}
                {view}
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

const ninetyDaysAgo = (new Date()).getTime() - (1000 * 60 * 60 * 24 * 90);
const repoFilter = R.curry((isFiltered: boolean, repo: Repository) => {
    return isFiltered ? repo.lastPushed.getTime() >= ninetyDaysAgo : true;
});

export default App;