const initialState = {
  data: [],
  loading: false,
};

const GetById = (state = initialState, action = {}) => {
  switch (action.type) {
    case "GETBYID":
      return {
        ...state,
        loading: false,
        isLogin: true,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default GetById;
