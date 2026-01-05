import { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./welcome.css";
import {
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
  MapsLogin
} from "../../assets";
import Hello from './hello';
import { Gap } from "../../component/atom";
import Select from 'react-select';
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from "react-redux";
import { TotalPerusahaan } from "../../config/Redux/action/getTotalPerusahaan";
import { TotalPerusahaanPieChart } from "../../config/Redux/action/getTotalPerusahaanPieChart";
import { MasterSertifikat } from "../../config/Redux/action/getMasterSertifikat";
import { MasterProvinsi } from "../../config/Redux/action/getMasterProvinsi";
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { auth } from "../../config/services";
import { logout } from "../../config/services";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useScrollAnimations } from './scrollAnimations';
import StarfieldBackground from './StarfieldBackground';


const content = [
  {
    body: `Aplikasi ini sangat memudahkan saya dalam memcari perusahan yang sudah memiliki sertifikat ISO !`,
    images: cf1,
    user: `Adit`,
    job: `HRGA Staff`,
  },
  {
    body: `Aplikasi ini hebat! saya bisa tahu mana hotel yang sudah bersertifikasi CHSE dan bintang 4!`,
    images: cf2,
    user: `Kurnia`,
    job: `Finance Staff`,
  },
  {
    body: `Dengan Aplikasi Label Map mempermudah saya menemukan restoran yang halal`,
    images: cf3,
    user: `Fauzan`,
    job: `IT Staff`,
  },
  {
    body: `Sangat membantu! Saya dapat dengan mudah menemukan pabrik kelapa sawit yang sudah memiliki sertifikasi ISPO yang valid`,
    images: cf4,
    user: `Armadani`,
    job: `Supply Chain Manager`,
  },
];

const sendMail = () => {
  const mailto = "mailto:info@labelmaps.com";
  window.location.href = mailto;
};

function Welcome() {

  // SCROLL ANIMATIONS
  useScrollAnimations();

  // CEK PENGGUNA YANG SEDANG LOGIN

  const auth                = getAuth();
  const [idUser, setIduser] = useState('');

  // DARK/LIGHT MODE STATE
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setIduser(uid)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  // console.log(idUser)

  //////////////////////////////////////////////////////////////////////////////////////////

  const { data:total_perusahaan }             = useSelector((state) => state.GetTotalPerusahaan); //FROM REDUCERS
  const { data:master_sertifikat }            = useSelector((state) => state.GetMasterSertifikat);
  const { data:master_provinsi }              = useSelector((state) => state.GetMasterProvinsi);
  const { data:total_perusahaan_pie_chart }   = useSelector((state) => state.GetTotalPerusahaanPieChart); //FROM REDUCERS
    
  const dispatch                = useDispatch();
  const history                 = useHistory();
  


  useEffect(() => {
    dispatch(TotalPerusahaan({iso_id: selectedOption}));
    dispatch(TotalPerusahaanPieChart({id_provinsi: selectedOptionProvPieChart, iso_id: selectedOptionIsoIdPieChart}));
    dispatch(MasterSertifikat());
    dispatch(MasterProvinsi());
  }, []);

  async function handleLogOut() {
    try{
      await logout();
      history.push("/")
      window.location.reload();
    } catch {
      alert("error")
    }
  }

  // Indonesia Map Canvas Visualization with MapsLogin.png background
  // Indonesia Map Canvas Visualization with MapsLogin.png background
useEffect(() => {
  const canvas = document.getElementById('mapCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Set canvas size
  canvas.width = 1370;
  canvas.height = 680;

  // Load the MapsLogin.png image as background
  const mapImage = new Image();
  mapImage.src = MapsLogin;

  // Major cities in Indonesia with coordinates - DISESUAIKAN DENGAN GAMBAR MAPSLOGIN.PNG
  const cities = [
    // Sumatra
    { name: 'Banda Aceh', x: 80, y: 100, size: 3 },
    { name: 'Medan', x: 130, y: 170, size: 4 },
    { name: 'Pekanbaru', x: 200, y: 230, size: 3 },
    { name: 'Padang', x: 170, y: 280, size: 3 },
    { name: 'Palembang', x: 260, y: 400, size: 4 },
    { name: 'Bandar Lampung', x: 300, y: 450, size: 3 },

    // Java
    { name: 'Jakarta', x: 380, y: 480, size: 6 },
    { name: 'Bandung', x: 410, y: 500, size: 5 },
    { name: 'Semarang', x: 490, y: 510, size: 4 },
    { name: 'Yogyakarta', x: 490, y: 550, size: 4 },
    { name: 'Surabaya', x: 580, y: 550, size: 5 },

    // Kalimantan
    { name: 'Pontianak', x: 470, y: 300, size: 3 },
    { name: 'Singkawang', x: 510, y: 250, size: 2 },
    { name: 'Palangkaraya', x: 570, y: 350, size: 3 },
    { name: 'Sampit', x: 650, y: 160, size: 2 },
    { name: 'Banjarmasin', x: 620, y: 390, size: 3 },
    { name: 'Balikpapan', x: 750, y: 320, size: 4 },
    { name: 'Samarinda', x: 740, y: 270, size: 3 },


    // Sulawesi
    { name: 'Manado', x: 900, y: 200, size: 3 },
    { name: 'Palu', x: 840, y: 320, size: 3 },
    { name: 'Makassar', x: 810, y: 400, size: 5 },
    { name: 'Kendari', x: 820, y: 450, size: 3 },

    // Bali & Nusa Tenggara
    { name: 'Denpasar', x: 640, y: 580, size: 4 },
    { name: 'Mataram', x: 780, y: 610, size: 3 },
    { name: 'Kupang', x: 830, y: 630, size: 3 },

    // Maluku & Papua
    { name: 'Ambon', x: 1040, y: 380, size: 3 },
    { name: 'Ternate', x: 950, y: 250, size: 2 },
    { name: 'Jayapura', x: 1270, y: 400, size: 4 },
    { name: 'Sorong', x: 1150, y: 330, size: 3 },
    { name: 'Manokwari', x: 1200, y: 350, size: 2 }
  ];

  // Create connections between cities - BAGIAN INI YANG HILANG
  const connections = [];

  // Main backbone connections
  const backboneConnections = [
    ['Banda Aceh', 'Medan'],
    ['Medan', 'Pekanbaru'],
    ['Pekanbaru', 'Padang'],
    ['Pekanbaru', 'Palembang'],
    ['Palembang', 'Bandar Lampung'],
    ['Bandar Lampung', 'Jakarta'],
    ['Jakarta', 'Bandung'],
    ['Bandung', 'Semarang'],
    ['Semarang', 'Yogyakarta'],
    ['Yogyakarta', 'Surabaya'],
    ['Palembang', 'Pontianak'],
    ['Pontianak', 'Singkawang'],
    ['Singkawang', 'Sintang'],
    ['Pontianak', 'Palangkaraya'],
    ['Palangkaraya', 'Sampit'],
    ['Sampit', 'Banjarmasin'],
    ['Banjarmasin', 'Balikpapan'],
    ['Balikpapan', 'Samarinda'],
    ['Samarinda', 'Bontang'],
    ['Bontang', 'Tarakan'],
    ['Tarakan', 'Nunukan'],
    ['Samarinda', 'Manado'],
    ['Manado', 'Palu'],
    ['Palu', 'Makassar'],
    ['Makassar', 'Kendari'],
    ['Surabaya', 'Denpasar'],
    ['Denpasar', 'Mataram'],
    ['Mataram', 'Kupang'],
    ['Kendari', 'Ambon'],
    ['Manado', 'Ternate'],
    ['Ambon', 'Sorong'],
    ['Sorong', 'Manokwari'],
    ['Manokwari', 'Jayapura'],
    ['Jakarta', 'Pontianak'],
    ['Semarang', 'Banjarmasin'],
    ['Surabaya', 'Makassar'],
    ['Balikpapan', 'Palu'],
    ['Denpasar', 'Makassar'],
    ['Tarakan', 'Manado']
  ];

  backboneConnections.forEach(([city1, city2]) => {
    const c1 = cities.find(c => c.name === city1);
    const c2 = cities.find(c => c.name === city2);
    if (c1 && c2) {
      connections.push({
        from: c1,
        to: c2,
        phase: Math.random() * Math.PI * 2
      });
    }
  });

  let time = 0;

  function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.02;

    // Check if light mode is active
    const isLightMode = document.body.classList.contains('light-mode');

    // Define colors based on theme
    const colors = isLightMode ? {
      lineStart: 'rgba(59, 130, 246, 0.4)',
      lineMiddle: 'rgba(6, 182, 212, 0.6)',
      lineEnd: 'rgba(59, 130, 246, 0.4)',
      particle: 'rgba(6, 182, 212, 0.9)',
      glowCenter: 'rgba(6, 182, 212, 0.8)',
      glowMiddle: 'rgba(59, 130, 246, 0.4)',
      glowEnd: 'rgba(59, 130, 246, 0)',
      ring: 'rgba(6, 182, 212, 0.6)',
      pointCenter: 'rgba(255, 255, 255, 1)',
      pointMiddle: 'rgba(6, 182, 212, 1)',
      pointEnd: 'rgba(59, 130, 246, 0.9)',
      text: 'rgba(6, 182, 212, 0.7)'
    } : {
      lineStart: 'rgba(59, 130, 246, 0.4)',
      lineMiddle: 'rgba(6, 182, 212, 0.6)',
      lineEnd: 'rgba(59, 130, 246, 0.4)',
      particle: 'rgba(6, 182, 212, 0.9)',
      glowCenter: 'rgba(6, 182, 212, 0.8)',
      glowMiddle: 'rgba(59, 130, 246, 0.4)',
      glowEnd: 'rgba(59, 130, 246, 0)',
      ring: 'rgba(6, 182, 212, 0.6)',
      pointCenter: 'rgba(255, 255, 255, 1)',
      pointMiddle: 'rgba(6, 182, 212, 1)',
      pointEnd: 'rgba(59, 130, 246, 0.9)',
      text: 'rgba(6, 182, 212, 0.7)'
    };

    // Draw background image (MapsLogin.png)
    if (mapImage.complete) {
      ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
    }

    // Draw connections with animated flow
    connections.forEach((conn) => {
      const flowPhase = (time + conn.phase) % (Math.PI * 2);
      const flowPos = (Math.sin(flowPhase) + 1) / 2;

      const gradient = ctx.createLinearGradient(
        conn.from.x, conn.from.y,
        conn.to.x, conn.to.y
      );
      gradient.addColorStop(0, colors.lineStart);
      gradient.addColorStop(0.5, colors.lineMiddle);
      gradient.addColorStop(1, colors.lineEnd);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(conn.from.x, conn.from.y);

      const midX = (conn.from.x + conn.to.x) / 2;
      const midY = (conn.from.y + conn.to.y) / 2;
      const distance = Math.sqrt(
        Math.pow(conn.to.x - conn.from.x, 2) +
        Math.pow(conn.to.y - conn.from.y, 2)
      );
      const curvature = Math.min(distance * 0.2, 50);

      ctx.quadraticCurveTo(
        midX, midY - curvature,
        conn.to.x, conn.to.y
      );
      ctx.stroke();
      ctx.setLineDash([]);

      // Animated particle on line
      const particleX = conn.from.x + (conn.to.x - conn.from.x) * flowPos;
      const particleY = conn.from.y + (conn.to.y - conn.from.y) * flowPos - curvature * Math.sin(Math.PI * flowPos);

      ctx.fillStyle = colors.particle;
      ctx.beginPath();
      ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw cities with pulsing effect
    cities.forEach((city, idx) => {
      const pulse = Math.sin(time * 2 + idx * 0.3) * 0.5 + 0.5;
      const baseSize = city.size * 1.2;
      const size = baseSize + pulse * 4;

      // Outer glow
      const glowGradient = ctx.createRadialGradient(
        city.x, city.y, 0,
        city.x, city.y, size * 4
      );
      glowGradient.addColorStop(0, colors.glowCenter);
      glowGradient.addColorStop(0.4, colors.glowMiddle);
      glowGradient.addColorStop(1, colors.glowEnd);

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(city.x, city.y, size * 4, 0, Math.PI * 2);
      ctx.fill();

      // Inner glow ring
      ctx.strokeStyle = isLightMode
        ? `rgba(30, 58, 138, ${0.4 + pulse * 0.2})`
        : `rgba(6, 182, 212, ${0.6 + pulse * 0.4})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(city.x, city.y, size * 2, 0, Math.PI * 2);
      ctx.stroke();

      // City point
      const pointGradient = ctx.createRadialGradient(
        city.x, city.y, 0,
        city.x, city.y, size
      );
      pointGradient.addColorStop(0, colors.pointCenter);
      pointGradient.addColorStop(0.4, colors.pointMiddle);
      pointGradient.addColorStop(1, colors.pointEnd);

      ctx.fillStyle = pointGradient;
      ctx.beginPath();
      ctx.arc(city.x, city.y, size, 0, Math.PI * 2);
      ctx.fill();

      // City name (for major cities)
      if (city.size >= 4) {
        ctx.fillStyle = colors.text;
        ctx.font = 'bold 11px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(city.name, city.x, city.y + size + 15);
      }
    });

    requestAnimationFrame(drawMap);
  }

  // Start drawing when image loads
  if (mapImage.complete) {
    drawMap();
  } else {
    mapImage.onload = drawMap;
  }

  // Cleanup on unmount
  return () => {
    // Cancel animation frame if needed
  };
}, [MapsLogin]);

  /////////////////////////////////////////// BAR CHART

  var dataNamaProvinsi                            = '';
  var dataTotalPerusahaan                         = '';
  var dataTotalPerusahaanTersertifikasiAktif      = '';
  var dataTotalPerusahaanTersertifikasiTidakAktif = '';
  var dataTotalPerusahaanBelumBersertifikat       = '';

  {
    total_perusahaan && total_perusahaan.map((value, i) => {
      dataNamaProvinsi                                += value.nama_provinsi+ ','; 
      dataTotalPerusahaan                             += value.total_perusahaan+ ','; 
      dataTotalPerusahaanTersertifikasiAktif          += value.total_perusahaan_tersertifikasi_aktif+ ','; 
      dataTotalPerusahaanTersertifikasiTidakAktif     += value.total_perusahaan_tersertifikasi_tidak_aktif+ ','; 
      dataTotalPerusahaanBelumBersertifikat           += value.total_perusahaan_belum_bersertifikat+ ','; 
    })
  }

  dataNamaProvinsi                                = [dataNamaProvinsi.split(',')];
  dataTotalPerusahaan                             = [dataTotalPerusahaan.split(',').map(Number)];
  dataTotalPerusahaanTersertifikasiAktif          = [dataTotalPerusahaanTersertifikasiAktif.split(',').map(Number)];
  dataTotalPerusahaanTersertifikasiTidakAktif     = [dataTotalPerusahaanTersertifikasiTidakAktif.split(',').map(Number)];
  dataTotalPerusahaanBelumBersertifikat           = [dataTotalPerusahaanBelumBersertifikat.split(',').map(Number)];

  // console.log('Nama Provinsi : ', dataNamaProvinsi[0])
  // console.log('Total Perusahaan : ', dataTotalPerusahaan[0])
  // console.log('Total Perusahaan Tersertifikasi Aktif : ', dataTotalPerusahaanTersertifikasiAktif[0])
  // console.log('Total Perusahaan Tersertifikasi Tidak Aktif : ', dataTotalPerusahaanTersertifikasiTidakAktif[0])
  // console.log('Total Perusahaan Belum Bersertifikat: ', dataTotalPerusahaanBelumBersertifikat[0])
  
  const series = [
    {
      name: 'Total Perusahaan',
      data: 
       [137,
        324,
        56 ,
        280,
        164,
        170,
        54 ,
        81 ,
        53 ,
        3  ,
        0  ,
        7  ,
        0  ,
        0  ,
        0  ,
        5  ,
        0  ,
        0  ,
        0  ,
        349,
        203,
        90 ,
        318,
        64 ,
        0  ,
        19 ,
        8  ,
        20 ,
        4  ,
        14 ,
        9  ,
        1  ,
        10 ,
        23 ]
    }, 
    {
      name: 'Perusahaan Tersertifikasi Aktif',
      data: dataTotalPerusahaanTersertifikasiAktif[0]
    }, {
      name: 'Perusahaan Tersertifikasi Tidak Aktif (Expired)',
      data: dataTotalPerusahaanTersertifikasiTidakAktif[0]
    },
    {
      name: 'Perusahaan Belum Tersertifikasi',
      // data: dataTotalPerusahaanBelumBersertifikat[0]
      data : [137-(dataTotalPerusahaanTersertifikasiAktif[0][0] +dataTotalPerusahaanTersertifikasiTidakAktif[0][0] ),
              324-(dataTotalPerusahaanTersertifikasiAktif[0][1] +dataTotalPerusahaanTersertifikasiTidakAktif[0][1] ),
              56 -(dataTotalPerusahaanTersertifikasiAktif[0][2] +dataTotalPerusahaanTersertifikasiTidakAktif[0][2] ),
              280-(dataTotalPerusahaanTersertifikasiAktif[0][3] +dataTotalPerusahaanTersertifikasiTidakAktif[0][3] ),
              164-(dataTotalPerusahaanTersertifikasiAktif[0][4] +dataTotalPerusahaanTersertifikasiTidakAktif[0][4] ),
              170-(dataTotalPerusahaanTersertifikasiAktif[0][5] +dataTotalPerusahaanTersertifikasiTidakAktif[0][5] ),
              54 -(dataTotalPerusahaanTersertifikasiAktif[0][6] +dataTotalPerusahaanTersertifikasiTidakAktif[0][6] ),
              81 -(dataTotalPerusahaanTersertifikasiAktif[0][7] +dataTotalPerusahaanTersertifikasiTidakAktif[0][7] ),
              53 -(dataTotalPerusahaanTersertifikasiAktif[0][8] +dataTotalPerusahaanTersertifikasiTidakAktif[0][8] ),
              3  -(dataTotalPerusahaanTersertifikasiAktif[0][9] +dataTotalPerusahaanTersertifikasiTidakAktif[0][9] ),
              0  -(dataTotalPerusahaanTersertifikasiAktif[0][10]+dataTotalPerusahaanTersertifikasiTidakAktif[0][10]),
              7  -(dataTotalPerusahaanTersertifikasiAktif[0][11]+dataTotalPerusahaanTersertifikasiTidakAktif[0][11]),
              0  -(dataTotalPerusahaanTersertifikasiAktif[0][12]+dataTotalPerusahaanTersertifikasiTidakAktif[0][12]),
              0  -(dataTotalPerusahaanTersertifikasiAktif[0][13]+dataTotalPerusahaanTersertifikasiTidakAktif[0][13]),
              0  -(dataTotalPerusahaanTersertifikasiAktif[0][14]+dataTotalPerusahaanTersertifikasiTidakAktif[0][14]),
              5  -(dataTotalPerusahaanTersertifikasiAktif[0][15]+dataTotalPerusahaanTersertifikasiTidakAktif[0][15]),
              0  -(dataTotalPerusahaanTersertifikasiAktif[0][16]+dataTotalPerusahaanTersertifikasiTidakAktif[0][16]),
              0  -(dataTotalPerusahaanTersertifikasiAktif[0][17]+dataTotalPerusahaanTersertifikasiTidakAktif[0][17]),
              0  -(dataTotalPerusahaanTersertifikasiAktif[0][18]+dataTotalPerusahaanTersertifikasiTidakAktif[0][18]),
              349-(dataTotalPerusahaanTersertifikasiAktif[0][19]+dataTotalPerusahaanTersertifikasiTidakAktif[0][19]),
              203-(dataTotalPerusahaanTersertifikasiAktif[0][20]+dataTotalPerusahaanTersertifikasiTidakAktif[0][20]),
              90 -(dataTotalPerusahaanTersertifikasiAktif[0][21]+dataTotalPerusahaanTersertifikasiTidakAktif[0][21]),
              318-(dataTotalPerusahaanTersertifikasiAktif[0][22]+dataTotalPerusahaanTersertifikasiTidakAktif[0][22]),
              64 -(dataTotalPerusahaanTersertifikasiAktif[0][23]+dataTotalPerusahaanTersertifikasiTidakAktif[0][23]),
              0  -(dataTotalPerusahaanTersertifikasiAktif[0][24]+dataTotalPerusahaanTersertifikasiTidakAktif[0][24]),
              19 -(dataTotalPerusahaanTersertifikasiAktif[0][25]+dataTotalPerusahaanTersertifikasiTidakAktif[0][25]),
              8  -(dataTotalPerusahaanTersertifikasiAktif[0][26]+dataTotalPerusahaanTersertifikasiTidakAktif[0][26]),
              20 -(dataTotalPerusahaanTersertifikasiAktif[0][27]+dataTotalPerusahaanTersertifikasiTidakAktif[0][27]),
              4  -(dataTotalPerusahaanTersertifikasiAktif[0][28]+dataTotalPerusahaanTersertifikasiTidakAktif[0][28]),
              14 -(dataTotalPerusahaanTersertifikasiAktif[0][29]+dataTotalPerusahaanTersertifikasiTidakAktif[0][29]),
              9  -(dataTotalPerusahaanTersertifikasiAktif[0][30]+dataTotalPerusahaanTersertifikasiTidakAktif[0][30]),
              1  -(dataTotalPerusahaanTersertifikasiAktif[0][31]+dataTotalPerusahaanTersertifikasiTidakAktif[0][31]),
              10 -(dataTotalPerusahaanTersertifikasiAktif[0][33]+dataTotalPerusahaanTersertifikasiTidakAktif[0][33]),
              23 -(dataTotalPerusahaanTersertifikasiAktif[0][32]+dataTotalPerusahaanTersertifikasiTidakAktif[0][32])]
    }
  ];
  
  const options = {
    chart: {
      type: 'bar',
      height: 200
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: dataNamaProvinsi[0],
    },
    yaxis: {
      title: {
        text: 'Jumlah Perusahaan'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Perusahaan"
        }
      }
    }
  }

  ////////////////////////// FILTER BAR CHART BERDASARKAN SERTIFIKAT

  const options_select = [];
  master_sertifikat && master_sertifikat.map((value, i) => { 
    options_select.push(
      { value: value.iso_id, label: value.iso_name },
    )
  })

  const getInitialStates = () => {
    const valueSelectedOption = "10";
    return valueSelectedOption;
  };

  const [selectedOption, setSelectedOption] = useState(getInitialStates);

  const handleChanges = (selectedOption) => {
    setSelectedOption({selectedOption});
    dispatch(TotalPerusahaan({iso_id: selectedOption.value}));
    // console.log(`Option selected:`, selectedOption.label);
    // console.log('Total Perusahaan BAR CHART : ', dataTotalPerusahaan[0])

  };



  ///////////////////////////////////// PIE CHART

  var totalPerusahaanPieChart                         = '';
  var totalPerusahaanTersertifikasiAktifPieChart      = '';
  var totalPerusahaanTersertifikasiTidakAktifPieChart = '';

  {
    total_perusahaan_pie_chart && total_perusahaan_pie_chart.map((value, i) => {
      totalPerusahaanPieChart                            = Number(value.total_perusahaan_perprovinsi); 
      totalPerusahaanTersertifikasiAktifPieChart         = Number(value.total_perusahaan_tersertifikasi_aktif); 
      totalPerusahaanTersertifikasiTidakAktifPieChart    = Number(value.total_perusahaan_tersertifikasi_tidak_aktif); 
    })
  }

  // console.log('totalPerusahaanPieChart',totalPerusahaanPieChart)
  // console.log('totalPerusahaanTersertifikasiAktifPieChart',totalPerusahaanTersertifikasiAktifPieChart)
  // console.log('totalPerusahaanTersertifikasiTidakAktifPieChart',totalPerusahaanTersertifikasiTidakAktifPieChart)
  
  
  const seriesPie  = [totalPerusahaanPieChart, totalPerusahaanTersertifikasiAktifPieChart, totalPerusahaanTersertifikasiTidakAktifPieChart, (totalPerusahaanPieChart - (totalPerusahaanTersertifikasiAktifPieChart + totalPerusahaanTersertifikasiTidakAktifPieChart))]

  const optionsPie = {
    chart: {
      width: 380,
      type: 'pie',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
      }
    },
    labels: ['Jumlah Perusahaan', 'Tersertifikat Aktif', 'Tersertifikasi Tidak Aktif (Expired)','Belum Tersertifikasi'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 380
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  ////////////////////////// FILTER PROVINSI PIE CHART BERDASARKAN SERTIFIKAT
  
  const options_select_prov_pie_chart = [];
  master_provinsi && master_provinsi.map((value, i) => { 
    options_select_prov_pie_chart.push(
      { value: value.id_provinsi, label: value.nama_provinsi },
    )
  })

  const getInitialStatesProvPieChart = () => {
    const valueSelectedOptionProvPieChart = "1";
    return valueSelectedOptionProvPieChart;
  };

  const [selectedOptionProvPieChart, setSelectedOptionProvPieChart] = useState(getInitialStatesProvPieChart);

  const handleChangesProvPieChart = (e) => {
    setSelectedOptionProvPieChart(e.value);
    dispatch(TotalPerusahaanPieChart({id_provinsi: e.value, iso_id: selectedOptionIsoIdPieChart}));
    // console.log(`Option selected:`, e.label);
    // console.log(`Option selected ISO:`, selectedOptionIsoIdPieChart.value);

  };

  ////////////////////////// FILTER SERTIFIKAT PIE CHART BERDASARKAN SERTIFIKAT

  const options_select_sert_pie_chart = [];
  master_sertifikat && master_sertifikat.map((value, i) => { 
    options_select_sert_pie_chart.push(
      { value: value.iso_id, label: value.iso_name },
    )
  })

  const getInitialStatesIsoIdPieChart = () => {
    const valueSelectedOptionIsoIdPieChart = "10";
    return valueSelectedOptionIsoIdPieChart;
  };

  const [selectedOptionIsoIdPieChart, setSelectedOptionIsoIdPieChart] = useState(getInitialStatesIsoIdPieChart);

  const handleChangesIsoIdPieChart = (e) => {
    setSelectedOptionIsoIdPieChart(e.value);
    dispatch(TotalPerusahaanPieChart({id_provinsi: selectedOptionProvPieChart, iso_id: e.value}));
    // console.log(`Option selected:`, e.label);
  };
  

  return (
    <>
      {/* Galaxy Starfield Background */}
      <StarfieldBackground />

      <div className="futuristic-container">
        {/* Background Overlay */}
        <div className="background-overlay"></div>

        {/* Header */}
        <header className="futuristic-header">
          <div className="header-content">
            <div className="logo-section">
              <img alt="logo label maps" className="logo-labelmaps" src={labelmapLogo} width={85} />
              <span className="brand-name">Label Maps</span>
            </div>
            <div className="auth-section">
              {/* Theme Toggle Button */}
              <button onClick={toggleTheme} className="theme-toggle-btn" title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                {isDarkMode ? (
                  // Sun icon for light mode
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  // Moon icon for dark mode
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>

              {idUser === '' ? (
                <>
                  <Link to="/login" className="auth-btn" style={{ textDecoration:'none' }}>
                    Login
                  </Link>
                </>
              ) : (
                <div onClick={handleLogOut} className="auth-btn">
                  Logout
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="futuristic-hero snap-section" id="hero">
          {/* Indonesia Map Canvas with MapsLogin.png Background */}
          <div className="map-container fade-in-right">
            <canvas id="mapCanvas" className="map-canvas"></canvas>
          </div>

          <div className="hero-content">
            <div className="hero-text-section fade-in-left">
              <h1 className="hero-title">
                Come On <br />Label your place
                <span className="title-accent">for Traceability</span>
              </h1>
              <p className="hero-subtitle">
                Indonesia's leading certificate tracking platform. Discover certified businesses across the archipelago with our advanced mapping system.
              </p>
              <div className="hero-cta-group">
                <Link to="/company" className="hero-cta-btn hero-cta-btn-primary stagger-1" style={{textDecoration:'none'}}>
                  <img className="cta-icon" src={mapsGif} alt="maps icon" />
                  Get Started
                </Link>
                {/* <a href="#!" className="hero-cta-btn hero-cta-btn-secondary stagger-2">
                  View Demo
                </a> */}
              </div>
            </div>
          </div>
        </section>

        {/* Map Chart Section */}
        <section className="chart-section snap-section" id="chart">
          <div className="section-header fade-in-up">
            <div className="section-badge stagger-1">📊 Data Visualization</div>
            <h2 className="section-title stagger-2">
              Indonesia <span className="highlight">Sustainable Certificate Index</span>
            </h2>
            <p className="section-description stagger-3">
              Explore comprehensive data about certified companies across all provinces in Indonesia
            </p>
          </div>

          <div className="fade-in-up stagger-4">
            <Hello name="CodeSandbox" />
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section snap-section" id="values">
          <div className="section-header fade-in-up">
            <div className="section-badge stagger-1">💡 Why Choose Us</div>
            <h2 className="section-title stagger-2">4 Priority <span className="highlight">Values</span></h2>
            <p className="section-description stagger-3">
              Building trust through transparency and excellence in certification mapping
            </p>
          </div>
          <div className="values-grid">
            <div className="value-card scale-in stagger-1">
              <div className="value-number">01</div>
              <div className="shimmer"></div>
              <div className="value-icon-wrapper">🏷️</div>
              <h3 className="value-title">Labelling Your Place</h3>
              <p className="value-description">Mark your location with certified standards and recognized credentials</p>
            </div>
            <div className="value-card scale-in stagger-2">
              <div className="value-number">02</div>
              <div className="shimmer"></div>
              <div className="value-icon-wrapper">✓</div>
              <h3 className="value-title">Provide Certainty</h3>
              <p className="value-description">Give confidence to end consumers with verified information</p>
            </div>
            <div className="value-card scale-in stagger-3">
              <div className="value-number">03</div>
              <div className="shimmer"></div>
              <div className="value-icon-wrapper">💎</div>
              <h3 className="value-title">Clear & Informative</h3>
              <p className="value-description">Present data in an attractive and easily understandable manner</p>
            </div>
            <div className="value-card scale-in stagger-4">
              <div className="value-number">04</div>
              <div className="shimmer"></div>
              <div className="value-icon-wrapper">🗺️</div>
              <h3 className="value-title">Spatial Communication</h3>
              <p className="value-description">Effectively communicate location information and coverage</p>
            </div>
          </div>
        </section>

        {/* Customer Feedback Section */}
        <section className="feedback-section snap-section" id="feedback">
          <div className="section-header fade-in-up">
            <div className="section-badge stagger-1">⭐ Testimonials</div>
            <h2 className="section-title stagger-2">Customer <span className="highlight">Feedback</span></h2>
            <p className="section-description stagger-3">
              Hear what our users say about their experience with Label Maps platform
            </p>
          </div>
          <div className="feedback-carousel fade-in-up stagger-4">
            <div className="feedback-track">
              {/* Duplicate content for seamless infinite scrolling */}
              {[...content, ...content].map((item, index) => {
                return (
                  <div key={index} className="feedback-card-futuristic scale-in">
                    <div className="quote-icon">
                      <img src={quote} alt="quote" />
                    </div>
                    <div className="feedback-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="star">★</span>
                      ))}
                    </div>
                    <p className="feedback-text">"{item.body}"</p>
                    <div className="feedback-author">
                      <img className="author-avatar" src={item.images} alt={item.user} />
                      <div className="author-info">
                        <div className="author-name">{item.user}</div>
                        <div className="author-role">{item.job}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="workflow-section snap-section" id="workflow">
          <div className="section-header fade-in-up">
            <div className="section-badge stagger-1">📋 Process</div>
            <h2 className="section-title stagger-2">Our <span className="highlight">Workflow</span></h2>
            <p className="section-description stagger-3">
              Simple, transparent, and efficient certification process
            </p>
          </div>
          <p className="workflow-intro fade-in-up stagger-4">
            Our streamlined process guides you from initial assessment to final certification with clarity and precision at every step.
          </p>
          <div className="workflow-cards">
            <div className="workflow-card fade-in-up stagger-1">
              <div className="step-badge">Step 1</div>
              <div className="shimmer"></div>
              <div className="connection-line"></div>
              <div className="step-number">01</div>
              <h3 className="workflow-title">Define Control Points</h3>
              <p className="workflow-description">
                Use label maps ready-to-use checklists or customize them with our specialists according to your specific needs and requirements.
              </p>
              <div className="workflow-progress">
                <div className="workflow-progress-bar"></div>
              </div>
            </div>
            <div className="workflow-card featured fade-in-up stagger-2">
              <div className="step-badge">Step 2</div>
              <div className="shimmer"></div>
              <div className="connection-line"></div>
              <div className="step-number">02</div>
              <h3 className="workflow-title">Conduct the Audit</h3>
              <p className="workflow-description">
                Global coverage with possibility to conduct both remote audits and/or field audits, thanks to our best-in-class digital solutions.
              </p>
              <div className="workflow-progress">
                <div className="workflow-progress-bar"></div>
              </div>
            </div>
            <div className="workflow-card fade-in-up stagger-3">
              <div className="step-badge">Step 3</div>
              <div className="shimmer"></div>
              <div className="step-number">03</div>
              <h3 className="workflow-title">Grant the Label</h3>
              <p className="workflow-description">
                Possibility to use Label maps standard label or to design your own label with dedicated branding and custom styling.
              </p>
              <div className="workflow-progress">
                <div className="workflow-progress-bar"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section snap-section" id="contact">
          <div className="section-header fade-in-up">
            <div className="section-badge stagger-1">✉️ Get In Touch</div>
            <h2 className="section-title stagger-2">Send Us <span className="highlight">Message</span></h2>
            <p className="section-description stagger-3">
              Have questions or need assistance? We're here to help you
            </p>
          </div>
          <div className="contact-container">
            <div className="fade-in-left stagger-1">
              <img src={person} alt="contact" className="contact-image" />
            </div>
            <div className="contact-form-card fade-in-right stagger-2">
              <div className="form-row">
                <div className="form-group">
                  <input type="email" className="futuristic-input" placeholder="Your Email" />
                </div>
                <div className="form-group">
                  <input type="text" className="futuristic-input" placeholder="Your Name" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" className="futuristic-input" placeholder="Phone Number" />
                </div>
                <div className="form-group">
                  <input type="text" className="futuristic-input" placeholder="Subject" />
                </div>
              </div>
              <div className="form-group">
                <label className="input-label">Your Message</label>
                <textarea className="futuristic-textarea" rows="4" placeholder="Type your message here..."></textarea>
              </div>
              <div className="form-checkbox">
                <input type="checkbox" id="privacyCheck" className="checkbox-input" />
                <label htmlFor="privacyCheck" className="checkbox-label">
                  By sending this message, you confirm that you have read and agreed to our privacy-policy.
                </label>
              </div>
              <button type="submit" className="submit-btn futuristic-btn">
                Submit Message
                <i className="fas fa-paper-plane ml-2"></i>
              </button>
            </div>
          </div>
        {/* Footer */}
        <footer className="futuristic-footer" id="footer">
          <div className="footer-content">
            <div className="footer-section footer-brand fade-in-up stagger-1">
              <h3 className="footer-title">Label Maps</h3>
              <p className="footer-description">
                Whatever your business activity, restart operations as quickly as possible with appropriate Health, Safety and Hygiene conditions. We're here to help you succeed.
              </p>
              <div className="social-links">
                <Link to="#!" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="#!" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="#!" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="#!" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
            <div className="footer-section fade-in-up stagger-2">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/company">Map View</Link></li>
                <li><Link to="/#!">About Us</Link></li>
                <li><Link to="/#!">Services</Link></li>
                <li><Link to="/#!">Certifications</Link></li>
              </ul>
            </div>
            <div className="footer-section fade-in-up stagger-3">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                <li><Link to="/#!">Terms & Condition</Link></li>
                <li><Link to="/#!">Privacy Policy</Link></li>
                <li><Link to="/#!">Imprint</Link></li>
                <li><Link to="/#!">Legal Notice</Link></li>
              </ul>
            </div>
            <div className="footer-section fade-in-up stagger-4">
              <h4 className="footer-heading">Contact Us</h4>
              <ul className="footer-contact">
                <li className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Ruko Pondok Cabe Mutiara Blok B16 Tangerang Selatan</span>
                </li>
                <li className="contact-item">
                  <i className="fa fa-phone"></i>
                  <span>+6221 7447 5110</span>
                </li>
                <li className="contact-item">
                  <i className="far fa-envelope"></i>
                  <span>info@labelmaps.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom fade-in-up">
            <p>&copy; 2025 Label Maps. All rights reserved. Made with ❤️ in Indonesia</p>
          </div>
        </footer>
        </section>

      </div>
    </>
  );
}

export default Welcome;
