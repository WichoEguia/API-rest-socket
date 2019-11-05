(() => {
  process.env.API_NAME = 'EAPI';
  process.env.API_VERSION = 'v1';
  process.env.API_DESCRIPTION = 'Documentación de un API construida con EAPI';

  process.env.PORT = process.env.PORT || '3000';

  process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '48h';
  process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
})();
