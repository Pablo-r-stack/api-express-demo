import { DataTypes } from "sequelize";
import getSequelizeInstance from './index.js';

const defineUserModel = async()=>{
    
    const sequelize = await getSequelizeInstance();
    const User = sequelize.define('User',{
        name:{type:DataTypes.STRING, allowNull:false},
        lastName:{type:DataTypes.STRING, allowNull:false},
        email:{type:DataTypes.STRING, allowNull:false, unique: true},
        password:{type:DataTypes.STRING, allowNull:false},
        country:{type:DataTypes.STRING, allowNull:false},
        dni:{type:DataTypes.STRING, allowNull:false, unique:true},
        role:{type:DataTypes.STRING, allowNull:false}
    },{timestamps: true});
    await User.sync();

    return User
}

export default defineUserModel;