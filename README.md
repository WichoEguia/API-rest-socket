# Socket Server
## Instalación
Reconstruir modulos de node
```
npm install
```

El API está escrita en typescript así que es necesario ejecutar este comando para compilar los archivos y ver por cambios.
```
tsc -w
```

## Levantar servidor
Para levantar el servidor es necesario nodemon por defecto.
Esto se puede cambiar en package.json en el apartado **scripts > start**
```
npm start
```

## Base de datos
El API tiene soporte para librerías *MySQL* y *MongoDB* en el directorio **/libraries**.
Solo se necesita importar el archivo y hacer la configuración inicial.

### MongoDB
La conexión con MongoDB se hace por medio de [mongoose](https://mongoosejs.com/).
```
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.URL_DB, { useNewUrlParser: true }, (err, res) => {
  if (err) throw new Error(err);
  // console.log('Base de datos ONLINE');
});
```

### MySQL
La conexión con MySQL se hace por medio de [mysql](https://github.com/mysqljs/mysql).
```
MySQL.instance;
```

## Comunicación por sockets
La comunicación por sockets se realiza a través de [Socket.io](https://socket.io/).
En el archivo **libraries\server.ts** se encuentra un método llamado _escucharSocket_ en el cual se escuchan los mensajes que llegan del cliente.
Para mantener un orden se manejan los listeners en el archivo **sockets\socket.ts**.
Inicialmente el API cuenta con dos listeners que escuchan cuando un cliente se conecta y desconecta del servidor.