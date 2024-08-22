//Funcion de manejo de errores personalizada, retorna el status y mensaje definido previamente por nosotros.
const createError = (status, message) => {
    //crea un nuevo objeto error con su mensaje.
    const error = new Error(message);
    //agrega el status al objeto error
    error.status = status;
    //retorna el error personalizado
    return error;
};

export default createError;