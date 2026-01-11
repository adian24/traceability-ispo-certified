const initialState = {
    data: [],
    loading: false,
    };


const EditHotelPlace = (state = initialState, action = {}) => {
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
    export default EditHotelPlace;