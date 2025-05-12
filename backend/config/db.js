import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://luklg:965414955@cluster0.drnlxg8.mongodb.net/limao-del").then(()=>{
        console.log("Database Conectado com sucesso")
    }).catch((err)=>{
        console.log(err)
    })
}