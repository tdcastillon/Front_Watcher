import { useEffect, useState } from 'react';
import '../../assets/styles/Search.scss'

import { TextField, IconButton, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo/TheWatcher.png';

import { MdSearch } from 'react-icons/md';
import { customDate } from '../../assets/functions/movie_functions';

function Search_Series() {

    const navigation = useNavigate();

    interface Serie {
        id: number,
        poster_path: string,
        overview: string,
        name: string,
        first_air_date: string
    }

    let searched_serie : Serie[] = [];
    const [ series, setSeries ] = useState(searched_serie);

    const [ search, setSearch ] = useState('');
    const [ page, setPage ] = useState(1);
    const [total_pages, setTotalPages] = useState(1);

    const searchSerie = (serie_title: string) => {
        fetch('https://api.themoviedb.org/3/search/tv?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR&query=' + serie_title + '&page=' + page + '&include_adult=false&sort_by=popularity.asc')
        .then(response => response.json())
        .then(data => {
            setTotalPages(data.total_pages);
            let series = data.results.filter((serie: Serie) => {
                return serie.poster_path !== null;
            })
            series = series.filter((serie: Serie) => {
                return serie.overview !== '';
            })
            setSeries(series);
        })
    }

    useEffect(() => {
        if ((localStorage.getItem('token') == null) || (localStorage.getItem('token') == '')) {
            navigation('/');
        }
        if (localStorage.search !== undefined) {
            setSearch(localStorage.search);
            localStorage.removeItem('search');
        }
    }, [navigation])

    const changePage = (new_page: number) => {
        setPage(new_page);
        fetch('https://api.themoviedb.org/3/search/tv?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR&query=' + search + '&page=' + new_page + '&include_adult=false&sort_by=popularity')
        .then(response => response.json())
        .then(data => {
            setTotalPages(data.total_pages);
            let series = data.results.filter((serie: Serie) => {
                return serie.poster_path !== null;
            })
            series = series.filter((serie: Serie) => {
                return serie.overview !== '';
            })
            setSeries(series);
        })
    }

    const customOverview = (overview: String) => {
        let new_overview = overview.substring(0, 200);
        new_overview = new_overview + '...';
        return new_overview;
    }

    return (
        <div className='Home'>
            <div className='Header'>
                <p className='title'> Rechercher une Série </p>
                <div className='search'>
                    <TextField
                        id="outlined-search"
                        label="Rechercher une série"
                        type="search"
                        variant="outlined"
                        value={search}
                        onChange={(e) => {setSearch(e.target.value); localStorage.search = e.target.value}}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                localStorage.search = search;
                                searchSerie(search);
                            }
                        }}
                        style={{ width: '80%', marginRight: '20px'}}
                    />
                    <div className='search_button'>
                        <IconButton onClick={() => (searchSerie(search))} color="primary" className="Home_Menu_Button Search">
                            <MdSearch />
                        </IconButton>
                    </div>      
                </div>
            </div>
            <div className='Movies'>
                {
                    series.map((serie: Serie) => {
                            return (
                                <div className='Movie' key={serie.id}>
                                    <Card className='Movie_Card'>
                                        <CardActionArea onClick={() => navigation('/serie/' + serie.id)} style={{ height: '100%' }}>
                                            <CardMedia
                                                component="img"
                                                image={(serie.poster_path !== null) ? "https://image.tmdb.org/t/p/w500" + serie.poster_path : logo}
                                                alt={serie.name}
                                                height="300"
                                                style={{ objectFit: 'contain', margin: '5px' }}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="body1" component="div" style={{ fontWeight: 'bolder' }} >
                                                    {serie.name}
                                                </Typography>
                                                <div style={{ height: '20px' }}></div>
                                                <Typography variant="body2" color="text.secondary">
                                                    {(serie.overview.length > 100) ? customOverview(serie.overview) : serie.overview}
                                                </Typography>
                                                <div style={{ height: '20px' }}></div>
                                                <Typography variant="body2" color="text.secondary">
                                                    Date : {customDate(serie.first_air_date)}
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

export default Search_Series;