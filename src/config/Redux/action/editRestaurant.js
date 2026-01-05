import Axios from "axios";
import { URI_map_restaurant } from "../../../utils";
import Swal from "sweetalert2"

export const editRestaurantPlace = (fields) => (dispatch) => {
  Axios.post(`${URI_map_restaurant}`,fields)
  .then(result => {
      const ResponseAPI = result.data
    // console.log('ResponseAPI POST RESTAURANT PLACE', ResponseAPI.response)
      dispatch({type: 'EDITRESTAURANTPLACE', payload: ResponseAPI})
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