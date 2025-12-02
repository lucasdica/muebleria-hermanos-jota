import jwt from 'jsonwebtoken'

export function autenticarUsuario(req, res, next) {

    const headerAuthorization = req.headers.authorization;

    if(headerAuthorization && headerAuthorization.startsWith('Bearer ')) {

        const token = headerAuthorization.split(' ')[1];

        jwt.verify(token, process.env.SECRETO_JWT, (error, decodePayload) => {
            if(error){
                return res.status(403).json({mensaje: 'Token invalido'})
            }
            req.user = decodePayload;

            next();
        })
    }else{
        return res.status(401).json({mensaje: 'Credenciales invalidas'})
    }   
}