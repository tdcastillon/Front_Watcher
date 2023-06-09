import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import Popup from '../../assets/special_components/Popup';
import { Button, Tabs, Typography, Tab, Box } from '@mui/material';

import '../../assets/styles/Movie_Item.scss';
import '../../assets/styles/Popup.scss';
import TabPanel from '../../assets/special_components/TabPanel';

import * as mi from '../../assets/interfaces/movie_interfaces';
import { getRating, getStatus } from '../../assets/functions/movie_functions';




function Movie_Page(props: any) {

    const navigation = useNavigate();

    const movie_id = window.location.pathname.split('/')[2];
    const [ movieInfo, setMovieInfo ] = useState<mi.MovieInfoI>({
        id: '',
        title: '',
        status: '',
        collection: {} as mi.Collection,
        poster_path: '',
        overview: '',
        genres: [] as mi.Genre[],
        release_date: '',
        synopsis: '',
    });
    const [ movieCast, setMovieCast ] = useState([]);
    const [ movieCrew, setMovieCrew ] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [rate, setRate] = useState(0.0);
    const [ movieInfoUser, setMovieInfoUser ] = useState<mi.MovieInfoUser>({
        id: '',
        rating: 0,
        review: '',
        status: '',
        favorite: false,
    });

    const [ value, setValue ] = useState(0);

    useEffect(() => {
        if ((localStorage.getItem('token') === null) || (localStorage.getItem('token') === '')) {
            navigation('/');
        }
        if (window.location.pathname.split('/')[2] === undefined) {
            navigation('/');
        }

        const findMovieInfo = () => {
            fetch('https://api.themoviedb.org/3/movie/' + movie_id + '?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
            .then(response => response.json()).then(data => {
                setMovieInfo({
                    id: data.id,
                    title: data.title,
                    status: data.status,
                    collection: data.belongs_to_collection,
                    poster_path: data.poster_path,
                    overview: data.overview,
                    genres: data.genres,
                    release_date: data.release_date,
                    synopsis: data.overview,
                });
            })

        }

        const findMovieInfoPeople = () => {
            fetch('https://api.themoviedb.org/3/movie/' + movie_id + '/credits?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
            .then(response => response.json()).then(data => {
                setMovieCast(data.cast);
                setMovieCrew(data.crew);
            })
        }

        const getNote = () => {
            fetch("http://localhost:8080/marks/" + movie_id, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                if (res.status === 200)
                    res.json().then((data) => {
                        setMovieInfoUser({
                            ...movieInfoUser,
                            rating: data.note,
                        })
                    })
                else if (res.status === 404) {
                    setMovieInfoUser({
                        ...movieInfoUser,
                        rating: -1,
                    })
                }
            })

        }

        findMovieInfo();
        findMovieInfoPeople();
        getNote();

    }, [movie_id, navigation, movieInfoUser]);

    const closePopup = () => {
        window.location.reload();
        setOpenPopup(false);
    }
    



    

    return (
        <div className='Home'>
            <div className='File_Header'>
                <div className='Header_Left'>
                    <img src={'https://image.tmdb.org/t/p/w185' + movieInfo.poster_path} alt='Poster' className='Header_Poster'/>
                </div>
                <div className='Header_Right'>
                    <p className='Movie_Title'>{movieInfo.title} </p>
                    {
                        (getRating(movieInfoUser.rating) === '-1') ? (
                            <p className='Movie_Rating'> Note : Non noté </p>
                        ) : (
                            <p className='Movie_Rating'> Note : {getRating(movieInfoUser.rating)} / 10 </p>
                        )
                    }
                    <p className='Movie_Status'> Status : {getStatus(movieInfo.status, movieInfo.release_date)}</p>
                </div>
            </div>
                    <div className='File_Content'>
                        <div className='Content_Slide'>
                            <Button
                                onClick={() => setOpenPopup(true)}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    fontSize: '1.2em',
                                    width: '15%',
                                    alignSelf: 'center',
                                }}>
                                    {(movieInfoUser.rating === -1) ? 'Ajouter une note' : 'Modifier la note'}
                            </Button>
                            <ReactModal
                                isOpen={openPopup}
                                contentLabel='Note'
                                style={{
                                    overlay: {
                                      position: 'fixed',
                                      zIndex: 1020,
                                      top: 0,
                                      left: 0,
                                      width: '100vw',
                                      height: '100vh',
                                      background: 'rgba(255, 255, 255, 0.75)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      padding: 0,
                                    },
                                    content: {
                                      background: 'white',
                                      width: '45rem',
                                      maxWidth: 'calc(100vw - 2rem)',
                                      maxHeight: 'calc(100vh - 2rem)',
                                      overflowY: 'auto',
                                      position: 'relative',
                                      border: '1px solid #ccc',
                                      borderRadius: '0.3rem',
                                      padding: '0.5rem',
                                    }
                                }}
                            >
                                <Popup 
                                    setOpenPopup={closePopup} 
                                    setRate={setRate} 
                                    rate={rate}
                                    movieId={movie_id} 
                                    validate={(movieInfoUser.rating === -1) ? true : false}/>
                            </ReactModal>

                        </div>
                    </div>
            <div className='File_Content'>
                {
                    movieInfo.collection != null ? (
                        <div className='Content_Slide'>
                            <p className='Content_BigText'> Saga : {movieInfo.collection.name} </p>
                        </div>
                    ) : (
                        <div></div>
                    )
                }
                <div className='Content_Slide'>
                    <p className='Content_BigText underline'> Synopsis </p>
                    <p className='Content_Text'> {movieInfo.synopsis} </p>
                </div>
            </div>
            <div className='File_Content'>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => setValue(newValue)}
                    style={{
                        width: '80%',
                        alignSelf: 'center',
                        margin: '0 auto',
                        marginBottom: '1rem',
                        display: 'flex',
                        fontSize: '1.2em',
                        backgroundColor: '#96d0df',
                        borderRadius: '0.3rem',
                    }}
                    variant='fullWidth'
                >
                    <Tab label="Casting" style={{ flex: 1 }}/>
                    <Tab label="Equipe" style={{ flex: 1 }}/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div className='Content_Slide'>
                        <p> This is the slide for the casting </p>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className='Content_Slide'>
                        <p> This is the slide for the crew </p>
                    </div>
                </TabPanel>
            </div>

            {/* <div className='File_Content'>
                <div className='Content_Slide'>
                    <p className='Content_BigText underline'> Direction </p>
                    <div className='Content_Slider_People'>
                        {
                            identify_principal(movieCrew).map((person: CrewMember) => {
                                return (
                                    <CrewCard key={person.id} id={person.id} name={person.name} job={person.job} profile_path={person.profile_path}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='Content_Slide'>
                    <p className='Content_BigText underline'> Casting </p>
                    <div className='Content_Slider_People'>
                        {
                            identify_actor(movieCast).slice(0, 5).map((person: Actor) => {
                                return (
                                    <ActorCard key={person.id} id={person.id} name={person.name} character={person.character} profile_path={person.profile_path}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div style={{ height: '25px' }}></div>
            <Button 
            onClick={() => navigation('/movie/' + movie_id + '/cast', {
                state: {
                    movie_id: movie_id,
                    cast: movieCast,
                    title: movieInfo.title,
                }
            })}
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.2em',
                width: '15%',
                alignSelf: 'center',
            }}>
            See All Cast 
            </Button> */}
        </div>
    )
}

export default Movie_Page;