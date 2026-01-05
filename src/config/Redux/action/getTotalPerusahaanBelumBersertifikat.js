import Axios from "axios";
import { URIChart } from "../../../utils";

//get Total Perusahaan
export const TotalPerusahaanBelumBersertifikat = () => (dispatch) => {
  Axios.get(`${URIChart}/map-chart-total-perusahaan-belum-bersertifikat`)
  .then(result => {
      const ResponseAPI = result.data.data
    //   console.log('ResponseAPI',ResponseAPI)
      dispatch({type: 'TOTALPERUSAHAANBELUMBERSERTIFIKAT', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}



