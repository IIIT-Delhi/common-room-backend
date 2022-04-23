export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        uri: process.env.DATABASE_URI,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        dialect: process.env.DATABASE_DIALECT,
    },
    sequelize: {
        dir: process.env.MODEL_DIR,
    },
    env: process.env.NODE_ENV || 'development',
    jwt: process.env.JWT_SECRET || 'secret',
    firebase: {
        db: process.env.FIREBASE_DB,
    },
    imgur: {
        clientId: process.env.IMGUR_CLIENT_ID,
        url: process.env.IMGUR_URL,
    },
    admin: {
        secret: process.env.ADMIN_SECRET,
    },
});
