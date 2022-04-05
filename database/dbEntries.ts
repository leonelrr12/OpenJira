import { isValidObjectId } from 'mongoose';
import { IEntry } from '../interfaces';
import { Entry } from '../models';
import { db } from './';


export const getEntriesById = async(id: string): Promise<IEntry | null> => {

    if( !isValidObjectId(id) ) return null;

    await db.conect();
    const entry = await Entry.findById(id).lean();
    await db.disconnect;

    return JSON.parse(JSON.stringify(entry));
}
