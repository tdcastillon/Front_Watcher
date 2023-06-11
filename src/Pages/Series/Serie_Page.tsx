import {useEffect, useState } from 'react';
import { Genre } from '../../assets/interfaces/movie_interfaces';
import { customDate, getRating, getStatus } from '../../assets/functions/movie_functions';
import '../../assets/styles/Movie_Item.scss';

const {useNavigate} = require("react-router-dom");

const Serie_Page = () => {
    const serie_id = window.location.href.split('/')[2];
    const navigation = useNavigate();

    interface Serie {
        id: number,
        poster_path: string,
        overview: string,
        name: string,
        first_air_date: string,
        last_air_date: string,
        number_of_seasons: number,
        genres: Genre[],
        status: string,
    }

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



    useEffect(() => {
        if ((localStorage.getItem('token') == null) || (localStorage.getItem('token') == '')) {
            navigation('/');
        }
        const getTvShow = () => {
            fetch('https://api.themoviedb.org/3/tv/75450?language=fr-FR', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmJhMDE1OGQwYWZiNjE4ZTVjYTNhMTNkZDAwZjRkYiIsInN1YiI6IjYzMDRlM2ViYWM4ZTZiMDA4MmJmNzQyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TBkK7oksKRPXyzfdu0dcEzLbgo96kV47GjhAk6mOyek',
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSerie(data);
            })
        }

        getTvShow();
        
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
        </div>
    )
}

export default Serie_Page