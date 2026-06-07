import pg from "pg";
 
// Cria um pool de conexões com o banco PostgreSQL
// Um pool reutiliza conexões abertas em vez de abrir uma nova a cada query
const db = new pg.Pool({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});
 
// Testa a conexão ao iniciar o servidor
db.connect();
 
export default db;
 