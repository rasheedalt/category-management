import { Sequelize, QueryTypes } from 'sequelize';
import sequelizeConfig from '../config/database';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: sequelizeConfig.host,
  port: +sequelizeConfig.port,
  database: sequelizeConfig.database,
  username: sequelizeConfig.username,
  password: sequelizeConfig.password,
});

export default { sequelize, Sequelize, QueryTypes };
