import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {

    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders", {}, {headers:{token}});
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

   

  return (
    <div className='my-orders'>
    <h2>Meus Pedidos</h2>
    <div className="container">
        {data.map((order, index)=>{
            return(
                <div key={index} className="my-orders-order">
                     <img src={assets.parcel_icon} alt="" />
                     <p>{order.items.map((item, index)=>{
                        if (index === order.items.length - 1) {
                            return item.name+" x "+item.quantity;
                        }
                        else {
                            return item.name+" x "+item.quantity+", ";
                        }
                     })}</p>
                     <p className='preco'><p className='preco-text'>Total do Pedido</p>R${order.amount/100}</p>
                     <p>Items: <b>{order.items.length}</b></p>
                     <p><span>&#x25cf; </span><b>{order.status}</b></p>
                     <button>Rastrear Pedido</button>
                </div>
            )
        })}
    </div>
    </div>
  )
}

export default MyOrders