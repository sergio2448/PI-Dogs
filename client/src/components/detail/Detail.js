import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDogs, getDogsById } from "../../actions";
import "./Detail.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getDogsById(id));
    }, 800);
    dispatch(getDogs());
  }, [id, dispatch]);

  return (
    <main>
      <div className="container">
        <div className="cover">
          <img
            src={detail[0] && detail[0].image}
            width="500px"
            height="622.4px"
            alt="cargando..."
          />
        </div>
        <div className="content">
          <div className="nav">
            <span className="log">HENRY DOGS</span>
            <span></span>
          </div>
          <div className="content-body">
            <div className="pages">
              <span>
                <b>01</b>
              </span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
            </div>
            <div className="black-label">
              <span className="title">
                <b>
                  {detail[0] && detail[0].name ? (
                    <h6>{detail[0].name}</h6>
                  ) : (
                    <h6>Cargando...</h6>
                  )}
                </b>
              </span>
              <div className="move">
                <p>Peso: {detail[0] && detail[0].weight}</p>
                <p>Altura: {detail[0] && detail[0].height}</p>
                <p>Años de vida: {detail[0] && detail[0].life_span}</p>
              </div>
              <div className="prix">
                <span>
                  <b>{detail[0] && detail[0].temperament}</b>
                </span>
              </div>
              <Link to="/home">
                <button className="botons">Volver</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detail;






