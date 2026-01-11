const initialState = {
    data: [],
    loading: false,
    };


const EditRestaurantPlace = (state = initialState, action = {}) => {
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
    export default EditRestaurantPlace;