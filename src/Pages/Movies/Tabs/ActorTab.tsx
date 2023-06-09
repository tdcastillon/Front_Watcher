import { Button } from '@mui/material'
import React from 'react'
import { identify_actor } from '../../../assets/functions/actor_functions'
import { Actor } from '../../../assets/interfaces/movie_interfaces'
import ActorCard from '../Movie_Compents/ActorCard'

import { useNavigate } from 'react-router-dom';

function ActorTab(props :{ movie_id: String, movieCast: Actor[], movieInfo: any }) {

    const { movie_id, movieCast, movieInfo } = props;

    const navigation = useNavigate();

    return (
        <div className='File_Content tab'>
            <div className='Content_Slide'>
                    <div className='Content_Slider_People'>
                        {
                            identify_actor(movieCast).slice(0, 5).map((person: Actor) => {
                                return (
                                    <ActorCard key={person.id} id={person.id} name={person.name} character={person.character} profile_path={person.profile_path}/>
                                )
                            })
                        }
                    </div>
            </div>
            <div style={{ height: '25px' }}></div>
            <Button 
                onClick={() => navigation('/movie/' + movie_id + '/cast', {
                    state: {
                        movie_id: movie_id,
                        cast: movieCast,
                        title: movieInfo.title,
                    }
                })}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '1.2em',
                    width: '40%',
                    alignSelf: 'center',
                }}>
            See All Cast 
            </Button>
        </div>
    )
}

export default ActorTab