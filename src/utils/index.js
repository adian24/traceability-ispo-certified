//url OpenStreetMap - Leaflet (GRATIS, Tanpa API Key!)
export const mapMarker          = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png";
// OpenStreetMap Tile Layers (pilih salah satu)
export const osmTileLayer       = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const osmAttribution     = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Google Maps (commented - tidak gratis)
export const styleMap           = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];
export const googleMapURL       = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAtGs_zbLOzuORLw81sl6kW9qEe3-JbK2M`

//url marker
// export const markerUser         = `https://assets.labelmaps.com/markers/user1.png`
// export const markerHotel        = `https://assets.labelmaps.com/markers/hotel.png`
// export const markerRestaurant   = `https://assets.labelmaps.com/markers/restaurant.png`
// export const markerSPBU         = `https://assets.labelmaps.com/markers/spbu.png`
// export const markerCompany      = `https://assets.labelmaps.com/markers/company.png`


//url api
// export const URI = "http://localhost:8080/map";
// export const getTotalPerusahaanPerprovinsi = "http://localhost:8080/api/map-chart-total-perusahaan-perprovinsi";

// export const URI                      = "https://api-labelmaps.agrointernationalacademy.com/map";
// export const URIChart                 = "https://api-labelmaps.agrointernationalacademy.com";
// export const URISearch                = 'https://api-labelmaps.agrointernationalacademy.com/search';
// export const URI_Provinsi             = 'https://api-labelmaps.agrointernationalacademy.com/get-provinsi-asc';
// export const URI_Lembaga_Sertifikasi  = 'https://api-labelmaps.agrointernationalacademy.com/master-ls';
// export const URI_map_company          = 'https://api-labelmaps.agrointernationalacademy.com/api-map-company';
// export const URI_map_hotel            = 'https://api-labelmaps.agrointernationalacademy.com/api-map-hotel';
// export const URI_map_restaurant       = 'https://api-labelmaps.agrointernationalacademy.com/api-map-restaurant';

// export const URI                      = "https://api.labelmaps.com/map";
// export const URIChart                 = "https://api.labelmaps.com";
// export const URISearch                = 'https://api.labelmaps.com/search';
// export const URI_Provinsi             = 'https://api.labelmaps.com/get-provinsi-asc';
// export const URI_Lembaga_Sertifikasi  = 'https://api.labelmaps.com/master-ls';
// export const URI_map_company          = 'https://api.labelmaps.com/api-map-company';
// export const URI_map_hotel            = 'https://api.labelmaps.com/api-map-hotel';
// export const URI_map_restaurant       = 'https://api.labelmaps.com/api-map-restaurant';

export const markerUser         = require('../assets/images/marker/user1.png')
export const markerHotel        = require('../assets/images/marker/hotel.png')
export const markerRestaurant   = require('../assets/images/marker/restaurant.png')
export const markerSPBU         = require('../assets/images/marker/spbu.png')
export const markerCompany      = require('../assets/images/marker/company.png')

export const URI                      = "http://localhost:8080/api/map";
export const URIChart                 = "http://localhost:8080/api";
export const URISearch                = 'http://localhost:8080/api/search';
export const URI_Provinsi             = 'http://localhost:8080/api/get-provinsi-asc';
export const URI_Lembaga_Sertifikasi  = 'http://localhost:8080/api/master-ls';
export const URI_map_company          = 'http://localhost:8080/api/api-map-company';
export const URI_map_hotel            = 'http://localhost:8080/api/api-map-hotel';
export const URI_map_restaurant       = 'http://localhost:8080/api/api-map-restaurant';