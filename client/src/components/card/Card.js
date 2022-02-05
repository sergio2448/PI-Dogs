import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ name, image, temperament, weight, id }) => {
  return (
    <div className='card__perfil'>
      <div className='card__nombre'>
      <Link to={`/detail/${id}`}>
          <img className='imgc' src={image} /* width="312px" height="231px" */ alt="not found" />
        </Link>
        {/* <img className='imgc' src='https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/test-madurez_1.jpg' alt=''/> */}
        <h2>{name}</h2>
        <p>{weight}</p>
      </div>
      <hr/>
      <div className='card__description'>
        <p>{temperament}</p>
      </div>
      <hr/>
      <div className='card__button'>
        <a className='enlace' href={`/detail/${id}`}>Saber más</a>
      </div>
    </div>
    
  );
};

export default Card;

{/* <div className='card'>
      <div>
        <Link to={`/detail/${id}`}>
          <img src={image} width="312px" height="231px" alt="not found" />
        </Link>
      </div>
      <div className='textos'>
        <h3>{name}</h3>
        <h3>{temperament} </h3>
        <h3>{weight} </h3>
      </div>
    </div> */}