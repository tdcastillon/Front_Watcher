import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActions, Typography, Button, Box } from "@mui/material";
import { customDate } from '../../../assets/functions/movie_functions';
import logo from '../../../assets/logo/TheWatcher.png';
import { Role } from '../../../assets/interfaces/serie_interfaces';
import { FrJob } from '../../../assets/functions/crew_functions';

const TvShowPeopleCrewCard = (props: {id: string, poster_path: string, title: string, first_air_date: string, job: string, episodeCount: number }) => {
    const navigation = useNavigate();

    const getImage = (path: string) => {
        if (path == null) {
            return logo;
        } else {
            return "https://image.tmdb.org/t/p/w500" + path;
        }
    }

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
                        {FrJob(props.job)}
                    </Typography>
                    <div style={{height: '10px'}} />
                    <Typography variant="body2" color="text.secondary">
                        <span style={{fontWeight: 'bolder'}}> Nombre d'épisodes : </span> {props.episodeCount}
                    </Typography>
                    <div style={{height: '10px'}} />
                    <Typography variant="body2" color="text.secondary">
                    <span style={{fontWeight: 'bolder'}}> Premier Episode : </span> {customDate(props.first_air_date)}
                    <div style={{height: '20px'}} />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => navigation('/serie/' + props.id)}
                    >
                        Afficher plus
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default TvShowPeopleCrewCard;