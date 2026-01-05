import Axios from "axios";
import { URIChart } from "../../../utils";

//get Total Perusahaan
export const TotalPerusahaanHighChart = (fields) => (dispatch) => {
  // console.log('fields.iso_id HighChart',fields.iso_id)
  // Axios.get(`http://localhost:8080/api/map-chart-total-perusahaan-perprovinsi-all?iso_id=${fields.iso_id}`)
  Axios.get(`${URIChart}/map-chart-total-perusahaan-perprovinsi-all?iso_id=${fields.iso_id}`)
  .then(result => {
      const ResponseAPI = result.data.data
      // console.log('ResponseAPI',ResponseAPI)
      dispatch({type: 'TOTALPERUSAHAANHIGHCHART', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}



