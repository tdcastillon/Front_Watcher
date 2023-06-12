import React from 'react'
import CrewCard from '../Components/CrewCard'

import { crew_identify_principal, identify_principal } from '../../../assets/functions/crew_functions';
import { CrewSerieMember } from '../../../assets/interfaces/serie_interfaces';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

function CrewTab(props :{ movieCrew: CrewSerieMember[], serie_id: String, serie_name: String }) {

   const { movieCrew, serie_id, serie_name } = props;
   const navigation = useNavigate();

    return (
        <div className='File_Content tab'>
            <div className='Content_Slide'>
                {
                    movieCrew.length === 0 ? <p> Aucun membre d'équipe trouvé </p> :
                    <div className='Content_Slider_People'>
                        {
                            crew_identify_principal(movieCrew).slice(0, 5).map((person: CrewSerieMember) => {
                                return (
                                    <CrewCard profile_path={person.profile_path} name={person.name} jobs={person.jobs} id={person.id} />
                                )
                            })
                        }
                    </div>
                }
                <div style={{ height: '25px' }}></div>
            {
                movieCrew.length > 5 ? 
                    <Button 
                        onClick={() => navigation('/serie/' + serie_id + '/crew', {
                            state: {
                                crew: crew_identify_principal(movieCrew),
                                name: serie_name
                            }
                        })}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '1.2em',
                            width: '40%',
                            alignSelf: 'center',
                        }}>
                        Voir toute l'équipe
                    </Button>
                : null
            }
            </div>
        </div>
    )
}

export default CrewTab