import React from "react";
import "./LandingPage.css";

function LandingPage() {
  return (
    <header>
      <div className="overlay">
        <nav>
          <div className="logo">Henry Dogs</div>
          <ul>
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/home">Dogs</a>
            </li>
            <li>
              <a href="/form">Crear Dog</a>
            </li>
          </ul>
        </nav>
        <div className="header-cont">
          <h2>Doggies</h2>
          <p>
            Esta es una app full stack de mascotas (perros), podras encontrar
            diversas razas e incluso registrar nuevas.
          </p>
          <a href="/home">Ingresar ahora</a>
        </div>
      </div>
    </header>
  );
}

export default LandingPage;
