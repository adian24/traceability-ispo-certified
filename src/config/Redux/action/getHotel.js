import Axios from "axios";
import { URI, URISearch } from "../../../utils";

//get hotel
export const FindHotel = () => (dispatch) => {
  Axios.get(`${URI}?cmid=2`)
  .then(res => {
    dispatch({type: 'GETHOTEL', payload: res.data.response})
  })
  .catch((error) => console.log('err', error))
}


// filter
export const FilterHotel = () => (dispatch) => {
  Axios.get(`${URI}?cmid=2&isoid=9`)
  .then(res => {
    dispatch({type: 'FILTERHOTEL', payload: res.data.response})
  })
  .catch((error) => console.log('err', error))
}


// search
export const SearchHotel = (fields) => (dispatch) => {
  Axios.get(`${URISearch}?src=${fields.name}&cmid=2`)
  .then(res => {
    dispatch({type: 'SEARCHHOTEL', payload: res.data.response})
  })
  .catch((error) => console.log('err', error))
}
