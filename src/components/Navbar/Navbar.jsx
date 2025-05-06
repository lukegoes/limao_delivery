import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'

const Navbar = () => {

    const [menu, setMenu] = useState("home");


  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className='logo'/>
        <ul className='navbar-menu'>
            <li onClick={() => setMenu("home")} className={menu=== "home"?"active":""}>Home</li>
            <li onClick={() => setMenu("menu")} className={menu=== "menu"?"active":""}>Produtos</li>
            <li onClick={() => setMenu("app-mobile")} className={menu=== "app-mobile"?"active":""}>Aplicativo</li>
            <li onClick={() => setMenu("contato")} className={menu=== "contato"?"active":""}>Contato</li>
        </ul>
        <div className="navbar-direita">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className='dot'></div>
            </div>
            <button>Fazer Login</button>
        </div>
    </div>
  )
}

export default Navbar