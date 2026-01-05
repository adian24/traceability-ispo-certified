const initialState = {
    data: [],
    loading: false,
  };
  
  const GetCity = (state = initialState, action = {}) => {
    switch (action.type) {
      

        //get Kota
      case "GETCITY":
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
  
      default:
        return state;
    }
  };
  export default GetCity;
  