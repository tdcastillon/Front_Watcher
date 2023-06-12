import { Card, CardContent, CardMedia, CardActions, Typography, Button, Box } from "@mui/material";
import logo from '../../../assets/logo/TheWatcher.png';
import { useNavigate } from 'react-router-dom';
import { Role } from "../../../assets/interfaces/serie_interfaces";

function ActorCard (props: {
    profile_path: string,
    name: string,
    roles: Role[],
    id: number
}) {

    const { profile_path, name, roles, id } = props;

    const navigation = useNavigate();

    const getImage = (path: string) => {
        if (path == null) {
            return logo;
        } else {
            return "https://image.tmdb.org/t/p/w500" + path;
        }
    }

    const displayRoles = (roles: Role[]) => {
        let rolesString = "";
        roles.forEach((role: Role) => {
            rolesString += role.character + ", ";
        });
        rolesString = rolesString.slice(0, -2);
        return rolesString;
    }

    return (
        <Box display="inline-block" style={{ margin: '10px 5px' }}>
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
                        {displayRoles(props.roles)}
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