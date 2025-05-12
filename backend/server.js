import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"

//App Config

const app = express()
const port = 4000

//Middlewares
app.use(cors())
app.use(express.json())

//Conexão ao DB
connectDB();

//API End-Point
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res)=>{
    res.send("API Funcionando")
})

app.listen(port, ()=>{
    console.log(`Server iniciado em http://localhost:${port}`)
})



