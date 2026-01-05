import Axios from "axios";
import { URI, URISearch } from "../../../utils";

//get SPBU
export const FindSPBU = () => (dispatch) => {
  Axios.get(`${URI}?cmid=3`)
  .then(result => {
      const ResponseAPI = result.data.response
      dispatch({type: 'GETSPBU', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}


// filter
export const FilterSPBU = () => (dispatch) => {
  Axios.get(`${URI}?cmid=3&isoid=5`)
  .then(result => {
      const ResponseAPI = result.data.response
      dispatch({type: 'FILTERSPBU', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}


// search
export const SearchSPBU = (fields) => (dispatch) => {
  Axios.get(`${URISearch}?src=${fields.name}&cmid=3`)
  .then(result => {
      const ResponseAPI = result.data.response
      dispatch({type: 'SEARCHSPBU', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}

