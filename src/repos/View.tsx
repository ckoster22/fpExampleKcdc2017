import * as React from 'react';
import {Repository} from './Types';

const footerStyle = {
    marginTop: '8px',
    fontSize: '12px',
    color: '#586069'
};
export const view = (repo: Repository) => {
    const repoDescrption = repo.description ? repo.description : '';

    // TODO: pull out style
    return (
        <div
            key={repo.name}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: '16px',
                paddingTop: '24px',
                paddingBottom: '24px',
                borderBottom: '1px #e1e4e8 solid',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#24292e',
                backgroundColor: '#fff'
            }}
        >
            {repoNameView(repo.owner, repo.name)}
            {descriptionView(repoDescrption)}
            <div style={footerStyle}>
                {repo.language ? languageView(repo.language) : ''}
                {starsView(repo.stars)}
                {forksView(repo.forks)}
                {lastUpdatedView(repo.lastPushed)}
            </div>
        </div>
    );
};

const repoNameStyle = {
    marginTop: '0px',
    marginBottom: '4px',
    fontSize: '20px'
};
const linkStyle = {
    color: '#0366d6',
    textDecoration: 'none'
};
const repoNameView = (user: string, repoName: string) => {
    return (
        <h3 style={repoNameStyle}>
            <a href={'https://github.com/' + user + '/' + repoName} style={linkStyle}>{repoName}</a>
        </h3>
    );
};

const descriptionStyle = {
    marginTop: '0px',
    marginBottom: '8px'
};
const descriptionView = (description: string) => {
    return <p style={descriptionStyle}>{description}</p>;
};

const languageStyle = {
    marginRight: '16px'
};
const languageView = (language: string) => {
    return <span style={languageStyle}>{language}</span>;
};

const starsStyle = {
    marginRight: '16px'
};
const starsView = (stars: number) => {
    return (
        <span style={starsStyle}>
            <svg aria-label="star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14" style={{display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '4px'}}>
                <path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z" />
            </svg>
            {stars}
        </span>
    );
};

const forksStyle = {
    marginRight: '16px'
};
const forksView = (forks: number) => {
    return (
        <span style={forksStyle}>
            <svg aria-label="fork" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="10" style={{display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '4px'}}>
                <path d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" />
            </svg>
            {forks}
        </span>
    );
};

const lastUpdatedView = (lastUpdated: Date) => {
    const message = 'Updated on ' + monthFor(lastUpdated.getMonth()) + ' ' + lastUpdated.getDate();
    return <span>{message}</span>;
};
const monthFor = (month: number): string => {
    switch (month) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        default:
            return 'December';
    }
};