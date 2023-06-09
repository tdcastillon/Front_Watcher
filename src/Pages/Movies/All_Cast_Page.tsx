import React, {useEffect, useState} from 'react'

import { useNavigate, useLocation } from 'react-router-dom';

import '../../assets/styles/Movie_Item.scss';
import ActorCard from './Movie_Compents/ActorCard';

const AllCastPage = () => {
    const navigation = useNavigate();
    const location = useLocation();

    const [ movieCast, setMovieCast ] = useState<any[]>([]);
    
    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }
        // erase all uncredited actors
        setMovieCast(location.state.cast.filter((actor: any) => !actor.character.includes('(uncredited)')));
    }, [movieCast, location.state.cast, navigation]);

    interface Actor {
        id: String,
        name: String,
        character: String,
        profile_path: String,
    }

    return (
        <div className='Home'>
            <div className='Dashboard_Header'>
                <h1> Cast complet de {location.state.title} </h1>
            </div>
            <div className='cast' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '95%'}}>
                {
                    movieCast.map((actor: Actor) => {
                        console.log(actor);
                        return (
                            <ActorCard key={actor.id} id={actor.id} name={actor.name} character={actor.character} profile_path={actor.profile_path} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllCastPage