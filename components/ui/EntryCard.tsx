import { DragEvent, FC, useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

import { UIContext } from '../../context/ui';
import { IEntry } from '../../interfaces';

interface Props {
    entry: IEntry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging} = useContext(UIContext)

    const onDragStart = (ev: DragEvent<HTMLDivElement>) => {
        
        ev.dataTransfer.setData('text', entry._id)
        startDragging()
    }

    return (
        <Card 
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
                    <Typography variant='body2'>hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>

        </Card>
    )
}

