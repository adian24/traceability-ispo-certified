const initialState = {
  data: [],
  loading: false,
};

const GetCompany = (state = initialState, action = {}) => {
  switch (action.type) {
    //get company
    case "GETCOMPANY":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    // filter
    case "FILTERCOMPANY":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
      
    //search
      case "SEARCHCOMPANY":
        return { 
          ...state, 
          loading: false, 
          data: action.payload 
        };

      default:
        return state;
  }
};
export default GetCompany;
