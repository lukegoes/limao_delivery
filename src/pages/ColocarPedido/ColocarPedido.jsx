import React, { useContext, useState } from "react";
import "./ColocarPedido.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const ColocarPedido = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let total = parseFloat((getTotalCartAmount() + 9).toFixed(2));
    let orderData = {
      address: data,
      items: orderItems,
      amount: Math.round(total * 100), 
    }

    let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}});
    if (response.data.success) {
      const {session_url} = response.data;
      console.log("Redirecionando para pagamento:", session_url);
      window.location.replace(session_url);
    }
    else {
      alert("Erro ao realizar pedido");
    }
  };

  return (
    <form onSubmit={placeOrder} className="colocar-pedido">
      <div className="colocar-pedido-esquerda">
        <p className="title">Dados para entrega</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="Nome" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Sobrenome" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Rua" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="Cidade" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="Estado" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="CEP" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="País" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Telefone" />
      </div>

      <div className="colocar-pedido-direita">
        <div className="cart-total">
          <h2 className="title">Total do Carrinho</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Taxa de entrega</p>
              <p>R${getTotalCartAmount()===0?0:9}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>R${(getTotalCartAmount()===0?0:getTotalCartAmount() + 9).toFixed(2)}</b>
            </div>
          </div>
          <button type="submit">FINALIZAR PAGAMENTO</button>
        </div>
      </div>
    </form>
  );
};

export default ColocarPedido;
