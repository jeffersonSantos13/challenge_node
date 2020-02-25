module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DIALECT || 'postgres',
  storage: './__test__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
