const initialState = {
    data: [],
    loading: false,
  };


  const PostCompanyPlace = (state = initialState, action = {}) => {
    switch (action.type) {
        case "POSTCOMPANYPLACE":
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
    
        default:
        return state;
    }
    };
    export default PostCompanyPlace;