import {useEffect, useState} from 'react';
import { Card, CardContent, CardMedia, Typography, Box, CardActions, Button } from "@mui/material";
import logo from '../../../assets/logo/TheWatcher.png';
import { useNavigate } from 'react-router-dom';
import { SerieInfo } from '../../../assets/interfaces/serie_interfaces';

const SerieCard = (props: {id: string, note: number}) => {
    const { id, note } = props;
    
    console.log(props)
    const navigation = useNavigate();

    const [serieInfo, setSerieInfo] = useState<SerieInfo>({} as SerieInfo);

    const getImage = (path: string) => {
        if (path == null) {
            return logo;
        } else {
            return "https://image.tmdb.org/t/p/w500" + path;
        }
    }

    useEffect(() => {
        if ((localStorage.getItem('token') == null) || (localStorage.getItem('token') == '')) {
            navigation('/');
        }

        const getSerieInfo = () => {
            fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=76ba0158d0afb618e5ca3a13dd00f4db&language=fr-FR')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setSerieInfo({
                    id: data.id,
                    poster_path: data.poster_path,
                    name: data.name
                })
            })
        }

        getSerieInfo();
    }, [navigation])

    return (
        <Box display="inline-block" style={{ margin: '10px 5px' }}>
            <Card sx={{ width: '175px !important', height: '350px !important', flex: 1, backgroundColor: '#F0F0F0', boxShadow: '5px 5px 5px -5px #2d2a32' }}>
                    <CardMedia
                        component="img"
                        image={getImage(serieInfo.poster_path)}
                        alt={serieInfo.name}
                        height="140"
                        style={{ objectFit: 'contain', margin: '5px' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div" style={{ fontWeight: 'bolder' }} >
                            {serieInfo.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Note : {note}
                        </Typography>
                    </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => navigation('/serie/' + id)}>Voir plus</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default SerieCard