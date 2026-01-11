import Axios from "axios";
import { URIChart } from "../../../utils";

//get Total Perusahaan
export const MasterSertifikat = () => (dispatch) => {
  // Axios.get('http://localhost:8080/api/map-chart-get-master-sertifikat')
  Axios.get(`${URIChart}/map-chart-get-master-sertifikat`)
  .then(result => {
      const ResponseAPI = result.data.data
    //   console.log('ResponseAPI',ResponseAPI)
      dispatch({type: 'MASTERSERTIFIKAT', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}



