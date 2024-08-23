//Logica del negocio, validación y comunicacion con la base de datos.

import createError from "../utils/errorHandler.js";
import defineUserModel from './../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//obtener lista de usuarios.
const getAllUsers = async () => {
    try {
        const User = await defineUserModel();
        //consulta a la base de datos
        const users = await User.findAll();
        //si el array esta vacio devuelve error 404
        if (!users.length > 0) throw createError(404, 'Aun no hay usuarios registrados');
        //retorna el array de usuarios si se encuentra algun valor
        return users;
    } catch (error) {
        //error interno del servidor
        throw createError(error.status || 500, error.message || 'Error al obtener los usuarios');
    }
}

//Registrar usuario

const createUser = async (user) => {
    try {
        const User = await defineUserModel()
        const { email } = user;
        //validar si el correo ya existe
        const userExist = await User.findOne({ where: { email } });
        if (userExist) throw createError(400, 'Ese correo ya se encuentra en uso');
        //hashear contraseña
        const hashedPassword = await bcrypt.hash(user.password, 10);
        //asigno contraseña encriptada mediante spread operator
        const newUser = { ...user, password: hashedPassword };
        //si el correo no existe, se crea el usuario
        const userCreated = await User.create(newUser);
        return userCreated;
    } catch (error) {
        //error interno del servidor
        throw createError(error.status || 500, error.message || 'Error al crear el usuario');
    }
}


//obtener usuario por id

const getUserById = async(id) =>{
    try {
        const User = await defineUserModel();
        const userExist = await User.findByPk(id);
        if (!userExist) throw createError(404, 'El usuario no existe');
        return userExist;
    } catch (error) {
        throw createError(error.status || 500, error.message || 'Error al obtener el usuario');
    }
}

//modificar usuario

const updateUser = async (id, user) => {
    try {
        const User = await defineUserModel();
        //buscar usuario por id
        const userExist = await User.findByPk(id);
        //si el usuario no existe devuelvo error 404
        if (!userExist) throw createError(404, 'No se encontro usuario con ese id');
        //modificar usuario con valores nuevos
        const userUpdated = await userExist.update(user);
        return userUpdated;
    } catch (error) {
        throw createError(error.status || 500, error.message || 'Error al modificar el usuario');
    }
}

//eliminar usuario

const deleteUser = async(id) =>{
    try {
        const User = await defineUserModel();
        const userExist = await User.findByPk(id);
        if (!userExist) throw createError(404, 'El usuario a borrar no existe');
        await userExist.destroy();
        return { message: 'Usuario eliminado con exito' };
    } catch (error){
        throw createError(error.status || 500, error.message || 'Error al modificar el usuario');
    }
}

const login = async(user) =>{
    const {email, password} = user;
    try {
        const User = await defineUserModel();
        //buscar usuario por email
        const userExist = await User.findOne({where: {email}});
        if (!userExist) throw createError(401, 'Usuario o contraseña invalidos');
        //encriptar y comparar contraseña
        const isValidPassword = await bcrypt.compareSync(password, userExist.password);
        if (!isValidPassword) throw createError(401, 'Usuario o contraseña invalidos');
        //construir DTO con datos no sensibles
        const userDTO = {
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            rol: userExist.rol
        };
        //construir json Web token
        const token = jwt.sign(userDTO, 'palabraSecreta',{
            expiresIn: '1h'
        });
        return token;

    } catch (error) {
        throw createError(error.status || 500, error.message || 'Error al iniciar sesion');
    }
}


export const userService = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    login
}