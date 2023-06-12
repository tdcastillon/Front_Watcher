import { CrewMember } from "../interfaces/crew_interfaces";
import { CrewSerieMember, Job } from "../interfaces/serie_interfaces";

const identify_principal = (people: any) => {
    let principal_cast : CrewMember[] = [];
    for (let i = 0; i < people.length; i++) {
        if ((people[i].job === 'Director') || (people[i].job === 'Screenplay') || (people[i].job === 'Writer') || (people[i].job === 'Original Music Composer')) {
            principal_cast = add_principal(principal_cast, people[i]);
        }
    }
    return principal_cast;
}

const crew_identify_principal = (crew: CrewSerieMember[]) => {
    let principal_cast : CrewSerieMember[] = [];
    crew.forEach((person: CrewSerieMember) => {
        let job_array: Job[] = [];
        person.jobs.forEach((job) => {
            if ((job.job === 'Director') || (job.job === 'Screenplay') || (job.job === 'Writer') || (job.job === 'Original Music Composer')) {
                job_array.push({
                    job: job.job,
                    episode_count: job.episode_count,
                })
            }
        })
        if (job_array.length > 0) {
            principal_cast.push({
                id: person.id,
                name: person.name,
                jobs: job_array,
                profile_path: person.profile_path,
            });
        }
    })
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

const FrJob = (job: String) => {
    switch (job) {
        case 'Director':
            return 'Réalisateur';
        case 'Screenplay':
            return 'Scénariste';
        case 'Writer':
            return 'Scénariste';
        case 'Original Music Composer':
            return 'Compositeur';
        default:
            return job;
    }
}

export { identify_principal, FrJob, crew_identify_principal };