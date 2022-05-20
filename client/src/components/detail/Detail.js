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
            alt="Loading..."
          />
        </div>
        <div className="content">
          <div className="nav">
            <span className="log">HENRY DOGS</span>
            <span></span>
          </div>
          <div className="content-body">
            <div className="pages">
              <span>01</span>
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
                    <h6>Loading...</h6>
                  )}
                </b>
              </span>
              <div className="move">
                <p>Weight: {detail[0] && detail[0].weight} (kg)</p>
                <p>Height: {detail[0] && detail[0].height} (cm)</p>
                <p>Years of life: {detail[0] && detail[0].life_span}</p>
              </div>
              <div className="prix">
                <span>
                  <b>{detail[0] && detail[0].temperament}</b>
                </span>
              </div>
              <Link to="/home">
                <button className="botons">Go back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detail;






