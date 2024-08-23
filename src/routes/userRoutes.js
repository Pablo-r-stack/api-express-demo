import express from 'express';
import { userController } from '../controllers/userController.js';
import { validateSession } from '../middlewares/auth.js';

const router = express.Router();


//router / peticion (ruta) / req (lo que viene en la peticion), res (respuesta)
router.get('/', validateSession ,userController.userList);

router.post('/', userController.userRegister);

//login
router.post('/login', userController.login);

//logout
router.post('/logout', validateSession, userController.logout);

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.modifyUser)
    .delete(userController.deleteUser)
export default router;