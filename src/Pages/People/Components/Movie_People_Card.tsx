import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActions, Typography, Button, Box } from "@mui/material";
import { customDate } from '../../../assets/functions/movie_functions';
import logo from '../../../assets/logo/TheWatcher.png';

const Movie_People_Card = (props: {id: string, poster_path: string, title: string, release_date: string, character: string }) => {
    const navigation = useNavigate();

    const [ note, setNote ] = useState(0);

    const getImage = (path: string) => {
        if (path == null) {
            return logo;
        } else {
            return "https://image.tmdb.org/t/p/w500" + path;
        }
    }

    useEffect(() => {
        const getNote = () => {
            fetch('http://localhost:8080/users/getMovieNote/' + props.id, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status === 200)
                    res.json().then((data) => {
                        setNote(data.note);
                    })
                else if (res.status === 404) {
                    setNote(-1);
                }
            })
        }
        getNote();
    }, []);

    return (
        <Box display="inline-block" style={{ margin: '10px 5px' }}>
            <Card sx={{ width: '175px !important', height: '500px !important', flex: 1, backgroundColor: '#F0F0F0', boxShadow: '5px 5px 5px -5px #2d2a32' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={getImage(props.poster_path)}
                    alt={props.title}
                    style={{ objectFit: 'contain', margin: '5px' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bolder' }}>
                        {(props.character.length > 60) ? props.character.slice(0, 60) + '...' : props.character}
                    </Typography>
                    <div style={{height: '20px'}} />
                    {
                        (note !== -1) ? (
                            <Typography variant="body2" color="text.secondary">
                                Note : {note} / 10
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Note : Non noté
                            </Typography>
                        )
                    }
                    <div style={{height: '20px'}} />
                    <Typography variant="body2" color="text.secondary">
                        Sortie : {customDate(props.release_date)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => navigation('/movie/' + props.id)}
                    >
                        Afficher plus
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Movie_People_Card;