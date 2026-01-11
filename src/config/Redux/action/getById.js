import Axios from "axios";
import { URI } from "../../../utils";


export const GetById = (fields) => (dispatch) => {
  Axios.get(`${URI}?mapid=${fields.map_id}`)
  .then(result => {
      const ResponseAPI = result.data.response[0]
      dispatch({type: 'GETBYID', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}

