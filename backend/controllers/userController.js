import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login de usuário

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        //Usuário não cadastrado
        if(!user){
            return res.json({success: false, message: "Usuário não cadastrado"})
        }

        //Verificar senha
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: "Senha incorreta"})
        }

        const token = createToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Erro ao fazer login"})
    }
}

const createToken = (id) => {
    // eslint-disable-next-line no-undef
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//Registrar usuário

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        //Verifica se o usuário já existe
        const exists = await userModel.findOne({ email });
        if (exists) {
           return res.json({ success: false, message: "Email já cadastrado" });
        }
        
        //Validando email
        if (!validator.isEmail(email)){
            return res.json({ success: false, message: "Por favor, utilize um email válido" });
        }
        
        //Verificando senha forte
        if (password.length < 8){
            return res.json({ success: false, message: "Sua senha deve conter ao menos 8 caracteres" });
        }

        //Hashing(encriptando) senha do usuário
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Erro ao registrar usuário" });
    }
}

export {loginUser, registerUser}