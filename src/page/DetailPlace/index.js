import { useState, useEffect, useRef } from "react";
import { useMedia } from "use-media";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FlatList from "flatlist-react";
import { Modal, Button } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import { Scrollbars } from "react-custom-scrollbars";
import { useHistory } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MapDetail, Navbar, useGeolocation, DivRute, CategoryBar } from "../../component";
import { Gap } from "../../component/atom";
import "./detailPlace.css";
import { GetById } from "../../config/Redux/action/getById";
import Select from "react-select";
import { getProvince } from "../../config/Redux/action/getProvince";
import { getCity } from "../../config/Redux/action/getCity";
import { getDistrict } from "../../config/Redux/action/getDistrict";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/AddCircle";
import Icon from "@mui/material/Icon";
import { editCompanyPlace } from "../../config/Redux/action/editCompany";
import { editHotelPlace } from "../../config/Redux/action/editHotel";
import { editRestaurantPlace } from "../../config/Redux/action/editRestaurant";
import { MasterLembagaSertifikat } from "../../config/Redux/action/getMasterLembagaSertifikat";
import moment from 'moment'
import noImage from '../../assets/images/No_image_available.png';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import {
  ISO,
  bg,
  mapsWhite,
  mapsGif,
  quote,
  person,
  ikonsawit,
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
} from "../../assets";
import MapPicker from "../../component/molecule/MapPicker";

const DetailPlace = (props) => {

  const { data }                                              = useSelector((state) => state.GetById);
  // console.log(data)
  const { data: prov }                                        = useSelector((state) => state.GetProvince); //REDUCER PROVINSI
  const { data: city }                                        = useSelector((state) => state.GetCity); //REDUCER KOTA
  const { data: dist }                                        = useSelector((state) => state.GetDistrict); //REDUCER KECAMATAN
  const { data: postCompany }                                 = useSelector((state) => state.PostCompanyPlace); //REDUCER POST COMPANY PLACE
  const { data: master_sertifikat }                           = useSelector((state) => state.GetMasterSertifikat);
  const { data: master_ls }                                   = useSelector((state) => state.GetMasterLembagaSertifikat); //REDUCER LEMBAGA SERTIFIKASI

  const certificate                                           = data.certificate;
  const [show, setShow]                                       = useState(false);
  const [modal, setModal]                                     = useState(false);
  const [showmodal, setShowModal]                             = useState(false);
  const handleCloseModal                                      = () => setShowModal(false);
  const [checked, setChecked]                                 = useState(false);
  const [title, setTitle]                                     = useState();
  const [desc, setDesc]                                       = useState();
  const [address, setAddress]                                 = useState();
  const [duration, setDuration]                               = useState();
  const [website, setWebsite]                                 = useState();
  const [phone1, setPhone1]                                   = useState();
  const [phone2, setPhone2]                                   = useState();
  const [latitude, setLatitude]                               = useState();
  const [longitude, setLongitude]                             = useState();
  const [latitudeMap, SetLatitudeMap]                         = useState();
  const [longitudeMap, SetLongitudeMap]                       = useState();
  const [luas_kebun, setLuasKebun]                            = useState();
  const [luas_tertanam, setLuasTertanam]                      = useState();
  const [stok_kelapa_sawit, setStok]                          = useState();
  const [valchecked, setValChecked]                           = useState();
  const [usia_tanaman, setUsiaTanaman]                        = useState();
  const [selectedOptionProv, setSelectedOptionProv]           = useState();
  const [selectedOptionCity, setSelectedOptionCity]           = useState();
  const [selectedOptionDist, setSelectedOptionDist]           = useState();
  const [selectedOptionProvLabel, setSelectedOptionProvLabel] = useState();
  const [selectedOptionLs, setSelectedOptionLs]               = useState("");
  const [selectedOptionCityLabel, setSelectedOptionCityLabel] = useState();
  const [selectedOptionDistLabel, setSelectedOptionDistLabel] = useState();
  const [photoTemp, setPhotoTemp]                             = useState();
  const [selectedImage, setSelectedImage]                     = useState();
  const [valcheckedFacility, setValcheckedFacility]           = useState();
  const [selectedImageCertFile, setSelectedImageCertFile]     = useState([]);
  const [imageCertOld, setImageCertOld]                       = useState([]);
  let w = [];
  const [inputFields, setInputFields]                         = useState(certificate && certificate.length
                                                                          ? certificate.map(
                                                                              (i) => (
                                                                                // console.log("isinyaaa", i.nama_ls),
                                                                                // selectedImageCertFile.push(i.certificate_file),
                                                                                {
                                                                                  cert_name: i.certificate_name,
                                                                                  cert_year: i.certificate_date,
                                                                                  cert_iso: i.iso_id,
                                                                                  // cert_file: i.certificate_file.slice(41),
                                                                                  cert_ls:  i.id_ls,
                                                                                  cert_file_old: i.certificate_file.slice(41)

                                                                                }
                                                                              )
                                                                            )
                                                                          : [
                                                                              {
                                                                                cert_name: "",
                                                                                cert_year: "",
                                                                                cert_iso: "",
                                                                                // cert_file: null,
                                                                                cert_ls: "",
                                                                                cert_file_old: ""
                                                                              },
                                                                            ]
                                                                        );
  const dispatch                                              = useDispatch();
  const location                                              = useGeolocation();
  const history                                               = useHistory();
  const handleClose                                           = () => setShow(false);
  const handleShow                                            = () => setShow(true);
  const mobileView                                            = useMedia({ maxWidth: "767px" });

  // MEASURE DISTANCE BETWEEN GPS & LOCATION
  const lat1 = parseFloat(location.lat);
  const lon1 = parseFloat(location.lng);
  const lat2 = parseFloat(data.latitude);
  const lon2 = parseFloat(data.longitude);
  const R = 6371e3; // earth radius in meter

  const φ1 = lat1 * (Math.PI / 180);
  const φ2 = lat2 * (Math.PI / 180);
  const Δφ = (lat2 - lat1) * (Math.PI / 180);
  const Δλ = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = parseInt((R * c) / 1000);
  const map_id = props.match.params.map_id;

  //GET DATA BY ID & MOBILE RESPONSIVE
  useEffect(() => {
    dispatch(
      GetById({
        map_id: props.match.params.map_id,
      })
    );
    if (window.innerWidth <= 767)
      return history.replace(`/m/detail_place/${props.match.params.map_id}`);
  }, []);

  useEffect(() => {
    if (!modal) setModal(mobileView);
  }, [mobileView]);

  console.log('data.catmap_id', data.catmap_id)
  //SHOW POPUP EDIT
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
    setSelectedImageCertFile([])
    setInputFields(certificate && certificate.length
                    ? certificate.map(
                        (i) => (
                          {
                            cert_name: i.certificate_name,
                            cert_year: i.certificate_date,
                            cert_iso: i.iso_id,
                            // cert_file: i.certificate_file.slice(41),
                            cert_ls : i.id_ls,
                            cert_file_old: i.certificate_file.slice(41),
                          }
                        )
                      )
                    : [
                        {
                          cert_name: "",
                          cert_year: "",
                          cert_iso: "",
                          // cert_file: null,
                          cert_ls: "",
                          cert_file_old:"",
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

    const newInputFields = inputFields.map((items, key) => {

      let cert_file = new File([""], "", {type: "text/plain"});

      if (i == items) {
        if(event.target.name == 'cert_file'){

          cert_file = event.target.files[0]
          items[event.target.name] = cert_file;

        }else{
          items[event.target.name] = event.target.value;
          cert_file = new File([""], "", {type: "text/plain"});
        }

      }
      return {cert_file,...items};

    });

    setInputFields(newInputFields);
    // console.log(newInputFields,'neww inputtttttttttttt')
  };

  // console.log('selectedImageCertFile', selectedImageCertFile)

    
  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        cert_name: "",
        cert_year: "",
        cert_iso: "",
        // cert_file: null,
        cert_ls: "",
        cert_file_old: ""
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
    form.append("file", selectedImage ? selectedImage : p);
    form.append("tipe_perusahaan", valchecked);
    if (inputFields) {
      inputFields.forEach((x) => {
        // console.log("lail", x.cert_file);
        form.append("cert_name[]", x.cert_name);
        form.append("cert_year[]", x.cert_year);
        form.append("cert_iso[]", x.cert_iso);
        form.append("cert_ls[]", x.cert_ls);
        form.append("cert_file[]", x.cert_file);
        form.append("cert_file_old[]", x.cert_file_old);
        
        // console.log("cert_name[]", x.cert_name);
        // console.log("cert_year[]", x.cert_year);
        // console.log("cert_iso[]", x.cert_iso);
        // console.log("cert_ls[]", x.cert_ls);
        // console.log("cert_file[]", x.cert_file);
        // console.log("cert_file_old[]", x.cert_file_old);
      });
    }
    valcheckedFacility &&
      valcheckedFacility.forEach((x) => {
        form.append("facility[]", x);
      });
    form.append("email_user_google", auth.currentUser.email)
    if(data.catmap_id == 4){
      dispatch(editCompanyPlace(form));
    }else if( data.catmap_id == 2){
      dispatch(editHotelPlace(form));
    }else if( data.catmap_id == 1){
      dispatch(editRestaurantPlace(form));
    }
    // console.log("selectedImageCertFile", selectedImageCertFile);

    // console.log("res", {
    //   latitude : latitudeMap
    // });
  };

  // VARIABLE FACILITIES IMAG
  const facility = (items) => {
    return (
      <div className="facility">
        <img alt="items" src={items} width={20} height={20} />
      </div>
    );
  };

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
    let checkbox_index = event.target.dataset.index;
    if (checked == true) {
      setValcheckedFacility([...valcheckedFacility, value_checked]);
    }else{
      let index = valcheckedFacility.indexOf(event.target.value)
      // setValcheckedFacility([...valcheckedFacility, value_checked]);

      // console.log(index,'indexOf')
      // console.log(valcheckedFacility.splice(index,1),'splice')

    }
    //   setValcheckedFacility([ new valcheckedFacility,''])
    // }
    // console.log(valcheckedFacility[checkbox_index],'valcheckedFacility[checkbox_index]dd')
    // console.log(checkbox_index,'checkbox_index')
    // console.log([...valcheckedFacility],'valcheckedFacility handlecheckk')

  };
  // console.log(valcheckedFacility,'valcheckedFacility')


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

  // console.log('master_ls',master_ls);

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
    // console.log(`Option selected handleChangesLs:`, e);
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

  //LATLONG OTOMATIS
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

  // console.log(data.email_user_google,'data.email_user_google');
  // console.log(email,'email');

  return (
    <>
      <CategoryBar activeCategory={data.catmap_id == '1' ? 'restaurant' : (data.catmap_id == '2' ? 'hotel' : (data.catmap_id == '3' ? 'spbu' : 'company'))} />
      <div className="main-page-category-company">
        {/* info detail version desktop */}
        <div className="left-category-company">
          <Scrollbars>
            <div className="d-flex justify-content-between">
              <Link to="/">
                <img src={ikonsawit} alt="Traceability ISPO" style={{ width: '48px', cursor: 'pointer', marginTop: '9px', marginLeft: '6px' }} />
              </Link>
              <Link to={ data.catmap_id == '1' ? `/restaurant` : ( data.catmap_id == '2' ? `/hotel` : ( data.catmap_id == '3' ? `/spbu` : `/company`))}>
                <i className="fas fa-times text-dark" style={{ fontSize: 20, marginTop: '10px', marginRight:'15px' }}></i>
              </Link>
            </div>
            

            <div className="img-wrap">
              <img className="img-place" alt="detail" src={data.photo != '' ? data.photo : noImage} />
            </div>

            <Gap height={10} />
            <h6 className="d-flex justify--start name-place">{data.name}</h6>

            <Gap height={5} />
            <div className="!ml-[15px]">
              <FlatList list={data.facility} renderItem={facility} />
            </div>

            <Gap height={15} />
            <h6 className="d-flex justify--start info-data ">{data.body}</h6>

            <Gap height={15} />
            <div className="info-data !py-[10px]" style={{ fontSize:'13px' }}><i className="fas fa-clock pr-2"></i> Last Update : {moment(data.cycle_date).format('dddd, MMMM Do, YYYY h:mm:ss A')} </div>

            <hr />

              {/* <DivRute className="category" /> */}

              {/* <div className="sidebardiv !h-[70px]">
                <Link to="/route_map" className="menu-bars ">
                    <Button className="button-rute">
                      <i className="fas fa-directions" ></i> 
                    </Button> 
                </Link>
                <span style={{ fontSize:13, marginLeft: 8 }}>Route</span>
              </div>
            
            <hr /> */}

            <h6 className="text-dark d-flex !py-[10px]">
              {distance ? (
                <>
                  <i className="fas fa-map-pin icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    {`${distance} km from your location`}
                  </h6>
                </>
              ) : null}
            </h6>

            <h6 className="text-dark d-flex !py-[10px]">
              {data.location ? (
                <>
                  <i className="fas fa-map-marker-alt icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    {data.location}
                  </h6>
                </>
              ) : (
                <>
                  <i className="fas fa-map-marker-alt icon-data" />
                  <h6 className="d-flex justify--start info-data">-</h6>
                </>
              )}
            </h6>

            <h6 className="text-dark d-flex !py-[10px]">
              {data.website ? (
                <>
                  <i className="fas fa-globe icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    <a href={data.website} target="_blank">
                      {" "}
                      {data.website}{" "}
                    </a>
                  </h6>
                </>
              ) : (
                <>
                  <i className="fas fa-globe icon-data" />
                  <h6 className="d-flex justify--start info-data">-</h6>
                </>
              )}
            </h6>

            <h6 className="text-dark d-flex !py-[10px]">
              {data.phone1 ? (
                <>
                  <i className="fas fa-phone-alt icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    {data.phone1}
                  </h6>
                </>
              ) : (
                <>
                  <i className="fas fa-phone-alt icon-data" />
                  <h6 className="d-flex justify--start info-data">-</h6>
                </>
              )}
            </h6>

            <h6 className="text-dark d-flex !py-[10px]">
              {data.luas_kebun ? (
                <>
                  <i className="fas fa-tree icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    Garden Area : {data.luas_kebun}
                  </h6>
                </>
              ) : null}
            </h6>

            <h6 className="text-dark d-flex !py-[10px]">
              {data.luas_tertanam ? (
                <>
                  <i className="fas fa-h-square icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    Planted Area : {data.luas_tertanam}
                  </h6>
                </>
              ) : null}
            </h6>

            <h6 className="text-dark d-flex !py-[10px]">
              {data.stok_kelapa_sawit ? (
                <>
                  <i className="fas fa-cubes icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    Produksi : {data.stok_kelapa_sawit}
                  </h6>
                </>
              ) : null}
            </h6>

            <h6 className="text-dark d-flex !py-[10px]">
              {data.usia_tanaman ? (
                <>
                  <i className="fas fa-leaf icon-data" />
                  <h6 className="d-flex justify--start info-data">
                    Plant Age : {data.usia_tanaman}
                  </h6>
                </>
              ) : null}
            </h6>
            

            <Gap height={15} />
            
            {
              data.email_user_google == email ? (
                <>
                {/* Modal */}
                <a
                  className="d-flex !p-[15px]"
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
              animation={false}
              scrollable={true}
            >
              <Modal.Header closeButton>
                <div style={{ flexDirection: "column" }}>
                  <div className="d-flex justify--start">Edit Detail Place</div>
                  {/* <div style={{ color: "grey", fontSize: 14 }}>{data.name}</div> */}
                </div>
              </Modal.Header>

              <Modal.Body
                style={{
                  maxHeight: "calc(100vh - 210px)",
                  overflowY: "auto",
                }}
              >
                {/* name */}
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

                {/* desc */}
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
                  maxLength={200}
                  placeholder={'Max.200 Character'}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>

                {/* provinsi */}
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

                {/* kota/kabupaten */}
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

                {/* kecamatan */}
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

                {/* address */}
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
                  maxLength={200}
                  placeholder={'Max.200 Character'}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>

                {/* Duration */}
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

                {/* website */}
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
                        // readOnly
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
                        // readOnly
                        onChange={(e) => SetLongitudeMap(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* Photo */}

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
                { data.catmap_id == 4 ? 
                  <>
                    {/* Palm Oil Company */}
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

                    {/* Luas Kebun */}
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

                    {/* Luas tertanam */}
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
                  </>
                  : ''
                }
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
                      {inputFields.map((inputField,index) => (
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
                                          <option
                                          value={inputField.cert_iso} selected >
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
                                  // src={`https://assets.labelmaps.com/certificate/${inputField.cert_file_old}`}
                                  src={ISO}
                                  width={"100%"}
                                  height={30}
                                />
                                <input
                                  className="input-field-cert-file px-3 ml-0 mr-2 my-2 col-md-8"
                                  name="cert_file"
                                  // data-srcfile={`https://assets.labelmaps.com/certificate/${inputField.cert_file_old}`}
                                  src={ISO}
                                  data-indexke={`${index}`}
                                  id="file"
                                  label="Document"
                                  type="file"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  multiple 
                                  onChange={(event) =>
                                    // console.log(event),
                                    handleChangeInput(inputField, event)

                                  }
                                />
                                <input
                                  className="input-field-cert-file px-3 ml-0 mr-2 my-2 col-md-8"
                                  name="cert_file_old"
                                  value={`${inputField.cert_file_old}`}
                                  data-indexke={`${index}`}
                                  // id="file"
                                  type="hidden"
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
                                      // console.log(value.id_ls, 'id ls')
                                      // console.log(value.cert_ls, 'cert ls')
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
                                    }
                                  )}
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
                        style={{ fontSize: 12, color: "grey" }}
                      >
                        {value.nama}
                      </div>
                      {/* {valcheckedFacility.map((i) => { */}

                      <input
                        className="mt-1 ml-2"
                        name="facility[]"
                        data-index={i}
                        type="checkbox"
                        label="facility"
                        value={value.id}
                        defaultChecked={
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
                      />
                    </>
                  ))}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <Gap height={15} />

            {/* button & modal certificate */}
            {certificate && certificate.length ? (
              <div>
                <div className="ml-4 !p-[15px]">
                  <Button className="button-modal" onClick={handleShow}>
                    Certificate
                  </Button>
                </div>
                <Gap height={25} />
                <Modal
                  className="text-center"
                  show={show}
                  onHide={handleClose}
                  animation={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Certificate</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <h5 className="text-dark name-place">{data.name}</h5>
                    </div>
                    <Carousel>
                      {certificate && certificate.length
                        ? certificate.map((item) => {
                            return (
                              <div>
                                <div className="row">
                                  <a
                                    href={item.certificate_file}
                                    target="_blank"
                                  >
                                    <img
                                      alt="detail certificate"
                                      className="img-certificate"
                                      src={item.certificate_file}
                                    />
                                  </a>
                                </div>
                                <div className="row">
                                  <table
                                    className="table table-bordered pt-2 mt-2 mx-3"
                                    style={{ fontSize: 9 }}
                                  >
                                    <thead>
                                      <tr>
                                        <th style={{ width: 100 }}>
                                          Certificate Name
                                        </th>
                                        <th>Certificate Exp</th>
                                        <th>Certified By</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <b>{item.certificate_name}</b>
                                        </td>
                                        <td>
                                          <b>{item.certificate_date}</b>
                                        </td>
                                        <td>
                                          <b>{item.nama_ls}</b>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </Carousel>
                  </Modal.Body>
                </Modal>
              </div>
            ) : null}
          </Scrollbars>
        </div>

        {/* map */}
        <div className="right-category-company">
          <div className="maps-category-company">
            <MapDetail map_id={data.map_id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(DetailPlace);

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
