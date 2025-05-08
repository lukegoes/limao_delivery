import React, { useContext } from "react";
import "./ColocarPedido.css";
import { StoreContext } from "../../context/StoreContext";

const ColocarPedido = () => {

  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <form className="colocar-pedido">
      <div className="colocar-pedido-esquerda">
        <p className="title">Dados para entrega</p>
        <div className="multi-fields">
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="Sobrenome" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Rua" />
        <div className="multi-fields">
          <input type="text" placeholder="Cidade" />
          <input type="text" placeholder="Estado" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="CEP" />
          <input type="text" placeholder="País" />
        </div>
        <input type="text" placeholder="Telefone" />
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
              <p>R${getTotalCartAmount()===0?0:9.99}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>R${(getTotalCartAmount()===0?0:getTotalCartAmount() + 9.99).toFixed(2)}</b>
            </div>
          </div>
          <button>FINALIZAR PAGAMENTO</button>
        </div>
      </div>
    </form>
  );
};

export default ColocarPedido;
