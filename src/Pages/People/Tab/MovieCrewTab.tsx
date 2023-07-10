import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Movie_People_Card from '../Components/Movie_People_Card';
import Movie_Crew_Card from '../Components/MovieCrewCard';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../../../assets/special_components/TabPanel';

const MovieCrewTab = (props: {id: string}) => {
    const navigation = useNavigate();

    interface MovieInfoCrew {
        id: string,
        poster_path: string,
        release_date: string,
        title: string,
        job: string,
        note: number,
    }

    const [ whereCrew, setWhereCrew ] = useState<Array<string>>(['Réalisateur', 'Scénariste', 'Compositeur'])
    const [numberMovie, setNumberMovie] = useState(0);
    const [ movieListRealisateur, setMovieListRealisateur ] = useState<Array<MovieInfoCrew>>([]);

    const [ movieListScenariste, setMovieListScenariste ] = useState<Array<MovieInfoCrew>>([]);

    const [ movieListCompositeur, setMovieListCompositeur ] = useState<Array<MovieInfoCrew>>([]);


    const [ value, setValue ] = useState(0);


    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }

        const getCrewList = () => {
            fetch('https://api.themoviedb.org/3/person/' + props.id + '/movie_credits?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
            .then(response => response.json()).then(data => {
                let crew = data.crew.filter((movie: any) => {
                    return movie.job !== '' || movie.job !== null
                })
                crew = crew.filter((movie: any) => {
                    return movie.release_date !== '' || movie.release_date !== null || movie.release_date !== undefined
                })
                crew = crew.filter((movie: any) => {
                    return (movie.job === 'Director' || movie.job === 'Screenplay' || movie.job === 'Writer' || movie.job === 'Original Music Composer')
                })
                setNumberMovie(crew.length);
                setMovieListRealisateur(crew.filter((movie: any) => {
                    return movie.job === 'Director'
                }))
                setMovieListScenariste(crew.filter((movie: any) => {
                    return movie.job === 'Screenplay' || movie.job === 'Writer'
                }))
                setMovieListCompositeur(crew.filter((movie: any) => {
                    return movie.job === 'Original Music Composer'
                }))
            })
        }
    
        getCrewList();
    }, [navigation]);

    return (
        <div className="Movie_Tab" style={{display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center'}}>
            {
                (numberMovie === 0) ? <p className="People_Content_Empty" style={{height: '500px !important'}}>Aucun film ajouté</p> :
                <div>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(event, newValue) => setValue(newValue)}
                        style={{
                            width: '98%',
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
                        {
                            whereCrew.map((job: string) => {
                                return (
                                    <Tab label={job} style={{width: '100%'}} />
                                )
                            })
                        }
                    </Tabs>
                    <TabPanel value={value} index={whereCrew.indexOf('Réalisateur')}>
                        {
                            (movieListRealisateur === undefined || movieListRealisateur.length === 0) ? <p className="People_Content_Empty">Aucun film trouvé en tant que réalisateur</p> :
                            movieListRealisateur.map((movie: MovieInfoCrew) => {
                                return (
                                    <Movie_Crew_Card id={movie.id} poster_path={movie.poster_path} title={movie.title} release_date={movie.release_date} job={movie.job} />
                                )
                            })
                        }
                    </TabPanel>
                    <TabPanel value={value} index={whereCrew.indexOf('Scénariste')}>
                        {
                            (movieListScenariste === undefined || movieListScenariste.length === 0) ? <p className="People_Content_Empty">Aucun film trouvé en tant que scénariste</p> :
                            movieListScenariste.map((movie: MovieInfoCrew) => {
                                return (
                                    <Movie_Crew_Card id={movie.id} poster_path={movie.poster_path} title={movie.title} release_date={movie.release_date} job={movie.job} />
                                )
                            })
                        }
                    </TabPanel>
                    <TabPanel value={value} index={whereCrew.indexOf('Compositeur')}>
                        {
                            (movieListCompositeur === undefined || movieListCompositeur.length === 0) ? <p className="People_Content_Empty">Aucun film trouvé en tant que compositeur</p> :
                            movieListCompositeur.map((movie: MovieInfoCrew) => {
                                return (
                                    <Movie_Crew_Card id={movie.id} poster_path={movie.poster_path} title={movie.title} release_date={movie.release_date} job={movie.job} />
                                )
                            })
                        }
                    </TabPanel>
            </div>
            }
        </div>
    )

}

export default MovieCrewTab