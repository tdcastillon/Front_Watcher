import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';

import '../../assets/styles/Dashboard.scss'
import '../../assets/styles/Home.scss'
import { MovieGet } from '../../assets/interfaces/movie_interfaces';
import MovieCard from './Home_Components/MovieCard';

const Dashboard = (props: any) => {

    const [movies, setMovies] = useState<Array<MovieGet>>([]);
    const navigation = useNavigate();

    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }

        const getMovieNotes = () => {
            fetch('http://localhost:8080/users/getMoviesNotes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((json) => {
                        setMovies(json);
                    })
                }
            })
        }

        getMovieNotes();
    }, [navigation]);

    return (
        <div className="Dashboard_Home">
            <div className="Dashboard_Content">
                <div className="Dashboard_Content_Last_Movies">
                    <p className="Dashboard_Content_Title">Derniers films ajoutés : </p>
                    <div className="Dashboard_Content_Movies_List">
                        {
                            (movies === undefined || movies.length === 0) ? <p className="Dashboard_Content_Last_Movies_List_Empty">Aucun film ajouté</p> :
                            movies.map((movie: MovieGet) => {
                                return (
                                    <MovieCard key={movie.movie_id} id={movie.movie_id} note={movie.note} />
                                )
                            })
                        }
                    </div>
                </div>
                <br />
                <br />
                <div className="Dashboard_Content_Last_TV_Shows">
                    <p className="Dashboard_Content_Title">Dernières séries ajoutées : </p>
                    <div className="Dashboard_Content_TV_Shows_List">
                        <p className="Dashboard_Content_Last_Movies_List_Empty">Aucune série ajoutée</p>
                    </div>
                </div>      
            </div>

        </div>
    )
}

export default Dashboard