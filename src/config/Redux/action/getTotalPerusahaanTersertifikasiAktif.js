import Axios from "axios";
import { getTotalPerusahaanPerprovinsi, URIChart } from "../../../utils";

//get Total Perusahaan Tersertifikasi Aktif
export const TotalPerusahaanTersertifikasiAktif = () => (dispatch) => {
    Axios.get(`${URIChart}/map-chart-perusahaan-tersertifikasi-aktif?iso_id=10`)
    .then(result => {
        const ResponseAPI = result.data.data
        // console.log('ResponseAPI',ResponseAPI)
        dispatch({type: 'TOTALPERUSAHAANTERSERTIFIKASIAKTIF', payload: ResponseAPI})
    })
    .catch(err => {
        console.log('error: ', err)
    })
  }


