import SequelizeAuto from 'sequelize-auto';

// load environment variables
import dotenv from 'dotenv';
dotenv.config();

import _config from '../src/config/configuration';

const config = _config();
const db_config = config.database;

const sequelize_config: any = {
    host: db_config.host,
    dialect: db_config.dialect as any,
    directory: config.sequelize.dir,
    port: db_config.port,
    useDefine: true,
    lang: 'ts',
    indentation: 4,
    skipTables: ['_prisma_migrations'],
};

const auto = new SequelizeAuto(
    db_config.database,
    db_config.username,
    db_config.password,
    sequelize_config,
);

auto.run();
