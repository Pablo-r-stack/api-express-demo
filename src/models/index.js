import initializeSequelize from "../db/db.js";

let sequelizeInstance = null;

async function getSequelizeInstance(){
    if(!sequelizeInstance){
        sequelizeInstance = await initializeSequelize();
    }
    return sequelizeInstance;
}

export default getSequelizeInstance;