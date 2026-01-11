import Axios from "axios";
import { URI_Lembaga_Sertifikasi } from "../../../utils";

//get Total Perusahaan
export const MasterLembagaSertifikat = () => (dispatch) => {
  // Axios.get('http://localhost:8080/api/map-chart-get-master-sertifikat')
  Axios.get(`${URI_Lembaga_Sertifikasi}`)
  .then(result => {
      const ResponseAPI = result.data.data
    //   console.log('ResponseAPI',ResponseAPI)
      dispatch({type: 'MASTERLEMBAGASERTIFIKAT', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}



