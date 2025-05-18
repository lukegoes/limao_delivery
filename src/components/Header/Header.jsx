import React, { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const imagensDesktop = [
    '/header_img.png',
    '/header_img2.png',
    '/header_img3.png'
  ];

  const imagensMobile = [
    '/header_img1_mobile.png',
    '/header_img2_mobile.png',
    '/header_img3_mobile.png'
  ];

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const imagens = isMobile ? imagensMobile : imagensDesktop;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndiceAtual((prevIndex) => (prevIndex + 1) % imagens.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imagens]);

  const estiloHeader = {
    backgroundImage: `url('${imagens[indiceAtual]}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 0.5s ease-in-out',
  };

  return (
    <div className="header" style={estiloHeader}>
      <div className="header-contents">
        <h2>Comida boa, <br /> Entrega rápida!</h2>
        <p>Descubra sabores incríveis com nosso cardápio variado, preparado por chefs que entendem do assunto.</p>
        <button>Explorar o Cardápio</button>
      </div>
    </div>
  );
};

export default Header;
