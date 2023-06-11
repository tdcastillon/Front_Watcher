import { useEffect, useState } from 'react';
import '../../assets/styles/Search.scss'

import { TextField, IconButton, Card, CardActionArea, CardContent } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo/TheWatcher.png';

import { MdList, MdSearch } from 'react-icons/md';

import env from "ts-react-dotenv"

function Search_Movies() {

    const navigation = useNavigate();


    const [ search, setSearch ] = useState('');


    interface Movie {
        id: String,
        title: String,
        poster_path: String,
        overview: String,
        release_date: String,
        genre_ids: Number[],
    }

    let searched_movie : Movie[] = [];

    const [ movies, setMovies ] = useState(searched_movie);

    const [ page, setPage ] = useState(1);
    const [total_pages, setTotalPages] = useState(1);


    const searchMovie = (movie_title: string) => {
            fetch('https://api.themoviedb.org/3/search/movie?api_key=' + env.API_KEY + '&language=fr-FR&query=' + movie_title + '&page=' + page + '&include_adult=false&sort_by=popularity.desc')
            .then(response => response.json())
            .then(data => {
                setTotalPages(data.total_pages);
                let movies = data.results.filter((movie: Movie) => {
                    return movie.poster_path !== null;
                })
                movies = movies.filter((movie: Movie) => {
                    return movie.overview !== '';
                })
                setMovies(movies);
            })
    }

    useEffect(() => {
        if ((localStorage.getItem('token') == null) || (localStorage.getItem('token') == '')) {
            navigation('/');
        }
        if (localStorage.search !== undefined) {
            setSearch(localStorage.search);
            searchMovie(localStorage.search);
            localStorage.removeItem('search');
        }
    }, [movies, navigation])

    const changePage = (new_page: number) => {
        setPage(new_page)
        fetch('https://api.themoviedb.org/3/search/movie?api_key=' + env.API_KEY + '&language=fr-FR&query=' + search + '&page=' + new_page + '&include_adult=false&sort_by=popularity.desc')
            .then(response => response.json())
            .then(data => {
                let movies = data.results.filter((movie: Movie) => {
                    return movie.poster_path !== null;
                })
                movies = movies.filter((movie: Movie) => {
                    return movie.overview !== '';
                })
                setMovies(movies);
            })
    }

    const customOverview = (overview: String) => {
        return overview
    }

    const customDate = (date: String) => {
        let n_date = date.split('-');
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        return n_date[2] + ' ' + months[parseInt(n_date[1]) - 1] + ' ' + n_date[0];
    }

    return (
        <div className='Home'>
            <div className='Header'>
                <p className='title'> Rechercher un film </p>
                <div className='search'>
                    <TextField
                        id="outlined-search"
                        label="Rechercher un film"
                        type="search"
                        variant="outlined"
                        value={search}
                        onChange={(e) => {setSearch(e.target.value); localStorage.search = e.target.value}}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                searchMovie(search);
                                localStorage.search = search;
                            }
                        }}
                        style={{ width: '80%', marginRight: '20px'}}
                    />
                    <div className='search_button'>
                        <IconButton onClick={() => searchMovie(search)} color="primary" className="Home_Menu_Button Search">
                            <MdSearch />
                        </IconButton>
                    </div>      
                </div>
            </div>
            <div className='Movies'>
                {
                    movies.map((movie: Movie, index) => {
                        return (
                            <div className='Movie' key={index}>
                                <Card className='Movie_Card'>
                                    <CardActionArea onClick={() => {
                                        localStorage.search = search;
                                        navigation('/movie/' + movie.id)}
                                    }>
                                        <CardContent>
                                            <div className='Movie_Header'>
                                                <div className='Movie_Poster'>
                                                    {
                                                        movie.poster_path === null ?
                                                            <img src={logo} className='logo' alt="The Watcher" />
                                                        :
                                                            <img src={'https://image.tmdb.org/t/p/w154' + movie.poster_path} alt='Poster' />
                                                    }
                                                </div>
                                                <div className='Movie_Info'>
                                                    <p className='Movie_Title'> {movie.title} </p>
                                                    <p className='Movie_Release_Date'> {customDate(movie.release_date)} </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                        {
                                            movie.overview != '' ?
                                            <CardContent className='Movie_Content'>
                                                <p className='Movie_Overview'>{customOverview(movie.overview)}</p>
                                            </CardContent>
                                            :
                                            <div></div>
                                        }
                                    </CardActionArea>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
            {
                    (total_pages !== 1) ?
                        <div className='Pagination'>
                            <div className='Pagination_Buttons'>
                                <p className='Pagination_Button' onClick={() => {
                                        changePage(1)
                                }}> 
                                    {"<<"}
                                </p>
                                <div className='Pagination_Separator' />
                                {
                                    (page > 1) ?
                                        <p className='Pagination_Button' onClick={() => {
                                            changePage(page - 1)
                                        }}> 
                                            {'<'}
                                        </p>
                                    :
                                    <div></div>
                                }
                                <div className='Pagination_Separator' />
                                <p className='Pagination_Number'> {page} </p>
                                <div className='Pagination_Separator' />
                                {
                                    (page < total_pages) ?
                                        <p className='Pagination_Button' onClick={() => {
                                            changePage(page + 1)
                                        }}>
                                            {'>'}
                                        </p>
                                    :
                                    <div></div>
                                }
                                <div className='Pagination_Separator' />
                                <p className='Pagination_Button' onClick={() => {
                                            changePage(total_pages)
                                        }}> 
                                            {">>"}
                                </p>
                            </div>
                        </div>
                    :
                        <div></div>
                }
        </div>
    )
}

export default Search_Movies;