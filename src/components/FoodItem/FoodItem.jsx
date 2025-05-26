import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [loaded, setLoaded] = useState(false);

  // Verifica se cartItems está carregado corretamente
  if (!cartItems) return null;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <div className="food-item-img-wrapper">
          {!loaded && <div className="img-skeleton" />}
          <img
            src={url + "/images/" + image}
            alt=""
            className="food-item-img"
            style={{ display: loaded ? "block" : "none" }}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {!cartItems?.[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">R${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
