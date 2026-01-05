import { combineReducers } from "redux";
import GetPlace from "./getPlace";
import GetHotel from "./getHotel";
import GetSPBU from "./getSPBU";
import GetById from "./getById";
import GetCompany from "./getCompany";
import GetTotalPerusahaan from "./getTotalPerusahaan";
import GetTotalPerusahaanHighChart from "./getTotalPerusahaanHighChart";
import GetTotalPerusahaanPieChart from "./getTotalPerusahaanPieChart";
import GetMasterSertifikat from "./getMasterSertifikat";
import GetMasterLembagaSertifikat from "./getMasterLembagaSertifikat";
import GetMasterProvinsi from "./getMasterProvinsi";
// import GetTotalPerusahaanTersertifikasiAktif from "./getTotalPerusahaanTersertifikasiAktif";
// import GetTotalPerusahaanTersertifikasiTidakAktif from "./getTotalPerusahaanTersertifikasiTidakAktif";
// import GetTotalPerusahaanBelumBersertifikat from "./getTotalPerusahaanBelumBersertifikat";
import PostCompanyPlace from "./postCompany";
import EditCompanyPlace from "./editCompany";
import PostHotelPlace from "./postHotel";
import GetProvince from './getProvince';
import GetCity from './getCity';
import GetDistrict from './getDistrict';
import PaymentTrans from "./paymentTrans";
import GetOprByOprId from "./getOprByOprId";

const reducer = combineReducers({
  GetPlace,
  GetHotel,
  GetSPBU,
  GetById,
  GetCompany,
  GetTotalPerusahaan,
  GetTotalPerusahaanHighChart,
  GetTotalPerusahaanPieChart,
  GetMasterSertifikat,
  GetMasterLembagaSertifikat,
  GetMasterProvinsi,
  PostCompanyPlace,
  EditCompanyPlace,
  PostHotelPlace,
  GetProvince,
  GetCity,
  GetDistrict,
  PaymentTrans,
  GetOprByOprId
  // GetTotalPerusahaanTersertifikasiAktif,
  // GetTotalPerusahaanTersertifikasiTidakAktif,
  // GetTotalPerusahaanBelumBersertifikat,
});

export default reducer;
