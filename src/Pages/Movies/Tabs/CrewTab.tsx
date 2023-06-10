import React from 'react'
import { CrewMember } from '../../../assets/interfaces/crew_interfaces'
import CrewCard from '../Movie_Components/CrewCard'

import { identify_principal } from '../../../assets/functions/crew_functions';

function CrewTab(props :{ movie_id: String, movieCrew: CrewMember[], movieInfo: any }) {

   const { movieCrew } = props;

    return (
        <div className='File_Content tab'>
            <div className='Content_Slide'>
                {
                    movieCrew.length === 0 ? <p> No director found </p> :
                    <div className='Content_Slider_People'>
                        {
                            identify_principal(movieCrew).map((person: CrewMember) => {
                                return (
                                    <CrewCard key={person.id} id={person.id} name={person.name} job={person.job} profile_path={person.profile_path}/>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default CrewTab