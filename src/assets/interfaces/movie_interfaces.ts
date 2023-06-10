export interface Collection {
    id: String,
    name: String,
}

export interface Genre {
    id: String,
    name: String,
}

export interface MovieInfoI {
    id: String,
    title: String,
    status: String,
    collection: Collection,
    poster_path: String,
    overview: String,
    genres: Genre[],
    release_date: String,
    synopsis: String,
}


export interface MovieInfoUser {
    id: String,
    rating: number,
    review: String,
    status: String,
    favorite: Boolean,
}