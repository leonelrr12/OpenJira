import mongoose from 'mongoose'

/****
 * 1 = Connected
 * 2 = Connecting
 * 3 = Disconnecting
 * 
 */

const mongooConnection = {
    isConnected: 0
}

export const conect = async () => {

    if(mongooConnection.isConnected) {
        console.log('Ya estabamos Conectados ...');
        return;
    }

    if(mongoose.connections) {
        mongooConnection.isConnected = mongoose.connections[0].readyState

        if(mongooConnection.isConnected === 1) {
            console.log('Usando conexion anterior ...');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect( process.env.MONGO_URL || '' )
    mongooConnection.isConnected = 1
    console.log('Conectado a MongoDB:', process.env.MONGO_URL);
}

export const disconnect = async () => {
    
    if(process.env.NODE_ENV === 'development') return;
    if(!mongooConnection.isConnected) return;

    await mongoose.disconnect()
    console.log('Desconectando de MongoDB ...');
}