const initialState = {
    data: [],
    loading: false,
  };
  
  const GetTotalPerusahaanTersertifikasiAktif = (state = initialState, action = {}) => {
    switch (action.type) {
        // //TOTALPERUSAHAAN
        case "TOTALPERUSAHAANTERSERTIFIKASIAKTIF":
          return {
            ...state,
            loading: false,
            data: action.payload,
          };
  
        default:
        return state;
    }
  };
  export default GetTotalPerusahaanTersertifikasiAktif;
  