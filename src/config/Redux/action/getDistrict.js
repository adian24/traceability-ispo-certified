import Axios from "axios";
import { URIChart } from "../../../utils";

// get kecamatan
export const getDistrict = (fields) => (dispatch) => {
  // console.log(fields.id_kota, 'API GET KECAMATAN')
  Axios.get(`${URIChart}/get-kec-asc/?id_kota=${fields.id_kota}`)
    .then((result) => {
      const ResponseAPI = result.data;
      // console.log("Response API GET KECAMATAN", ResponseAPI);
      dispatch({ type: "GETDISTRICT", payload: ResponseAPI });
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};