import { Sequelize } from 'sequelize'

import {dbConfig} from './pgConfig'

const { development: {username, password, database, host, dialect}} = dbConfig

// export const sequelize = new Sequelize(`${dialect}://${username}:${password}@example.com:${host}/${database}`)

export const sequelize = new Sequelize(database!, username!, password, {
    host: 'localhost',
    dialect: 'postgres'
  });