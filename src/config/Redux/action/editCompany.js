import Axios from "axios";
import { URI_map_company } from "../../../utils";
import Swal from "sweetalert2"

export const editCompanyPlace = (fields) => (dispatch) => {
  Axios.post(`${URI_map_company}`,fields)
  .then(result => {
      const ResponseAPI = result.data
    // console.log('ResponseAPI POST COMPANY PLACE', ResponseAPI.response)
      dispatch({type: 'EDITCOMPANYPLACE', payload: ResponseAPI})
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