import Axios from "axios";
import { URI_map_hotel } from "../../../utils";
import Swal from "sweetalert2"

export const postHotelPlace = (fields) => (dispatch) => {
  Axios.post(`${URI_map_hotel}`,fields)
  .then(result => {
      const ResponseAPI = result.data
    // console.log('ResponseAPI POST HOTEL PLACE', ResponseAPI.response)
      dispatch({type: 'POSTHOTELPLACE', payload: ResponseAPI})
      if(ResponseAPI.response == "Berhasil menambahkan data.") {
        Swal.fire({
          icon: 'success',
          text: "'Successfully Added Data."
        }).then(() => {
          window.location.reload()
        })
      } else if (ResponseAPI.response == "<b>Nama Hotel</b> sudah ada, Harap masukan <b>Nama</b> yang berbeda!."){
        Swal.fire({
          icon: 'error',
          text: "Hotel Name Already Exists, Please Enter a Different Name !"
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