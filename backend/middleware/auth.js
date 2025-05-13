import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next)=>{
    const{token} = req.headers;
    if (!token) {
        return res.json({success: false, message: "Acesso não autorizado, faça login novamente"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
       console.log(error);
       return res.json({success: false, message: "Erro!"})
    }
};

export default authMiddleware;