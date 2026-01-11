import Axios from "axios";
import { URIChart } from "../../../utils";

//get Total Perusahaan
export const TotalPerusahaanPieChart = (fields) => (dispatch) => {
//   console.log('fields.id_provinsi',fields.id_provinsi)
//   console.log('fields.iso_id',fields.iso_id)
//   Axios.get(`http://localhost:8080/api/map-chart-total-perusahaan-perprovinsi?id_provinsi=${fields.id_provinsi}&iso_id=${fields.iso_id}`)
  Axios.get(`${URIChart}/map-chart-total-perusahaan-perprovinsi?id_provinsi=${fields.id_provinsi}&iso_id=${fields.iso_id}`)
  .then(result => {
      const ResponseAPI = result.data.data
      // console.log('ResponseAPI',ResponseAPI)
      dispatch({type: 'TOTALPERUSAHAANPIECHART', payload: ResponseAPI})
  })
  .catch(err => {
      console.log('error: ', err)
  })
}



