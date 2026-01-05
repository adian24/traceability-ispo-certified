const initialState = {
    data: [],
    loading: false,
  };
  
  const GetMasterLembagaSertifikat = (state = initialState, action = {}) => {
    switch (action.type) {
      //get TOTALPERUSAHAAN
        case "MASTERLEMBAGASERTIFIKAT":
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
  export default GetMasterLembagaSertifikat;
  