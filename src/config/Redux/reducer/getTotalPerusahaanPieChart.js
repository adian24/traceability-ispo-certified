const initialState = {
    data: [],
    loading: false,
  };
  
  const GetTotalPerusahaanPieChart = (state = initialState, action = {}) => {
    switch (action.type) {
      //get TOTALPERUSAHAAN
        case "TOTALPERUSAHAANPIECHART":
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
  export default GetTotalPerusahaanPieChart;
  