const initialState = {
  order: [],
  loading: false,

  notif: [],
  loadingNotif: false,

  dataOrder: [],
  loadingDataOrder: false,

  paymentStatus: [],
  loadingPaymentStatus: false,
};

const PaymentTrans = (state = initialState, action = {}) => {
  switch (action.type) {

    case 'REQUEST_UPDATE_ORDER':
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_ORDER":
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case "ERROR_UPDATE_ORDER":
      return {
        ...state,
        loading: false,
        order: [],
        error: action.payload
      };

    case 'NOTIF_NEW_ORDER_OPR':
      return {
        ...state,
        loadingNotif: true,
      };

    case "UPDATE_ORDER_OPR":
      return {
        ...state,
        loadingNotif: false,
        notif: action.payload,
      };

    case "ERROR_UPDATE_ORDER_OPR":
      return {
        ...state,
        loadingNotif: false,
        notif: [],
        error: action.payload
      };

    case 'REQUEST_GET_ORDER':
      return {
        ...state,
        loadingDataOrder: true,
      };

    case "GET_ORDER":
      return {
        ...state,
        loadingDataOrder: false,
        dataOrder: action.payload,
      };

    case "ERROR_GET_ORDER":
      return {
        ...state,
        loadingDataOrder: false,
        dataOrder: [],
        error: action.payload
      };

    default:
      return state;
  }
};
export default PaymentTrans;
