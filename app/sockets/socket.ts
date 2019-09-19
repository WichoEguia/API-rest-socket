import { Server, Socket } from 'socket.io';

/**
 * Listen for client connection
 * 
 * @param {Socket} cliente Cliente socket conectado.
 * @param {Server} io Servidor de sockets.
 */
export const connectedClient = (cliente: Socket, io: Server) => {
    console.log(`Nuevo Cliente conectado con el id ${cliente.id}.`);
}

/**
 * Funcion que se escucha cuando un cliente se desconecta.
 * 
 * @param {Socket} cliente Cliente socket conectado.
 * @param {Server} io Servidor de sockets.
 */
export const disconnectedClient = (cliente: Socket, io: Server) => {
    io.on('disconnect', () => {
        console.log(`Cliente con id ${cliente.id} se ha desconectado.`);
    });
}