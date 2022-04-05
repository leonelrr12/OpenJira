import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material'
import SaveIcon from '@mui/icons-material/SaveAsOutlined';
import DelIcon from '@mui/icons-material/DeleteOutlined';

import { isValidObjectId } from 'mongoose'

import { Layout } from '../../components/layouts'
import { EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { IEntry } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries';
import Router from 'next/router';
import { dateFunctions } from '../../utils';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: IEntry
}

export const EntryPage: FC<Props> = ({ entry }) => {

    const { updateEntry, deleteEntry } = useContext( EntriesContext)

    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched , [inputValue, touched])

    const onInputValueChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setInputValue(ev.target.value)
    }

    const onStatusChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setStatus(ev.target.value as EntryStatus)
    }

    const onSave = () => {
        if(inputValue.trim().length === 0) return; 

        const updEntry: IEntry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry(updEntry, true)
        setInputValue('')
        setTouched(false)
        Router.push("/")
    }

    const onDelete = () => {
        deleteEntry( entry._id )
        Router.push("/")
    }

    return (

    <Layout title={ inputValue.substring(0,20) + '...'}>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader
                        title={ `Entrada:` }
                        subheader={`Creada ${dateFunctions.getFormatDistanceToNow( entry.createAt )}`}
                    />
                </Card>
                <CardContent>
                    <TextField 
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        fullWidth
                        placeholder="Editar entrada"
                        error={ isNotValid }
                        helperText={ isNotValid && 'Ingrese una entrada'}
                        autoFocus
                        multiline
                        label="Editar entrada"
                        value={ inputValue }
                        onChange={ onInputValueChange }
                        onBlur={ () => setTouched(true) }
                    />

                    <FormControl>
                        <FormLabel>Estado:</FormLabel>
                        <RadioGroup
                            row
                            value={ status }
                            onChange={ onStatusChange }
                        >
                            {
                                validStatus.map( option => (
                                    <FormControlLabel 
                                        key={ option }
                                        value={ option }
                                        control={ <Radio /> }
                                        label={ capitalize(option) }
                                    />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>

                </CardContent>

                <CardActions>
                    <Button
                        startIcon={ <SaveIcon /> }
                        variant="contained"
                        fullWidth
                        disabled={ inputValue.length <= 0 }
                        onClick={ onSave }
                    >
                        Save
                    </Button>
                </CardActions>
            </Grid>
        </Grid>

        <IconButton sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'red'
        }} onClick={ onDelete }>
            <DelIcon />
        </IconButton>

    </Layout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { params } = ctx;
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntriesById( id );

    if(!isValidObjectId(id)) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage;