const initialState = {
  
    dataOperator: [],
    loadingDataOperator: false,
  };
  
  const GetOprByOprID = (state = initialState, action = {}) => {
    switch (action.type) {
  
      case 'REQUEST_GET_OPR_BY_OPR_ID':
        return {
          ...state,
          loadingDataOperator: true,
        };
  
      case "GET_OPR_BY_OPR_ID":
        return {
          ...state,
          loadingDataOperator: false,
          dataOperator: action.payload,
        };
  
      case "ERROR_GET_OPR_BY_OPR_ID":
        return {
          ...state,
          loadingDataOperator: false,
          dataOperator: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  export default GetOprByOprID;
  