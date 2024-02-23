import envs from './config';

const { database } = envs;

const sequelizeConfig = {
  host: database.host,
  username: database.username,
  password: database.password,
  database: database.database,
  port: +database.port,
  'migrations-path': './src/core/database/migrations',
  'seeders-path': './src/core/database/seeders',
  dialect: 'postgres',
  define: {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  logQueryParameters: true,
  //   logging: (str: string): any => {
  //     return database.showDBlogs ? console.info(`[SEQUELIZE DATABASE] ${str}`) : null;
  //   },
};

export default sequelizeConfig;
