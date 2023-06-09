import { Actor } from "../interfaces/movie_interfaces";

const identify_actor = (people: any) => {
    let principal_cast : Actor[] = [];
    for (let i = 0; i < people.length; i++) {
        principal_cast.push({
            id: people[i].id,
            name: people[i].name,
            character: people[i].character,
            profile_path: people[i].profile_path,
        });
    }
    return principal_cast;
}

export { identify_actor } 