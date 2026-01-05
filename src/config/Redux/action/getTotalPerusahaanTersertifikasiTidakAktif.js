import Axios from "axios";
import { getTotalPerusahaanPerprovinsi, URIChart } from "../../../utils";

//get Total Perusahaan Tersertifikasi Aktif
export const TotalPerusahaanTersertifikasiTidakAktif = () => (dispatch) => {
    Axios.get(`${URIChart}/map-chart-perusahaan-tersertifikasi-tidak-aktif?iso_id=10`)
    .then(result => {
        const ResponseAPI = result.data.data
        // console.log('ResponseAPI',ResponseAPI)
        dispatch({type: 'TOTALPERUSAHAANTERSERTIFIKASITIDAKAKTIF', payload: ResponseAPI})
    })
    .catch(err => {
        console.log('error: ', err)
    })
  }


