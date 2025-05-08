import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");


  return (
    <div className='navbar'>
        <Link to="/"><img src={assets.logo} alt="" className='logo'/></Link>
        <ul className='navbar-menu'>
            <Link to={"/"} onClick={() => setMenu("home")} className={menu=== "home"?"active":""}>Home</Link>
            <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu=== "menu"?"active":""}>Produtos</a>
            <a href="#app-download" onClick={() => setMenu("app-mobile")} className={menu=== "app-mobile"?"active":""}>Aplicativo</a>
            <a href="#footer" onClick={() => setMenu("contato")} className={menu=== "contato"?"active":""}>Contato</a>
        </ul>
        <div className="navbar-direita">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to="/carrinho"><img src={assets.basket_icon} alt="" /></Link>
                <div className='dot'></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>Fazer Login</button>
        </div>
    </div>
  )
}

export default Navbar