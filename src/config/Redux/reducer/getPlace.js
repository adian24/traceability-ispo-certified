const initialState = {
  data: [],
  loading: false,
};

const GetPlace = (state = initialState, action = {}) => {
  switch (action.type) {
    //get place
    case "GETPLACE":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

      //filter
    case "FILTERPLACE":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

      //search
      case "SEARCHPLACE":
        return { 
          ...state, 
          loading: false, 
          data: action.payload 
        };

    default:
      return state;
  }
};
export default GetPlace;
