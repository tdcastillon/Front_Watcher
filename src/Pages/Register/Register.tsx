import { useState } from 'react';

import '../../assets/styles/Register.scss';

import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [error, setError] = useState('');

    const register = async () => {
        if ((username.length === 0) || (email.length === 0) || (password.length === 0) || (passwordConfirm.length === 0)) {
            setError('Veuillez remplir tous les champs');
            return;
        }
        if (password !== passwordConfirm) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        const response = await fetch('http://localhost:8080/users/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            })
        });
        if (response.status === 201) {
            alert('Utilisateur créé');
            navigate('/login');
        } else {
            setError('Une erreur est survenue');
        }
    }

    return(

        <div className="Home">
            <div className="Header">
                <p className="subtitle"> The Watcher </p>
            </div>
            <div className="Form">
                <p className='formTitle'> Inscription </p>
                <p className='error'> {error} </p>
                <div className="form">
                    <TextField
                        required
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Nom d'utilisateur" 
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                register();
                            }
                        }} 
                    />
                    <div className="empty" />
                    <TextField
                        required 
                        type="email" 
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                register();
                            }
                        }}
                        />
                    <div className="empty" />
                    <TextField 
                        required
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        label="Mot de passe"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                register();
                            }
                        }}    
                    />
                    <div className="empty" />
                    <TextField 
                        required
                        type='password'
                        name="passwordConfirm" 
                        id="passwordConfirm" 
                        placeholder="Confirmer le mot de passe"
                        value={passwordConfirm} 
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        label="Confirmer le mot de passe"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                register();
                            }
                        }}
                    />
                    <div className="empty" />
                    <Button variant="contained" color="primary" className='button' size="large" onClick={register}> S'inscrire </Button>
                </div>
                <Link to="/login" className="link"> Tu as déjà un compte ? Connecte toi ! </Link>
            </div>
        </div>
    )
}

export default Register