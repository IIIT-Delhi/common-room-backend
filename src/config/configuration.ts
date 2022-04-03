export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
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
});
