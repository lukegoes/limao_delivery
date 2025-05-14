import axios from "axios";
import { createContext, useState } from "react";
import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId, userId) => {
    console.log("addToCart chamado com:", itemId);
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token){
      await axios.post(url+"/api/cart/add", {itemId, userId}, {headers:{token}});
    }
  };

  const removeFromCart = async (itemId, userId) => {
    // Verifica se a quantidade do item é 1
  if (cartItems[itemId] === 1) {
    // Remove o item do carrinho completamente
    setCartItems((prev) => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
    // Remove o item do banco de dados
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId, userId }, { headers: { token } });
    }
  } else if (cartItems[itemId] > 1) {
    // Caso a quantidade seja maior que 1, apenas diminui
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    // Atualiza o banco de dados com a nova quantidade
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId, userId }, { headers: { token } });
    }
  }
};


  const removeTotalFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] = 0) }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return Math.round(totalAmount * 100) / 100;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      totalItems += cartItems[item];
    }
    return totalItems;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}});
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const ContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    removeTotalFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
