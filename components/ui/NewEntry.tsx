import { Box, Button, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/SaveOutlined';
import CancelIcon from '@mui/icons-material/CancelPresentationOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';


export const NewEntry = () => {

    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)
    const { addNewEntry } = useContext(EntriesContext)

    const onTextFieldChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value )
    }

    const onSave = () => {
        if( inputValue.length <= 0 ) return
        addNewEntry( inputValue )
        setIsAddingEntry(false)
        setInputValue('')
        setTouched(false)
    }


    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>

            {
                isAddingEntry ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva Entrada'
                            helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
                            error={ inputValue.length <= 0 && touched }
                            value={ inputValue }
                            onBlur={ () => setTouched(true) }
                            onChange={ onTextFieldChange }
                        />

                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<CancelIcon />}
                                onClick={() => setIsAddingEntry(false)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveIcon />}
                                onClick={ onSave }
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Button
                        startIcon={<AddIcon />}
                        fullWidth
                        variant='outlined'
                        onClick={() => setIsAddingEntry(true)}
                    >
                        Agregar Tarea
                    </Button>
                )
            }
        </Box>
    )
}
