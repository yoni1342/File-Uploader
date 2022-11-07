import mysql,{Connection, ConnectionConfig} from 'mysql'
// create connection

const db = mysql.createConnection({
    host: 'sql8.freesqldatabase.com',
    user: 'sql8549369',
    password: 'JgdDKFUJMX',
    database: 'sql8549369'
});
export default db



