const initialState = {
  data: [],
  loading: false,
};

const GetHotel = (state = initialState, action = {}) => {
  switch (action.type) {
    //get hotel
      case "GETHOTEL":
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      //filter
      case "FILTERHOTEL":
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      //search
      case "SEARCHHOTEL":
        return { 
          ...state, 
          loading: false, 
          data: action.payload 
        };

      // // get resto 
      // case "GETPLACE":
      //   return {
      //     ...state,
      //     loading: false,
      //     data: action.payload,
      //   };
      // //filter
      // case "FILTERPLACE":
      //   return {
      //     ...state,
      //     loading: false,
      //     data: action.payload,
      //   };
      // //search
      // case "SEARCHRESTAURANT":
      //   return { 
      //     ...state, 
      //     loading: false, 
      //     data: action.payload 
      //   };

      // // get spbu
      // case "GETSPBU":
      //   return {
      //     ...state,
      //     loading: false,
      //     data: action.payload,
      //   };
      // //filter
      // case "FILTERSPBU":
      //   return {
      //     ...state,
      //     loading: false,
      //     data: action.payload,
      //   };      
      // //search
      // case "SEARCHSPBU":
      //   return { 
      //     ...state, 
      //     loading: false, 
      //     data: action.payload 
      //   };

      // // get company
      // case "GETCOMPANY":
      //   return {
      //     ...state,
      //     loading: false,
      //     data: action.payload,
      //   };
      // // filter
      // case "FILTERCOMPANY":
      //   return {
      //     ...state,
      //     loading: false,
      //     data: action.payload,
      //   };
      //   //search
      // case "SEARCHCOMPANY":
      //   return { 
      //     ...state, 
      //     loading: false, 
      //     data: action.payload 
      //   };

      default:
      return state;
  }
};
export default GetHotel;
