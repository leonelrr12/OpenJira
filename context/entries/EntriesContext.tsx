import { createContext } from 'react';
import { IEntry } from '../../interfaces';


interface ContextProps {
   entries: IEntry[];  // TODO 

   // Methods
   addNewEntry: (description: string) => void;
   updateEntry: (entry: IEntry, showSnackbar?: boolean) => void;
   deleteEntry: ( id: string ) => void;
}


export const EntriesContext = createContext({} as ContextProps)