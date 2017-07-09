export type ActionType = 'DATA_RETRIEVED' | 'INPUT_CHANGE' | 'TOGGLE_FILTER';

export type Action = {
    type: ActionType,
    payload?: any
};