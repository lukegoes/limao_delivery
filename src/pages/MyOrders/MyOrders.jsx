import React, { useCallback, useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders = () => {
  const [loading, setLoading] = useState(true);
  const [expandido, setExpandido] = useState({});

  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento mesmo se der erro
    }
  }, [token, url]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, fetchOrders]);

 return (
    <div className="my-orders">
      <h2>Meus Pedidos</h2>
      <div className="container">
        {loading ? (
          // Mostra 3 skeletons enquanto carrega
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="my-orders-order skeleton">
              <div className="skeleton-img" />
              <div style={{ flex: 1 }}>
                <div className="skeleton-text-line" />
                <div className="skeleton-text-line short" />
              </div>
              <div className="skeleton-text-line short" />
            </div>
          ))
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  className={`produtos ${expandido[index] ? "expandido" : ""}`}
                >
                  {order.items.map((item) => `${item.name}`).join(", ")}
                </p>
                {order.items.length > 2 && (
                  <span
                    className="ver-mais"
                    onClick={() =>
                      setExpandido((prev) => ({
                        ...prev,
                        [index]: !prev[index],
                      }))
                    }
                  >
                    {expandido[index] ? "Ver menos" : "Ver mais"}
                  </span>
                )}
              </div>
              <p className="preco">R${order.amount / 100}</p>
              <p>
                Items: <b>{order.items.length}</b>
              </p>
              <p>
                <span>&#x25cf; </span>
                <b>{order.status}</b>
              </p>
              <button>Acompanhar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
