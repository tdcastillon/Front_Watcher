import { Button } from '@mui/material'
import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { ActorSeries } from '../../../assets/interfaces/serie_interfaces'
import ActorCard from '../Components/ActorSerieCard';

function ActorTab(props :{ serie_id: String, serieCast: ActorSeries[], movieInfo: any }) {

    const { serie_id, serieCast, movieInfo } = props;

    const navigation = useNavigate();

    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }
    }, []);

    return (
        <div className='File_Content tab'>
            <div className='Content_Slide'>
                    <div className='Content_Slider_People'>
                        {
                            serieCast.slice(0, 5).map((person: ActorSeries) => {
                                return (
                                    <ActorCard profile_path={person.profile_path} name={person.name} roles={person.roles} id={person.id} />
                                )
                            })
                        }
                    </div>
            </div>
            <div style={{ height: '25px' }}></div>
            <Button 
                onClick={() => navigation('/serie/' + serie_id + '/cast', {
                    state: {
                        serie_id: serie_id,
                        cast: serieCast,
                        name: movieInfo.name,
                    }
                })}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '1.2em',
                    width: '40%',
                    alignSelf: 'center',
                }}>
            Voir tout le casting
            </Button>
        </div>
    )
}

export default ActorTab