import chalk from 'chalk';

export default class Config {
    constructor() {
        // PORT
        process.env.PORT = '3000';

        // URL database
        let database = '';
        process.env.DB_URL = `mongodb://localhost:27017/${database}`;

        // Expiration token
        process.env.CADUCIDAD_TOKEN = '48h';

        // Token seed
        process.env.SEED = 'este-es-el-seed-desarrollo';

        // Proyect name
        process.env.API_NAME = 'WAPI EXAMPLE';

        // Version
        process.env.API_VERSION = '1.0.0';

        // Description
        process.env.API_DESCRIPTION = 'Api de prueba WAPI';

        console.log(chalk.bgBlue('\nCONFIGURACION CARGADA!'));
    }
}