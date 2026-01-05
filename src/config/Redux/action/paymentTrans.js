import axios from "axios";

export const UpdateOrder = (data) => (dispatch) => {
  //loading

  dispatch({ type: "REQUEST_UPDATE_ORDER" });
  return axios({
    method: "POST",
    url: "https://api-pga.agrointernationalacademy.com/api/v1/operator/update_status_trans_sudah_dibayar",
    data: data,
  })
    .then(function (response) {
      dispatch({ type: "UPDATE_ORDER", payload: response.data.setData });
    })
    .catch(function (error) {
      dispatch({ type: "ERROR_UPDATE_ORDER", payload: error.response });
    });
};

export const NotifNewOrderForOpr = (data) => (dispatch) => {
  //loading
  dispatch({ type: "NOTIF_NEW_ORDER_OPR" });
  return axios({
    method: "POST",
    url: "https://api-pga-cust.agrointernationalacademy.com/api/v1/customer/update_status_trans_sudah_dibayar",
    data: data,
  })
    .then(function (response) {
      dispatch({ type: "UPDATE_ORDER_OPR", payload: response.data.setData });
    })
    .catch(function (error) {
      dispatch({ type: "ERROR_UPDATE_ORDER_OPR", payload: error.response });
    });
};

export const orderByTransCode = (fields) => (dispatch) => {
  //loading
  dispatch({ type: "REQUEST_GET_ORDER" });
  return axios({
    method: "GET",
    url: `https://api-pga-cust.agrointernationalacademy.com/api/v1/customer/get_trans_by_trans_code/${fields.trans_code}`,
  })
    .then(function (response) {
      dispatch({ type: "GET_ORDER", payload: response.data.data[0] });
    })
    .catch(function (error) {
      dispatch({ type: "ERROR_GET_ORDER", payload: error.response });
    });
};
