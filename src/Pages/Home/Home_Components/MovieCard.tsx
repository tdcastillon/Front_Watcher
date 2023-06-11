import {useEffect, useState} from 'react';
import { Card, CardContent, CardMedia, CardActions, Typography, Button, Box } from "@mui/material";
import logo from '../../../assets/logo/TheWatcher.png';
import { useNavigate } from 'react-router-dom';
import { MovieInfoI } from '../../../assets/interfaces/movie_interfaces';

const MovieCard = (props: any) => {
    const {id, note} = props;

    const navigation = useNavigate();

    const [movieInfo, setMovieInfo] = useState<MovieInfoI>({} as MovieInfoI);

    useEffect(() => {
        const getMovieInfo = () => {
            fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
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
                })
            }
        )}
        getMovieInfo();
    }, [])

    const getImage = (path: string) => {
        if (path == null) {
            return logo;
        } else {
            return "https://image.tmdb.org/t/p/w500" + path;
        }
    }

    return (
        <Box display="inline-block" style={{ margin: '10px 5px' }}>
            <Card sx={{ width: '175px !important', height: '350px !important', flex: 1, backgroundColor: '#F0F0F0', boxShadow: '5px 5px 5px -5px #2d2a32' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={getImage(movieInfo.poster_path)}
                    alt={props.name}
                    style={{ objectFit: 'contain', margin: '5px' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div" style={{ fontWeight: 'bolder' }} >
                        {movieInfo.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <p> Note : </p>
                            <div style={{ width: '5px' }}></div>
                            <p style={{fontWeight: 'bolder'}}> {note} </p>
                        </div>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        size="small" 
                        onClick={() => navigation('/movie/' + id)}
                    > 
                        Afficher plus 
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default MovieCard