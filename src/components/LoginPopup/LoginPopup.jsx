import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets';

const LoginPopup = ({setShowLogin}) => {

    const [currState, setcurrState] = useState("Login");


  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input type="text" placeholder='Seu Nome' required />}
                <input type="email" placeholder='Seu Email' required />
                <input type="password" placeholder="Sua Senha" required />
            </div>
            <button>{currState==="Cadastrar"?"Criar Conta":"Login"}</button>
            
            {currState==="Cadastrar"?<div className="login-popup-condition">
                <input type="checkbox" required />
                <p>Ao continuar, você concorda com os Termos de uso e Política de privacidade</p>
            </div>:<div className="login-popup-condition2"><p>Esqueceu a senha?<span> Recuperar Senha</span></p></div>}
            
            {currState==="Login"?
            <p>Criar uma nova conta?<span onClick={()=>setcurrState("Cadastrar")}> Clique aqui</span></p>:
            <p>Já tem uma conta?<span onClick={()=>setcurrState("Login")}> Fazer Login</span></p>}            
        </form>
    </div>
  )
}

export default LoginPopup