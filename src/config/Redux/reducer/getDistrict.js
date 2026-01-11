const initialState = {
  data: [],
  loading: false,
};

const GetDistrict = (state = initialState, action = {}) => {
  switch (action.type) {
    //get kecamatan
    case "GETDISTRICT":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};
export default GetDistrict;
