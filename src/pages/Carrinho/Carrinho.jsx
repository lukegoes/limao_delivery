import React, { useContext } from 'react'
import './Carrinho.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Carrinho = () => {

  

  const navigate = useNavigate();

  const{cartItems, food_list, removeTotalFromCart, getTotalCartAmount, url, getUserIdFromToken, token} = useContext(StoreContext);

  const isCartEmpty = food_list.every(item => cartItems[item._id] === 0 || !cartItems[item._id]);

  const userId = getUserIdFromToken(token);

  return (
    <div className='carrinho'>
      <h2 className='carrinho-titulo'>Carrinho</h2>
      <div className="items-carrinho">
        <div className="items-carrinho-titulo">
          <p>Items</p>
          <p >Produto</p>
          <p className='preco'>Preço</p>
          <p>Qtd</p>
          <p>Total</p>
          <p>Remover</p>
        </div>
        <br />
        <hr />
        
        {isCartEmpty ? (
          <div className="carrinho-vazio">
            <p>Seu carrinho está vazio,</p><p> adicione itens ao seu carrinho!</p>
          </div>
        ) : (
          food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className='items-carrinho-item'>
                    <img src={url+"/images/"+item.image} alt="" />
                    <p className='nome-produto'>{item.name}</p>
                    <p className='preco'>R${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>R${item.price * cartItems[item._id]}</p>
                    <p onClick={async () => await removeTotalFromCart(item._id, userId)} className='cross'>X</p>
                  </div>
                  <hr />
                </div>
              )
            }
            return null;
          })
        )}
      </div>
      <hr />
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total do Carrinho</h2>
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
          <button onClick={() => navigate("/pedido")}>FINALIZAR COMPRA</button>
        </div>
        <div className="cart-promocode">
        <div>
          <p>Tem um código promocional?</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='Código promocional'/>
            <button>APLICAR</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Carrinho