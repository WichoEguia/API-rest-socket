import mongoose from 'mongoose';

export default class MongoDB {
    private static _instance: MongoDB;
    private url_db: string = String(process.env.DB_URL);
    public conectado: boolean = false;

    constructor() {
        console.log('MongoDB iniciado');

        this.connectDB();    
    }

    /**
     * Se crea una funcion para obtener la instancia del mysql si ya existe.
     * Si no existe instancia de la coneccio a BD, se creara una nueva instancia.
     *
     * @returns {MongoDB} Instancia de la clase MongoDB.
     */
    public static get instance(): MongoDB {
        return this._instance || (this._instance = new this());
    }

    /**
     * Funcion para conectar API a la base de datos.
     */
    connectDB() {
        mongoose.connect(this.url_db, {
            useNewUrlParser: true
        }, (err) => {
            if (err) console.error(err);
            
            this.conectado = true;
            console.log('Conectado a BD');
        });
    }
}