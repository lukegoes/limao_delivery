import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js"


//App Config

const app = express()
const port = process.env.PORT || 4000;
dotenv.config();

//Middlewares
app.use(cors())
app.use(express.json())
console.log("Middleware express.json ativado");

//Conexão ao DB
connectDB();

//API End-Point
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);


app.get("/", (req, res)=>{
    res.send("API Funcionando")
})

app.listen(port, () => {
  console.log(`Server iniciado na porta ${port}`);
});



