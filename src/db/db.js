//configuraciones necesarias de la base de datos
import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";


//configuracion basica de mysql
const db = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demoExpress',
}
//Crea base de datos de forma automatica.
async function createDatabase() {
    const connection = await mysql.createConnection({
        host: db.host,
        user: db.user,
        password: db.password
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${db.database}\``);
    await connection.end();
}

//inicializo sequelize

async function initializeSequelize() {
    await createDatabase();
    const sequelize = new Sequelize(
        db.database,
        db.user,
        db.password,
        {
            host: db.host,
            dialect: 'mysql',
            logging: false
        });
        try {
            await sequelize.authenticate()
            console.log('Base de datos conectada correctamente');            
        } catch (error) {
            console.error('No se puede conectar a la base de datos', error);
            //salir del proceso si no se puede conectar
            process.exit(-1);
        }

        return sequelize;
}

export default initializeSequelize;