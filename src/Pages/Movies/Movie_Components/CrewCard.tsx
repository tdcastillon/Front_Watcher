import { Card, CardContent, CardMedia, Typography, CardActions, Button, Box } from "@mui/material";
import logo from '../../../assets/logo/TheWatcher.png';
import { useNavigate } from "react-router-dom";

function CrewCard (props: any) {

    const navigation = useNavigate();

    const getImage = (path: string) => {
        if (path == null) {
            return logo;
        } else {
            return "https://image.tmdb.org/t/p/w500" + path;
        }
    }

    const displayJob = (job: [String]) => {
        let fr_job = job.map((job) => FrJob(job));
        let display = '';
        for (let i = 0; i < fr_job.length; i++) {
            display += fr_job[i] + ', ';
        }
        return display.slice(0, -2);
    }

    const FrJob = (job: String) => {
        switch (job) {
            case 'Director':
                return 'Réalisateur';
            case 'Screenplay':
                return 'Scénariste';
            case 'Writer':
                return 'Scénariste';
            case 'Original Music Composer':
                return 'Compositeur';
            default:
                return job;
        }
    }

    return (
        <Box display="inline-block" style={{ margin: '10px 0' }}>
            <Card sx={{ width: '175px !important', height: '350px !important', flex: 1, backgroundColor: '#F0F0F0', boxShadow: '5px 5px 5px -5px #2d2a32' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={getImage(props.profile_path)}
                    alt={props.name}
                    style={{ objectFit: 'contain', margin: '5px' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {displayJob(props.job)}
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

export default CrewCard;