import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next)=>{
    const{token} = req.headers;
    console.log("Headers recebidos:", req.headers); // Veja tudo que chegou
    console.log("Token recebido:", token);
    if (!token) {
        return res.json({success: false, message: "Acesso não autorizado, faça login novamente"})
    }
    try {
        // eslint-disable-next-line no-undef
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body = req.body || {};
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
       console.log(error);
       return res.json({success: false, message: "Erro ao verificar token!"})
    }
};

export default authMiddleware;