const initialState = {
    data: [],
    loading: false,
  };
  
  const GetProvince = (state = initialState, action = {}) => {
    switch (action.type) {
      //get province
      case "GETPROVINCE":
        return {
          ...state,
          loading: false,
          data: action.payload,
        };

        //get Kota
      case "GETCITY":
        return {
          ...state,
          loading: false,
          data: action.payload,
        };

        //get Kecamatan
      // case "GETDISTRICT":
      //   return {
      //     ...state,
      //     loading: false,
      //     data: action.payload,
      //   };
  
      default:
        return state;
    }
  };
  export default GetProvince;
  