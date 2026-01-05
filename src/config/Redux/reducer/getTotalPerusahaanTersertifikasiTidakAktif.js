const initialState = {
    data: [],
    loading: false,
  };
  
  const GetTotalPerusahaanTersertifikasiTidakAktif = (state = initialState, action = {}) => {
    switch (action.type) {
        // //TOTALPERUSAHAAN
        case "TOTALPERUSAHAANTERSERTIFIKASITIDAKAKTIF":
          return {
            ...state,
            loading: false,
            data: action.payload,
          };
  
        default:
        return state;
    }
  };
  export default GetTotalPerusahaanTersertifikasiTidakAktif;
  