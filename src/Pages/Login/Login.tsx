import { useState } from 'react';

import '../../assets/styles/Register.scss';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { IconButton, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useNavigate } from 'react-router-dom';

function Login() {

    // remove all items from local storage
    localStorage.clear();

    const navigation = useNavigate();

    const [error, setError] = useState('');

    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visibility, setVisibility] = useState(false);

    const handleClickShowPassword = () => setVisibility(!visibility);

    const login = async () => {
        if ((name.length == 0) || (password.length == 0)) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        let response = undefined;

        if (name.includes("@")) {
            response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: name,
                    password: password
                })
            });
        } else {
            response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    password: password
                })
            });
        }
        console.log(response);
        if (response.status == 200) {
            let json = await response.json();
            alert ('Vous êtes connecté');
            localStorage.setItem('token', json.token);
            navigation('/');
            // reload the page
            window.location.reload();
        } else if (response.status == 404) {
            setError('Soit le nom d\'utilisateur, soit le mot de passe est incorrect');
            return;
        } else {
            setError('Une erreur est survenue');
            return;
        }
    }


    return(
        <div className="Home">
            <div className="Header">
                <p className="subtitle"> The Watcher </p>
            </div>
            <div className="Form">
                <p className='formTitle'> Connexion </p>
                <p className='error'> {error} </p>
                <div className="form">
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        value={name}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                login();
                            }
                        }}
                        variant="outlined"
                    />
                    <div className="empty" />
                    <TextField 
                        type={visibility ? "text" : "password"}
                        name="password" 
                        id="password" 
                        label="Mot de passe"
                        placeholder="Mot de passe" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                login();
                            }
                        }}
                        inputProps={{
                            endAdornment: (
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                color='inherit'
                                >
                                    {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            )
                        }}
                    />
                    <div className="empty" />
                    <Button variant="contained" color="primary" className="button" onClick={login}> Connexion </Button>
                </div>
                <Link to="/register" className="link"> Pas encore de compte ? </Link>
            </div>
        </div>
    )
}

export default Login