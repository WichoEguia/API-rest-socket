import mysql from 'mysql';

/**
 * Clase encargada de gestionar
 * la base de datos en MySQL
 */
export default class MySQL {
    private static _instance: MySQL;
    public cnn: mysql.Connection;
    public conectado: Boolean = false;

    private constructor() {
        console.log('MySQL iniciado');

        // Configuracion de la conección
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'elearning',
            timezone: 'utc'
        });
        this.conectarDB();
    }

    /**
     * Se crea una funcion para obtener la instancia del mysql si ya existe.
     * Si no existe instancia de la coneccio a BD, se creara una nueva instancia.
     *
     * @returns {MySQL} Instancia de la clase mysql.
     */
    public static get instance(): MySQL {
        return this._instance || (this._instance = new this());
    }
    
    /**
     * Funcion para conectar API a la base de datos.
     */
    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log('Ocurrió un error al conectarse a la BD', err.message);
                return;
            }

            this.conectado = true;
            console.log('Conectado a BD');
        });
    }

    /**
     * Envia un query a base de datos.
     * 
     * @param query Petición a base de datos.
     * @param values Valores o parametros que se usaran en el query.
     * @param callback Funcion que se llama al completar la peticion.
     */
    static query(query: any, values: Object, callback: Function) {
        this.instance.cnn.query(query, values, (err: any, results: any, fields: any) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }

            callback(null, results, fields);
        });
    }

    /**
     * Escapa una variable para evitar la inyección de SQL.
     * 
     * @param value Tabla, columna o atributo a escapar.
     */
    static escapeId(value: string) {
        this.instance.cnn.escapeId(value);
    }
}