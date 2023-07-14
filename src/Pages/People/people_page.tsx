import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../assets/styles/Actor.scss'
import { customDate } from '../../assets/functions/movie_functions';
import { Tabs, Tab } from '@mui/material';
import TabPanel from '../../assets/special_components/TabPanel';
import MovieTab from './Tab/MovieTab';
import MovieCrewTab from './Tab/MovieCrewTab';

import logo from '../../assets/logo/TheWatcher.png';
import TvShowActorTab from './Tab/TvShowActorTab';
import SerieCrewTab from './Tab/SerieCrewTab';

function People_Page() {
    const actor_id = window.location.pathname.split('/')[2];

    const [ actorInfo, setActorInfo ] = useState({
        name: '',
        biography: '',
        birthday: '',
        deathday: '',
        place_of_birth: '',
        profile_path: ''
    });

    const [ value, setValue ] = useState(0);


    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }
        if (window.location.pathname.split('/')[2] === undefined) {
            navigation('/');
        }

        const findActorInfo = () => {
            fetch('https://api.themoviedb.org/3/person/' + actor_id + '?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
            .then(response => response.json()).then(data => {
                setActorInfo({
                    name: data.name,
                    biography: data.biography,
                    birthday: data.birthday,
                    deathday: data.deathday,
                    place_of_birth: data.place_of_birth,
                    profile_path: data.profile_path
                })
            }
        )}
        findActorInfo();
    }, []);


    const navigation = useNavigate();

    return (
        <div className="Dashboard_Home">
            <div className='File_Header'>
                <div className='File_Header_Left'>
                    <div className='Actor_Header_Image'>
                        <img 
                            src={(actorInfo.profile_path !== '') ? "https://image.tmdb.org/t/p/w500" + actorInfo.profile_path : logo}
                            alt={actorInfo.name}
                            style={{width: '200px', height: '200px', objectFit: 'contain', margin: '5px', borderRadius: '100%'}}
                        />
                    </div>
                </div>
                <div className='File_Header_Right'>
                    <div>
                        <h1 className='Actor_Header_Name'>{actorInfo.name}</h1>
                    </div>
                    <div className='Actor_Header_Info'>
                        <p className='Actor_Header_Info_Birth'><span style={{fontWeight: '700'}}> Date de naissance : </span> {(actorInfo.birthday !== null) ? customDate(actorInfo.birthday) : 'Inconnue'}</p>
                        { actorInfo.deathday !== null ? <p className='Actor_Header_Info_Death'> <span style={{fontWeight: '700'}}> Date de décès : </span> {customDate(actorInfo.deathday)}</p> : null }
                        <p className='Actor_Header_Info_Place'><span style={{fontWeight: '700'}}> Lieu de naissance : </span> {(actorInfo.place_of_birth !== null) ? actorInfo.place_of_birth : 'Inconnu'}</p>
                    </div>
                </div>
            </div>
            <div className='File_Content'>
                <p className='Actor_Biography_Title'>Biographie</p>
                <p className='Actor_Biography' style={{textAlign: 'justify', fontSize: '1em'}}>{(actorInfo.biography !== null) ? actorInfo.biography : 'Aucune biographie disponible'}</p>
            </div>
            <div className='File_Content'>
            <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => setValue(newValue)}
                    style={{
                        width: '98%',
                        alignSelf: 'center',
                        margin: '0 auto',
                        marginBottom: '2px',
                        display: 'flex',
                        fontSize: '1.2em',
                        backgroundColor: '#96d0df',
                        borderRadius: '0.3rem',
                    }}
                    variant='fullWidth'
                >
                    <Tab label="Film" style={{ flex: 1 }}/>
                    <Tab label="Série" style={{ flex: 1 }}/>
                    <Tab label="Equipe Film" style={{ flex: 1 }}/>
                    <Tab label="Equipe Série" style={{ flex: 1 }}/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <MovieTab id={actor_id}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TvShowActorTab actor_id={actor_id}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <MovieCrewTab id={actor_id}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <SerieCrewTab actor_id={actor_id}/>
                </TabPanel>
            </div>
        </div>
    )
}

export default People_Page