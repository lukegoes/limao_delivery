import foodModel from "../models/foodModel.js";
import fs from "fs"

//Adicionar item no catálogo

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success: true, message: "Item adicionado com sucesso!"}) 
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Erro ao adicionar item"})
    }
};

//Listar itens do catálogo
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods, message: "Itens listados com sucesso!"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Erro ao listar itens"})
    }
}

//Remover item do catálogo
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Item removido com sucesso!"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Erro ao remover item"})
    }
}


export {addFood, listFood, removeFood}
