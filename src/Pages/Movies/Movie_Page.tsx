import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../../assets/styles/Movie_Item.scss';
import { Button } from '@mui/material';

import CrewCard from './CrewCard';
import ActorCard from './ActorCard';

function Movie_Page(props: any) {

    const navigation = useNavigate();
    const location = useLocation();

    const movie_id = window.location.pathname.split('/')[2];

    interface Collection {
        id: String,
        name: String,
    }

    interface Genre {
        id: String,
        name: String,
    }

    interface MovieInfoI {
        id: String,
        title: String,
        status: String,
        collection: Collection,
        poster_path: String,
        overview: String,
        genres: Genre[],
        release_date: String,
        synopsis: String,
    }

    const [ movieInfo, setMovieInfo ] = useState<MovieInfoI>({
        id: '',
        title: '',
        status: '',
        collection: {} as Collection,
        poster_path: '',
        overview: '',
        genres: [] as Genre[],
        release_date: '',
        synopsis: '',
    });

    const [ movieCast, setMovieCast ] = useState([]);
    const [ movieCrew, setMovieCrew ] = useState([]);

    interface MovieInfoUser {
        id: String,
        rating: Number,
        review: String,
        status: String,
        favorite: Boolean,
    }

    const [ movieInfoUser, setMovieInfoUser ] = useState<MovieInfoUser>({
        id: '',
        rating: 0,
        review: '',
        status: '',
        favorite: false,
    });

    

    useEffect(() => {
        if ((localStorage.getItem('token') == null) || (localStorage.getItem('token') == '')) {
            navigation('/');
        }
        if (window.location.pathname.split('/')[2] == undefined) {
            navigation('/');
        }

        const findMovieInfo = async () => {
            await fetch('https://api.themoviedb.org/3/movie/' + movie_id + '?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
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
            }).catch(error => {
                console.log(error);
            })
        }

        const findMovieInfoPeople = async () => {
            await fetch('https://api.themoviedb.org/3/movie/' + movie_id + '/credits?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
            .then(response => response.json()).then(data => {
                setMovieCast(data.cast);
                setMovieCrew(data.crew);
            }).catch(error => {
                console.log(error);
            })
        }

        findMovieInfo();
        findMovieInfoPeople();
    }, []);


    const getRating = (rating: Number) : String => {
        return rating.toString();
    }

    const customDate = (date: String) => {
        let n_date = date.split('-');
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        return n_date[2] + ' ' + months[parseInt(n_date[1]) - 1] + ' ' + n_date[0];
    }
    
    const getStatus = (status: String, release_date: String) : String => {
        return (status == 'Released') ? 'Sorti le ' + customDate(release_date) : 'A Sortir le ' + release_date;
    }

    interface CrewMember {
        id: String,
        name: String,
        job: [String],
        profile_path: String,
    }

    const identify_principal = (people: any) => {
        let principal_cast : CrewMember[] = [];
        for (let i = 0; i < people.length; i++) {
            if ((people[i].job == 'Director') || (people[i].job == 'Screenplay') || (people[i].job == 'Writer') || (people[i].job == 'Original Music Composer')) {
                principal_cast = add_principal(principal_cast, people[i]);
            }
        }
        console.log(principal_cast);
        return principal_cast;
    }

    const add_principal = (principal_cast: CrewMember[], person: any) => {
        let is_present = false;
        if (principal_cast.length == 0) {
            principal_cast.push({
                id: person.id,
                name: person.name,
                job: [person.job],
                profile_path: person.profile_path,
            });
        } else {
            for (let i = 0; i < principal_cast.length; i++) {
                if (principal_cast[i].id == person.id) {
                    principal_cast[i].job.push(person.job);
                    is_present = true;
                }
            }
            if (!is_present) {
                principal_cast.push({
                    id: person.id,
                    name: person.name,
                    job: [person.job],
                    profile_path: person.profile_path,
                });
            }
        }
        return principal_cast;
    }

    interface Actor {
        id: String,
        name: String,
        character: String,
        profile_path: String,
    }

    const identify_actor = (people: any) => {
        let principal_cast : Actor[] = [];
        for (let i = 0; i < people.length; i++) {
            principal_cast.push({
                id: people[i].id,
                name: people[i].name,
                character: people[i].character,
                profile_path: people[i].profile_path,
            });
        }
        return principal_cast;
    }
    

    return (
        <div className='Home'>
            <div className='File_Header'>
                <div className='Header_Left'>
                    <img src={'https://image.tmdb.org/t/p/w185' + movieInfo.poster_path} alt='Poster' className='Header_Poster'/>
                </div>
                <div className='Header_Right'>
                    <p className='Movie_Title'>{movieInfo.title} </p>
                    <p className='Movie_Rating'> Note : {getRating(movieInfoUser.rating)} / 10 </p>
                    <p className='Movie_Status'> Status : {getStatus(movieInfo.status, movieInfo.release_date)}</p>
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
            </Button>
        </div>
    )
}

export default Movie_Page;