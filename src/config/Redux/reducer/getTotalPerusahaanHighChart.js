const initialState = {
    data: [],
    loading: false,
  };
  
  const GetTotalPerusahaanHighChart = (state = initialState, action = {}) => {
    switch (action.type) {
      //get TOTALPERUSAHAAN
        case "TOTALPERUSAHAANHIGHCHART":
          return {
            ...state,
            loading: false,
            data: action.payload,
          };
  
        // //search
        // case "SEARCHSPBU":
        //   return { 
        //     ...state, 
        //     loading: false, 
        //     data: action.payload 
        //   };
  
        default:
        return state;
    }
  };
  export default GetTotalPerusahaanHighChart;
  