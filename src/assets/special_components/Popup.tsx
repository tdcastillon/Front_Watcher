import { TextField, Button } from '@mui/material';
import React from 'react';

function Popup( props: { setOpenPopup: Function, setRate: React.Dispatch<React.SetStateAction<number>>, rate: number, movieId: string, validate: boolean } ) {
    
    const validateNote = () => {
        fetch('http://localhost:8080/marks/add', {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movie_id: props.movieId,
                note: props.rate,
            }),
        })
        .then((res) => {
            alert('Note ajoutée !');
            window.location.reload();

            props.setOpenPopup(false);
        })
    }   

    const ModifyNote = () => {
        fetch('http://localhost:8080/marks/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                movie_id: props.movieId,
                note: props.rate,
            }),
        })
        .then((res) => {
            if (res.status === 201) {
                alert('Note modifiée !');
                props.setOpenPopup(false);
            }
        })
    }

    const DeleteNote = () => {
        fetch('http://localhost:8080/marks/delete/' + props.movieId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
        .then((res) => {
            if (res.status === 201) {
                alert('Note supprimée !');
                props.setOpenPopup(false);
            }
        })
    }


    return (
        <div className='Popup'>
            <div className='Popup_Header'>
                <p className='Popup_Title'> Ajouter une note </p>
            </div>
            <div className='Popup_Content'>
                <div className='Popup_Note'>
                    <TextField
                        id="outlined-basic"
                        label="Note"
                        variant="outlined"
                        type='number'
                        value={props.rate}
                        onChange={(e) => props.setRate(parseFloat(e.target.value))}
                        style={{
                            width: '100%',
                            marginBottom: '1rem',
                        }}
                        inputProps={{
                            min: 0.0,
                            max: 10.0,
                            step: 0.1,
                        }}
                    />
                </div>
                <div className='Popup_Buttons'>
                    <Button
                        onClick={() => {
                            (props.validate) ? validateNote() : ModifyNote();
                        }}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '1.2em',
                            width: '100%',
                            alignSelf: 'center',
                        }}>
                            Valider
                    </Button>
                    <Button
                        onClick={() => props.setOpenPopup(false)}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '1.2em',
                            width: '100%',
                            alignSelf: 'center',
                        }}>
                            Annuler
                    </Button>
                    {
                        props.validate ? null :
                        <Button
                            onClick={() => DeleteNote()}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                fontSize: '1.2em',
                                width: '100%',
                                alignSelf: 'center',
                            }}>
                                Supprimer
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Popup;