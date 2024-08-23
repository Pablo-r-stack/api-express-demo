
import  jwt  from 'jsonwebtoken';
//validar sesion
const validateSession = async (req, res, next) =>{
    //recuperar el token del encabezado de la peticion
    const token = req.headers['authorization']?.split(' ')[1];
    //si no existe el token envio un error no autorizado
    if(!token){
        return res.status(403).json({message: 'No autorizado, sesión inválida'});
    } 

    req.session = {user: null};
    try {
        //verificar el token mediante su firma secreta
        const data = jwt.verify(token, 'palabraSecreta');
        req.session.user = data;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({message: 'Token invalido'});
    }
}

export {validateSession};