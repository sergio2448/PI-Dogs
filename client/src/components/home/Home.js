import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getDogsByName,
  getTemperaments,
  getDogsByTemperament,
  filters,
} from "../../actions";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const dogsAll = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogsAll.slice(indexOfFirstDog, indexOfLastDog);
  const [name, setName] = useState("");
  const [orden, setOrden] = useState("");

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleFilterByName = (e) => {
    e.preventDefault();
    dispatch(getDogsByName(name));
    setName("");
  };

  const handleFilterByTemperament = (e) => {
    e.preventDefault();
    dispatch(getDogsByTemperament(e.target.value));
    setCurrentPage(1);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filters(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };

  return (
    <div>
      <section className="sect">
        <div className="box">
          <input
            className="inp"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Nombre..."
            value={name}
          />
          <button className="but" onClick={(e) => handleFilterByName(e)}>
            Buscar
          </button>
        </div>
        <Link to="/form">
          <button className="butcrea">Crear Dog</button>
        </Link>
        <div className="fil">
          <select
            className="selects"
            id="1"
            defaultValue="Seleccione Filtro:"
            onChange={(e) => handleFilter(e)}
          >
            <option key='0' value="Seleccione Filtro:" disabled>
              Seleccione Filtro:
            </option>
            <option key='1' disabled>Por fuente</option>
            <option key='2' value="All">All</option>
            <option key='3' value="created">Db</option>
            <option key='4' value="api">Api</option>
            <option key='5' disabled>Alfabetico</option>
            <option key='6' value="asc">A - Z</option>
            <option key='7' value="desc">Z - A</option>
            <option key='8' disabled>Por peso</option>
            <option key='9' value="ascp">Ascendente</option>
            <option key='10' value="descp">Descendente</option>
          </select>
        </div>
        <div className="filtemp">
          <select
            className="selects"
            id="2"
            defaultValue="Seleccione Temperamento:"
            onChange={(e) => handleFilterByTemperament(e)}
          >
            <option key='dis' value="Seleccione Temperamento:" disabled>
              Seleccione Temperamento:
            </option>
            {temperaments.map((temp, index) => (
              <option key={index} value={temp.temperament}>{temp.temperament}</option>
            ))}
          </select>
        </div>
      </section>
      <div className="paginationh">
        {dogsAll.length > 8 ? (
          <Pagination
            dogsAll={dogsAll.length}
            dogsPerPage={dogsPerPage}
            pagination={pagination}
          />
        ) : null}
      </div>
      <div className="grid">
        {currentDogs &&
          currentDogs.map((dog, index) => (
            <Card
              key={index}
              name={dog.name}
              image={dog.image}
              temperament={dog.temperament}
              weight={dog.weight}
              id={dog.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
