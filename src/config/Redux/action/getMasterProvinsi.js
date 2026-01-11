import Axios from "axios";
import { URIChart } from "../../../utils";

//get Total Perusahaan
export const MasterProvinsi = () => (dispatch) => {
//   Axios.get('http://localhost:8080/api/map-chart-get-provinsi')
  Axios.get(`${URIChart}/map-chart-get-provinsi-asc`)
  .then(result => {
      const ResponseAPI = result.data.data
    //   console.log('ResponseAPI',ResponseAPI)
      dispatch({type: 'MASTERPROVINSI', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}



