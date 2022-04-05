import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

import { UIContext } from '../../context/ui';
import { IEntry } from '../../interfaces';
import { dateFunctions } from '../../utils';


interface Props {
    entry: IEntry
}


export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging} = useContext(UIContext)
    const router = useRouter()

    const onDragStart = (ev: DragEvent<HTMLDivElement>) => {
        ev.dataTransfer.setData('text', entry._id)
        startDragging()
    }

    const onClick = () => {
        router.push(`/entries/${ entry._id }`)
    }

    return (
        <Card 
            onClick={ onClick }
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ () => endDragging() }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', padding: 2 }}>
                    <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow( entry.createAt ) }</Typography>
                </CardActions>
            </CardActionArea>

        </Card>
    )
}

