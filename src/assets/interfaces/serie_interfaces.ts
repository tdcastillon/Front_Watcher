import { Genre } from "./movie_interfaces";

export interface Role {
    episode_count: number,
    character: string,
}

export interface ActorSeries {
    id: number,
    name: string,
    roles: Role[],
    profile_path: string,
}

export interface Job {
    job: string,
    episode_count: number,
}

export interface CrewSerieMember {
    id: number,
    name: string,
    jobs: Job[]
    profile_path: string,
}



export interface Serie {
    id: number,
    poster_path: string,
    overview: string,
    name: string,
    first_air_date: string,
    last_air_date: string,
    number_of_seasons: number,
    genres: Genre[],
    status: string,
}