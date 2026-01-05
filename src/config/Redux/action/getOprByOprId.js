import axios from "axios";

export const getOprByOprId = (fields) => (dispatch) => {
    //loading
    // console.log("opr_id", fields.opr_id);
    dispatch({ type: "REQUEST_GET_OPR_BY_OPR_ID" });
    return axios({
        method: "GET",
        url: `https://api-pga.agrointernationalacademy.com/api/v1/operator/${fields.opr_id}`,
    })
    .then(function (response) {
      // console.log("response.data.data[0]", response.data.data[0]);
      dispatch({ type: "GET_OPR_BY_OPR_ID", payload: response.data.data[0] });
    })
    .catch(function (error) {
      dispatch({ type: "ERROR_GET_OPR_BY_OPR_ID", payload: error.response });
    });
};
