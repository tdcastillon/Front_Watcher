import { Button, TextField } from '@mui/material';
import { useEffect } from 'react'

const TvPopup = (props: { rates: Array<number>, nbSeason: number, closePopup: Function, setRates: Function, serie_id: string, modify: boolean}) =>{
    const { rates, nbSeason, closePopup, setRates, serie_id, modify } = props;
    
    const Validate = () => {
        let notes: Array<{season: number, note: number}> = [] as Array<{season: number, note: number}>;
        rates.forEach((rate, index) => {
            if (rate !== 0) {
                notes.push({
                    season: index + 1,
                    note: rate,
                })
            }
        })
        alert(JSON.stringify(notes));
        fetch('http://localhost:8080/marksTV/add/' + serie_id, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                notes: notes,
            })
        })
        .then(res => {
            if (res.status === 201) {
                alert('Note ajoutée');
                closePopup();
            } else if (res.status === 403) {
                localStorage.removeItem('token');
                window.location.href = '/';
            } else {
                alert('Erreur lors de l\'ajout de la note');
            }
        })
    }

    const Update = () => {
        let notes: Array<{season: number, note: number}> = [] as Array<{season: number, note: number}>;
        rates.forEach((rate, index) => {
            if (rate !== 0) {
                notes.push({
                    season: index + 1,
                    note: rate,
                })
            }
        })
        console.log(localStorage.getItem('token'));
        fetch('http://localhost:8080/marksTV/update/' + serie_id, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                notes: notes,
            })
        })
        .then(res => {
            if (res.status === 201) {
                alert('Note modifiée');
                closePopup()
            } else if (res.status === 403) {
                localStorage.removeItem('token');
                window.location.href = '/';
            } else {
                alert('Erreur lors de la modification de la note');
            }
        })
    }
    
    return (
        <div className='Popup'>
            <div className='Popup_Header'>
                <p className='Popup_Title'> Notez la série </p>
                {
                    rates.map((rate, index) => {
                        return (
                            <TextField
                                key={index}
                                label={`Saison ${index + 1}`}
                                type='number'
                                value={rate}
                                onChange={(event) => {
                                    setRates(rates.map((rate, i) => {
                                        if (i === index)
                                            return (event.target.value === '') ? 0 : parseFloat(event.target.value)
                                        else
                                            return rate;
                                    }))
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant='outlined'
                                style={{
                                    width: '100%',
                                    marginBottom: '10px',
                                }}
                                inputProps={{
                                    min: 0,
                                    max: 10,
                                    step: 0.5,
                                }}
                            />
                        )
                    })
                }
            </div>
            <div className='Popup_Footer'>
                <Button className='Popup_Button' onClick={() => closePopup()}> Annuler </Button>
                {
                    (modify) ? (
                        <Button className='Popup_Button' onClick={() => Update()}> Modifier </Button>
                    ) : (
                        <Button className='Popup_Button' onClick={() => Validate()}> Noter </Button>
                    )
                }
            </div>
        </div>
    )
}

export default TvPopup