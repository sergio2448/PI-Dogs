import {
  GET_DOGS,
  GET_DOGS_BY_NAME,
  GET_DOGS_BY_ID,
  GET_TEMPERAMENTS,
  GET_DOGS_BY_TEMPERAMENT,
  FILTERS,
} from "../types";
import axios from "axios";

export function getDogs() {
  return async (dispatch) => {
    try {
      var json_r = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: GET_DOGS,
        payload: json_r.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getDogsByName(name) {
  return async (dispatch) => {
    try {
      var json_w = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispatch({
        type: GET_DOGS_BY_NAME,
        payload: json_w.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getDogsById(id) {
  return async (dispatch) => {
    try {
      let detail = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_DOGS_BY_ID,
        payload: detail.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getTemperaments() {
  return async (dispatch) => {
    try {
      var info = await axios("http://localhost:3001/temperament", {});
      return dispatch({ type: GET_TEMPERAMENTS, payload: info.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function postDog(payload) {
  return async () => {
    try {
      const response = await axios.post("http://localhost:3001/dog", payload);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getDogsByTemperament(temperament) {
  return async (dispatch) => {
    try {
      var json_f = await axios.get(
        `http://localhost:3001/filteredTemperament/${temperament}`
      );
      return dispatch({
        type: GET_DOGS_BY_TEMPERAMENT,
        payload: json_f.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function filters(payload) {
  return {
    type: FILTERS,
    payload,
  };
}
