import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID, GET_TEMPERAMENTS, GET_DOGS_BY_TEMPERAMENT, FILTERS } from '../types';

const initialState = {
  dogs: [],
  alldogs: [],
  detail: [],
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        alldogs: action.payload,
        detail: []
      };
    case GET_DOGS_BY_TEMPERAMENT:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_DOGS_BY_ID:
      console.log('payload detail', action.payload);
      return {
        ...state,
        detail: action.payload,
      };
    case FILTERS:
      const createFilte =
        action.payload === "created"
          ? state.alldogs.filter((db) => db.createdInDb)
          : action.payload === "api"
          ? state.alldogs.filter((db) => !db.createdInDb)
          : action.payload === "All"
          ? state.alldogs
          : null ;

      const sortedAr =
        action.payload === "asc"
          ? state.alldogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === "desc" ?
          state.alldogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            }) : null;

      const dogsByMetric =
        action.payload === "descp"
          ? state.alldogs.sort((a, b) => {
              if (
                parseInt(a.weight.split(" - ").reverse().join("-")) -
                  parseInt(b.weight.split(" - ").reverse().join("-")) <
                0
              )
                return 1;
              else return -1;
            })
          : action.payload === "ascp" ?
          state.alldogs.sort((a, b) => {
              if (
                parseInt(a.weight.split(" - ").reverse().join("-")) -
                  parseInt(b.weight.split(" - ").reverse().join("-")) >
                0
              )
                return 1;
              else return -1;
            }) : null;
            const allFilter = createFilte ? createFilte : sortedAr ? sortedAr : dogsByMetric 
            return {
              ...state,
              dogs: allFilter
            }
    default:
      return state;
  }
};

export default rootReducer;
