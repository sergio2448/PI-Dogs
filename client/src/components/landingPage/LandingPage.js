import React from "react";
import "./LandingPage.css";

function LandingPage() {
  return (
      <header>
        <nav>
          <div className='logo'>Dogs</div>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/home">Dogs</a></li>
            <li><a href="/form">Crear Dog</a></li>
          </ul>
        </nav>
        <div className='header-cont'>
          <h2>Doggies</h2>
          <p>Aplicación sobre perritos</p>
          <a href="/home">Ingresar ahora</a>
        </div>
      </header>
  );
}

export default LandingPage;
