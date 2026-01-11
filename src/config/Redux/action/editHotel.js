import Axios from "axios";
import { URI_map_hotel } from "../../../utils";
import Swal from "sweetalert2"

export const editHotelPlace = (fields) => (dispatch) => {
  Axios.post(`${URI_map_hotel}`,fields)
  .then(result => {
      const ResponseAPI = result.data
    // console.log('ResponseAPI POST HOTEL PLACE', ResponseAPI.response)
      dispatch({type: 'EDITHOTELPLACE', payload: ResponseAPI})
      if(ResponseAPI.response == "Berhasil merubah data.") {
        Swal.fire({
          icon: 'success',
          text: "Successfully Edit Data."
        }).then(() => {
          window.location.reload()
        })
      }
  })
  .catch(err => {
      console.log('error: ', err)
  })
}