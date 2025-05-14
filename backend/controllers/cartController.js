import userModel from "../models/userModel.js";

//Adicionar item ao carrinho
const addToCart = async (req, res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData [req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Item adicionado ao carrinho!"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Erro ao adicionar item ao carrinho"})
    }
};

//Remover item do carrinho
const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
        return res.status(400).json({ success: false, message: "Parâmetros ausentes." });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado." });
        }

        const cartData = { ...user.cartData };

        if (!cartData[itemId]) {
            return res.status(400).json({ success: false, message: "Item não está no carrinho." });
        }

        cartData[itemId] -= 1;

        if (cartData[itemId] <= 0) {
            delete cartData[itemId]; // Remove o item completamente se chegar a zero
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        return res.status(200).json({ success: true, message: "Item removido do carrinho." });
    } catch (error) {
        console.error("Erro ao remover item do carrinho:", error);
        return res.status(500).json({ success: false, message: "Erro interno do servidor." });
    }
};

// Remover item completamente do carrinho
const removeAllFromCart = async (req, res) => {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
        return res.status(400).json({ success: false, message: "Parâmetros ausentes." });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado." });
        }

        const cartData = { ...user.cartData };

        if (!cartData[itemId]) {
            return res.status(400).json({ success: false, message: "Item não está no carrinho." });
        }

        // Remove o item completamente
        delete cartData[itemId];

        await userModel.findByIdAndUpdate(userId, { cartData });

        return res.status(200).json({ success: true, message: "Item removido completamente do carrinho." });
    } catch (error) {
        console.error("Erro ao remover item do carrinho:", error);
        return res.status(500).json({ success: false, message: "Erro interno do servidor." });
    }
};



//Listar itens do carrinho
const getCart = async (req, res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success: true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Erro ao listar itens do carrinho"})
    }
};

export {addToCart, removeFromCart, getCart, removeAllFromCart};