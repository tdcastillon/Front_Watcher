import React from 'react'

import logo from '../../assets/logo/TheWatcher.png';

import Button from '@mui/material/Button';


function Default_Home() {
    return (
        <div className="Home">
            <div className="Header">
                <p className="title">The Watcher</p>
                <img src={logo} className='logo' alt="The Watcher" />
            </div>
            <div className="Body">
                <p className="description">The Watcher est un site te permettant de noter les films que tu as vus ! Tu pourras de cette
                maniére savoir quels films tu as vus. Tu pourras mettre également les films que tu n'as pas encore vu dans ta liste à souhait.
                Il s'agit également d'une app comunautaire dans laquelle tu pourras également voir les notes mises par tes amis ! </p>
            </div>
            <div className="Footer">
                <Button variant="outlined" color="primary" href="/login" className='button' size="large" >Se connecter</Button>
                <span style={{'width': '2%'}} />
                <Button variant="outlined" color="primary" href="/register" className='button' size="large" >S'inscrire</Button>
            </div>
        </div>
    )
}

export default Default_Home