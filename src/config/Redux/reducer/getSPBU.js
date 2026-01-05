const initialState = {
  data: [],
  loading: false,
};

const GetSPBU = (state = initialState, action = {}) => {
  switch (action.type) {
    //get SPBU
      case "GETSPBU":
        return {
          ...state,
          loading: false,
          data: action.payload,
        };

      //filter
      case "FILTERSPBU":
        return {
          ...state,
          loading: false,
          data: action.payload,
        };

      //search
      case "SEARCHSPBU":
        return { 
          ...state, 
          loading: false, 
          data: action.payload 
        };

      default:
      return state;
  }
};
export default GetSPBU;
