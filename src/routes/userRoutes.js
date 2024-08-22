import express from 'express';
import { userController } from '../controllers/userController.js';


const router = express.Router();


//router / peticion (ruta) / req (lo que viene en la peticion), res (respuesta)
router.get('/', userController.userList);

router.post('/', userController.userRegister);

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.modifyUser)
    .delete(userController.deleteUser)
export default router;