import { userService } from "../service/userService.js";

//Obtener Todos los usuarios
const userList = (async (req, res) => {
    try {
        //consulta al servicio
        const usuarios = await userService.getAllUsers();
        //evalua condicion y devuelve respuesta.
        res.status(200).json({ usuarios: usuarios });
    } catch (error) {
        //manda error solo a consola interna
        console.error(error);
        //mensaje de error al cliente
        res.status(error.status || 500).json({ message: error.message });
    }
});

//Registrar usuario
const userRegister = (async (req, res) => {
    //recibir datos del formulario o peticion
    const data = req.body;
    try {
        //llamo al servicio
        const usuario = await userService.createUser(data);
        //devuelve respuesta
        res.status(201).json({ usuario: usuario });
    } catch (error) {
        //manda error solo a consola interna
        console.error(error);
        res.status(error.status || 500).json({ message: error.message });
    }
});

//Obtener usuario por id
const getUserById = (async (req, res) => {
    //extraemos id del encabezado de la petición
    const { id } = req.params;
    try {
        //llamar al servicio y buscar el usuario
        const usuario = await userService.getUserById(id);
        res.status(200).json({ usuario: usuario });
    } catch (error) {
        //manda error solo a consola interna
        console.error(error);
        //mensaje de error al cliente
        res.status(error.status || 500).json({ message: error.message });
    }
});

//Modificar usuario
const modifyUser = (async (req, res) => {
    //extraemos id del encabezado de la petición
    const { id } = req.params;
    try {
        //llamar al servicio y buscar el usuario
        const user = await userService.updateUser(id, req.body);
        //devuelve respuesta
        res.status(200).json({ message: `Usuario ${id} modificado con éxito` });
    } catch (error) {
        //manda error solo a consola interna
        console.error(error);
        //mensaje de error al cliente
        res.status(error.status || 500).json({ message: error.message });
    }
});

///borrar usuario
const deleteUser = (async (req, res) => {
    //extraemos id del encabezado de la petición
    const { id } = req.params;
    try {
        //llamar al servicio y borro el usuario
        const message = await userService.deleteUser(id);

        res.status(200).json(message);

    } catch (error) {
        //manda error solo a consola interna
        console.error(error);
        //mensaje de error al cliente
        res.status(error.status || 500).json({ message: error.message });
    }
});

const login = (async (req, res)=>{
    //recibimos credenciales del usuario a loguear
    const data = req.body;
    try {
        //llamo al servicio
        const token = await userService.login(data);
        //devuelve respuesta
        res.status(200).json({message: 'Login exitoso', token: token});
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

const logout = (async (req, res)=>{
    res.status(200).json({message: 'Deslogueado con exito'});
})

export const userController = {
    userList, userRegister, getUserById, modifyUser, deleteUser, login, logout
}