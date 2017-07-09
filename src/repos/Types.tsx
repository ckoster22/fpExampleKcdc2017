export type Repository = {
    owner: string,
    name: string,
    description?: string,
    language?: string,
    stars: number,
    forks: number,
    lastPushed: Date
};