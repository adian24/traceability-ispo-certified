import Axios from "axios";
import { URI_Provinsi } from "../../../utils";
import { URIChart } from "../../../utils";


//get provinsi
export const getProvince = () => (dispatch) => {
  Axios.get(`${URI_Provinsi}`)
  .then(result => {
      const ResponseAPI = result.data.data
      // console.log('ResponseAPI get province',ResponseAPI)
      dispatch({type: 'GETPROVINCE', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}