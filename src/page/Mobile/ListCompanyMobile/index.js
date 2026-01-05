import { useState, useEffect, useRef } from "react";
import { useMedia } from "use-media";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { Button, Modal } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from "@mui/icons-material/AddCircle";
import Select from "react-select";
import {
  CardItem,
  Navbar,
  MapCompany,
  useGeolocation,
  TextInputMobile,
} from "../../../component";
import "../ListCompanyMobile/listCompanyMobile.css";
import {
  FilterCompany,
  SearchCompany,
} from "../../../config/Redux/action/getCompany";
import { Gap, CustomInput } from "../../../component/atom";
import { auth } from "../../../config/services";
import { postCompanyPlace } from "../../../config/Redux/action/postCompany";
import { getProvince } from "../../../config/Redux/action/getProvince";
import { getCity } from "../../../config/Redux/action/getCity";
import { getDistrict } from "../../../config/Redux/action/getDistrict";
import { MasterLembagaSertifikat } from "../../../config/Redux/action/getMasterLembagaSertifikat";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { 
  styleMap, 
  markerUser, 
  // markerCompany, 
  googleMapURL, 
  URIChart} from "../../../utils";
import { food, hotel, office, pom, ikonsawit } from "../../../assets";
import InfiniteScroll from 'react-infinite-scroller'
import Axios from "axios";



const ListCompanyMobile = (props) => {
  const { data: postCompany }                             = useSelector((state) => state.PostCompanyPlace); //REDUCER POST COMPANY PLACE
  const { data: master_sertifikat }                       = useSelector((state) => state.GetMasterSertifikat);
  const { data: master_ls }                               = useSelector((state) => state.GetMasterLembagaSertifikat); //REDUCER LEMBAGA SERTIFIKASI
  const { data: prov }                                    = useSelector((state) => state.GetProvince); //REDUCER PROVINS
  const { data: city }                                    = useSelector((state) => state.GetCity); //REDUCER KOTA
  const { data: dist }                                    = useSelector((state) => state.GetDistrict); //REDUCER KECAMATAN
  const [checked, setChecked]                             = useState(false);
  const { data, loadingCompany }                          = useSelector((s) => s.GetCompany);
  const [search, setSearch]                               = useState("");
  const [listMenu, setListMenu]                           = useState("");
  const [nearby, setNearby]                               = useState("");
  const [valchecked, setValChecked]                       = useState(0);
  const [valcheckedFacility, setValcheckedFacility]       = useState([]);
  const [inputFields, setInputFields]                     = useState([{ 
                                                                      cert_name: '', 
                                                                      cert_year: '', 
                                                                      cert_iso: '',  
                                                                      cert_file: null,
                                                                      cert_ls : ""
                                                                    }]);
  const [selectedImage, setSelectedImage]                 = useState(); 
  const [selectedImageCertFile, setSelectedImageCertFile] = useState([]); 
  const [modal, setModal]                                 = useState(false);
  const [nameFocused, setNameFocused]                     = useState(false);
  const [show, setShow]                                   = useState(false);
  const [style, setStyle]                                 = useState("input-mobile");
  const handleClose                                       = () => setShow(false);
  const history                                           = useHistory();
  const dispatch                                          = useDispatch();
  const location                                          = useGeolocation();
  const isMobile                                          = useMedia({ minWidth: "768px" });
  const showListMenu                                      = () => setListMenu(!listMenu);
  const showNearby                                        = () => setNearby(!nearby);
  

  useEffect(() => {
    dispatch(
      SearchCompany({
        name: search,
      })
    );
  }, [search]);

  //filter
  const onSelect = (e) => {
    e.preventDefault(e);
    dispatch(
      FilterCompany({
        isoid: e.target.value,
      })
    );
    dispatch(showListMenu);
    setGetIsoId(e.target.value)
  };

  //nearby
  const near = () => {
    dispatch(showNearby);
    dispatch(showListMenu);
  };
  useEffect(() => {
    if (window.innerWidth > 767) return history.replace("/company");
  }, []);

  useEffect(() => {
    if (!modal) setModal(isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const _onFocus = () => {
    setNameFocused(true);
    setStyle("input-mobile-active");
  };

  const _onBlur = () => {
    setNameFocused(false);
    setStyle("input-mobile");
  };

  //INITIAL INPUT
  const nameRef                   = useRef();
  const descRef                   = useRef(); 
  const addressRef                = useRef();
  const websiteRef                = useRef();
  const durationRef               = useRef();
  const phone1Ref                 = useRef();
  const phone2Ref                 = useRef();
  const latitudeRef               = useRef();
  const longitudeRef              = useRef();
  const luas_kebunRef             = useRef();
  const luas_tertanamRef          = useRef();
  const stok_kelapa_sawitRef      = useRef();
  const usia_tanamanRef           = useRef();
  const fileRef                   = useRef(null);
  const certRef                   = useRef({
                                      cert_name: '',
                                      cert_year: '',
                                      cert_iso: '',
                                      cert_file: null,
                                      cert_ls : ""
                                    })

  //INTEGRATE API
  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('title', nameRef.current.value)
    formData.append("desc", descRef.current.value);
    formData.append("provinsi", selectedOptionProv);
    formData.append("kota", selectedOptionCity);
    formData.append("kecamatan", selectedOptionDist);
    formData.append("address", addressRef.current.value);
    formData.append("website", websiteRef.current.value);
    formData.append("duration", durationRef.current.value);
    formData.append("phone1", phone1Ref.current.value);
    formData.append("phone2", phone2Ref.current.value);
    formData.append("latitude", latitudeRef.current.value);
    formData.append("longitude", longitudeRef.current.value);
    formData.append("luas_kebun", luas_kebunRef.current.value);
    formData.append("luas_tertanam", luas_tertanamRef.current.value);
    formData.append("stok_kelapa_sawit", stok_kelapa_sawitRef.current.value);
    formData.append("usia_tanaman", usia_tanamanRef.current.value);
    formData.append("file", selectedImage);
    formData.append("tipe_perusahaan", valchecked);
    inputFields.forEach(x => {
      formData.append("cert_name[]", x.cert_name)
      formData.append("cert_year[]", x.cert_year)
      formData.append("cert_iso[]", x.cert_iso)
      selectedImageCertFile.forEach(x => {
        formData.append("cert_file[]", x)
      })
      formData.append("cert_ls[]", x.cert_ls)
    })
    valcheckedFacility.forEach(x => {
      formData.append("facility[]", x)
    })
    formData.append("email_user_google", auth.currentUser.email)
    dispatch(postCompanyPlace(formData));
    console.log("res", {
      title: nameRef.current.value,
      des: descRef.current.value,
      provinsi: selectedOptionProv,
      kota: selectedOptionCity,
      tipe_perusahaan: valchecked,
      facility : valcheckedFacility,
      certificate : inputFields,
      photo: selectedImage
    });
  //   // console.log(selectedImageCertFile,'selectedImageCertFile')

  //   // formData.append("facility", valcheckedFacility);
  //   // history.push('/company')
  };

  // POPUP ADD PLACE
  const handleShow = () => {
    const authenticate = auth.currentUser;
    if (authenticate == null) {
      history.push("/login");
    } else {
      setShow(true);
    }
  };

  //SELECT PROVINSI, KOTA DAN KECAMATAN
  const [selectedOptionProv, setSelectedOptionProv] = useState("");
  const [selectedOptionCity, setSelectedOptionCity] = useState("");
  const [selectedOptionDist, setSelectedOptionDist] = useState("");
  const [selectedOptionLs, setSelectedOptionLs]     = useState("");

  useEffect(() => {
    dispatch(getProvince());
    dispatch(MasterLembagaSertifikat());
  }, []);
  console.log('master_ls',master_ls);
  
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
    // console.log("lolo", selectedOptionCity);
    dispatch(getProvince());
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

  const options_select_ls = [];
  master_ls &&
    master_ls.map((value, i) => {
      options_select_ls.push({
        value: value.id_ls,
        label: value.nama_ls,
      });
    });

  //FACILITY
  const facility_arr = [
    { id: 1, nama: "Wifi" },
    { id: 2, nama: "Toilet" },
    { id: 3, nama: "Tempat Parkir" },
    { id: 4, nama: "Mushola" },
  ];

  const handlecheckk = (event) => {
    // console.log(event.target.value, 'isi eventttttt')
    let checked = event.target.checked
    let value_checked = Number(event.target.value)
    if (checked == true) {
      setValcheckedFacility([...valcheckedFacility, value_checked]);
    }
  };

  //PREVIEW IMAGE
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

  //checkbox sertifikasi ISPO
  const handlecheck = () => {
    setChecked(!checked);
    if (checked == false) {
      setValChecked(1);
    } else {
      setValChecked(0);
    }
  };
  
  // DYNAMIC FORM CERTIFICATE
  const handleSubmitDynamicForm = (e) => {
    e.preventDefault();
    // console.log("InputFields", inputFields);
    // console.log(master_sertifikat)
    // console.log('fileee', fileRef.current.files[0])
    // dispatch(postCompanyPlace(formData));
  };
  
  const handleChangeInput = (i, event) => {
    const newInputFields = inputFields.map(items => {
        // console.log(event,'eventttttttttttttt')
        // console.log(items['[object FileList]'],'itemsttttttttttttt')
        // console.log(inputFields[0]['[object FileList]'],'inputFields')
        // console.log("event.target.name",event.target.name)
        // console.log(' event.target.value', event.target.value)
        // console.log(' items[event.target.files]', items[event.target.files])
        // console.log(' items[event.target.name]', items[event.target.name])

        if(event.target.name == 'cert_file'){
          setSelectedImageCertFile([...selectedImageCertFile, event.target.files[0]]);
        }
        else if(i == items) {
          items[event.target.name] = event.target.value
        }

      return items;
    })
    setInputFields(newInputFields);
  }

  
  const handleAddFields = () => {
    setInputFields([...inputFields, { 
      cert_name: '', 
      cert_year: '', 
      cert_iso: '', 
      cert_file: null,
      cert_ls: ''
    }])
  }
  
  const handleRemoveFields = index => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value === index), 1);
    setInputFields(values);
  }


    // console.log(valcheckedFacility, 'isi val cheked')
    const [latitudeMap, SetLatitudeMap]   = useState();
    const [longitudeMap, SetLongitudeMap] = useState();
  
    const handleClickedMap = (e) => {
      SetLatitudeMap(e.latLng.lat());
      SetLongitudeMap(e.latLng.lng());
      // console.log('LATITUDE',e.latLng.lat())
      // console.log('LONGITUDE',e.latLng.lng())
    }

      const API_KEY = googleMapURL.split("key=")[1];
    
      const MapComponent = ({ latitudeMap, longitudeMap, location, handleClickedMap }) => {
        const { isLoaded } = useJsApiLoader({
          id: 'google-map-script',
          googleMapsApiKey: API_KEY
        });
    
        const defaultCenter = {
          lat: -6.2088, // Jakarta
          lng: 106.8456
        };
    
        const center =
          latitudeMap && longitudeMap
            ? { lat: parseFloat(latitudeMap), lng: parseFloat(longitudeMap) }
            : location.loaded && location.lat && location.lng
            ? { lat: location.lat, lng: location.lng }
            : defaultCenter;
    
        return isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={11.5}
            options={{
              styles: styleMap,
            }}
            onClick={handleClickedMap}
          >
            {latitudeMap && longitudeMap && (
              <Marker
                position={{
                  lat: parseFloat(latitudeMap),
                  lng: parseFloat(longitudeMap)
                }}
                icon={{
                  url: markerUser,
                  scaledSize: new window.google.maps.Size(35, 35),
                }}
              />
            )}
          </GoogleMap>
        ) : <></>;
      };  const [companyList, setCompanyList]   = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [getIsoId, setGetIsoId]         = useState();
  const [page, setPage]                 = useState(1);

  
  // console.log('ISO IDDDDDDDDDD', getIsoId)
  const loadCompanyList = () => {
    // console.log('PAGESSSSSSSS', page)

    setTimeout(() => {
      // if(getIsoId == undefined ){ 
        
      Axios.get(`${URIChart}/map?cmid=4&page=${page}`)
      .then((res) => {
        console.log('res.data.response.length', res.data.response.length)
        // const ResponseAPI = result.data.response
        const newList = companyList.concat(res.data.response);
        // const newList = ([...companyList, ...res.data.response]);
        setCompanyList(newList);
        setPage(page+1)
        
        if(res.data.response.length == 0) {
          setHasMoreItems(false);
        } 
        else {
          setHasMoreItems(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      
    }, 500)
    
  }

  return (
    <>
      <div
        // onClick={showListMenu}
        className={"search-here-mobile"}
      >
        <Gap height={20} />
        <div className="d-flex justify-content-end">
          <div className="col-8">
            <Link to="/">
              <img
                alt="label map logo"
                className="mr-1 mb-2"
                src={ikonsawit}
                width={65}
                /> 
                <span class="title-labelmaps" style={{ fontWeight: "800", marginLeft: "-4px" }} >Traceability ISPO</span>
            </Link>
          </div>
          <div className="col-4">
            <div onClick={handleShow} className="btnAddPlaceMobile">
              <i
                className="fas fa-plus icon-plus-mobile pt-1"
                style={{ fontSize: "10px" }}
                />
              <p style={{ fontSize: "12px" }}>Add Place</p>
            </div>
          </div>
        </div>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          className="text-center"
          show={show}
          onHide={handleClose}
          animation={false}
          scrollable={true}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Add Place</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              maxHeight: "calc(100vh - 210px)",
              overflowY: "auto",
            }}
          >

            <div className="mt-1 text-left">
              <b>Place Detail</b>
            </div>

            <div className="mt-1 mb-4 text-left">
              Enter information about this place. If added to Maps, this place will appear publicly.
            </div>

            <div className="d-flex">
              <i
                className="fas fa-store-alt mt-1"
                style={{ fontSize: 12, color: "grey" }}
              />
              <div
                className="d-flex justify--start ml-2"
                style={{ fontSize: 12, color: "grey" }}
              >
                Name <span class="ml-1 text-red">*</span>
              </div>
            </div>
            <input
              className="mt-1 input-field"
              type="text"
              ref={nameRef}
            ></input>

            <div className="d-flex mt-2">
              <i
                className="fas fa-file-alt mt-1"
                style={{ fontSize: 12, color: "grey" }}
              />
              <div
                className="d-flex justify--start ml-2"
                style={{ fontSize: 12, color: "grey" }}
              >
                Description <span class="ml-1 text-red">*</span>
              </div>
            </div>
            <textarea
              className="mt-1 input-field"
              
              name="paragraph_text"
              cols="10"
              ref={descRef}
            ></textarea>

            <div className="d-flex mt-2">
              <i
                className="fas fa-map-pin mt-1"
                style={{ fontSize: 12, color: "grey" }}
              />
              <div
                className="d-flex justify--start ml-2"
                style={{ fontSize: 12, color: "grey" }}
              >
                Province <span class="ml-1 text-red">*</span>
              </div>
            </div>
            <Select
              className="mt-1"
              style={{border: 1}}
              defaultValue={{ label: "", value: "" }}
              value={selectedOptionProv.label}
              onChange={handleChangesProv}
              // ref={provRef}
              options={options_select_prov}
            />

            <div className="d-flex mt-2">
              <i
                className="fas fa-map-pin mt-1"
                style={{ fontSize: 12, color: "grey" }}
              />
              <div
                className="d-flex justify--start ml-2"
                style={{ fontSize: 12, color: "grey" }}
              >
                City <span class="ml-1 text-red">*</span>
              </div>
            </div>
            <Select
              className="mt-1"
              defaultValue={{ label: "", value: "" }}
              value={selectedOptionCity.label}
              onChange={handleChangesCity}
              options={options_select_city}
            />

            <div className="d-flex mt-2">
              <i
                className="fas fa-map-pin mt-1"
                style={{ fontSize: 12, color: "grey" }}
              />
              <div
                className="d-flex justify--start ml-2"
                style={{ fontSize: 12, color: "grey" }}
              >
                District <span class="ml-1 text-red">*</span>
              </div>
            </div>
            <Select
              className="mt-1"
              defaultValue={{ label: "", value: "" }}
              value={selectedOptionDist.label}
              onChange={handleChangesDist}
              options={options_select_dist}
            />

            <div className="d-flex mt-1">
              <i
                className="fas fa-map-marker-alt mt-1"
                style={{ fontSize: 12, color: "grey" }}
              />
              <div
                className="d-flex justify--start ml-2"
                style={{ fontSize: 12, color: "grey" }}
              >
                Address <span class="ml-1 text-red">*</span>
              </div>
            </div>
            <textarea
              // value={desc}
              className="mt-1 input-field"
            
              name="paragraph_text"
              cols="10"
              ref={addressRef}
              // onChange={(e) => setAddress(e.target.value)}
            ></textarea>

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
              // value={duration}
              className="mt-1 input-field"
              style={{
                width: "100%",
                outline: "none",
              }}
              type="text"
              ref={durationRef}
              // onChange={(e) => setDuration(e.target.value)}
            ></input>

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
              // value={website}
              className="mt-1 input-field"
              style={{
                width: "100%",
                outline: "none",
              }}
              type="text"
              ref={websiteRef}
              // onChange={(e) => setWebsite(e.target.value)}
            ></input>

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
              // value={phone1}
              className="mt-1 input-field"
              // style={{
              //   width: "100%",
              //   outline: "none",
              // }}
              type="text"
              ref={phone1Ref}
              // onChange={(e) => setPhone1(e.target.value)}
            ></input>

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
              className="mt-1 input-field"
              type="text"
              ref={phone2Ref}
            ></input>

            <div className="row">
              <div className="col-md-6">
                <div className="pt-4" style={{ width:'100%', height:'200px' }}>
                  <div
                    className="d-flex justify--start"
                    style={{ fontSize: 12, color: "grey" }}
                  >
                  Choose Latitude and Longitude
                  </div>
                  <MapComponent
                    latitudeMap={latitudeMap}
                    longitudeMap={longitudeMap}
                    location={location}
                    handleClickedMap={handleClickedMap}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="col-md-12 px-0 pt-3">
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
                    ref={latitudeRef}
                    readOnly
                    // onChange={(e) => setLatitude(e.target.value)}
                  ></input>
                </div>
                <div className="col-md-12 px-0 pt-3">
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
                    ref={longitudeRef}
                    readOnly
                    // onChange={(e) => setLongitude(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>


            <div className="mt-5 text-left">
              <b>Place Picture</b>
            </div>

            <div className="mt-1 text-left">
              Add useful photos, such as storefronts, notifications, or bookmarks
            </div>

            <div style={styles.container}>
              <label for="file-upload" class="custom-file-upload">
                  <i class="fas fa-upload pr-2"></i> Upload Image
              </label>
              <input
              id="file-upload"
                accept="image/*"
                type="file"
                onChange={imageChange}
              />

              {selectedImage && (
                <div style={styles.preview}>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    style={styles.image}
                    alt="Thumb"
                  />
                  <button onClick={removeSelectedImage} style={styles.delete}>
                    Remove This Image
                  </button>
                </div>
              )}
            </div>
            

            <div className="d-flex mb-2 mt-4">
              <i
                className="fas fa-certificate mt-1"
                style={{ fontSize: 12, color: "grey" }}
              />
              <div
                className="d-flex justify--start ml-2 mr-2"
                style={{ fontSize: 12, color: "black" }}
              >
                Palm Oil Company ?
              </div>
              <input
                className="mt-1 ml-2"
                name="isISPO"
                type="checkbox"
                label="Checkbox"
                checked={checked}
                value={valchecked}
                onChange={handlecheck}
                style={{ transform: 'scale(2)' }}
              />
            </div>

            <div className={ checked == true ? "d-flex mt-2"  : "d-flex mt-2 d-none" }>
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
              // value={luas_kebun}
              className={ checked == true ? "mt-1 input-field"  : "mt-1 input-field d-none" }
              type="text"
              ref={luas_kebunRef}
              // onChange={(e) => setLuasKebun(e.target.value)}
            ></input>

            <div className={ checked == true ? "d-flex mt-2"  : "d-flex mt-2 d-none" }>
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
              // value={luas_tertanam}
              className={ checked == true ? "mt-1 input-field"  : "mt-1 input-field d-none" }
              type="text"
              ref={luas_tertanamRef}
              // onChange={(e) => setLuasTertanam(e.target.value)}
            ></input>

            <div className={ checked == true ? "d-flex mt-2"  : "d-flex mt-2 d-none" }>
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
              // value={stok_kelapa_sawit}
              className={ checked == true ? "mt-1 input-field"  : "mt-1 input-field d-none" }
              type="text"
              ref={stok_kelapa_sawitRef}
              // onChange={(e) => setStok(e.target.value)}
            ></input>

            <div className={ checked == true ? "d-flex mt-2"  : "d-flex mt-2 d-none" }>
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
              // value={usia_tanaman}
              className={ checked == true ? "mt-1 input-field"  : "mt-1 input-field d-none" }
              type="number"
              ref={usia_tanamanRef}
              // onChange={(e) => setUsiaTanaman(e.target.value)}
            ></input>

            <div className="mt-4">
              
              <div
                className="row ml-2"
                style={{ fontSize: 12, color: "grey" }}
              >
                Certificate
              </div>
              <div>
                <form onSubmit={handleSubmitDynamicForm} >
                  {inputFields.map(inputField => (
                    <div key={inputField} className="d-flex row pb-3" >
                      <div className="col-md-10">

                        <div className="row">
                          <div className="col-md-6">
                            <input
                              className="input-field px-3 ml-0 mr-2 my-2"
                              name="cert_name"
                              type="text"
                              label="Certificate Name"
                              placeholder='Certificate Name'
                              value={inputField.cert_name}
                              onChange={event => handleChangeInput(inputField, event)}
                            />
                          </div>
                          <div className="col-md-6 ">
                            <input
                              className='input-field px-3 ml-0 mr-2 my-2'
                              name='cert_year'
                              id="certificateYear"
                              label="Validity Period"
                              type="datetime-local"
                              value={inputField.cert_year}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={event => handleChangeInput(inputField, event)}
                            />
                          </div>
                        </div>
                      
                        <div className="row">
                          <div className="col-md-6">
                            <select
                                className="input-field-cert-iso px-3 ml-0 mr-2 my-2"
                                name="cert_iso"
                                id="cert_iso"
                                value={inputField.cert_iso}
                                onChange={event => handleChangeInput(inputField, event)}
                            >
                              <option hidden selected>
                                Choose Certificate
                              </option>
                              {master_sertifikat && master_sertifikat.map((value, i) => {
                                return <option value={value.iso_id}>{value.iso_name}</option>
                              })}
                            </select>
                          </div>
                          <div className="col-md-6 ">
                            <input
                              className='input-field-cert-file px-3 ml-0 mr-2 my-2'
                              name='cert_file'
                              id="file"
                              label="Document"
                              type="file"
                              value={inputField.cert_file}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={event => handleChangeInput(inputField, event)}
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
                              {master_ls && master_ls.map((value, i) => {
                                return <option value={value.id_ls}>{value.nama_ls}</option>
                              })}
                            </select>
                          </div> 
                        </div>

                      </div>
                      <div className="col-md-2" style={{ alignItems:'center', display:'flex' }}>
                      
                      <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField)} >
                        <RemoveIcon style={{ fontSize:'3ex' }} />
                      </IconButton>
                      
                      <IconButton onClick={handleAddFields}>
                        <AddIcon style={{ fontSize:'3ex' }} />
                      </IconButton>
                      </div>
                    </div>
                  ))}
                </form>
              </div>
            </div>

            <div className="d-flex mt-4">
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
                  <input
                    className="mt-1 ml-2"
                    name="facility[]"
                    type="checkbox"
                    label="facility"
                    value={value.id}
                    onChange={handlecheckk}
                    style={{ transform: 'scale(1.5)' }}
                  />
                </>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" 
            onClick={handleClose}
            >
              Close
            </Button>
            <Button variant="primary" 
            onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <CustomInput
          placeholder="Search Location..."
          className={style}
          onFocus={_onFocus}
          onBlur={_onBlur}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Gap height={20} />
        <div className="row feature d-flex mx-2">
          <div className="col-6 mt-2">
            <div className="search-box">
              <input type="text" placeholder="Nearby Locations" value="Nearby Locations" readOnly></input>
              <a href="#" className="icon">
                <input type="checkbox" id="nearby" className="check-input m-2 mt-3"  name="nearby" value="nearby" checked={nearby} onChange={near} ></input>
                <label for="nearby" className="checkbox">
                  <svg viewBox="0 0 22 16" fill="none">
                    <path d="M1 6.85L8.09677 14L21 1"></path>
                  </svg>
                </label>
              </a>
            </div>
          </div>
          <div className="col-6">
            <select
              className="custom-select"
              name="iso"
              id="iso"
              style={{ fontSize: 12, height:'6ex' }}
              onChange={(e) => onSelect(e)}
            >
              <option hidden selected>
                Filter by Certificate
              </option>
              {master_sertifikat && master_sertifikat.map((value, i) => {
                return <option value={value.iso_id}>{value.iso_name}</option>
              })}
            </select>
          </div>
        </div>

        <Gap height={10} />
        {nearby
          ? 
          <Scrollbars style={{ height: "69vh" }}>
          {
            data.map((items) => {
              const lat1 = location.lat;
              const lon1 = location.lng;
              const lat2 = parseFloat(items.latitude);
              const lon2 = parseFloat(items.longitude);
              const R = 6371e3; // earth radius in meter

              const φ1 = lat1 * (Math.PI / 180);
              const φ2 = lat2 * (Math.PI / 180);
              const Δφ = (lat2 - lat1) * (Math.PI / 180);
              const Δλ = (lon2 - lon1) * (Math.PI / 180);

              const a =
                Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) *
                  Math.cos(φ2) *
                  (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              let markerPlace = [];
              const distance = (R * c) / 1000;
              markerPlace.push(distance);

              if (markerPlace < 20) {
                return (
                  <CardItem
                    onClick={() =>
                      history.push(`/detail_place/${items.map_id}`)
                    }
                    key={items.map_id}
                    name={items.name}
                    location={items.location}
                    // images={items.photo}
                    rating={items.rating}
                    facility={items.facility}
                    map_id={items.map_id}
                  />
                );
              }
                  
            })
          }
          </Scrollbars>
          : 
            getIsoId ? 
              <Scrollbars style={{ height: "69vh" }}>
              {
                data.map((items) => {
                  return (
                    <CardItem
                      onClick={() =>
                        history.push(`/detail_place/${items.map_id}`)
                      }
                      key={items.map_id}
                      name={items.name}
                      location={items.location}
                      images={items.photo}
                      rating={items.rating}
                      facility={items.facility}
                      map_id={items.map_id}
                    />
                  );
                }) 
              }
              </Scrollbars>
            :

            search ? 
              <Scrollbars style={{ height: "69vh" }}>
              {
                data.map((items) => {
                  return (
                    <CardItem
                      onClick={() =>
                        history.push(`/detail_place/${items.map_id}`)
                      }
                      key={items.map_id}
                      name={items.name}
                      location={items.location}
                      images={items.photo}
                      rating={items.rating}
                      facility={items.facility}
                      map_id={items.map_id}
                    />
                  );
                }) 
              }
              </Scrollbars>
              
            :
              <div>
                <div style={{ height:'69vh', overflow:'auto'}}>
                  <InfiniteScroll
                    // threshold={0}
                    pageStart={0}
                    loadMore={loadCompanyList}
                    hasMore={hasMoreItems}
                    // dataLength={companyList.length}
                    loader={<div className="text-center" style={{ paddingTop:'3ex', color:'#2d2066' }}>Loading...</div>}
                    useWindow={false}
                    >
                      
                      {companyList.map((items) => 
                        ( 
                          <CardItem
                            onClick={() =>
                              history.push(`/detail_place/${items.map_id}`)
                            }
                            key={items.map_id}
                            name={items.name}
                            location={items.location}
                            images={items.photo}
                            rating={items.rating}
                            facility={items.facility}
                            map_id={items.map_id}
                          />
                        )
                      )}
                  </InfiniteScroll>
                  {hasMoreItems ? "" : <div className="text-center">Noo Data Anymore ...</div> }    
                </div>
              </div>
        }
       
      </div>
    </>
  );
};

export default ListCompanyMobile;

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