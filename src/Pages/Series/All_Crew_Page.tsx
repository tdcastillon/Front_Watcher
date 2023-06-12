import React, {useEffect, useState} from 'react'

import { useNavigate, useLocation } from 'react-router-dom';

import '../../assets/styles/Movie_Item.scss';
import { ActorSeries, CrewSerieMember, Role } from '../../assets/interfaces/serie_interfaces';
import CrewCard from './Components/CrewCard';

const All_CrewS_Page = () => {
    const navigation = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }
    }, [navigation]);

    return (
        <div className='Home'>
            <div className='Dashboard_Header'>
                <h1> Equipe compléte de {location.state.name} </h1>
            </div>
            <div className='cast' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '95%'}}>
                {
                    location.state.crew.map((crewM: CrewSerieMember) => {
                        return (
                            <CrewCard key={crewM.id} id={crewM.id} name={crewM.name} jobs={crewM.jobs} profile_path={crewM.profile_path} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default All_CrewS_Page