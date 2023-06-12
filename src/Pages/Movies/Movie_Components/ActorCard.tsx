import { Card, CardContent, CardMedia, CardActions, Typography, Button, Box } from "@mui/material";
import logo from '../../../assets/logo/TheWatcher.png';
import { useNavigate } from 'react-router-dom';

function ActorCard (props: any) {

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
            <Card sx={{ width: '125px !important', height: '350px !important', flex: 1, backgroundColor: '#F0F0F0', boxShadow: '5px 5px 5px -5px #2d2a32' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={getImage(props.profile_path)}
                    alt={props.name}
                    style={{ objectFit: 'contain', margin: '5px' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div" style={{ fontSize: '1.2em' }}>
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {(props.character.length > 60) ? props.character.slice(0, 60) + '...' : props.character}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        size="small"
                        onClick={() => navigation('/people/' + props.id)}
                    >
                        Afficher plus 
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default ActorCard;