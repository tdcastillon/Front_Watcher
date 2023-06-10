export interface Collection {
    id: string,
    name: string,
}

export interface Genre {
    id: string,
    name: string,
}

export interface MovieInfoI {
    id: string,
    title: string,
    status: string,
    collection: Collection,
    poster_path: string,
    overview: string,
    genres: Genre[],
    release_date: string,
    synopsis: string,
}


export interface MovieInfoUser {
    id: String,
    rating: number,
    review: String,
    status: String,
    favorite: Boolean,
}

export interface MovieGet {
    movie_id: number,
    note: number,
}