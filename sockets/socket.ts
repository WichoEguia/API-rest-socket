import { Server, Socket } from 'socket.io';

/**
 * Funcion que se ejecuta cuando un cliente se ha conectado.
 * 
 * @param {Socket} cliente Cliente socket conectado.
 * @param {Server} io Servidor de sockets.
 */
export const clienteConectado = (cliente: Socket, io: Server) => {
    console.log(`Nuevo Cliente conectado con el id ${cliente.id}.`);
}

/**
 * Funcion que se escucha cuando un cliente se desconecta.
 * 
 * @param {Socket} cliente Cliente socket conectado.
 * @param {Server} io Servidor de sockets.
 */
export const clienteDesconectado = (cliente: Socket, io: Server) => {
    io.on('disconnect', () => {
        console.log(`Cliente con id ${cliente.id} se ha desconectado.`);
    });
}