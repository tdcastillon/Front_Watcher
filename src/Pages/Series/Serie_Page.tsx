import {useEffect, useState } from 'react';
import { customDate, getRating, getStatus } from '../../assets/functions/movie_functions';
import '../../assets/styles/Movie_Item.scss';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../../assets/special_components/TabPanel';
import ActorTab from './Tab/Actor_Serie_Tab';
import CrewTab from './Tab/CrewTab';
import { Serie, ActorSeries, CrewSerieMember } from '../../assets/interfaces/serie_interfaces';

const {useNavigate} = require("react-router-dom");

const Serie_Page = () => {
    const serie_id = window.location.href.split('/')[4];
    const navigation = useNavigate();



    const [ serie, setSerie ] = useState<Serie>({
        id: 0,
        poster_path: '',
        overview: '',
        name: '',
        first_air_date: '',
        last_air_date: '',
        number_of_seasons: 0,
        genres: [],
        status: '',
    });

    const [rate, setRate] = useState(-1.0);
    const [value, setValue] = useState(0);

    const [cast, setCast] = useState<ActorSeries[]>([]);
    const [crew, setCrew] = useState<CrewSerieMember[]>([]);


    useEffect(() => {
        if ((localStorage.getItem('token') == null) || (localStorage.getItem('token') == '')) {
            navigation('/');
        }
        const getTvShow = () => {
            fetch('https://api.themoviedb.org/3/tv/' + serie_id + '?language=fr-FR', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmJhMDE1OGQwYWZiNjE4ZTVjYTNhMTNkZDAwZjRkYiIsInN1YiI6IjYzMDRlM2ViYWM4ZTZiMDA4MmJmNzQyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TBkK7oksKRPXyzfdu0dcEzLbgo96kV47GjhAk6mOyek',
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
            .then(response => response.json())
            .then(data => {
                setSerie(data);
            })
        }

        const getTvCredits = () => {
            fetch('https://api.themoviedb.org/3/tv/' + serie_id + '/aggregate_credits?language=fr-FR', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmJhMDE1OGQwYWZiNjE4ZTVjYTNhMTNkZDAwZjRkYiIsInN1YiI6IjYzMDRlM2ViYWM4ZTZiMDA4MmJmNzQyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TBkK7oksKRPXyzfdu0dcEzLbgo96kV47GjhAk6mOyek',
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
            .then(response => response.json())
            .then(data => {
                setCast(data.cast);
                setCrew(data.crew);
            })
        }

        getTvShow();
        getTvCredits();
        
    }, [navigation])

    return (
        <div className='Home'>
            <div className='File_Header'>
                <div className='Header_Left'>
                    <img src={'https://image.tmdb.org/t/p/w185' + serie.poster_path} alt='Poster' className='Serie_Poster'/>
                </div>
                <div className='Header_Right'>
                    <p className='Movie_Title'>{serie.name} </p>
                    <p className='Serie_Seasons'> Nombre de saisons : {serie.number_of_seasons} </p>
                    <p className='Serie Rating'> Note : {(rate === -1.0) ? 'Non noté' : rate} </p>
                    <p className='Movie_Status'> Statut : {getStatus(serie.status, serie.first_air_date)} </p>
                    <p className='Movie_Status'> Date du premier épisode : {customDate(serie.first_air_date)} </p>
                    {
                        (serie.status === 'Ended' || serie.status === 'Canceled') ? (
                            <p className='Movie_Status'> Date du dernier épisode : {customDate(serie.last_air_date)} </p>
                        ) : null
                    }
                </div>
            </div>
            <div className='Movie_Overview' style={{width: '90%', alignSelf: 'center', margin: '15px auto'}}>
                <p className='Movie_Overview_Title'> Synopsis </p>
                <p className='Movie_Overview_Text'> {serie.overview} </p>
            </div>
            <Tabs
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                indicatorColor="primary"
                textColor="primary"
                centered
                style={{
                    width: '90%',
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
                <Tab label="Acteurs" />
                <Tab label="Equipe" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ActorTab serie_id={serie_id} serieCast={cast} movieInfo={serie}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CrewTab movieCrew={crew} serie_id={serie_id} serie_name={serie.name}/>
            </TabPanel> 
        </div>
    )
}

export default Serie_Page