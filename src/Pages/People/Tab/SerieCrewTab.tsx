import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Movie_People_Card from '../Components/Movie_People_Card';
import Movie_Crew_Card from '../Components/MovieCrewCard';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../../../assets/special_components/TabPanel';
import TvShowPeopleCrewCard from '../Components/TvShowPeopleCrewCard';

const SerieCrewTab = (props: {actor_id: string}) => {
    const navigation = useNavigate();

    interface SerieCrewInfo {
        name: string,
        poster_path: string,
        job: string,
        id: string,
        first_air_date: string,
        episode_count: number,
    }

    const [serieList, setSerieList] = useState<Array<SerieCrewInfo>>([]);

    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }
        const findActorInfo = () => {
            fetch('https://api.themoviedb.org/3/person/' + props.actor_id + '/tv_credits?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
            .then(response => response.json()).then(data => {
                let newCrew = data.crew.filter((serie: SerieCrewInfo) => (serie.job === 'Director' || serie.job === 'Screenplay' || serie.job === 'Original Music Composer'))
                setSerieList(newCrew);                    
            })
        }
        findActorInfo();
    }, []);


    return (
        <div className="Movie_Tab" style={{display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center'}}>
            {
                (serieList === undefined || serieList.length === 0) ?
                    <p className="People_Content_Empty" style={{height: '500px !important'}}>
                        Aucune série ajoutée
                    </p>
                :
                    serieList.map((serie: SerieCrewInfo) => {
                        return(
                            <TvShowPeopleCrewCard
                                poster_path={serie.poster_path}
                                title={serie.name}
                                job={serie.job}
                                id={serie.id}
                                first_air_date={serie.first_air_date}
                                episodeCount={serie.episode_count}
                            />
                        )
                    })
            }
        </div>
    )

}

export default SerieCrewTab