import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../Home/Home_Components/MovieCard';
import Movie_People_Card from '../Components/Movie_People_Card';

const MovieTab = (props: {id: string}) => {
    const navigation = useNavigate();

    interface MovieInfoActor {
        id: string,
        poster_path: string,
        release_date: string,
        title: string,
        character: string,
        note: number,
    }

    const [ movieList, setMovieList ] = useState<Array<MovieInfoActor>>([{
        id: '',
        poster_path: '',
        release_date: '',
        title: '',
        character: '',
        note: 0,
    }]);

    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }

        const getMovieList = () => {
            fetch('https://api.themoviedb.org/3/person/' + props.id + '/movie_credits?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
            .then(response => response.json()).then(data => {
                let cast = data.cast.filter((movie: any) => {
                    return movie.character !== '' || movie.character !== null
                })
                cast = cast.filter((movie: any) => {
                    return !movie.character.includes('uncredited') && !movie.character.includes('archive') && !movie.character.includes('Uncredited') && !movie.character.includes('Archive')
                })
                cast = cast.sort((a: any, b: any) => {
                    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
                })
                setMovieList(cast);
            })
        }
    
        getMovieList();
    }, [navigation]);

    return (
        <div className="Movie_Tab">
            {
                (movieList === undefined || movieList.length === 0) ? <p className="Dashboard_Content_Last_Movies_List_Empty">Aucun film ajouté</p> :
                movieList.map((movie: MovieInfoActor) => {
                    return (
                        <Movie_People_Card id={movie.id} poster_path={movie.poster_path} title={movie.title} release_date={movie.release_date} character={movie.character} />
                    )
                }
                )
            }
        </div>
    )

}

export default MovieTab