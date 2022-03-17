import React, { DragEvent, FC, useContext, useMemo } from 'react'

import { List, Paper } from '@mui/material'

import { EntryCard } from './'
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { EntryStatus } from '../../interfaces';

import styles from './EntryList.module.css'


interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status = 'pending' }) => {

    const { entries, updateEntry } = useContext(EntriesContext)
    const { isDragging, endDragging } = useContext(UIContext)

    const entriesByStatus = useMemo(() => entries.filter( p => p.status === status ), [ entries ])
    
    const onDragOver = (ev: DragEvent<HTMLDivElement>) => {
        ev.preventDefault()

    }
    const onDropEntry = (ev: DragEvent<HTMLDivElement>) => {

        const id = ev.dataTransfer.getData('text')
        const entry = entries.find( e => e._id === id )!
        entry.status = status
        updateEntry(entry)
        endDragging()
    }


    return (
        // TODO aqui hacer drop
        <div 
            onDrop={ onDropEntry }
            onDragOver={ onDragOver }
            className={ isDragging ? styles.dragging : '' }
        >
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px' }}>

                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                {
                    entriesByStatus.map( (entry, idx) => (
                        <EntryCard key={ idx } entry={ entry } />
                    ))
                }
                </List>

            </Paper>
        </div>
    )
}