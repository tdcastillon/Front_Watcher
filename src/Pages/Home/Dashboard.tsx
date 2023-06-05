import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import { Button, IconButton } from '@mui/material';
import logo from '../../assets/logo/TheWatcher.png';

import { MdList } from 'react-icons/md';

import '../../assets/styles/Dashboard.scss'
import '../../assets/styles/Home.scss'

const Dashboard = (props: any) => {

    const [user, setUser] = useState({
        _id: '',
        name: '',
        email: '',
        password: '',
        friends: [],
        movies: [],
        avatar_url: '',
        tv_shows: []
    });
     
    const navigation = useNavigate();
    const location = useLocation();

    const [seeNavBar, setSeeNavBar] = useState(false);

    useEffect(() => {
        if ((localStorage.getItem('token') == null) || (localStorage.getItem('token') == '')) {
            navigation('/');
        }
        const getUser = async () => {
            let response = await fetch('http://localhost:8080/users/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            console.log('http://localhost:8080/users/getUser');
            if (response.status == 200) {
                let json = await response.json();
                setUser(json);
            }
        }

        getUser();
    }, [])

    return (
        <div className="Dashboard_Home">
            <div className="Dashboard_Content">
                <div className="Dashboard_Content_Last_Movies">
                    <p className="Dashboard_Content_Title">Derniers films ajoutés : </p>
                    <div className="Dashboard_Content_Movies_List">
                        { user.movies.length == 0 ?
                            <p className="Dashboard_Content_Last_Movies_List_Empty">Aucun film ajouté</p>
                        : user.movies.reverse().map((movie: any) => {
                            return (
                                <p> {movie.title} </p>
                            )
                        })}
                    </div>
                </div>
                <br />
                <br />
                <div className="Dashboard_Content_Last_TV_Shows">
                    <p className="Dashboard_Content_Title">Dernières séries ajoutées : </p>
                    <div className="Dashboard_Content_TV_Shows_List">
                        { user.tv_shows.length == 0 ?
                            <p className="Dashboard_Content_Last_Movies_List_Empty">Aucune série ajoutée</p>
                        : user.tv_shows.reverse().map((tv_show: any) => {
                            return (
                                <p> {tv_show.name} </p>
                            )
                        })}
                    </div>
                </div>      
            </div>

        </div>
    )
}

export default Dashboard