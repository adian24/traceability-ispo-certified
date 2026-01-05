import { useState, useEffect, useRef } from "react";
import { useMedia } from "use-media";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  CardItem,
  HeaderNav,
  Navbar,
  MapHotel,
  useGeolocation,
  CategoryBar,
} from "../../component";
import { Gap, CustomInput } from "../../component/atom";
import "./hotel.css";
import { ikonsawit } from "../../assets";
import {
  FindHotel,
  FilterHotel,
  SearchHotel,
} from "../../config/Redux/action/getHotel";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import RemoveIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from "@mui/icons-material/AddCircle";
import { auth } from "../../config/services";
import { getProvince } from "../../config/Redux/action/getProvince";
import { getCity } from "../../config/Redux/action/getCity";
import { getDistrict } from "../../config/Redux/action/getDistrict";
import { postHotelPlace } from "../../config/Redux/action/postHotel";
import MapPicker from "../../component/molecule/MapPicker";
import { URIChart } from "../../utils";
import { MasterLembagaSertifikat } from "../../config/Redux/action/getMasterLembagaSertifikat";
import InfiniteScroll from 'react-infinite-scroller'
import Axios from "axios";


const Hotel = (props) => {
  const { data }                                          = useSelector((s) => s.GetHotel);
  const { data: master_sertifikat }                       = useSelector((state) => state.GetMasterSertifikat);
  const { data: master_ls }                               = useSelector((state) => state.GetMasterLembagaSertifikat); //REDUCER LEMBAGA SERTIFIKASI
  const { data: prov }                                    = useSelector((state) => state.GetProvince); //REDUCER PROVINS
  const { data: city }                                    = useSelector((state) => state.GetCity); //REDUCER KOTA
  const { data: dist }                                    = useSelector((state) => state.GetDistrict); //REDUCER KECAMATAN
  const { data: postHotel }                               = useSelector((state) => state.PostHotelPlace); //REDUCER POST COMPANY PLACE
  const [search, setSearch]                               = useState("");
  const [listMenu, setListMenu]                           = useState("");
  const [nearby, setNearby]                               = useState("");
  const [modal, setModal]                                 = useState(false);
  const [style, setStyle]                                 = useState("input-hotel");
  const [nameFocused, setNameFocused]                     = useState(false);
  const [show, setShow]                                   = useState(false);
  const [checked, setChecked]                             = useState(false);
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
  const handleClose                                       = () => setShow(false);
  const showNearby                                        = () => setNearby(!nearby);
  const history                                           = useHistory();
  const dispatch                                          = useDispatch();
  const location                                          = useGeolocation();
  const mobileView                                        = useMedia({ maxWidth: "767px" });
  const showListMenu                                      = () => setListMenu(!listMenu);


  useEffect(() => {
    if (window.innerWidth <= 767) return history.replace("/m/hotel")
  },[])

  //SELECT PROVINSI, KOTA DAN KECAMATAN

  const getInitialStatesProv = () => {
    const valueSelectedOptionProv = "";
    return valueSelectedOptionProv;
  };

  const getInitialStatesCity = () => {
    const valueSelectedOptionCity = "";
    return valueSelectedOptionCity;
  };

  const getInitialStatesDist = () => {
    const valueSelectedOptionDist = "";
    return valueSelectedOptionDist;
  };

  
  const handleShow = () => {
    const authenticate = auth.currentUser;
    if (authenticate == null) {
      history.push("/login");
    } else {
      setShow(true);
    }
  };

  //INITIAL FETCH & SEARCH
  useEffect(() => {
    if (search) {
      dispatch(SearchHotel({ name: search }));
    } else {
      dispatch(FindHotel());
    }
  }, [search]);
  
  const _onFocus = () => {
    setNameFocused(true);
    setStyle("input-hotel-active");
  };

  const _onBlur = () => {
    setNameFocused(false);
    setStyle("input-hotel");
  };

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
    formData.append("file", selectedImage);
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
    dispatch(postHotelPlace(formData));
    // console.log("res", {
    //   title: nameRef.current.value,
    //   des: descRef.current.value,
    //   provinsi: selectedOptionProv,
    //   kota: selectedOptionCity,
    //   tipe_perusahaan: valchecked,
    //   facility : valcheckedFacility,
    //   certificate : inputFields,
    //   photo: selectedImage,
    //   email_user_google: auth.currentUser.email
    // });
    // console.log('formData',formData)

    // formData.append("facility", valcheckedFacility);
    // history.push('/company')
  };


  //FILTER
  const onSelect = (e) => {
    e.preventDefault(e);
    dispatch(
      FilterHotel({
        isoid: e.target.value,
      })
    );
    setGetIsoId(e.target.value)
  };

  // MOBILE RESPONSIVE
  useEffect(() => {
    // getList()
    if (window.innerWidth <= 767) return history.replace("/m/hotel");
  }, []);

  useEffect(() => {
    if (!modal) setModal(mobileView);
  }, [mobileView]);


    //SELECT PROVINSI, KOTA DAN KECAMATAN
  const [selectedOptionProv, setSelectedOptionProv] = useState("");
  const [selectedOptionCity, setSelectedOptionCity] = useState("");
  const [selectedOptionDist, setSelectedOptionDist] = useState("");
  const [selectedOptionLs, setSelectedOptionLs]     = useState("");

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
  // const handlecheck = () => {
  //   setChecked(!checked);
  //   if (checked == false) {
  //     setValChecked(1);
  //   } else {
  //     setValChecked(0);
  //   }
  // };
  
  // DYNAMIC FORM CERTIFICATE
  const handleSubmitDynamicForm = (e) => {
    e.preventDefault();
    // console.log("InputFields", inputFields);
    // console.log(master_sertifikat)
    // console.log('fileee', fileRef.current.files[0])
    // dispatch(postHotelPlace(formData));
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

  const [latitudeMap, SetLatitudeMap]   = useState();
  const [longitudeMap, SetLongitudeMap] = useState();

  const handleLocationSelect = (lat, lng) => {
    SetLatitudeMap(lat);
    SetLongitudeMap(lng);
  };

  const [hotelList, setHotelList]   = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [getIsoId, setGetIsoId]         = useState();
  const [page, setPage]                 = useState(1);
  const [allMapData, setAllMapData]     = useState([]); // State untuk semua marker di map

  // Fetch ALL data untuk map markers (tidak ada pagination)
  useEffect(() => {
    Axios.get(`${URIChart}/map?cmid=2&limit=10000`)
      .then((res) => {
        setAllMapData(res.data.response || []);
      })
      .catch((err) => {
        console.log('Error fetching all map data:', err);
      });
  }, []);


  // console.log('ISO IDDDDDDDDDD', getIsoId)
  const loadHotelList = () => {
    // console.log('PAGESSSSSSSS', page)

    setTimeout(() => {
      // if(getIsoId == undefined ){ 
        
      Axios.get(`${URIChart}/map?cmid=4&page=${page}`)
      .then((res) => {
        // console.log('res.data.response.length', res.data.response.length)
        // const ResponseAPI = result.data.response
        const newList = hotelList.concat(res.data.response);
        // const newList = ([...hotelList, ...res.data.response]);
        setHotelList(newList);
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
      <CategoryBar activeCategory="hotel" />
      <div className="main-page-category">
        
        {/* list location version desktop */}
        <div className="left-category">
          <div className="d-flex justify-content-between">
            <Link to="/">
              <img src={ikonsawit} alt="Traceability ISPO" style={{ width: '48px', cursor: 'pointer', marginTop: '9px', marginLeft: '6px' }} />
            </Link>
            {/* <div onClick={handleShow} className="btnAddPlace">
              <i className="fas fa-plus icon-plus" />
              <p>Add Place</p>
            </div> */}
            <div onClick={handleShow} className="btnAddPlace">
               <i className="fas fa-plus icon-plus pt-1 !pt-[14px] !mr-[6px]" style={{ fontSize:'12px'}} />
              <p>Add Place</p>
            </div>
          </div>
          <div style={{ zIndex: 2 }}>
            {/* <form className="mr-3" onSubmit={(e) => onSubmit(e)}> */}
            <CustomInput
              placeholder="Search Location"
              className={style}
              onFocus={_onFocus}
              onBlur={_onBlur}
              onChange={(e) => setSearch(e.target.value)}
            />
              {/* <HeaderNav onChange={(e) => setSearch(e.target.value)} /> */}
            {/* </form> */}
            <Gap height={15} />

            <div className="row mx-2">
                <div className="col-md-6 mt-2">
                  <div className="search-box-hotel">
                    <input type="text" placeholder="Nearby Locations" value="Nearby Locations" readOnly></input>
                    <a href="#" className="icon-hotel">
                      {/* <i className="fas fa-search"></i> */}
                      <input type="checkbox" id="nearby" className="check-input-hotel m-2 mt-3"  name="nearby" value="nearby" checked={nearby} onChange={showNearby} style={{ display:'none' }}></input>
                      <label for="nearby" className="checkbox-hotel">
                        <svg viewBox="0 0 22 16" fill="none">
                          <path d="M1 6.85L8.09677 14L21 1"></path>
                        </svg>
                      </label>
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
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
                    <option value="CHSE">CHSE</option>
                  </select>
                </div>
            </div>

            {/* <div className="ml-3 d-flex">
              <input
                className="mt-3 mr-2"
                type="checkbox"
                id="nearby"
                name="nearby"
                value="nearby"
                checked={nearby}
                onChange={showNearby}
              />
              <p className="mt-3 nearby">Nearby Location</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: -35,
                marginRight: 20,
              }}
            >
              <select
                className="custom-select"
                name="iso"
                id="iso"
                style={{ width: "40%", fontSize: 12, marginBottom: 10 }}
                onChange={(e) => onSelect(e)}
              >
                <option disabled selected>
                  Filter
                </option>
                <option value="CHSE">CHSE</option>
              </select>
            </div> */}
            <Scrollbars style={{ height: "75vh", marginTop: '4ex' }} >
              {nearby
                ? data && Array.isArray(data) && data.map((items) => {
                    if (!location.lat || !location.lng) return null;

                    const lat1 = parseFloat(location.lat);
                    const lon1 = parseFloat(location.lng);
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
                    if (markerPlace < 10) {
                      return (
                        <>
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
                          <hr/>
                        </>
                      );
                    }
                  })
                : data && Array.isArray(data) && data.map((items) => {
                  return (
                    <>
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
                      <hr/>
                    </>
                  );
                })}
            </Scrollbars>
          </div>
        </div>

        {/* map */}
        <div className="right-category">
          <div className="maps-category">
            <MapHotel map_id={data.map_id} nearby={nearby} data={getIsoId || search ? data : allMapData} />
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
            {/* Tambahkan foto yang berguna, seperti etalase, pemberitahuan, atau penanda</span> */}
            Enter information about this place. If added to Maps, this place will appear publicly.
          </div>

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
              Name <span class="ml-1 text-red">*</span>
            </div>
          </div>
          <input
            className="mt-1 input-field"
            // style={{
            //   width: "100%",
            //   outline: "none",
            // }}
            // value={title}
            type="text"
            ref={nameRef}
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
              Description <span class="ml-1 text-red">*</span>
            </div>
          </div>
          <textarea
            // value={desc}
            className="mt-1 input-field"
            // style={{
            //   width: "100%",
            // }}
            name="paragraph_text"
            cols="10"
            ref={descRef}
            maxLength={200}
            placeholder={'Max.200 Character'}
            // onChange={(e) => setDesc(e.target.value)}
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
              Address <span class="ml-1 text-red">*</span>
            </div>
          </div>
          <textarea
            // value={desc}
            className="mt-1 input-field"
            // style={{
            //   width: "100%",
            // }}
            name="paragraph_text"
            cols="10"
            maxLength={200}
            placeholder={'Max.200 Character'}
            ref={addressRef}
            // onChange={(e) => setAddress(e.target.value)}
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
                <MapPicker
                  center={[
                    latitudeMap ? parseFloat(latitudeMap) : (location.lat ? parseFloat(location.lat) : -2.0),
                    longitudeMap ? parseFloat(longitudeMap) : (location.lng ? parseFloat(location.lng) : 120.0)
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
                  ref={latitudeRef}
                  readOnly
                  // onChange={(e) => setLatitude(e.target.value)}
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
                  ref={longitudeRef}
                  readOnly
                  // onChange={(e) => setLongitude(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          {/* Photo */}

          <div className="mt-5 text-left">
            <b>Place Picture</b>
          </div>

          <div className="mt-1 text-left">
            {/* Tambahkan foto yang berguna, seperti etalase, pemberitahuan, atau penanda</span> */}
            Add useful photos, such as storefronts, notifications, or bookmarks
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

          {/* <div style={styles.container}>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => imageChange(e)}
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
          </div> */}

          {/* <div
            className="mt-1 text-left"
            // style={{ width: 110, height: 130, backgroundColor: "#DCDCDC" }}
          >
            <img src={file.name} width={100} height={100} /> <br/>

          <input
            // value={longitude}
            className="mt-1"
            // style={{
            //   width: "100%",
            //   outline: "none",
            // }}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
          </div> */}

          {/* certificate */}
          <div className="mt-4">
            {/* <i
              className="fas fa-phone mt-1"
              style={{ fontSize: 12, color: "grey" }}
            /> */}
            <div
              className="row ml-2"
              style={{ fontSize: 12, color: "grey" }}
            >
              Certificate
            </div>
            <div>
              {/* <p>Certificate</p> */}
              <form onSubmit={handleSubmitDynamicForm} >
                {inputFields.map(inputField => (
                  <div key={inputField} className="d-flex row pb-3" >
                  {/* certificate name */}
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
                        {/* validity period */}
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
                          {/* <Select
                            className="mt-2"
                            style={{border: 1}}
                            defaultValue={{ label: "Chose Certification Body", value: "" }}
                            value={selectedOptionLs.label}
                            // value={inputField.cert_ls}
                            // onChange={handleChangesLs}
                            onChange={event => { handleChangesLs(); handleChangeInput(inputField, event) }}
                            options={options_select_ls}
                          /> */}
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
                    
                    {/* <input id="file-upload" type="file"/> */}
                    {/* <label for="cert-upload" LabelProps={{
                        shrink: true,
                      }}  className={ selectedImageCert == undefined ? "custom-cert-upload m-2" : "custom-cert-upload m-2 d-none"}>
                        <i class="fas fa-upload"></i>
                        {inputField.cert_file}  
                    </label>
                    <input
                      id="cert-upload"
                      accept="image/*"
                      type="file"
                      className='input-name'
                      label="Document"
                      name='cert_file'        
                      value={inputField.cert_file}  
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // onChange={imageChangeCert}
                      onChange={event => handleChangeInput(inputField, event)}             
                    /> */}

                    {/* {selectedImageCert && (
                      <div className="ml-2" style={styles.previewCert}>
                        <img
                          src={URL.createObjectURL(selectedImageCert)}
                          style={styles.imageCert}
                          alt="Thumb"
                        />
                        <button onClick={removeSelectedImageCert} style={styles.deleteCert}>
                          X
                        </button>
                      </div>
                    )} */}
                    
                    <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField)} >
                      <RemoveIcon style={{ fontSize:'3ex' }} />
                    </IconButton>
                    
                    <IconButton onClick={handleAddFields}>
                      <AddIcon style={{ fontSize:'3ex' }} />
                    </IconButton>
                    </div>
                  </div>
                ))}
                {/* <button
                  variant="contained" 
                  color="primary" 
                  type="submit" 
                  endIcon={<Icon></Icon>}
                  onClick={handleSubmitDynamicForm}>
                  Send
                </button>     */}
              </form>
            </div>
          </div>

          {/* facility */}
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
              // console.log(value.id, 'isi valueeee'),
              // console.log(value.nama, 'isi valueeee')
              <>
                <div
                  key={i}
                  className="d-flex justify--start ml-4 mr-2"
                  style={{ fontSize: 16, color: "grey" }}
                >
                  {value.nama}
                </div>
                <input
                  className="mt-2 mx-2"
                  name="facility[]"
                  type="checkbox"
                  label="facility"
                  value={value.id}
                  // checked={checkedFacility}
                  // value={valcheckedFacility}
                  onChange={handlecheckk}
                  style={{ transform: 'scale(2)' }}
                />
              </>
            ))}

            {/* <div
              className="d-flex justify--start ml-5"
              style={{ fontSize: 12, color: "grey" }}
            >
              Toilet
            </div>
            <input
              className="mt-1 ml-2"
              name="toilet"
              label="toilet"
              type="checkbox"
              // checked={checkedToilet}
              // value={valcheckedFacility}
              // onChange={handlecheckToilet}
            />
            <div
              className="d-flex justify--start ml-5"
              style={{ fontSize: 12, color: "grey" }}
            >
              Tempat Parkir
            </div>
            <input
              className="mt-1 ml-2"
              name="parkir"
              label="parkir"
              type="checkbox"
              // checked={this.state.isGoing}
              // onChange={this.handleInputChange}
            />
            <div
              className="d-flex justify--start ml-5"
              style={{ fontSize: 12, color: "grey" }}
            >
              Mushola
            </div>
            <input
              className="mt-1 ml-2"
              name="mushola"
              label="mushola"
              type="checkbox"
              // checked={this.state.isGoing}
              // onChange={this.handleInputChange}
            /> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Hotel;

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
