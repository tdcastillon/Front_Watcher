import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../../assets/styles/Actor.scss';
import { Role } from '../../../assets/interfaces/serie_interfaces';
import TvShowPeopleCard from '../Components/TvShowPeopleCard';

const TvShowActorTab = (props : {actor_id: string}) => {
    const navigation = useNavigate();
    const actor_id = props.actor_id;

    interface SerieInfo {
        name: string,
        poster_path: string,
        character: string,
        id: string,
        first_air_date: string,
        last_air_date: string,
        status: string,
        episode_count: number,
    }

    const [series, setSeries] = useState<Array<SerieInfo>>([{
        name: '',
        poster_path: '',
        character: '',
        id: '',
        first_air_date: '',
        last_air_date: '',
        status: '',
        episode_count: 0,
    }]);

    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }
        const findActorInfo = () => {
            fetch('https://api.themoviedb.org/3/person/' + actor_id + '/tv_credits?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
            .then(response => response.json()).then(data => {
                setSeries(data.cast.filter((serie: Role) => (serie.character !== '' && serie.character !== null && serie.character !== undefined && !serie.character.includes('credited') && !serie.character.includes('rchive'))))
            })
        }
        findActorInfo();
    }, []);

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center'}}>
        {
            (series === undefined || series.length === 0) ?
                <p className="People_Content_Empty" style={{height: '500px !important'}}>
                    Aucune série ajoutée
                </p> 
            :
                series.map((serie: SerieInfo) => {
                    console.log(serie)
                    return (
                        <div key={serie.id}>
                            <TvShowPeopleCard
                                poster_path={serie.poster_path}
                                title={serie.name}
                                character={serie.character}
                                id={serie.id}
                                first_air_date={serie.first_air_date}
                                last_air_date={serie.last_air_date}
                                episodeCount={serie.episode_count}
                            />
                        </div>
                    )
                })
        }
        </div>
    )
}

export default TvShowActorTab;
