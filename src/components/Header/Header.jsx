import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>
          Comida boa, <br /> Entrega rápida!
        </h2>
        <p>
          Descubra sabores incríveis com nosso cardápio variado, preparado por
          chefs que entendem do assunto.
        </p>
        <a href="#explore-menu" className="explore-button">
          Explorar o Cardápio
        </a>
      </div>
    </div>
  );
};

export default Header;
