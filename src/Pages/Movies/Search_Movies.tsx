import { useEffect, useState } from 'react';
import '../../assets/styles/Search.scss'

import { TextField, IconButton, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo/TheWatcher.png';

import { MdList, MdSearch } from 'react-icons/md';

import env from "ts-react-dotenv"
import { MovieInfoI } from '../../assets/interfaces/movie_interfaces';
import { get } from 'http';

function Search_Movies() {

    const navigation = useNavigate();


    const [ search, setSearch ] = useState('');


    interface Movie {
        id: string,
        title: string,
        poster_path: string,
        overview: string,
        release_date: string,
        genre_ids: Number[],
    }

    let searched_movie : Movie[] = []
    const [ movies, setMovies ] = useState(searched_movie);

    const [ page, setPage ] = useState(1);
    const [total_pages, setTotalPages] = useState(1);


    const searchMovie = (movie_title: string) => {
            fetch('https://api.themoviedb.org/3/search/movie?api_key=' + env.API_KEY + '&language=fr-FR&query=' + movie_title + '&page=' + page + '&include_adult=false&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=3')
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
        fetch('https://api.themoviedb.org/3/search/movie?api_key=' + env.API_KEY + '&language=fr-FR&query=' + search + '&page=' + new_page + '&include_adult=false&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=3')
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
        // get only setences with less than 100 characters
        let n_overview = overview.split('.');
        let new_overview = '';
        for (let i = 0; i < n_overview.length; i++) {
            if (n_overview[i].length < 100) {
                new_overview += n_overview[i] + '. ';
            }
        }
        new_overview = new_overview.slice(0, -4);
        new_overview += '...';
        return new_overview;
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
                    movies.map((movie: Movie) => {
                            return (
                                <div className='Movie' key={movie.id}>
                                    <Card className='Movie_Card'>
                                        <CardActionArea onClick={() => navigation('/movie/' + movie.id)} style={{ height: '100%' }}>
                                            <CardMedia
                                                component="img"
                                                image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                                                alt={movie.title}
                                                height="300"
                                                style={{ objectFit: 'contain', margin: '5px' }}
                                            />
                                            <div style={{ height: '20px' }}></div>
                                            <CardContent>
                                                <Typography gutterBottom variant="body1" component="div" style={{ fontWeight: 'bolder' }} >
                                                    {movie.title}
                                                </Typography>
                                                <div style={{ height: '20px' }}></div>
                                                <Typography variant="body2" color="text.secondary">
                                                    {customOverview(movie.overview)}
                                                </Typography>
                                                <div style={{ height: '20px' }}></div>
                                                <Typography variant="body2" color="text.secondary">
                                                    Date : {customDate(movie.release_date)}
                                                </Typography>
                                            </CardContent>
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