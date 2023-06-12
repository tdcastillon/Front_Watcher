import React, {useEffect, useState} from 'react'

import { useNavigate, useLocation } from 'react-router-dom';

import '../../assets/styles/Movie_Item.scss';
import ActorCard from './Components/ActorSerieCard';
import { ActorSeries, Role } from '../../assets/interfaces/serie_interfaces';

const AllCastPageS = () => {
    const navigation = useNavigate();
    const location = useLocation();

    const [ movieCast, setMovieCast ] = useState<any[]>([]);
    
    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }
        // erase all uncredited actors
        let cast : ActorSeries[] = [];
        location.state.cast.forEach((actor: ActorSeries) => {
            let roles : Role[] = [];
            actor.roles.forEach((role: Role) => {
                if (role.character !== '' && !role.character.includes('rchive') && !role.character.includes('credited')) {
                    roles.push(role);
                }
            });
            if (roles.length > 0) {
                cast.push({
                    id: actor.id,
                    name: actor.name,
                    profile_path: actor.profile_path,
                    roles: roles,
                });
            }
        });
        setMovieCast(cast);
    }, [movieCast, location.state.cast, navigation]);

    return (
        <div className='Home'>
            <div className='Dashboard_Header'>
                <h1> Cast complet de {location.state.name} </h1>
            </div>
            <div className='cast' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '95%'}}>
                {
                    movieCast.map((actor: ActorSeries) => {
                        return (
                            <ActorCard key={actor.id} id={actor.id} name={actor.name} roles={actor.roles} profile_path={actor.profile_path} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllCastPageS