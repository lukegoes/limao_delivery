import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";


const Add = () => {

    const url = "http://localhost:4000";
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Saladas"
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]: value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData);
        if(response.data.success){
            setData({
                name: "",
                description: "",
                price: "",
                category: "Saladas"
            })
            setImage(false)
            toast.success(response.data.message);
        }
        else{
            toast.error(response.data.message);
        }
    }

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Adicionar Imagem</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
            <p>Nome do Produto</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Escreva aqui" />
        </div>
        <div className="add-product-description flex-col">
            <p>Descrição do Produto</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows={6} placeholder="Escreva a descrição do produto aqui" required></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
            <p>Categoria</p>
            <select onChange={onChangeHandler} name="category">
                <option value="Saladas">Saladas</option>
                <option value="Rolinhos">Rolinhos</option>
                <option value="Sobremesas">Sobremesas</option>
                <option value="Sanduíches">Sanduíches</option>
                <option value="Bolos">Bolos</option>
                <option value="Veganos">Veganos</option>
                <option value="Massas">Massas</option>
                <option value="Asiática">Asiática</option>
            </select>
            </div>
            <div className="add-prioce flex-col">
                <p>Preço do Produto</p>
                <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="R$19.90"/>
            </div>
        </div>
        <button type="submit" className="add-button">Adicionar</button>
      </form>
    </div>
  );
};

export default Add;
