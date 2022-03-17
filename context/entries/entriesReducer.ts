import { EntriesState } from './';
import { IEntry } from '../../interfaces/entry';


type EntriesActionType =
    | { type: '[Entry] Add-Entry', payLoad: IEntry }
    | { type: '[Entry] Update-Entry', payLoad: IEntry }


export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

    switch (action.type) {
        case '[Entry] Add-Entry':
            return {
                ...state,
                entries: [ ...state.entries, action.payLoad ]
            }
            break;
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
            break;

        default:
            return state
    }
}