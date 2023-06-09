import { Card, CardContent, CardMedia, CardActions, Typography, Button, Box } from "@mui/material";
import logo from '../../../assets/logo/TheWatcher.png';


function ActorCard (props: any) {

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
                    image={getImage(props.profile_path)}
                    alt={props.name}
                    style={{ objectFit: 'contain' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.character}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small"> Afficher plus </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default ActorCard;