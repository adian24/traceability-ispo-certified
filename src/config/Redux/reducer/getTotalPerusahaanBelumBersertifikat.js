const initialState = {
    data: [],
    loading: false,
  };
  
  const GetTotalPerusahaanBelumBersertifikat = (state = initialState, action = {}) => {
    switch (action.type) {
      //get TOTALPERUSAHAAN
        case "TOTALPERUSAHAANBELUMBERSERTIFIKAT":
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
  export default GetTotalPerusahaanBelumBersertifikat;
  