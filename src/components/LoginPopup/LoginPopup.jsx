import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext)

    const [currState, setcurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) =>{
        event.preventDefault()
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        }
        else{
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
           setToken(response.data.token);
           localStorage.setItem("token", response.data.token);
           setShowLogin(false);
        }
        else {
            alert(response.data.message);
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Seu Nome' required />}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Seu Email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Sua Senha" required />
            </div>
            <button type='submit'>{currState==="Cadastrar"?"Criar Conta":"Login"}</button>
            
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