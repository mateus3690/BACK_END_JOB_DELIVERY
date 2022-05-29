require('dotenv/config');

export const aplicacao = {
  apiVersion: process.env.APP_API_VERSION,
  apiPrefixPath: process.env.APP_API_PATH_PREFIX,
  pathStorage: process.env.APP_PATH_STORAGE
}

export const database = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbase   : process.env.DB_DATABASE,
  host    : process.env.DB_HOST,
  port    : +process.env.DB_PORT
}

export const server = {
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT || 3000,
  type: process.env.SERVER_TYPE
}

export const local = {
  idEmpresa: process.env.ID_EMPRESA
}