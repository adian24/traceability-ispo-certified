const initialState = {
    data: [],
    loading: false,
  };


  const PostHotelPlace = (state = initialState, action = {}) => {
    switch (action.type) {
        case "POSTHOTELPLACE":
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
    
        default:
        return state;
    }
    };
    export default PostHotelPlace;