import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getDogsByName,
  getTemperaments,
  getDogsByTemperament,
  filters
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
  }, []);

  const handleFilterByName = (e) => {
    e.preventDefault();
    dispatch(getDogsByName(name));
    setName('')
  };

  const handleFilterByTemperament = (e) => {
    e.preventDefault();
    dispatch(getDogsByTemperament(e.target.value));
    setCurrentPage(1);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filters(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <section className='sect'>
        <div className='box' >
          <input
            className='inp'
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name..."
            value={name}
          />
          <button className='but' onClick={(e) => handleFilterByName(e)}>Buscar</button>
        </div>
        <Link to='/form'><button className='butcrea'>Crear Dog</button></Link>
        <div className='fil'>
          <select
            className='selects'
            id='1'
            defaultValue="Seleccione Filtro:"
            onChange={(e) => handleFilter(e)}
          >
            <option selected disabled>Seleccione Filtro:</option>
            <option disabled>Por fuente</option>
              <option value="All">All</option>
              <option value="created">Db</option>
              <option value="api">Api</option>
            <option disabled>Alfabetico</option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            <option disabled>Por peso</option>
              <option value="ascp">Ascendente</option>
              <option value="descp">Descendente</option>
          </select>
        </div>
        <div className='filtemp'>
          <select className='selects' id='2' defaultValue="Seleccione Temperamento:" onChange={(e) => handleFilterByTemperament(e)}>
          <option selected disabled>Seleccione Temperamento:</option>
            {temperaments.map((temp) => (
              <option value={temp.temperament}>{temp.temperament}</option>
            ))}
          </select>
        </div>
      </section>
      <div className='paginationh' >
        {dogsAll.length > 8 ?
        <Pagination
          dogsAll={dogsAll.length}
          dogsPerPage={dogsPerPage}
          pagination={pagination}
        /> : null}
      </div>
      <div className="grid">
        {currentDogs &&
          currentDogs.map((dog) => (
            <Card
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
