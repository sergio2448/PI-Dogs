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
  const dogsAll = useSelector((state) => state.alldogs);
  const dogs = useSelector((state) => state.alldogs);
  const temperaments = useSelector((state) => state.temperaments);
console.log('dogsAll', )
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
            placeholder="Name..."
            value={name}
          />
          <button className="but" onClick={(e) => handleFilterByName(e)}>
            Search
          </button>
        </div>

        <button className="but" style={{backgroundColor: '#037E8C', right: '-60px' }} onClick={(e) => handleFilterByName(e)}>
            Reset Filters
          </button>

        <Link to="/form">
          <button className="butcrea">Create Dog</button>
        </Link>
        <div className="fil">
          <select
            className="selects"
            id="1"
            defaultValue="Select Filter:"
            onChange={(e) => handleFilter(e)}
          >
            <option key='0' value="Select Filter:" disabled>
            Select Filter:
            </option>
            <option key='1' disabled>By source</option>
            <option key='2' value="All">All</option>
            <option key='3' value="created">Db</option>
            <option key='4' value="api">Api</option>
            <option key='5' disabled>Alphabetical</option>
            <option key='6' value="asc">A - Z</option>
            <option key='7' value="desc">Z - A</option>
            <option key='8' disabled>By weight</option>
            <option key='9' value="ascp">Upward</option>
            <option key='10' value="descp">Falling</option>
          </select>
        </div>
        <div className="filtemp">
          <select
            className="selects"
            id="2"
            defaultValue="Select Temper:"
            onChange={(e) => handleFilterByTemperament(e)}
          >
            <option key='dis' value="Select Temper:" disabled>
              Select Temper:
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
