export default class Config {
    constructor() {
        console.log('CONFIGURACION CARGADA!');

        // Puerto
        process.env.PORT = '3000';

        // URL base de datos
        let database = 'estacionamiento';
        process.env.DB_URL = `mongodb://localhost:27017/${database}`;

        // Vencimiento del token
        process.env.CADUCIDAD_TOKEN = '48h';

        // seed token
        process.env.SEED = 'este-es-el-seed-desarrollo';
    }
}