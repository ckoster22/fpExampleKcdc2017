import * as R from 'ramda';
import {createStore} from 'redux';
import {Action} from './ActionTypes';
import {Repository} from './repos/Types';

export type RepositoryData = Initial | Retrieving | Success | Failure;
export type Initial = {
    kind: 'Initial'
};
export type Retrieving = {
    kind: 'Retrieving'
};
export type Success = {
    kind: 'Success',
    repositories: Repository[]
};
export type Failure = {
    kind: 'Failure',
    message: string
};

export type AppState = {
    githubUser: string,
    isFiltered: boolean,
    data: RepositoryData
};

const DEFAULT_STATE: AppState = {
    githubUser: 'ckoster22',
    isFiltered: false,
    data: {kind: 'Initial'}
};

const reducer = (state = DEFAULT_STATE, action: Action): AppState => {
    switch (action.type) {
        case 'RETRIEVING':
            return {
                ...state,
                data: {
                    kind: 'Retrieving'
                }
            };
        case 'DATA_RETRIEVED':
            return {
                ...state,
                data: {
                    kind: 'Success',
                    repositories: jsonToRepositories(action.payload, state.githubUser)
                }
            };
        case 'INPUT_CHANGE':
            return {
                ...state,
                githubUser: action.payload
            };
        case 'TOGGLE_FILTER':
            return {
                ...state,
                isFiltered: !state.isFiltered
            };
        default:
            return state;
    }
};

const jsonToRepositories = (graphqlJson: any, githubUser: string): Repository[] => {
    if (R.path(['data', 'user', 'repositories', 'edges'], graphqlJson)) {
        const repos = graphqlJson.data.user.repositories.edges;

        return repos.map(repoJsonToRepository(githubUser));
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

export default createStore<AppState>(reducer);