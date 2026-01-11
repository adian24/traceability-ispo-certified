const initialState = {
    data: [],
    loading: false,
  };
  
  const GetMasterSertifikat = (state = initialState, action = {}) => {
    switch (action.type) {
      //get TOTALPERUSAHAAN
        case "MASTERSERTIFIKAT":
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
  export default GetMasterSertifikat;
  