import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ name, image, temperament, weight, id }) => {
  return (
    <div className="card__perfil" key={id}>
      <div className="card__nombre">
        <Link to={`/detail/${id}`}>
          <img className="imgc" src={image} alt="Loading" />
        </Link>
        <h2>{name}</h2>
        <p>{weight} (kg)</p>
      </div>
      <hr />
      <div className="card__description">
        <label>
          <strong>Temperaments</strong>
        </label>
        <p>{temperament ? temperament : "Temperament Not Found"}</p>
      </div>
      <hr />
      <div className="card__button">
        <a className="enlace" href={`/detail/${id}`}>
          More...
        </a>
      </div>
    </div>
  );
};

export default Card;
