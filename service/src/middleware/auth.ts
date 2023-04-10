import {verifyJwtToken} from "../services/AuthService";

const auth = async (req, res, next) => {
    const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
    try {
        const Authorization = req.header('Authorization')
        if (!Authorization) {
            throw new Error('Error: 无访问权限 | No access rights')
        }
        const token:string = Authorization.replace('Bearer ', '').trim();
        if (!token) {
            throw new Error('Error: 无访问权限 | No access rights')
        }
        const user = verifyJwtToken(token)
        if(!user) {
            throw new Error('Error: 无访问权限 | No access rights')
        }
        req.user = user
        next()
    } catch (error) {
        res.send({status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null})
    }
}

export {auth}
