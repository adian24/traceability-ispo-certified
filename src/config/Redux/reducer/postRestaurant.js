const initialState = {
    data: [],
    loading: false,
  };


  const PostRestaurantPlace = (state = initialState, action = {}) => {
    switch (action.type) {
        case "POSTRESTAURANTPLACE":
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
    
        default:
        return state;
    }
    };
    export default PostRestaurantPlace;