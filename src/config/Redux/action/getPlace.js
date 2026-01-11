import Axios from "axios";
import { URI, URISearch } from "../../../utils";

//get place
export const FindPlace = () => (dispatch) => {
  Axios.get(`${URI}?cmid=1`)
  .then(res => {
    dispatch({type: 'GETPLACE', payload: res.data.response})
  })
  .catch((error) => console.log('err', error))
}

//filter
export const FilterPlace = () => (dispatch) => {
  Axios.get(`${URI}?cmid=1&isoid=4`)
  .then(res => {
    dispatch({type: 'FILTERPLACE', payload: res.data.response})
  })
  .catch((error) => console.log('err', error))
}

//search
export const SearchPlace = (fields) => (dispatch) => {
  Axios.get(`${URISearch}?src=${fields.name}&cmid=1`)
  .then(res => {
    dispatch({type: 'SEARCHPLACE', payload: res.data.response})
  })
  .catch((error) => console.log('err', error))
}
