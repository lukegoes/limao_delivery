import React, { useContext } from 'react'
import './Carrinho.css'
import { StoreContext } from '../../context/StoreContext'

const Carrinho = () => {

  const{cartItems, food_list, removeTotalFromCart} = useContext(StoreContext);

  const isCartEmpty = food_list.every(item => cartItems[item._id] === 0 || !cartItems[item._id]);

  return (
    <div className='carrinho'>
      <div className="items-carrinho">
        <div className="items-carrinho-titulo">
          <p>Items</p>
          <p>Produto</p>
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
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p className='preco'>R${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>R${item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeTotalFromCart(item._id)} className='cross'>x</p>
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
    </div>
  )
}

export default Carrinho