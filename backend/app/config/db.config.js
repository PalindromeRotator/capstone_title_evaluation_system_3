module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USERNAME || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    DB: process.env.DB_DBNAME || 'capstone_titles_evaluation_system_3',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};