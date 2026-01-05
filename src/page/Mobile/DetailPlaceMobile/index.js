import { useState, useEffect } from "react";
import { useMedia } from "use-media";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { Modal, Button } from "react-bootstrap";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/AddCircle";
import FlatList from "flatlist-react";
import Carousel from "react-elastic-carousel";
import { GetById } from "../../../config/Redux/action/getById";
import { Gap, MapDetail, useGeolocation } from "../../../component";
import "./detailPlaceMobile.css"
import Select from "react-select";
import { getProvince } from "../../../config/Redux/action/getProvince";
import { getCity } from "../../../config/Redux/action/getCity";
import { getDistrict } from "../../../config/Redux/action/getDistrict";
import { editCompanyPlace } from "../../../config/Redux/action/editCompany";
import { MasterLembagaSertifikat } from "../../../config/Redux/action/getMasterLembagaSertifikat";
import IconButton from "@mui/material/IconButton";
import moment from 'moment';

import MapPicker from "../../../component/molecule/MapPicker";
import noImage from '../../../assets/images/No_image_available.png';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  ISO,
  bg,
  mapsWhite,
  mapsGif,
  quote,
  person,
  labelmapLogo,
  cf1,
  cf2,
  cf3,
  cf4,
  partner,
  ispo,
  iso_13485,
  iso_45001,
  iso_14001,
  iso_22001,
  iso_9001,
  CHSE,
  halal,
  MapsLogin,
  gedung
} from "../../../assets";
const DetailPlaceMobile = (props) => {

  const { data }                                              = useSelector((state) => state.GetById);
  const { data: prov }                                        = useSelector((state) => state.GetProvince); //REDUCER PROVINSI
  const { data: city }                                        = useSelector((state) => state.GetCity); //REDUCER KOTA
  const { data: dist }                                        = useSelector((state) => state.GetDistrict); //REDUCER KECAMATAN
  const { data: master_sertifikat }                           = useSelector((state) => state.GetMasterSertifikat);
  const { data: master_ls }                                   = useSelector((state) => state.GetMasterLembagaSertifikat); //REDUCER LEMBAGA SERTIFIKASI
  const [modal, setModal]                                     = useState(false)
  const [detail, setDetail]                                   = useState("")
  const isMobile                                              = useMedia({ minWidth: "768px" })
  const dispatch                                              = useDispatch();
  const history                                               = useHistory();
  const location                                              = useGeolocation();
  const showDetail                                            = () => setDetail(!detail);
  const certificate                                           = data.certificate;
  const [showmodal, setShowModal]                             = useState(false);
  const handleCloseModal                                      = () => setShowModal(false);
  const [checked, setChecked]                                 = useState(false);
  const [valchecked, setValChecked]                           = useState();
  const [valcheckedFacility, setValcheckedFacility]           = useState();
  const [photoTemp, setPhotoTemp]                             = useState();
  const [title, setTitle]                                     = useState();
  const [desc, setDesc]                                       = useState();
  const [selectedOptionProv, setSelectedOptionProv]           = useState();
  const [selectedOptionCity, setSelectedOptionCity]           = useState();
  const [selectedOptionDist, setSelectedOptionDist]           = useState();
  const [selectedOptionProvLabel, setSelectedOptionProvLabel] = useState();
  const [selectedOptionCityLabel, setSelectedOptionCityLabel] = useState();
  const [selectedOptionDistLabel, setSelectedOptionDistLabel] = useState();
  const [selectedOptionLs, setSelectedOptionLs]               = useState("");
  const [address, setAddress]                                 = useState();
  const [duration, setDuration]                               = useState();
  const [website, setWebsite]                                 = useState();
  const [phone1, setPhone1]                                   = useState();
  const [phone2, setPhone2]                                   = useState();
  const [latitudeMap, SetLatitudeMap]                         = useState();
  const [longitudeMap, SetLongitudeMap]                       = useState();
  const [luas_kebun, setLuasKebun]                            = useState();
  const [luas_tertanam, setLuasTertanam]                      = useState();
  const [stok_kelapa_sawit, setStok]                          = useState();
  const [usia_tanaman, setUsiaTanaman]                        = useState();
  const [selectedImage, setSelectedImage]                     = useState();
  const [selectedImageCertFile, setSelectedImageCertFile]     = useState([]);
  let w = [];
  const [inputFields, setInputFields]                         = useState(certificate && certificate.length
                                                                          ? certificate.map(
                                                                              (i) => (
                                                                                // console.log("kook", i.certificate_file.slice(41)),
                                                                                // selectedImageCertFile.push(i.certificate_file),
                                                                                {
                                                                                  cert_name: i.certificate_name,
                                                                                  cert_year: i.certificate_date,
                                                                                  cert_iso: i.iso_id,
                                                                                  cert_file: i.certificate_file.slice(41),
                                                                                  cert_ls : i.id_ls

                                                                                }
                                                                              )
                                                                            )
                                                                          : [
                                                                              {
                                                                                cert_name: "",
                                                                                cert_year: "",
                                                                                cert_iso: "",
                                                                                cert_file: null,
                                                                                cert_ls: "",

                                                                              },
                                                                            ]
                                                                        );
  



  // measure distance between gps & location
  const lat1 = parseFloat(location.lat);
  const lon1 = parseFloat(location.lng);
  const lat2 = parseFloat(data.latitude);
  const lon2 = parseFloat(data.longitude);
  const R    = 6371e3; // earth radius in meter
  
  const φ1 = lat1 * (Math.PI / 180);
  const φ2 = lat2 * (Math.PI / 180);
  const Δφ = (lat2 - lat1) * (Math.PI / 180);
  const Δλ = (lon2 - lon1) * (Math.PI / 180);
  
  const a  =
  Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
  Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));
  
  const c        = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = parseInt((R * c) / 1000);
  const map_id   = props.match.params.map_id;

  useEffect(() => { 
    if (!modal) setModal(isMobile)
  }, [isMobile])

  // variable facilities
  const facility = (items) => {
    return (
      <div className="facility">
        <img alt="items" src={items} width={20} height={20} />
      </div>
    );
  };

  const handleShowModal = () => {
    
    setTitle(data.name)
    setDesc(data.body);
    setAddress(data.location);
    setDuration(data.duration);
    setWebsite(data.website);
    setPhone1(data.phone1);
    setPhone2(data.phone2);
    SetLatitudeMap(data.latitude);
    SetLongitudeMap(data.longitude);
    setLuasKebun(data.luas_kebun);
    setLuasTertanam(data.luas_tertanam);
    setStok(data.stok_kelapa_sawit);
    setValChecked(data.tipe_perusahaan);
    setUsiaTanaman(data.usia_tanaman);
    setSelectedOptionProv(data.id_provinsi);
    setSelectedOptionCity(data.id_kota);
    setSelectedOptionDist(data.id_kecamatan);
    setSelectedOptionProvLabel(data.nama_provinsi);
    setSelectedOptionCityLabel(data.nama_kota);
    setSelectedOptionDistLabel(data.nama_kecamatan);
    setPhotoTemp(data.photo)
    setValcheckedFacility(data.facility_id)
    
    setInputFields(certificate && certificate.length
                    ? certificate.map(
                        (i) => (
                          {
                            cert_name: i.certificate_name,
                            cert_year: i.certificate_date,
                            cert_iso: i.iso_id,
                            cert_file: i.certificate_file.slice(41),
                            cert_ls : i.id_ls,
                          }
                        )
                      )
                    : [
                        {
                          cert_name: "",
                          cert_year: "",
                          cert_iso: "",
                          cert_file: null,
                          cert_ls: "",
                        },
                      ]
                  );

    setShowModal(true);
  };

  // DYNAMIC FORM CERTIFICATE
  const handleSubmitDynamicForm = (e) => {
    e.preventDefault();
  };

  const handleChangeInput = (i, event) => {
    const newInputFields = inputFields.map((items) => {
      if (event.target.name == "cert_file") {
        setSelectedImageCertFile([
          ...selectedImageCertFile,
          event.target.files[0],
        ]);
      } else if (i == items) {
        items[event.target.name] = event.target.value;
      }
      return items;
    });
    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        cert_name: "",
        cert_year: "",
        cert_iso: "",
        cert_file: null,
        cert_ls: "",
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value === index),
      1
    );
    setInputFields(values);
  };

  // INTEGRATE API
  let p = photoTemp ? photoTemp.slice(41) : null;
  const saveChanges = () => {
    const form = new FormData();
    form.append("id", map_id);
    form.append("title", title);
    form.append("desc", desc);
    form.append("provinsi", selectedOptionProv);
    form.append("kota", selectedOptionCity);
    form.append("kecamatan", selectedOptionDist);
    form.append("address", address);
    form.append("website", website);
    form.append("duration", duration);
    form.append("phone1", phone1);
    form.append("phone2", phone2);
    form.append("latitude", latitudeMap);
    form.append("longitude", longitudeMap);
    form.append("luas_kebun", luas_kebun);
    form.append("luas_tertanam", luas_tertanam);
    form.append("stok_kelapa_sawit", stok_kelapa_sawit);
    form.append("usia_tanaman", usia_tanaman);
    // form.append("file", selectedImage ? selectedImage : p);
    form.append("tipe_perusahaan", valchecked);
    if (inputFields) {
      inputFields.forEach((x) => {
        // console.log("lail", x.cert_file);
        form.append("cert_name[]", x.cert_name);
        form.append("cert_year[]", x.cert_year);
        form.append("cert_iso[]", x.cert_iso);
        form.append("cert_ls[]", x.cert_ls);
        if (x.cert_file && x.cert_file.length) {
          form.append("cert_file[]", x.cert_file);
        } else {
          selectedImageCertFile.forEach((x) => {
            form.append("cert_file[]", x);
          });
        }
        form.append("cert_file", "dev-9001-1646801970.jpeg");
      });
    }
    valcheckedFacility &&
      valcheckedFacility.forEach((x) => {
        form.append("facility[]", x);
      });
    form.append("email_user_google", auth.currentUser.email)
    dispatch(editCompanyPlace(form));
    console.log("inputtttttttt", inputFields);
  }



  //CHECKBOX FACILITIES
  const facility_arr = [
    { id: 1, nama: "Wifi" },
    { id: 2, nama: "Toilet" },
    { id: 3, nama: "Tempat Parkir" },
    { id: 4, nama: "Mushola" },
  ];

  const handlecheckk = (event) => {
    let checked = event.target.checked;
    let value_checked = Number(event.target.value);
    if (checked == true) {
      setValcheckedFacility([...valcheckedFacility, value_checked]);
    }
  };

  //CHECKBOX ISPO CERTIFICATION
  const handlecheck = () => {
    setChecked(!checked);
    if (checked == true) {
      setValChecked(1);
    } else {
      setValChecked(0);
    }
  };

  //SELECT PROVINCE, CITY & DISTRIC
  useEffect(() => {
    dispatch(getProvince());
    dispatch(MasterLembagaSertifikat());
  }, []);

  const handleChangesProv = (e) => {
    dispatch(getProvince());
    setSelectedOptionProv(e.value);
    dispatch(getCity({ id_provinsi: e.value }));
    // console.log(`Option selected setSelectedOptionProv:`, e.value);
    // console.log(`Option selected:`, e.label);
  };

  const handleChangesCity = (e) => {
    setSelectedOptionCity(e.value);
    dispatch(getCity({ id_provinsi: selectedOptionProv }));
    dispatch(getDistrict({ id_kota: e.value }));
    dispatch(getProvince());
    // console.log("lolo", selectedOptionCity);
    // console.log(`Option selected handleChangesCity:`, selectedOptionProv);
  };

  const handleChangesDist = (e) => {
    setSelectedOptionDist(e.value);
    dispatch(getDistrict({ id_kota: selectedOptionCity }));
    // dispatch(getProvince());
    // dispatch(getCity({ id_provinsi: selectedOptionProv }));
    // console.log(`Option selected handleChangesDist:`, selectedOptionCity);
  };

  const handleChangesLs = (e) => {
    setSelectedOptionLs(e.value);
    dispatch(MasterLembagaSertifikat());
    // dispatch(getProvince());
    // dispatch(getCity({ id_provinsi: selectedOptionProv }));
    console.log(`Option selected handleChangesLs:`, e);
  };

  const options_select_prov = [];
  prov &&
    prov.map((value, i) => {
      options_select_prov.push({
        value: value.id_provinsi,
        label: value.nama_provinsi,
      });
    });

  const options_select_city = [];
  city &&
    city.map((value, i) => {
      options_select_city.push({
        value: value.id_kota,
        label: value.nama_kota,
      });
    });

  const options_select_dist = [];
  dist &&
    dist.map((value, i) => {
      options_select_dist.push({
        value: value.id_kecamatan,
        label: value.nama_kecamatan,
      });
    });

    //MASTER SERTIFIKAT
  const options_select_ls = [];
  master_ls &&
    master_ls.map((value, i) => {
      options_select_ls.push({
        value: value.id_ls,
        label: value.nama_ls,
      });
    });

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  // remove old photo
  const removeSelectedOldImage = () => {
    setPhotoTemp();
  };

  //HANDLE CLICK LATLONG OTOMATIS
  const handleLocationSelect = (latlng) => {
    SetLatitudeMap(latlng.lat);
    SetLongitudeMap(latlng.lng);
  };
  
  const auth                = getAuth();
  const [email, setEmail] = useState('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.email;
      setEmail(uid)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <>
      {/* <MapDetail map_id={data.map_id} /> */}
      <div className={detail? "hide-map" : "map"}>
        <div className="map-mobile">
          <MapDetail map_id={data.map_id} />
        </div>
        <div className="view-info">
          <div className="view-wrap" onClick={showDetail}>

            <img className="img-place-mobile" alt="detail" src={data.photo != '' ? data.photo : noImage} />
            <Gap height={5} />
            <h6 className="d-flex justify--start name-place">
              {data.name}
            </h6>
            
            <Gap height={3} />
            <div className="ml-2">
              <FlatList list={data.facility} renderItem={facility} />
            </div>
          </div>
        </div>
      </div>
      <div onClick={showDetail} className={detail ? "detail-active-company-mobile" : "map"}>
      
        <img className="img-place-detail" alt="detail" src={data.photo != '' ? data.photo : noImage} /> 

        <Gap height={10} />
        <h6 className="d-flex justify--start name-place">
          {data.name}
        </h6>

        <Gap height={5} />
        <div className="ml-2">
          <FlatList list={data.facility} renderItem={facility} />
        </div>

        <Gap height={5} />
        <h6 className="d-flex justify--start info-data">
          {data.body}
        </h6>
        
        <Gap height={5} />
        <div className="info-data" style={{ fontSize:'10px' }}><i className="fas fa-clock pr-2"></i> Last Update : {moment(data.cycle_date).format('dddd, MMMM Do, YYYY h:mm:ss A')} </div>

        <hr />

        <Scrollbars style={{ height: "55vh" }}>
        <h6 className="text-dark d-flex">
              {distance ? (
                <>
                  <i className="fas fa-map-pin icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    {`${distance} km from your location`}
                  </h6>
                </>
              ) : null}
            </h6>

            <h6 className="text-dark d-flex">
              {data.location ? (
                <>
                  <i className="fas fa-map-marker-alt icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    {data.location}
                  </h6>
                </>
              ) : 
              <>
                <i className="fas fa-map-marker-alt icon-data" />
                <h6 className="d-flex justify--start info-data">
                  -
                </h6>
              </>
              }
            </h6>

            <h6 className="text-dark d-flex">
              {data.website ? (
                <>
                  <i className="fas fa-globe icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    {data.website}
                  </h6>
                </>
              ) : 
              (
                <>
                  <i className="fas fa-globe icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    -
                  </h6>
                </>
              )
              }
            </h6>

            <h6 className="text-dark d-flex">
              {data.phone1 ? (
                <>
                  <i className="fas fa-phone-alt icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    {data.phone1}
                  </h6>
                </>
              ) : 
              <>
                <i className="fas fa-phone-alt icon-data" />
                <h6 className="d-flex justify--start info-data">
                  -
                </h6>
              </>
              }
            </h6>

            <h6 className="text-dark d-flex">
              {data.luas_kebun ? (
                <>
                  <i className="fas fa-tree icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    Garden Area : {data.luas_kebun}
                  </h6>
                </>
              ) : null}
            </h6>

            <h6 className="text-dark d-flex">
              {data.luas_tertanam ? (
                <>
                  <i className="fas fa-h-square icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    Planted Area : {data.luas_tertanam}
                  </h6>
                </>
              ) : null}
            </h6>

            <h6 className="text-dark d-flex">
              {data.stok_kelapa_sawit ? (
                <>
                  <i className="fas fa-cubes icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    {/* Available Stock : {data.stok_kelapa_sawit} */}
                    Produksi : {data.stok_kelapa_sawit}
                  </h6>
                </>
              ) : null}
            </h6>

            <h6 className="text-dark d-flex">
              {data.usia_tanaman ? (
                <>
                  <i className="fas fa-leaf icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    Plant Age : {data.usia_tanaman}
                  </h6>
                </>
              ) : null}
            </h6>

            <Gap height={10}/>

            {
              data.email_user_google == email ? (
                <>
                {/* Modal */}
                <a
                  className="d-flex"
                  style={{ cursor: "pointer" }}
                  onClick={handleShowModal}
                >
                  <i className="fas fa-edit icon-data mt-1" />
                  <div className="d-flex justify--start info-data">
                    Edit Detail Place
                  </div>
                </a>
                </> 
              ) : '' 
            }

            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              className="text-center"
              show={showmodal}
              onHide={handleCloseModal}
              animation={true}
              scrollable={true}
            >
              <Modal.Header closeButton>
                <div style={{ flexDirection: "column" }}>
                  <div className="d-flex justify--start">Edit Detail Place</div>
                  <div style={{ color: "grey", fontSize: 14 }}>{data.name}</div>
                </div>
              </Modal.Header>
              <Modal.Body
              style={{
                maxHeight: "calc(100vh - 210px)",
                overflowY: "auto",
              }}>

                {/* NAMA */}
                <div className="d-flex">
                  <i
                    className="fas fa-store-alt mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Name
                  </div>
                </div>
                <input
                  className="mt-1 input-field"
                  value={title}
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>

                {/* DESC */}
                <div className="d-flex mt-2">
                  <i
                    className="fas fa-file-alt mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Description
                  </div>
                </div>
                <textarea
                  value={desc}
                  className="mt-1 input-field"
                  name="paragraph_text"
                  cols="10"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>

                {/* PROVINSI */}
                <div className="d-flex mt-2">
                  <i
                    className="fas fa-map-pin mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Province
                  </div>
                </div>
                <Select
                  className="mt-1"
                  style={{ border: 1 }}
                  defaultValue={{ label: selectedOptionProvLabel, value: "" }}
                  value={selectedOptionProv ? selectedOptionProv.label : ""}
                  onChange={handleChangesProv}
                  options={options_select_prov}
                />

                 {/* KOTA/KABUPATEN */}
                 <div className="d-flex mt-2">
                  <i
                    className="fas fa-map-pin mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    City
                  </div>
                </div>
                <Select
                  className="mt-1"
                  defaultValue={{ label: selectedOptionCityLabel, value: "" }}
                  value={selectedOptionCity ? selectedOptionCity.label : ""}
                  onChange={handleChangesCity}
                  options={options_select_city}
                />

                {/* KECAMATAN */}
                <div className="d-flex mt-2">
                  <i
                    className="fas fa-map-pin mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    District
                  </div>
                </div>
                <Select
                  className="mt-1"
                  defaultValue={{
                    label: selectedOptionDistLabel,
                    value: selectedOptionDist,
                  }}
                  value={selectedOptionDist ? selectedOptionDist.label : ""}
                  onChange={handleChangesDist}
                  options={options_select_dist}
                />

                {/* ADDRESS */}
                <div className="d-flex mt-1">
                  <i
                    className="fas fa-map-marker-alt mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Address
                  </div>
                </div>
                <textarea
                  value={address}
                  className="mt-1 input-field"
                  name="paragraph_text"
                  cols="10"
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>

                {/* DURATION */}
                <div className="d-flex mt-2">
                  <i
                    className="far fa-clock mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Duration
                  </div>
                </div>
                <input
                  value={duration}
                  className="mt-1 input-field"
                  style={{
                    width: "100%",
                    outline: "none",
                  }}
                  type="text"
                  onChange={(e) => setDuration(e.target.value)}
                ></input>

                {/* WEBSITE */}
                <div className="d-flex mt-2">
                  <i
                    className="fas fa-globe-asia mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Website
                  </div>
                </div>
                <input
                  value={website}
                  className="mt-1 input-field"
                  style={{
                    width: "100%",
                    outline: "none",
                  }}
                  type="text"
                  onChange={(e) => setWebsite(e.target.value)}
                ></input>

                {/* PHONE */}
                <div className="d-flex mt-2">
                  <i
                    className="fas fa-phone mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Phone 1
                  </div>
                </div>
                <input
                  value={phone1}
                  className="mt-1 input-field"
                  type="text"
                  onChange={(e) => setPhone1(e.target.value)}
                ></input>

                {/* phone */}
                <div className="d-flex mt-2">
                  <i
                    className="fas fa-phone mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Phone 2
                  </div>
                </div>
                <input
                  value={phone2}
                  className="mt-1 input-field"
                  type="text"
                  onChange={(e) => setPhone2(e.target.value)}
                ></input>

                {/* Latitude */}
                <div className="row">
                  <div className="col-md-6">
                    <div
                      className="pt-4"
                      style={{ width: "100%", height: "200px" }}
                    >
                      <div
                        className="d-flex justify--start"
                        style={{ fontSize: 12, color: "grey" }}
                      >
                        Choose Latitude and Longitude
                      </div>
                      <MapPicker
                        center={[
                          latitudeMap ? parseFloat(latitudeMap) : parseFloat(location.lat),
                          longitudeMap ? parseFloat(longitudeMap) : parseFloat(location.lng)
                        ]}
                        onLocationSelect={handleLocationSelect}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-12 px-0 pt-3">
                      {/* Latitude */}
                      <div className="d-flex mt-3">
                        <i
                          className="fas fa-map-pin mt-1"
                          style={{ fontSize: 12, color: "grey" }}
                        />
                        <div
                          className="d-flex justify--start ml-2"
                          style={{ fontSize: 12, color: "grey" }}
                        >
                          Latitude <span class="ml-1 text-red">*</span>
                        </div>
                      </div>
                      <input
                        value={latitudeMap}
                        className="mt-1 input-field"
                        style={{
                          width: "100%",
                          outline: "none",
                        }}
                        type="text"
                        readOnly
                        onChange={(e) => SetLatitudeMap(e.target.value)}
                      ></input>
                    </div>
                    <div className="col-md-12 px-0 pt-3">
                      {/* Longitude */}
                      <div className="d-flex mt-3">
                        <i
                          className="fas fa-map-pin mt-1"
                          style={{ fontSize: 12, color: "grey" }}
                        />
                        <div
                          className="d-flex justify--start ml-2"
                          style={{ fontSize: 12, color: "grey" }}
                        >
                          Longitude <span class="ml-1 text-red">*</span>
                        </div>
                      </div>
                      <input
                        value={longitudeMap}
                        className="mt-1 input-field"
                        style={{
                          width: "100%",
                          outline: "none",
                        }}
                        type="text"
                        readOnly
                        onChange={(e) => SetLongitudeMap(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* PHOTO */}

                <div className="d-flex mt-5">
                  <i
                    className="fas fa-image mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Photo
                  </div>
                </div>

                <div className="mt-1 text-left">
                  <b>Place Picture</b>
                </div>

                <div className="mt-1 text-left">
                  {/* Tambahkan foto yang berguna, seperti etalase, pemberitahuan, atau penanda</span> */}
                  Add useful photos, such as storefronts, notifications, or
                  bookmarks
                </div>

                <div style={styles.container}>
                  <label for="file-upload" class="custom-file-upload">
                    <i class="fas fa-upload pr-2"></i> Upload Image
                  </label>
                  {/* <input id="file-upload" type="file"/> */}
                  <input
                    id="file-upload"
                    accept="image/*"
                    type="file"
                    onChange={imageChange}
                  />
                  {photoTemp && (
                    <div style={styles.preview}>
                      <img src={photoTemp} style={styles.image} alt="Thumb" />
                      <button
                        onClick={removeSelectedOldImage}
                        style={styles.delete}
                      >
                        Remove This Image
                      </button>
                    </div>
                  )}
                  {selectedImage && (
                    <div style={styles.preview}>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        style={styles.image}
                        alt="Thumb"
                      />
                      <button
                        onClick={removeSelectedImage}
                        style={styles.delete}
                      >
                        Remove This Image
                      </button>
                    </div>
                  )}
                </div>

                {/* PALM OIL COMPANY */}
                <div className="d-flex mb-2 mt-4">
                  <i
                    className="fas fa-certificate mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "black" }}
                  >
                    Palm Oil Company ?
                  </div>
                  <input
                    className="mt-1 ml-2"
                    name="isISPO"
                    type="checkbox"
                    label="Checkbox"
                    checked={valchecked == "1" ? true : false}
                    value={valchecked}
                    onChange={handlecheck}
                  />
                </div>

                {/* LUAS KEBUN */}
                <div
                  className={
                    valchecked == "1" ? "d-flex mt-2" : "d-flex mt-2 d-none"
                  }
                >
                  <i
                    className="fas fa-map-pin mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Garden Area
                  </div>
                </div>
                <input
                  value={luas_kebun}
                  className={
                    valchecked == "1"
                      ? "mt-1 input-field"
                      : "mt-1 input-field d-none"
                  }
                  type="text"
                  onChange={(e) => setLuasKebun(e.target.value)}
                ></input>

                {/* LUAS TERTANAM */}
                <div
                  className={
                    valchecked == "1" ? "d-flex mt-2" : "d-flex mt-2 d-none"
                  }
                >
                  <i
                    className="fas fa-map-pin mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Planted Area
                  </div>
                </div>
                <input
                  value={luas_tertanam}
                  className={
                    valchecked == "1"
                      ? "mt-1 input-field"
                      : "mt-1 input-field d-none"
                  }
                  type="text"
                  onChange={(e) => setLuasTertanam(e.target.value)}
                ></input>

                {/* Stok kelapa sawit */}
                <div
                  className={
                    valchecked == "1" ? "d-flex mt-2" : "d-flex mt-2 d-none"
                  }
                >
                  <i
                    className="fas fa-map-pin mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Available Stock
                  </div>
                </div>
                <input
                  value={stok_kelapa_sawit}
                  className={
                    valchecked == "1"
                      ? "mt-1 input-field"
                      : "mt-1 input-field d-none"
                  }
                  type="text"
                  onChange={(e) => setStok(e.target.value)}
                ></input>

                {/* Usia Tanaman */}
                <div
                  className={
                    valchecked == "1" ? "d-flex mt-2" : "d-flex mt-2 d-none"
                  }
                >
                  <i
                    className="fas fa-map-pin mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Plant Age
                  </div>
                </div>
                <input
                  value={usia_tanaman}
                  className={
                    valchecked == "1"
                      ? "mt-1 input-field"
                      : "mt-1 input-field d-none"
                  }
                  type="number"
                  onChange={(e) => setUsiaTanaman(e.target.value)}
                ></input>

                {/* certificate */}
                <div className="mt-4">
                  <div
                    className="row ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    Certificate
                  </div>
                  <div>
                    {/* <p>Certificate</p> */}
                    <form onSubmit={handleSubmitDynamicForm}>
                      {inputFields.map((inputField) => (
                        <div key={inputField} className="d-flex row pb-3">
                          <div className="col-md-10">
                            <div className="row">
                              <div className="col-md-6">
                                <input
                                  className="input-field px-3 ml-0 mr-2 my-2"
                                  name="cert_name"
                                  type="text"
                                  label="Certificate Name"
                                  placeholder={
                                    inputField.cert_name
                                      ? ""
                                      : "Certificate Name"
                                  }
                                  value={inputField.cert_name}
                                  onChange={(event) =>
                                    handleChangeInput(inputField, event)
                                  }
                                />
                              </div>

                              <div className="col-md-6 ">
                                <div
                                  for="certificateYear"
                                  className="d-flex input-field px-3 ml-0 mr-2 my-2"
                                >
                                  <p style={{ width: "70%", height: "30px" }}>
                                    {inputField.cert_year
                                      ? inputField.cert_year
                                      : "yyyy/mm/dd"}
                                  </p>
                                  <input
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      marginTop: 10,
                                      border: "none",
                                    }}
                                    className="col-4 pl-4"
                                    name="cert_year"
                                    id="certificateYear"
                                    // label="Validity Period"
                                    type="datetime-local"
                                    value={inputField.cert_year}
                                    onChange={(event) =>
                                      handleChangeInput(inputField, event)
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <select
                                  className="input-field-cert-iso px-3 ml-0 mr-2 my-2"
                                  name="cert_iso"
                                  id="cert_iso"
                                  onChange={(event) =>
                                    handleChangeInput(inputField, event)
                                  }
                                >
                                  {master_sertifikat &&
                                    master_sertifikat.map((e, i) => {
                                      if(inputField.cert_iso == e.iso_id){
                                        return(
                                          <option value={inputField.cert_iso} selected >
                                            {e.iso_name}
                                          </option>
                                        )
                                      }else{
                                        return(
                                          <option value={e.iso_id}>
                                            {e.iso_name}
                                          </option>
                                        )
                                      }
                                    })}
                                </select>
                              </div>
                              <div className="col-md-6  d-flex">
                                {/* <p>{inputField.cert_file}</p> */}
                                <img
                                  className="col-md-4 d-flex align-items-center my-4"
                                  // src={`https://assets.labelmaps.com/certificate/${inputField.cert_file}`}
                                  src={ISO}
                                  width={"100%"}
                                  height={30}
                                />
                                <input
                                  className="input-field-cert-file px-3 ml-0 mr-2 my-2 col-md-8"
                                  name="cert_file"
                                  id="file"
                                  label="Document"
                                  type="file"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(event) =>
                                    handleChangeInput(inputField, event)
                                  }
                                />
                              </div>
                            </div>

                            <div className="row">
                            <div className="col-md-12">
                              <select
                                  className="input-field-cert-ls px-3 ml-0 mr-2 my-2"
                                  name="cert_ls"
                                  id="cert_ls"
                                  value={inputField.cert_ls}
                                  onChange={event => handleChangeInput(inputField, event)}
                              >
                                <option hidden selected>
                                  Choose Certification Body
                                </option>
                                {/* {master_ls && master_ls.map((value, i) => {
                                  return <option value={value.id_ls}>{value.nama_ls}</option>
                                })} */}

                                  {master_ls &&
                                    master_ls.map((value, i) => {
                                      console.log(value.id_ls, 'id ls')
                                      console.log(value.cert_ls, 'cert ls')
                                      if(inputField.cert_ls == value.id_ls){
                                        return(
                                          <option
                                          value={inputField.cert_ls} selected >
                                            {value.nama_ls}
                                          </option>
                                        )
                                      }else{
                                        return(
                                          <option value={value.id_ls}>
                                            {value.nama_ls}
                                          </option>
                                        )
                                      }
                                    })}
                              </select>
                            </div> 
                          </div>
                          
                          </div>
                          <div
                            className="col-md-2"
                            style={{ alignItems: "center", display: "flex" }}
                          >
                            <IconButton
                              disabled={inputFields.length === 1}
                              onClick={() => handleRemoveFields(inputField)}
                            >
                              <RemoveIcon style={{ fontSize: "3ex" }} />
                            </IconButton>
                            <IconButton onClick={handleAddFields}>
                              <AddIcon style={{ fontSize: "3ex" }} />
                            </IconButton>
                          </div>
                        </div>
                      ))}
                    </form>
                  </div>
                </div>

                {/* facility */}
                <div className="d-flex mt-2">
                  <i
                    className="fas fa-cog mt-1"
                    style={{ fontSize: 12, color: "grey" }}
                  />
                  <div
                    className="d-flex justify--start ml-2"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                    facility
                  </div>
                </div>

                <div className="d-flex mt-2">
                  {facility_arr.map((value, i) => (
                    <>
                      <div
                        key={i}
                        className="d-flex justify--start ml-3"
                        style={{ fontSize: 13, color: "grey" }}
                      >
                        {value.nama}
                      </div>
                      {/* {valcheckedFacility.map((i) => { */}

                      <input
                        className="mt-1 ml-2"
                        name="facility[]"
                        type="checkbox"
                        label="facility"
                        value={value.id}
                        checked={
                          valcheckedFacility && valcheckedFacility.length
                            ? valcheckedFacility[0] == value.id ||
                              valcheckedFacility[1] == value.id ||
                              valcheckedFacility[2] == value.id ||
                              valcheckedFacility[3] == value.id
                              ? true
                              : false
                            : null
                        }
                        onChange={handlecheckk}
                      style={{ transform: 'scale(1.5)' }}

                      />
                    </>
                  ))}
                </div>
            
              </Modal.Body>


              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" 
                onClick={saveChanges}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <Gap height={20}/>

            {certificate && certificate.length ? (
              <Carousel>
              {certificate && certificate.length
                ? certificate.map((item) => {
                    return (
                      <div className="m-3">

                        <div className="row">
                          <a href={item.certificate_file} target="_blank">
                            <img
                              alt="detail certificate"
                              className="img-certificate"
                              src={item.certificate_file}
                            />
                          </a>
                        </div>
                        <div className="row">
                          <table className="table table-bordered pt-2 mt-2" style={{ fontSize:9 }}>
                            <thead>
                              <tr>
                                <th className="text-center" style={{ width:100 }}>Certificate Name</th>
                                <th className="text-center">Certificate Exp</th>
                                <th className="text-center">Certified By</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td><b>{item.certificate_name}</b></td>
                                <td><b>{item.certificate_date}</b></td>
                                <td><b>{item.nama_ls}</b></td>
                              </tr>
                            </tbody>
                          </table>
                          {/* <h6 className="text-dark mt-1 info-data">
                            {item.certificate_name}
                          </h6>
                          <p className="text-dark info-data mb-0">
                            {item.certificate_date}
                          </p>
                          <p className="text-dark info-data">
                            <span>Certified By : </span>
                            {item.nama_ls}
                          </p> */}
                        </div>

                      </div>
                    );
                  })
                : null}
            </Carousel>
              
            ) : null}
        </Scrollbars>
        <div onClick={showDetail} className="btn-close">
          <p className="title-close">Close</p>
        </div>
      </div>
    </>
  )

}

export default withRouter(DetailPlaceMobile)
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    paddingTop: 10,
  },
  preview: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
