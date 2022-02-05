import axios from 'axios';

export function getDogs() {
  return async function (dispatch) {
    var json_r = await axios.get('http://localhost:3001/dogs');
    return dispatch({
      type: 'GET_DOGS',
      payload: json_r.data,
    });
  }
}

export function getDogsByName(name) {
  return async function(dispatch) {
    var json_w = await axios.get('http://localhost:3001/dogs?name=' + name);
    return dispatch({
      type: 'GET_DOGS_BY_NAME',
      payload: json_w.data,
    })
  }
}

export function getDogsById(id) {
  return async function(dispatch) {
    let detail = await axios.get(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: 'GET_DOGS_BY_ID',
      payload: detail.data,
    })
  }
}

export function getTemperaments() {
  return async function(dispatch) {
    var info = await axios('http://localhost:3001/temperament', {});
    return dispatch({ type: 'GET_TEMPERAMENTS', payload: info.data });
  }
}

export function postDog(payload) {
  return async function(dispatch) {
    const response = await axios.post('http://localhost:3001/dog', payload)
    return response;
  }
}

export function getDogsByTemperament(temperament) {
  return async function(dispatch) {
    var json_f = await axios.get(`http://localhost:3001/filteredTemperament/${temperament}`);
    return dispatch({
      type: 'GET_DOGS_BY_TEMPERAMENT',
      payload: json_f.data
    })
  }
}

export function filters(payload) {
  return {
    type: 'FILTERS',
    payload
  }
}