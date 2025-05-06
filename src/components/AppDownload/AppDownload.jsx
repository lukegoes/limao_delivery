import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
    <p>Faça o download do <br/>App Limão Delivery</p>
    <div className='app-download-platforms'>
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
    </div>
    </div>
  )
}

export default AppDownload