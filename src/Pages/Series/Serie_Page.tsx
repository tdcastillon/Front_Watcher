import {useEffect, useState } from 'react';
import { customDate, getRating, getStatus } from '../../assets/functions/movie_functions';
import '../../assets/styles/Movie_Item.scss';
import { Button, Tab, Tabs } from '@mui/material';
import TabPanel from '../../assets/special_components/TabPanel';
import ActorTab from './Tab/Actor_Serie_Tab';
import CrewTab from './Tab/CrewTab';
import { Serie, ActorSeries, CrewSerieMember } from '../../assets/interfaces/serie_interfaces';
import TvPopup from './Components/TvPopup';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { calculateMed } from '../../assets/functions/serie_function';

const Serie_Page = () => {

    const serie_id = window.location.href.split('/')[4];
    const navigation = useNavigate()


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

    const [rates, setRates] = useState<Array<number>>([]);
    const [nbSeason, setNbSeason] = useState<number>(0);
    const [openPopup, setOpenPopup] = useState(false);
    const [med, setMed] = useState<number>(-1.0)
    const [markedSeasons, setMarkedSeasons] = useState<number>(0);
    const [value, setValue] = useState(0);
    const [modify, setModify] = useState<boolean>(false);

    const [cast, setCast] = useState<ActorSeries[]>([]);
    const [crew, setCrew] = useState<CrewSerieMember[]>([]);

    const getMed = () => {
        fetch('http://localhost:8080/users/getTvShowNote/' + serie_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res: Response) => {
            if (res.status === 200)
                res.json().then((data) => {
                    let notes = data.notes;
                    let marked: Array<number> = []
                    notes.forEach((note: {season: number, note: number}) => {
                        if (note.note !== -1.0) {
                            marked.push(note.note);
                        }
                    })
                    setMarkedSeasons(marked.length);
                    setMed(calculateMed(marked));
                    setRates(notes.map((note: {season: number, note: number}) => {
                        return note.note;
                    }))
                    setModify(true)
                })
            else if (res.status === 404) {
                setMed(-1.0);
                setModify(false)
                setMarkedSeasons(0);
                setRates(Array(nbSeason).fill(-1.0));
            } else if (res.status === 403) {
                localStorage.removeItem('token');
                navigation('/');
            }
        })
    }

    const closePopup = () => {
        getMed();
        setOpenPopup(false);
    }

    const alreadyRated = (rates: Array<number>, nbSeason: number) => {
        let tmp = false;
        console.log(rates);
        rates.forEach((rate) => {
            if (rate >= 0)
                tmp = true;
        })
        return tmp;
    }

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
                setNbSeason(data.number_of_seasons);
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

        getMed();

        getTvShow();
        getTvCredits();        
    }, [navigation, serie_id, med])

    return (
        <div className='Home'>
            <div className='File_Header'>
                <div className='Header_Left'>
                    <img src={'https://image.tmdb.org/t/p/w185' + serie.poster_path} alt='Poster' className='Serie_Poster'/>
                </div>
                <div className='Header_Right'>
                    <p className='Movie_Title'>{serie.name} </p>
                    <p className='Serie_Seasons'> Nombre de saisons : {serie.number_of_seasons} </p>
                    <p className='Serie Rating'> Note : {(med === -1.0) ? 'Non noté' : `${med} ${(serie.number_of_seasons === markedSeasons) ? '(Complété)' : `(${markedSeasons} / ${serie.number_of_seasons} saisons notées)`}`} </p>
                    <p className='Movie_Status'> Statut : {getStatus(serie.status, serie.first_air_date)} </p>
                    <p className='Movie_Status'> Date du premier épisode : {customDate(serie.first_air_date)} </p>
                    {
                        (serie.status === 'Ended' || serie.status === 'Canceled') ? (
                            <p className='Movie_Status'> Date du dernier épisode : {customDate(serie.last_air_date)} </p>
                        ) : null
                    }
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
                                width: '20%',
                                alignSelf: 'center',
                                }}
                        >
                            Noter la série
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
                            <TvPopup 
                                rates={rates}
                                nbSeason={nbSeason}
                                closePopup={closePopup} 
                                setRates={setRates}
                                serie_id={serie_id}
                                modify={modify}
                            />
                        </ReactModal>
                </div>
            </div>
            <div className='Movie_Overview' style={{width: '90%', alignSelf: 'center', margin: '15px auto'}}>
                <p className='Movie_Overview_Title'> Synopsis </p>
                <p className='Movie_Overview_Text'> {serie.overview} </p>
            </div>
            <Tabs
                value={value}
                onChange={(_event, newValue) => {
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