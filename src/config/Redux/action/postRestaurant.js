import Axios from "axios";
import { URI_map_restaurant } from "../../../utils";
import Swal from "sweetalert2"

export const postRestaurantPlace = (fields) => (dispatch) => {
  Axios.post(`${URI_map_restaurant}`,fields)
  .then(result => {
      const ResponseAPI = result.data
    // console.log('ResponseAPI POST RESTAURANT PLACE', ResponseAPI.response)
      dispatch({type: 'POSTRESTAURANTPLACE', payload: ResponseAPI})
      if(ResponseAPI.response == "Berhasil menambahkan data.") {
        Swal.fire({
          icon: 'success',
          text: "'Successfully Added Data."
        }).then(() => {
          window.location.reload()
        })
      } else if (ResponseAPI.response == "<b>Nama Restaurant</b> sudah ada, Harap masukan <b>Nama</b> yang berbeda!."){
        Swal.fire({
          icon: 'error',
          text: "Restaurant Name Already Exists, Please Enter a Different Name !"
        })
      } else if(ResponseAPI.response == "Maksimal file size adalah 200 Kb.") {
        Swal.fire({
          icon: 'error',
          text: "File Size Max 200 Kb!"
        })
      }
  })
  .catch(err => {
      console.log('error: ', err)
  })
}