import * as React from 'react';

export const view = (user: string, isFiltered: boolean, onInput, onSubmit, onFilterToggle) => {
    return (
        <form onSubmit={onSubmit}>
            {inputView(user, onInput)}
            {filterView(isFiltered, onFilterToggle)}
        </form>
    );
};

const inputStyle = {
    padding: '8px',
    marginTop: '16px',
    fontSize: '16px'
};
const inputView = (user: string, onInput) => {
    return <input type="text" value={user} onChange={onInput} style={inputStyle} />;
};

const filterStyle = {
    marginLeft: '16px'
};
const checkboxStyle = {
    marginLeft: '8px'
};
const filterView = (isFiltered: boolean, onFilterToggle) => {
    return (
        <label style={filterStyle}>
            Last 90 days
            <input type="checkbox" style={checkboxStyle} onChange={onFilterToggle} checked={isFiltered} />
        </label>
    );
};