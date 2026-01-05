import Axios from "axios";
import { URI, URISearch } from "../../../utils";

//get all
export const FindCompany = () => (dispatch) => {
  Axios.get(`${URI}?cmid=4`)
  .then(result => {
      const ResponseAPI = result.data.response
      dispatch({type: 'GETCOMPANY', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}

//filter 
export const FilterCompany = (fields) => (dispatch) => {
  Axios.get(`${URI}?cmid=4&isoid=${fields.isoid}`)
  .then(result => {
      const ResponseAPI = result.data.response
      dispatch({type: 'FILTERCOMPANY', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}

//search
export const SearchCompany = (fields) => (dispatch) => {
  Axios.get(`${URISearch}?src=${fields.name}&cmid=4`)
  .then(result => {
      const ResponseAPI = result.data.response
      dispatch({type: 'SEARCHCOMPANY', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}

