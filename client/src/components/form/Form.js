import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTemperaments, postDog } from "../../actions/index";
import "./Form.css";

const validate = (input) => {
  let errors = {};
  const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    image: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, // URL.
    height: /^\d+\s-\s\d+$/, // Numeros, espacios y guion.
    weight: /^\d+\s-\s\d+$/, // Numeros, espacios y guion.
    life_span: /^\d+\s-\s\d+$/, // Numeros, espacios y guion.
  };
  if (!expresiones.name.test(input.name)) {
    errors.name = "No se admiten números ni caracteres especiales";
  } else if (!expresiones.image.test(input.image)) {
    errors.image = "URL no válida";
  } else if (!expresiones.height.test(input.height)) {
    errors.height = "Formato no válido, ejemplo: (12 - 17)";
  } else if (
    parseInt(input.height.split(" - ").reverse()) -
      parseInt(input.height.split(" - ")) <=
    0
  ) {
    errors.height = "El formato es: min - max";
  } else if (!expresiones.weight.test(input.weight)) {
    errors.weight = "Formato no válido, ejemplo: (12 - 17)";
  } else if (
    parseInt(input.weight.split(" - ").reverse()) -
      parseInt(input.weight.split(" - ")) <=
    0
  ) {
    errors.weight = "El formato es: min - max";
  } else if (!expresiones.life_span.test(input.life_span)) {
    errors.life_span = "Formato no válido, ejemplo: (12 - 17)";
  } else if (
    parseInt(input.life_span.split(" - ").reverse()) -
      parseInt(input.life_span.split(" - ")) <=
    0
  ) {
    errors.life_span = "El formato es: min - max";
  }
  return errors;
};

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
    if (!errors) {
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
    } else {
      alert("Respuesta no válida")
      setErrors({});
      setInput({
        name: "",
        weight: "",
        height: "",
        temperament: "",
        life_span: "",
        image: "",
      });
    }
  }

  return (
    <div>
      <form className="form-register" onSubmit={(e) => handleSubmit(e)}>
        <h1>Formulario de Registro</h1>
        <input
          className="controls"
          type="text"
          value={input.name}
          name="name"
          onChange={handleChange}
          placeholder="Ingrese el Nombre"
        />
        {errors.name && <p>{errors.name}</p>}
        <input
          className="controls"
          type="text"
          value={input.image}
          name="image"
          onChange={handleChange}
          placeholder="Ingrese la Imagen"
        />
        {errors.image && <p>{errors.image}</p>}
        <input
          className="controls"
          type="text"
          value={input.height}
          name="height"
          onChange={handleChange}
          placeholder="Ingrese rango de Altura"
        />
        {errors.height && <p>{errors.height}</p>}
        <input
          className="controls"
          type="text"
          value={input.weight}
          name="weight"
          onChange={handleChange}
          placeholder="Ingrese rango de Peso"
        />
        {errors.weight && <p>{errors.weight}</p>}
        <input
          className="controls"
          type="text"
          value={input.life_span}
          name="life_span"
          onChange={handleChange}
          placeholder="Ingrese Años de vida"
        />
        {errors.life_span && <p>{errors.life_span}</p>}
        <p>Seleccione Temperamento</p>
        <select className="selects" onChange={(e) => handleSelect(e)}>
          {temperaments.map((temp) => (
            <option value={temp.temperament}>{temp.temperament}</option>
          ))}
        </select>
        <ul>
          <li>{input.temperament && input.temperament.map((e) => e + " ")}</li>
        </ul>

        <button className="botons" type="submit">
          Registrar
        </button>
        <Link to="/home">
          <button className="botons">Volver</button>
        </Link>
        <p>
          <a href="/form">Nuevo Registro</a>
        </p>
      </form>
    </div>
  );
};

export default Form;
