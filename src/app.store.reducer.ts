import {createStore} from 'redux';
import {Action} from './ActionTypes';

export type AppState = {
    githubUser: string,
    isFiltered: boolean,
    graphqlData: any
};

const DEFAULT_STATE: AppState = {
    githubUser: 'ckoster22',
    isFiltered: false,
    graphqlData: null
};

const reducer = (state = DEFAULT_STATE, action: Action): AppState => {
    switch (action.type) {
        case 'DATA_RETRIEVED':
            return {
                ...state,
                graphqlData: action.payload
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

export default createStore<AppState>(reducer);