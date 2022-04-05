import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, iEntry } from '../../../../models';

type Data = 
| { message: string }
| iEntry


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query;

    // if( !mongoose.isValidObjectId(id) ) {
    //     return res.status(400).json({ message: 'El ID no es válido: ' + id })
    // }

    switch (req.method) {
        case 'PUT':
            return updateEntry( req, res )

        case 'GET':
            return getEntry( req, res )
    
        case 'DELETE':
            return deleteEntry( req, res )
    
        default:
            return res.status(400).json({ message: 'Methodo no válido.' })
    }
}


const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.conect()

    const entryToUdt = await Entry.findById(id)
    if( !entryToUdt ) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay estrada con este ID: ' + id })
    }

    const {
        description = entryToUdt.description,
        status = entryToUdt.status,
    } = req.body

    try {
        const updateEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true})
        res.status(200).json( updateEntry! )
        await db.disconnect()
    } catch (error: any) {
        await db.disconnect()
        res.status(400).json({ message: error.errors.status.message })
    }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id } = req.query;

    await db.conect()

    const entry = await Entry.findById(id)
    if( !entry ) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay estrada con este ID: ' + id })
    }

    await db.disconnect()
    return res.status(200).json( entry )
}


const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    await db.conect()

    const entry = await Entry.findById( id );
    if( !entry ) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay estrada con este ID: ' + id })
    }

    await entry.delete()

    await db.disconnect()
    return res.status(200).json({ id })
}