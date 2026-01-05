import Axios from "axios";
import { URI_Provinsi } from "../../../utils";
import { URIChart } from "../../../utils";

//get kota
export const getCity = (fields) => (dispatch) => {
  // console.log(fields.id_provinsi, 'GET KOTA')
  Axios.get(`${URIChart}/get-kota-asc/?id_provinsi=${fields.id_provinsi}`)
  .then(result => {
      const ResponseAPI = result.data
      // console.log('ResponseAPI GET KOTA',ResponseAPI)
      dispatch({type: 'GETCITY', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}