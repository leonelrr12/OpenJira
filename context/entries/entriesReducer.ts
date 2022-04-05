import { EntriesState } from './';
import { IEntry } from '../../interfaces/entry';


type EntriesActionType =
    | { type: '[Entry] Add-Entry', payLoad: IEntry }
    | { type: '[Entry] Update-Entry', payLoad: IEntry }
    | { type: '[Entry] Initial-Entry', payLoad: IEntry[] }
    | { type: '[Entry] Delete-Entry', payLoad: string }


export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

    switch (action.type) {
        case '[Entry] Add-Entry':
            return {
                ...state,
                entries: [ ...state.entries, action.payLoad ]
            }

        case '[Entry] Update-Entry':
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if(entry._id === action.payLoad._id) {
                        entry.status = action.payLoad.status
                        entry.description = action.payLoad.description
                    }
                    return entry
                })
            }

        case '[Entry] Delete-Entry':
            return {
                ...state,
                entries: state.entries.filter( entry => entry._id !== action.payLoad )
            }

        case '[Entry] Initial-Entry':
            return {
                ...state,
                entries: [ ...action.payLoad ]
            }
    

        default:
            return state
    }
}