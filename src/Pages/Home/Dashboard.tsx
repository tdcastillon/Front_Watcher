import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';

import '../../assets/styles/Dashboard.scss'
import '../../assets/styles/Home.scss'
import { MovieGet } from '../../assets/interfaces/movie_interfaces';
import MovieCard from './Home_Components/MovieCard';
import { SerieGet } from '../../assets/interfaces/serie_interfaces';
import { calculateMed } from '../../assets/functions/serie_function';
import SerieCard from './Home_Components/Serie_Card';

const Dashboard = (props: any) => {

    const [movies, setMovies] = useState<Array<MovieGet>>([]);
    const [series, setSeries] = useState<Array<SerieGet>>([]);
    const [marked, setMarked] = useState<Array<Array<number>>>([]);
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
                        setMovies(json.reverse().slice(0, 10));
                    })
                } else if (response.status === 403) {
                    localStorage.removeItem('token');
                    window.location.reload();
                }
            })
        }

        const getSerieNotes = () => {
            fetch('http://localhost:8080/users/getTvShowsNotes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((json) => {
                        setSeries(json.reverse().slice(0, 10));
                        let markeds = [] as Array<Array<number>>;
                        json.reverse().slice(0, 10).forEach((serie: SerieGet) => {
                            let _marked = [] as Array<number>;
                            serie.notes.forEach((note) => {
                                if (note.note >= 0) {
                                    _marked.push(note.note);
                                }
                            })
                            markeds.push(_marked);
                        })
                        setMarked(markeds);
                    })
                } else if (response.status === 403) {
                    localStorage.removeItem('token');
                    window.location.reload();
                }
            })
        }

        getMovieNotes();
        getSerieNotes();
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
                        {
                            (series === undefined || series.length === 0) ? 
                                <p className="Dashboard_Content_Last_TV_Shows_List_Empty">Aucune série ajoutée</p>
                            :
                                series.map((serie: SerieGet, idx: number) => {
                                    return (
                                        <SerieCard key={serie.tvshow_id} id={serie.tvshow_id} note={calculateMed(marked[idx])} />
                                    )
                                })
                        }
                    </div>
                </div>      
            </div>

        </div>
    )
}

export default Dashboard