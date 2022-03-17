

export interface IEntry {
    _id: string;
    description: string;
    createAt: number;
    status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished'