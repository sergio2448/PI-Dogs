import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTemperaments, postDog } from "../../actions/index";
import './Form.css';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (!input.life_span) {
    errors.life_span = "Este campo es requerido";
  }
  return errors;
}

const Form = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    weight: "",
    height: "",
    temperament: "",
    life_span: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (true) {
      dispatch(postDog(input));
      alert("Perro creado con éxito");
      setInput({
        name: "",
        weight: "",
        height: "",
        temperament: "",
        life_span: "",
        image: "",
      });
      history("/home");
    }
  }

  console.log('inputTemperaments', input.temperament);
  console.log('input', input);

  return (
    <div>
      <form className='form-register' onSubmit={(e) => handleSubmit(e)}>
      <h1>Formulario de Registro</h1>
          <input
            className='controls'
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
            placeholder='Ingrese el Nombre'
          />
          {errors.name && <p>{errors.name}</p>}
          <input
            className='controls'
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
            placeholder='Ingrese la Imagen'
          />
          <input
            className='controls'
            type="text"
            value={input.height}
            name="height"
            onChange={handleChange}
            placeholder='Ingrese rango de Altura'
          />
          <input
            className='controls'
            type="text"
            value={input.weight}
            name="weight"
            onChange={handleChange}
            placeholder='Ingrese rango de Peso'
          />
          <input
            className='controls'
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={handleChange}
            placeholder='Ingrese Años de vida'
          />
        <p>Seleccione Temperamento</p>
        <select className='selects' onChange={(e) => handleSelect(e)}>
          {temperaments.map((temp) => (
            <option value={temp.temperament}>{temp.temperament}</option>
          ))}
        </select>
        <ul>
          <li>{input.temperament && input.temperament.map((e) => e + " ")}</li>
        </ul>

        <button className='botons' type="submit">Registrar</button>
        <Link to="/home">
          <button className='botons'>Volver</button>
        </Link>
        <p><a href="/form">Nuevo Registro</a></p>
      </form>
    </div>
  );
};

export default Form;