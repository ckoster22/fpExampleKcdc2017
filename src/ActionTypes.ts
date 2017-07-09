export type ActionType = 'DATA_RETRIEVED' | 'INPUT_CHANGE' | 'TOGGLE_FILTER' | 'RETRIEVING';

export type Action = {
    type: ActionType,
    payload?: any
};