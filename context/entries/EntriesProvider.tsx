import { FC, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { IEntry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';


export interface EntriesState {
    entries: IEntry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Consectetur pariatur deserunt non anim ea excepteur sint amet in nostrud in sint.',
            status: 'pending',
            createAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'Esse cupidatat commodo nisi consequat duis occaecat pariatur aliqua in ipsum eiusmod qui.',
            status: 'in-progress',
            createAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'Enim fugiat occaecat ad amet in dolore duis occaecat eiusmod adipisicing tempor.',
            status: 'finished',
            createAt: Date.now() - 100000,
        },
    ],
}


export const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = (description: string) => {

        const newEntry: IEntry = {
            _id: uuidv4(),
            description,
            createAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] Add-Entry', payLoad: newEntry })
    }

    const updateEntry = ( entry: IEntry ) => {
        dispatch({ type: '[Entry] Update-Entry', payLoad: entry })
    }


    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}