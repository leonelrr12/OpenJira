import { FC, useEffect, useReducer } from 'react';

import { entriesApi } from '../../apis';

import { IEntry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';


export interface EntriesState {
    entries: IEntry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = async (description: string) => {
        try {
            const { data } = await entriesApi.post<IEntry>('/entries', { description }) 
            dispatch({ type: '[Entry] Add-Entry', payLoad: data })
        } catch (error) {
            console.log({ error })
        }
    }

    const updateEntry = async ({ _id, description, status }: IEntry ) => {
        try {
            const { data } = await entriesApi.put<IEntry>(`/entries/${ _id }`, { description, status }) 
            dispatch({ type: '[Entry] Update-Entry', payLoad: data })
        } catch (error) {
            console.log({ error })
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<IEntry[]>('/entries');
        dispatch({ type: '[Entry] Initial-Entry', payLoad: data })
    }

    useEffect(() => {
        refreshEntries();
    }, [])
    

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