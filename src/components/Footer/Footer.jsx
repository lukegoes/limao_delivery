import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
 
 return <div className="footer" id="footer">
    <div className="footer-content">
    
    <div className="footer-content-esquerda">
        <img className="footer-logo" src={assets.logo_dark} alt="" />
        <p>Se a vida te der Limão...</p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
        </div>
    </div>
    
    <div className="footer-content-centro">
        <h2>Empresarial</h2>
        <ul>
            <li>Home</li>
            <li>Sobre nós</li>
            <li>Delivery</li>
            <li>Política de privacidade</li>
        </ul>
    </div>
    
    <div className="footer-content-direita">
    <h2>Entre em Contato</h2>
    <ul>
        <li>(21) 91234</li>
        <li>contato@limao.com.br</li>
    </ul>
    </div>
    
    </div>

    <p className="footer-copyright">Copyright 2025 © Limão.com</p>
  </div>;
};

export default Footer;
