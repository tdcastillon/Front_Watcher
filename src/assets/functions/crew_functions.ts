import { CrewMember } from "../interfaces/crew_interfaces";

const identify_principal = (people: any) => {
    let principal_cast : CrewMember[] = [];
    for (let i = 0; i < people.length; i++) {
        if ((people[i].job === 'Director') || (people[i].job === 'Screenplay') || (people[i].job === 'Writer') || (people[i].job === 'Original Music Composer')) {
            principal_cast = add_principal(principal_cast, people[i]);
        }
    }
    return principal_cast;
}

const add_principal = (principal_cast: CrewMember[], person: any) => {
    let is_present = false;
    if (principal_cast.length === 0) {
        principal_cast.push({
            id: person.id,
            name: person.name,
            job: [person.job],
            profile_path: person.profile_path,
        });
    } else {
        for (let i = 0; i < principal_cast.length; i++) {
            if (principal_cast[i].id === person.id) {
                principal_cast[i].job.push(person.job);
                is_present = true;
            }
        }
        if (!is_present) {
            principal_cast.push({
                id: person.id,
                name: person.name,
                job: [person.job],
                profile_path: person.profile_path,
            });
        }
    }
    return principal_cast;
}

export { identify_principal }