import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { MasterSertifikat } from "../../config/Redux/action/getMasterSertifikat";
import { TotalPerusahaanHighChart } from "../../config/Redux/action/getTotalPerusahaanHighChart";
import idnAll from "./idnAll";
import Highcharts from "highcharts";
import HighMaps from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import exporting from 'highcharts/modules/exporting';

require("highcharts/modules/map")(Highcharts);
exporting(Highcharts)  // App is crashed trigger by exporting function

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function test(x, expect) {
    const result = numberWithCommas(x);
    const pass = result === expect;
    console.log(`${pass ? "✓" : "ERROR ====>"} ${x} => ${result}`);
    return pass;
}

function CustomHighMap() {

    // HIGHCHART MAPS INDONESIA
    const { data:total_perusahaan_high_chart }  = useSelector((state) => state.GetTotalPerusahaanHighChart); //FROM REDUCERS
    const { data:master_sertifikat }            = useSelector((state) => state.GetMasterSertifikat);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(TotalPerusahaanHighChart({iso_id: selectedOptionHighChart}));
        dispatch(MasterSertifikat());
    }, []);

    /////////////////////////////////////////// HIGH CHART MAPS

    var dataTotalPerusahaanHighChart                                 = '';
    var dataTotalPerusahaanTersertifikasiAktifHighChart              = '';
    var dataTotalPerusahaanTersertifikasiTidakAktifHighChart         = '';
    var dataTotalPerusahaanBelumBersertifikatHighChart               = '';

    {
        total_perusahaan_high_chart && total_perusahaan_high_chart.map((value, i) => {
            dataTotalPerusahaanHighChart                                     += value.total_perusahaan+ ','; 
            dataTotalPerusahaanTersertifikasiAktifHighChart                  += value.total_perusahaan_tersertifikasi_aktif+ ','; 
            dataTotalPerusahaanTersertifikasiTidakAktifHighChart             += value.total_perusahaan_tersertifikasi_tidak_aktif+ ','; 
            dataTotalPerusahaanBelumBersertifikatHighChart                   += value.total_perusahaan_belum_bersertifikat+ ','; 
        })
    }

    dataTotalPerusahaanHighChart                                     = [dataTotalPerusahaanHighChart.split(',').map(Number)];
    dataTotalPerusahaanTersertifikasiAktifHighChart                  = [dataTotalPerusahaanTersertifikasiAktifHighChart.split(',').map(Number)];
    dataTotalPerusahaanTersertifikasiTidakAktifHighChart             = [dataTotalPerusahaanTersertifikasiTidakAktifHighChart.split(',').map(Number)];
    dataTotalPerusahaanBelumBersertifikatHighChart                   = [dataTotalPerusahaanBelumBersertifikatHighChart.split(',').map(Number)];

    // console.log('dataTotalPerusahaanHighChart ',dataTotalPerusahaanHighChart [0])
    ////////////////////////// HIGH CHART MAPS

    const options_select_highchart = [];
    let label_keterangan           = '';

    master_sertifikat && master_sertifikat.map((value, i) => { 
        if(value.iso_id == 10){

            label_keterangan    = ' ( Indonesia Sustainable Palm Oil )';

        }else if(value.iso_id == 1){

            label_keterangan = ' ( Quality Management System )';

        }else if(value.iso_id == 2){

            label_keterangan = ' ( Food Management System )';

        }else if(value.iso_id == 4){

            label_keterangan = '';

        }else if(value.iso_id == 6){

            label_keterangan = ' ( Environment Management System )';

        }else if(value.iso_id == 7){

            label_keterangan = ' ( Occupational Health and Safety )';

        }else if(value.iso_id == 8){

            label_keterangan = ' ( Quality Management Medical Devices )';

        }else if(value.iso_id == 9){

            label_keterangan = '';

        }else if(value.iso_id == 11){

            label_keterangan = ' ( Information Security Management )';

        }
        options_select_highchart.push(
            { value: value.iso_id, label: label_keterangan+' '+value.iso_name},
        )
    })


    const getInitialStatesHighChart = () => {
        const valueSelectedOptionHighChart = "10";
        return valueSelectedOptionHighChart;
    };
    
    const [selectedOptionHighChart, setSelectedOptionHighChart] = useState(getInitialStatesHighChart);

    const getInitialStatesHighChartLabelName = () => {
        const valueSelectedOptionHighChartLabelName = "ISPO ( Indonesia Sustainable Palm Oil )";
        return valueSelectedOptionHighChartLabelName;
    };
    
    const [selectedOptionHighChartLabelName, setSelectedOptionHighChartLabelName] = useState(getInitialStatesHighChartLabelName);

    
    const handleChangesHighchart = (e) => {
        setSelectedOptionHighChart(e.value);
        setSelectedOptionHighChartLabelName(e.label);
        dispatch(TotalPerusahaanHighChart({iso_id: e.value}));
        // console.log(e.value)
        // console.log(e.label)
    };    

    // DATA REAL
    // let rumus_sci_ac   = dataTotalPerusahaanHighChart[0][0]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][0]  / dataTotalPerusahaanHighChart[0][0])  * 100 : 0;
    // let rumus_sci_su   = dataTotalPerusahaanHighChart[0][1]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][1]  / dataTotalPerusahaanHighChart[0][1])  * 100 : 0;
    // let rumus_sci_sb   = dataTotalPerusahaanHighChart[0][2]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][2]  / dataTotalPerusahaanHighChart[0][2])  * 100 : 0;
    // let rumus_sci_ri   = dataTotalPerusahaanHighChart[0][3]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][3]  / dataTotalPerusahaanHighChart[0][3])  * 100 : 0;
    // let rumus_sci_ja   = dataTotalPerusahaanHighChart[0][4]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][4]  / dataTotalPerusahaanHighChart[0][4])  * 100 : 0;
    // let rumus_sci_sl   = dataTotalPerusahaanHighChart[0][5]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][5]  / dataTotalPerusahaanHighChart[0][5])  * 100 : 0;
    // let rumus_sci_be   = dataTotalPerusahaanHighChart[0][6]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][6]  / dataTotalPerusahaanHighChart[0][6])  * 100 : 0;
    // let rumus_sci_1024 = dataTotalPerusahaanHighChart[0][7]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][7]  / dataTotalPerusahaanHighChart[0][7])  * 100 : 0;
    // let rumus_sci_bb   = dataTotalPerusahaanHighChart[0][8]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][8]  / dataTotalPerusahaanHighChart[0][8])  * 100 : 0;
    // let rumus_sci_kr   = dataTotalPerusahaanHighChart[0][9]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][9]  / dataTotalPerusahaanHighChart[0][9])  * 100 : 0;
    // let rumus_sci_jk   = dataTotalPerusahaanHighChart[0][10] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][10] / dataTotalPerusahaanHighChart[0][10]) * 100 : 0;
    // let rumus_sci_jr   = dataTotalPerusahaanHighChart[0][11] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][11] / dataTotalPerusahaanHighChart[0][11]) * 100 : 0;
    // let rumus_sci_jt   = dataTotalPerusahaanHighChart[0][12] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][12] / dataTotalPerusahaanHighChart[0][12]) * 100 : 0;
    // let rumus_sci_yo   = dataTotalPerusahaanHighChart[0][13] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][13] / dataTotalPerusahaanHighChart[0][13]) * 100 : 0;
    // let rumus_sci_ji   = dataTotalPerusahaanHighChart[0][14] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][14] / dataTotalPerusahaanHighChart[0][14]) * 100 : 0;
    // let rumus_sci_bt   = dataTotalPerusahaanHighChart[0][15] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][15] / dataTotalPerusahaanHighChart[0][15]) * 100 : 0;
    // let rumus_sci_ba   = dataTotalPerusahaanHighChart[0][16] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][16] / dataTotalPerusahaanHighChart[0][16]) * 100 : 0;
    // let rumus_sci_nb   = dataTotalPerusahaanHighChart[0][17] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][17] / dataTotalPerusahaanHighChart[0][17]) * 100 : 0;
    // let rumus_sci_nt   = dataTotalPerusahaanHighChart[0][18] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][18] / dataTotalPerusahaanHighChart[0][18]) * 100 : 0;
    // let rumus_sci_kb   = dataTotalPerusahaanHighChart[0][19] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][19] / dataTotalPerusahaanHighChart[0][19]) * 100 : 0;
    // let rumus_sci_kt   = dataTotalPerusahaanHighChart[0][20] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][20] / dataTotalPerusahaanHighChart[0][20]) * 100 : 0;
    // let rumus_sci_ks   = dataTotalPerusahaanHighChart[0][21] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][21] / dataTotalPerusahaanHighChart[0][21]) * 100 : 0;
    // let rumus_sci_ki   = dataTotalPerusahaanHighChart[0][22] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][22] / dataTotalPerusahaanHighChart[0][22]) * 100 : 0;
    // let rumus_sci_ku   = dataTotalPerusahaanHighChart[0][23] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][23] / dataTotalPerusahaanHighChart[0][23]) * 100 : 0;
    // let rumus_sci_sw   = dataTotalPerusahaanHighChart[0][24] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][24] / dataTotalPerusahaanHighChart[0][24]) * 100 : 0;
    // let rumus_sci_st   = dataTotalPerusahaanHighChart[0][25] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][25] / dataTotalPerusahaanHighChart[0][25]) * 100 : 0;
    // let rumus_sci_se   = dataTotalPerusahaanHighChart[0][26] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][26] / dataTotalPerusahaanHighChart[0][26]) * 100 : 0;
    // let rumus_sci_sg   = dataTotalPerusahaanHighChart[0][27] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][27] / dataTotalPerusahaanHighChart[0][27]) * 100 : 0;
    // let rumus_sci_go   = dataTotalPerusahaanHighChart[0][28] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][28] / dataTotalPerusahaanHighChart[0][28]) * 100 : 0;
    // let rumus_sci_sr   = dataTotalPerusahaanHighChart[0][29] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][29] / dataTotalPerusahaanHighChart[0][29]) * 100 : 0;
    // let rumus_sci_ma   = dataTotalPerusahaanHighChart[0][30] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][30] / dataTotalPerusahaanHighChart[0][30]) * 100 : 0;
    // let rumus_sci_la   = dataTotalPerusahaanHighChart[0][31] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][31] / dataTotalPerusahaanHighChart[0][31]) * 100 : 0;
    // let rumus_sci_pa   = dataTotalPerusahaanHighChart[0][32] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][32] / dataTotalPerusahaanHighChart[0][32]) * 100 : 0;
    // let rumus_sci_ib   = dataTotalPerusahaanHighChart[0][33] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][33] / dataTotalPerusahaanHighChart[0][33]) * 100 : 0;

    //DATA DUMY
    let rumus_sci_ac   = selectedOptionHighChart == 10 ? (137 != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][0]  / 137 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][0]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][0]  / dataTotalPerusahaanHighChart[0][0])  * 100 : 0);
    let rumus_sci_su   = selectedOptionHighChart == 10 ? (324 != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][1]  / 324 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][1]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][1]  / dataTotalPerusahaanHighChart[0][1])  * 100 : 0);
    let rumus_sci_sb   = selectedOptionHighChart == 10 ? (56  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][2]  / 56  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][2]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][2]  / dataTotalPerusahaanHighChart[0][2])  * 100 : 0);
    let rumus_sci_ri   = selectedOptionHighChart == 10 ? (280 != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][3]  / 280 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][3]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][3]  / dataTotalPerusahaanHighChart[0][3])  * 100 : 0);
    let rumus_sci_ja   = selectedOptionHighChart == 10 ? (164 != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][4]  / 164 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][4]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][4]  / dataTotalPerusahaanHighChart[0][4])  * 100 : 0);
    let rumus_sci_sl   = selectedOptionHighChart == 10 ? (170 != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][5]  / 170 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][5]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][5]  / dataTotalPerusahaanHighChart[0][5])  * 100 : 0);
    let rumus_sci_be   = selectedOptionHighChart == 10 ? (54  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][6]  / 54  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][6]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][6]  / dataTotalPerusahaanHighChart[0][6])  * 100 : 0);
    let rumus_sci_1024 = selectedOptionHighChart == 10 ? (81  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][7]  / 81  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][7]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][7]  / dataTotalPerusahaanHighChart[0][7])  * 100 : 0);
    let rumus_sci_bb   = selectedOptionHighChart == 10 ? (53  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][8]  / 53  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][8]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][8]  / dataTotalPerusahaanHighChart[0][8])  * 100 : 0);
    let rumus_sci_kr   = selectedOptionHighChart == 10 ? (3   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][9]  / 3   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][9]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][9]  / dataTotalPerusahaanHighChart[0][9])  * 100 : 0);
    let rumus_sci_jk   = selectedOptionHighChart == 10 ? (0   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][10] / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][10] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][10] / dataTotalPerusahaanHighChart[0][10]) * 100 : 0);
    let rumus_sci_jr   = selectedOptionHighChart == 10 ? (7   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][11] / 7   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][11] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][11] / dataTotalPerusahaanHighChart[0][11]) * 100 : 0);
    let rumus_sci_jt   = selectedOptionHighChart == 10 ? (0   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][12] / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][12] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][12] / dataTotalPerusahaanHighChart[0][12]) * 100 : 0);
    let rumus_sci_yo   = selectedOptionHighChart == 10 ? (0   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][13] / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][13] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][13] / dataTotalPerusahaanHighChart[0][13]) * 100 : 0);
    let rumus_sci_ji   = selectedOptionHighChart == 10 ? (0   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][14] / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][14] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][14] / dataTotalPerusahaanHighChart[0][14]) * 100 : 0);
    let rumus_sci_bt   = selectedOptionHighChart == 10 ? (5   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][15] / 5   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][15] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][15] / dataTotalPerusahaanHighChart[0][15]) * 100 : 0);
    let rumus_sci_ba   = selectedOptionHighChart == 10 ? (0   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][16] / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][16] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][16] / dataTotalPerusahaanHighChart[0][16]) * 100 : 0);
    let rumus_sci_nb   = selectedOptionHighChart == 10 ? (0   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][17] / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][17] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][17] / dataTotalPerusahaanHighChart[0][17]) * 100 : 0);
    let rumus_sci_nt   = selectedOptionHighChart == 10 ? (0   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][18] / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][18] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][18] / dataTotalPerusahaanHighChart[0][18]) * 100 : 0);
    let rumus_sci_kb   = selectedOptionHighChart == 10 ? (349 != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][19] / 349 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][19] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][19] / dataTotalPerusahaanHighChart[0][19]) * 100 : 0);
    let rumus_sci_kt   = selectedOptionHighChart == 10 ? (203 != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][20] / 203 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][20] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][20] / dataTotalPerusahaanHighChart[0][20]) * 100 : 0);
    let rumus_sci_ks   = selectedOptionHighChart == 10 ? (90  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][21] / 90  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][21] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][21] / dataTotalPerusahaanHighChart[0][21]) * 100 : 0);
    let rumus_sci_ki   = selectedOptionHighChart == 10 ? (318 != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][22] / 318 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][22] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][22] / dataTotalPerusahaanHighChart[0][22]) * 100 : 0);
    let rumus_sci_ku   = selectedOptionHighChart == 10 ? (64  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][23] / 64  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][23] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][23] / dataTotalPerusahaanHighChart[0][23]) * 100 : 0);
    let rumus_sci_sw   = selectedOptionHighChart == 10 ? (0   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][24] / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][24] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][24] / dataTotalPerusahaanHighChart[0][24]) * 100 : 0);
    let rumus_sci_st   = selectedOptionHighChart == 10 ? (19  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][25] / 19  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][25] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][25] / dataTotalPerusahaanHighChart[0][25]) * 100 : 0);
    let rumus_sci_se   = selectedOptionHighChart == 10 ? (8   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][26] / 8   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][26] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][26] / dataTotalPerusahaanHighChart[0][26]) * 100 : 0);
    let rumus_sci_sg   = selectedOptionHighChart == 10 ? (20  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][27] / 20  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][27] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][27] / dataTotalPerusahaanHighChart[0][27]) * 100 : 0);
    let rumus_sci_go   = selectedOptionHighChart == 10 ? (4   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][28] / 4   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][28] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][28] / dataTotalPerusahaanHighChart[0][28]) * 100 : 0);
    let rumus_sci_sr   = selectedOptionHighChart == 10 ? (14  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][29] / 14  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][29] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][29] / dataTotalPerusahaanHighChart[0][29]) * 100 : 0);
    let rumus_sci_ma   = selectedOptionHighChart == 10 ? (9   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][30] / 9   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][30] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][30] / dataTotalPerusahaanHighChart[0][30]) * 100 : 0);
    let rumus_sci_la   = selectedOptionHighChart == 10 ? (1   != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][31] / 1   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][31] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][31] / dataTotalPerusahaanHighChart[0][31]) * 100 : 0);
    let rumus_sci_ib   = selectedOptionHighChart == 10 ? (10  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][33] / 10  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][33] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][33] / dataTotalPerusahaanHighChart[0][33]) * 100 : 0);
    let rumus_sci_pa   = selectedOptionHighChart == 10 ? (23  != 0 ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][32] / 23  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][32] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][32] / dataTotalPerusahaanHighChart[0][32]) * 100 : 0);

    
    // let rumus_sci_ac   = selectedOptionHighChart == 10 ? (137 != 0 ? (80  / 137 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][0]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][0]  / dataTotalPerusahaanHighChart[0][0])  * 100 : 0);
    // let rumus_sci_su   = selectedOptionHighChart == 10 ? (324 != 0 ? (170 / 324 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][1]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][1]  / dataTotalPerusahaanHighChart[0][1])  * 100 : 0);
    // let rumus_sci_sb   = selectedOptionHighChart == 10 ? (56  != 0 ? (30  / 56  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][2]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][2]  / dataTotalPerusahaanHighChart[0][2])  * 100 : 0);
    // let rumus_sci_ri   = selectedOptionHighChart == 10 ? (280 != 0 ? (120 / 280 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][3]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][3]  / dataTotalPerusahaanHighChart[0][3])  * 100 : 0);
    // let rumus_sci_ja   = selectedOptionHighChart == 10 ? (164 != 0 ? (84  / 164 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][4]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][4]  / dataTotalPerusahaanHighChart[0][4])  * 100 : 0);
    // let rumus_sci_sl   = selectedOptionHighChart == 10 ? (170 != 0 ? (85  / 170 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][5]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][5]  / dataTotalPerusahaanHighChart[0][5])  * 100 : 0);
    // let rumus_sci_be   = selectedOptionHighChart == 10 ? (54  != 0 ? (30  / 54  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][6]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][6]  / dataTotalPerusahaanHighChart[0][6])  * 100 : 0);
    // let rumus_sci_1024 = selectedOptionHighChart == 10 ? (81  != 0 ? (50  / 81  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][7]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][7]  / dataTotalPerusahaanHighChart[0][7])  * 100 : 0);
    // let rumus_sci_bb   = selectedOptionHighChart == 10 ? (53  != 0 ? (35  / 53  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][8]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][8]  / dataTotalPerusahaanHighChart[0][8])  * 100 : 0);
    // let rumus_sci_kr   = selectedOptionHighChart == 10 ? (3   != 0 ? (2   / 3   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][9]  != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][9]  / dataTotalPerusahaanHighChart[0][9])  * 100 : 0);
    // let rumus_sci_jk   = selectedOptionHighChart == 10 ? (0   != 0 ? (0   / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][10] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][10] / dataTotalPerusahaanHighChart[0][10]) * 100 : 0);
    // let rumus_sci_jr   = selectedOptionHighChart == 10 ? (7   != 0 ? (6   / 7   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][11] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][11] / dataTotalPerusahaanHighChart[0][11]) * 100 : 0);
    // let rumus_sci_jt   = selectedOptionHighChart == 10 ? (0   != 0 ? (0   / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][12] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][12] / dataTotalPerusahaanHighChart[0][12]) * 100 : 0);
    // let rumus_sci_yo   = selectedOptionHighChart == 10 ? (0   != 0 ? (0   / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][13] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][13] / dataTotalPerusahaanHighChart[0][13]) * 100 : 0);
    // let rumus_sci_ji   = selectedOptionHighChart == 10 ? (0   != 0 ? (0   / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][14] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][14] / dataTotalPerusahaanHighChart[0][14]) * 100 : 0);
    // let rumus_sci_bt   = selectedOptionHighChart == 10 ? (5   != 0 ? (3   / 5   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][15] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][15] / dataTotalPerusahaanHighChart[0][15]) * 100 : 0);
    // let rumus_sci_ba   = selectedOptionHighChart == 10 ? (0   != 0 ? (0   / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][16] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][16] / dataTotalPerusahaanHighChart[0][16]) * 100 : 0);
    // let rumus_sci_nb   = selectedOptionHighChart == 10 ? (0   != 0 ? (0   / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][17] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][17] / dataTotalPerusahaanHighChart[0][17]) * 100 : 0);
    // let rumus_sci_nt   = selectedOptionHighChart == 10 ? (0   != 0 ? (0   / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][18] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][18] / dataTotalPerusahaanHighChart[0][18]) * 100 : 0);
    // let rumus_sci_kb   = selectedOptionHighChart == 10 ? (349 != 0 ? (200 / 349 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][19] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][19] / dataTotalPerusahaanHighChart[0][19]) * 100 : 0);
    // let rumus_sci_kt   = selectedOptionHighChart == 10 ? (203 != 0 ? (120 / 203 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][20] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][20] / dataTotalPerusahaanHighChart[0][20]) * 100 : 0);
    // let rumus_sci_ks   = selectedOptionHighChart == 10 ? (90  != 0 ? (60  / 90  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][21] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][21] / dataTotalPerusahaanHighChart[0][21]) * 100 : 0);
    // let rumus_sci_ki   = selectedOptionHighChart == 10 ? (318 != 0 ? (170 / 318 )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][22] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][22] / dataTotalPerusahaanHighChart[0][22]) * 100 : 0);
    // let rumus_sci_ku   = selectedOptionHighChart == 10 ? (64  != 0 ? (40  / 64  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][23] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][23] / dataTotalPerusahaanHighChart[0][23]) * 100 : 0);
    // let rumus_sci_sw   = selectedOptionHighChart == 10 ? (0   != 0 ? (0   / 0   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][24] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][24] / dataTotalPerusahaanHighChart[0][24]) * 100 : 0);
    // let rumus_sci_st   = selectedOptionHighChart == 10 ? (19  != 0 ? (10  / 19  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][25] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][25] / dataTotalPerusahaanHighChart[0][25]) * 100 : 0);
    // let rumus_sci_se   = selectedOptionHighChart == 10 ? (8   != 0 ? (6   / 8   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][26] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][26] / dataTotalPerusahaanHighChart[0][26]) * 100 : 0);
    // let rumus_sci_sg   = selectedOptionHighChart == 10 ? (20  != 0 ? (10  / 20  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][27] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][27] / dataTotalPerusahaanHighChart[0][27]) * 100 : 0);
    // let rumus_sci_go   = selectedOptionHighChart == 10 ? (4   != 0 ? (4   / 4   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][28] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][28] / dataTotalPerusahaanHighChart[0][28]) * 100 : 0);
    // let rumus_sci_sr   = selectedOptionHighChart == 10 ? (14  != 0 ? (11  / 14  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][29] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][29] / dataTotalPerusahaanHighChart[0][29]) * 100 : 0);
    // let rumus_sci_ma   = selectedOptionHighChart == 10 ? (9   != 0 ? (5   / 9   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][30] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][30] / dataTotalPerusahaanHighChart[0][30]) * 100 : 0);
    // let rumus_sci_la   = selectedOptionHighChart == 10 ? (1   != 0 ? (1   / 1   )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][31] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][31] / dataTotalPerusahaanHighChart[0][31]) * 100 : 0);
    // let rumus_sci_ib   = selectedOptionHighChart == 10 ? (10  != 0 ? (6   / 10  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][33] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][33] / dataTotalPerusahaanHighChart[0][33]) * 100 : 0);
    // let rumus_sci_pa   = selectedOptionHighChart == 10 ? (23  != 0 ? (15  / 23  )  * 100 : 0) : (dataTotalPerusahaanHighChart[0][32] != '' ? (dataTotalPerusahaanTersertifikasiAktifHighChart[0][32] / dataTotalPerusahaanHighChart[0][32]) * 100 : 0);

    // console.log('rumus_sci_ac',rumus_sci_ac == NaN ? 0 : rumus_sci_ac )
    // console.log('rumus_sci_ku',rumus_sci_ku == NaN ? 0 : rumus_sci_ku )
    let sci_color_ac     = rumus_sci_ac     > 90 && rumus_sci_ac   <= 100 ? '#008000' : ( rumus_sci_ac   > 80 && rumus_sci_ac   <= 90 ? '#008000' : ( rumus_sci_ac   > 70 && rumus_sci_ac   <= 80 ? '#008000' : ( rumus_sci_ac   > 60 && rumus_sci_ac   <= 70 ? '#FFFF00' : ( rumus_sci_ac   > 50 && rumus_sci_ac   <= 60 ? '#FFFF00' : ( rumus_sci_ac   > 40 && rumus_sci_ac   <= 50 ? '#FFFF00' : ( rumus_sci_ac   > 30 && rumus_sci_ac   <= 40 ? 'red' : ( rumus_sci_ac   > 20 && rumus_sci_ac   <= 30 ? 'red' : ( rumus_sci_ac   > 10 && rumus_sci_ac   <= 20 ? 'red' : 'red'))))))));
    let sci_color_su     = rumus_sci_su     > 90 && rumus_sci_su   <= 100 ? '#008000' : ( rumus_sci_su   > 80 && rumus_sci_su   <= 90 ? '#008000' : ( rumus_sci_su   > 70 && rumus_sci_su   <= 80 ? '#008000' : ( rumus_sci_su   > 60 && rumus_sci_su   <= 70 ? '#FFFF00' : ( rumus_sci_su   > 50 && rumus_sci_su   <= 60 ? '#FFFF00' : ( rumus_sci_su   > 40 && rumus_sci_su   <= 50 ? '#FFFF00' : ( rumus_sci_su   > 30 && rumus_sci_su   <= 40 ? 'red' : ( rumus_sci_su   > 20 && rumus_sci_su   <= 30 ? 'red' : ( rumus_sci_su   > 10 && rumus_sci_su   <= 20 ? 'red' : 'red'))))))));
    let sci_color_sb     = rumus_sci_sb     > 90 && rumus_sci_sb   <= 100 ? '#008000' : ( rumus_sci_sb   > 80 && rumus_sci_sb   <= 90 ? '#008000' : ( rumus_sci_sb   > 70 && rumus_sci_sb   <= 80 ? '#008000' : ( rumus_sci_sb   > 60 && rumus_sci_sb   <= 70 ? '#FFFF00' : ( rumus_sci_sb   > 50 && rumus_sci_sb   <= 60 ? '#FFFF00' : ( rumus_sci_sb   > 40 && rumus_sci_sb   <= 50 ? '#FFFF00' : ( rumus_sci_sb   > 30 && rumus_sci_sb   <= 40 ? 'red' : ( rumus_sci_sb   > 20 && rumus_sci_sb   <= 30 ? 'red' : ( rumus_sci_sb   > 10 && rumus_sci_sb   <= 20 ? 'red' : 'red'))))))));
    let sci_color_ri     = rumus_sci_ri     > 90 && rumus_sci_ri   <= 100 ? '#008000' : ( rumus_sci_ri   > 80 && rumus_sci_ri   <= 90 ? '#008000' : ( rumus_sci_ri   > 70 && rumus_sci_ri   <= 80 ? '#008000' : ( rumus_sci_ri   > 60 && rumus_sci_ri   <= 70 ? '#FFFF00' : ( rumus_sci_ri   > 50 && rumus_sci_ri   <= 60 ? '#FFFF00' : ( rumus_sci_ri   > 40 && rumus_sci_ri   <= 50 ? '#FFFF00' : ( rumus_sci_ri   > 30 && rumus_sci_ri   <= 40 ? 'red' : ( rumus_sci_ri   > 20 && rumus_sci_ri   <= 30 ? 'red' : ( rumus_sci_ri   > 10 && rumus_sci_ri   <= 20 ? 'red' : 'red'))))))));
    let sci_color_ja     = rumus_sci_ja     > 90 && rumus_sci_ja   <= 100 ? '#008000' : ( rumus_sci_ja   > 80 && rumus_sci_ja   <= 90 ? '#008000' : ( rumus_sci_ja   > 70 && rumus_sci_ja   <= 80 ? '#008000' : ( rumus_sci_ja   > 60 && rumus_sci_ja   <= 70 ? '#FFFF00' : ( rumus_sci_ja   > 50 && rumus_sci_ja   <= 60 ? '#FFFF00' : ( rumus_sci_ja   > 40 && rumus_sci_ja   <= 50 ? '#FFFF00' : ( rumus_sci_ja   > 30 && rumus_sci_ja   <= 40 ? 'red' : ( rumus_sci_ja   > 20 && rumus_sci_ja   <= 30 ? 'red' : ( rumus_sci_ja   > 10 && rumus_sci_ja   <= 20 ? 'red' : 'red'))))))));
    let sci_color_sl     = rumus_sci_sl     > 90 && rumus_sci_sl   <= 100 ? '#008000' : ( rumus_sci_sl   > 80 && rumus_sci_sl   <= 90 ? '#008000' : ( rumus_sci_sl   > 70 && rumus_sci_sl   <= 80 ? '#008000' : ( rumus_sci_sl   > 60 && rumus_sci_sl   <= 70 ? '#FFFF00' : ( rumus_sci_sl   > 50 && rumus_sci_sl   <= 60 ? '#FFFF00' : ( rumus_sci_sl   > 40 && rumus_sci_sl   <= 50 ? '#FFFF00' : ( rumus_sci_sl   > 30 && rumus_sci_sl   <= 40 ? 'red' : ( rumus_sci_sl   > 20 && rumus_sci_sl   <= 30 ? 'red' : ( rumus_sci_sl   > 10 && rumus_sci_sl   <= 20 ? 'red' : 'red'))))))));
    let sci_color_be     = rumus_sci_be     > 90 && rumus_sci_be   <= 100 ? '#008000' : ( rumus_sci_be   > 80 && rumus_sci_be   <= 90 ? '#008000' : ( rumus_sci_be   > 70 && rumus_sci_be   <= 80 ? '#008000' : ( rumus_sci_be   > 60 && rumus_sci_be   <= 70 ? '#FFFF00' : ( rumus_sci_be   > 50 && rumus_sci_be   <= 60 ? '#FFFF00' : ( rumus_sci_be   > 40 && rumus_sci_be   <= 50 ? '#FFFF00' : ( rumus_sci_be   > 30 && rumus_sci_be   <= 40 ? 'red' : ( rumus_sci_be   > 20 && rumus_sci_be   <= 30 ? 'red' : ( rumus_sci_be   > 10 && rumus_sci_be   <= 20 ? 'red' : 'red'))))))));
    let sci_color_1024   = rumus_sci_1024   > 90 && rumus_sci_1024 <= 100 ? '#008000' : ( rumus_sci_1024 > 80 && rumus_sci_1024 <= 90 ? '#008000' : ( rumus_sci_1024 > 70 && rumus_sci_1024 <= 80 ? '#008000' : ( rumus_sci_1024 > 60 && rumus_sci_1024 <= 70 ? '#FFFF00' : ( rumus_sci_1024 > 50 && rumus_sci_1024 <= 60 ? '#FFFF00' : ( rumus_sci_1024 > 40 && rumus_sci_1024 <= 50 ? '#FFFF00' : ( rumus_sci_1024 > 30 && rumus_sci_1024 <= 40 ? 'red' : ( rumus_sci_1024 > 20 && rumus_sci_1024 <= 30 ? 'red' : ( rumus_sci_1024 > 10 && rumus_sci_1024 <= 20 ? 'red' : 'red'))))))));
    let sci_color_bb     = rumus_sci_bb     > 90 && rumus_sci_bb   <= 100 ? '#008000' : ( rumus_sci_bb   > 80 && rumus_sci_bb   <= 90 ? '#008000' : ( rumus_sci_bb   > 70 && rumus_sci_bb   <= 80 ? '#008000' : ( rumus_sci_bb   > 60 && rumus_sci_bb   <= 70 ? '#FFFF00' : ( rumus_sci_bb   > 50 && rumus_sci_bb   <= 60 ? '#FFFF00' : ( rumus_sci_bb   > 40 && rumus_sci_bb   <= 50 ? '#FFFF00' : ( rumus_sci_bb   > 30 && rumus_sci_bb   <= 40 ? 'red' : ( rumus_sci_bb   > 20 && rumus_sci_bb   <= 30 ? 'red' : ( rumus_sci_bb   > 10 && rumus_sci_bb   <= 20 ? 'red' : 'red'))))))));
    let sci_color_kr     = rumus_sci_kr     > 90 && rumus_sci_kr   <= 100 ? '#008000' : ( rumus_sci_kr   > 80 && rumus_sci_kr   <= 90 ? '#008000' : ( rumus_sci_kr   > 70 && rumus_sci_kr   <= 80 ? '#008000' : ( rumus_sci_kr   > 60 && rumus_sci_kr   <= 70 ? '#FFFF00' : ( rumus_sci_kr   > 50 && rumus_sci_kr   <= 60 ? '#FFFF00' : ( rumus_sci_kr   > 40 && rumus_sci_kr   <= 50 ? '#FFFF00' : ( rumus_sci_kr   > 30 && rumus_sci_kr   <= 40 ? 'red' : ( rumus_sci_kr   > 20 && rumus_sci_kr   <= 30 ? 'red' : ( rumus_sci_kr   > 10 && rumus_sci_kr   <= 20 ? 'red' : 'red'))))))));
    let sci_color_jk     = rumus_sci_jk     > 90 && rumus_sci_jk   <= 100 ? '#008000' : ( rumus_sci_jk   > 80 && rumus_sci_jk   <= 90 ? '#008000' : ( rumus_sci_jk   > 70 && rumus_sci_jk   <= 80 ? '#008000' : ( rumus_sci_jk   > 60 && rumus_sci_jk   <= 70 ? '#FFFF00' : ( rumus_sci_jk   > 50 && rumus_sci_jk   <= 60 ? '#FFFF00' : ( rumus_sci_jk   > 40 && rumus_sci_jk   <= 50 ? '#FFFF00' : ( rumus_sci_jk   > 30 && rumus_sci_jk   <= 40 ? 'red' : ( rumus_sci_jk   > 20 && rumus_sci_jk   <= 30 ? 'red' : ( rumus_sci_jk   > 10 && rumus_sci_jk   <= 20 ? 'red' : 'red'))))))));
    let sci_color_jr     = rumus_sci_jr     > 90 && rumus_sci_jr   <= 100 ? '#008000' : ( rumus_sci_jr   > 80 && rumus_sci_jr   <= 90 ? '#008000' : ( rumus_sci_jr   > 70 && rumus_sci_jr   <= 80 ? '#008000' : ( rumus_sci_jr   > 60 && rumus_sci_jr   <= 70 ? '#FFFF00' : ( rumus_sci_jr   > 50 && rumus_sci_jr   <= 60 ? '#FFFF00' : ( rumus_sci_jr   > 40 && rumus_sci_jr   <= 50 ? '#FFFF00' : ( rumus_sci_jr   > 30 && rumus_sci_jr   <= 40 ? 'red' : ( rumus_sci_jr   > 20 && rumus_sci_jr   <= 30 ? 'red' : ( rumus_sci_jr   > 10 && rumus_sci_jr   <= 20 ? 'red' : 'red'))))))));
    let sci_color_jt     = rumus_sci_jt     > 90 && rumus_sci_jt   <= 100 ? '#008000' : ( rumus_sci_jt   > 80 && rumus_sci_jt   <= 90 ? '#008000' : ( rumus_sci_jt   > 70 && rumus_sci_jt   <= 80 ? '#008000' : ( rumus_sci_jt   > 60 && rumus_sci_jt   <= 70 ? '#FFFF00' : ( rumus_sci_jt   > 50 && rumus_sci_jt   <= 60 ? '#FFFF00' : ( rumus_sci_jt   > 40 && rumus_sci_jt   <= 50 ? '#FFFF00' : ( rumus_sci_jt   > 30 && rumus_sci_jt   <= 40 ? 'red' : ( rumus_sci_jt   > 20 && rumus_sci_jt   <= 30 ? 'red' : ( rumus_sci_jt   > 10 && rumus_sci_jt   <= 20 ? 'red' : 'red'))))))));
    let sci_color_yo     = rumus_sci_yo     > 90 && rumus_sci_yo   <= 100 ? '#008000' : ( rumus_sci_yo   > 80 && rumus_sci_yo   <= 90 ? '#008000' : ( rumus_sci_yo   > 70 && rumus_sci_yo   <= 80 ? '#008000' : ( rumus_sci_yo   > 60 && rumus_sci_yo   <= 70 ? '#FFFF00' : ( rumus_sci_yo   > 50 && rumus_sci_yo   <= 60 ? '#FFFF00' : ( rumus_sci_yo   > 40 && rumus_sci_yo   <= 50 ? '#FFFF00' : ( rumus_sci_yo   > 30 && rumus_sci_yo   <= 40 ? 'red' : ( rumus_sci_yo   > 20 && rumus_sci_yo   <= 30 ? 'red' : ( rumus_sci_yo   > 10 && rumus_sci_yo   <= 20 ? 'red' : 'red'))))))));
    let sci_color_ji     = rumus_sci_ji     > 90 && rumus_sci_ji   <= 100 ? '#008000' : ( rumus_sci_ji   > 80 && rumus_sci_ji   <= 90 ? '#008000' : ( rumus_sci_ji   > 70 && rumus_sci_ji   <= 80 ? '#008000' : ( rumus_sci_ji   > 60 && rumus_sci_ji   <= 70 ? '#FFFF00' : ( rumus_sci_ji   > 50 && rumus_sci_ji   <= 60 ? '#FFFF00' : ( rumus_sci_ji   > 40 && rumus_sci_ji   <= 50 ? '#FFFF00' : ( rumus_sci_ji   > 30 && rumus_sci_ji   <= 40 ? 'red' : ( rumus_sci_ji   > 20 && rumus_sci_ji   <= 30 ? 'red' : ( rumus_sci_ji   > 10 && rumus_sci_ji   <= 20 ? 'red' : 'red'))))))));
    let sci_color_bt     = rumus_sci_bt     > 90 && rumus_sci_bt   <= 100 ? '#008000' : ( rumus_sci_bt   > 80 && rumus_sci_bt   <= 90 ? '#008000' : ( rumus_sci_bt   > 70 && rumus_sci_bt   <= 80 ? '#008000' : ( rumus_sci_bt   > 60 && rumus_sci_bt   <= 70 ? '#FFFF00' : ( rumus_sci_bt   > 50 && rumus_sci_bt   <= 60 ? '#FFFF00' : ( rumus_sci_bt   > 40 && rumus_sci_bt   <= 50 ? '#FFFF00' : ( rumus_sci_bt   > 30 && rumus_sci_bt   <= 40 ? 'red' : ( rumus_sci_bt   > 20 && rumus_sci_bt   <= 30 ? 'red' : ( rumus_sci_bt   > 10 && rumus_sci_bt   <= 20 ? 'red' : 'red'))))))));
    let sci_color_ba     = rumus_sci_ba     > 90 && rumus_sci_ba   <= 100 ? '#008000' : ( rumus_sci_ba   > 80 && rumus_sci_ba   <= 90 ? '#008000' : ( rumus_sci_ba   > 70 && rumus_sci_ba   <= 80 ? '#008000' : ( rumus_sci_ba   > 60 && rumus_sci_ba   <= 70 ? '#FFFF00' : ( rumus_sci_ba   > 50 && rumus_sci_ba   <= 60 ? '#FFFF00' : ( rumus_sci_ba   > 40 && rumus_sci_ba   <= 50 ? '#FFFF00' : ( rumus_sci_ba   > 30 && rumus_sci_ba   <= 40 ? 'red' : ( rumus_sci_ba   > 20 && rumus_sci_ba   <= 30 ? 'red' : ( rumus_sci_ba   > 10 && rumus_sci_ba   <= 20 ? 'red' : 'red'))))))));
    let sci_color_nb     = rumus_sci_nb     > 90 && rumus_sci_nb   <= 100 ? '#008000' : ( rumus_sci_nb   > 80 && rumus_sci_nb   <= 90 ? '#008000' : ( rumus_sci_nb   > 70 && rumus_sci_nb   <= 80 ? '#008000' : ( rumus_sci_nb   > 60 && rumus_sci_nb   <= 70 ? '#FFFF00' : ( rumus_sci_nb   > 50 && rumus_sci_nb   <= 60 ? '#FFFF00' : ( rumus_sci_nb   > 40 && rumus_sci_nb   <= 50 ? '#FFFF00' : ( rumus_sci_nb   > 30 && rumus_sci_nb   <= 40 ? 'red' : ( rumus_sci_nb   > 20 && rumus_sci_nb   <= 30 ? 'red' : ( rumus_sci_nb   > 10 && rumus_sci_nb   <= 20 ? 'red' : 'red'))))))));
    let sci_color_nt     = rumus_sci_nt     > 90 && rumus_sci_nt   <= 100 ? '#008000' : ( rumus_sci_nt   > 80 && rumus_sci_nt   <= 90 ? '#008000' : ( rumus_sci_nt   > 70 && rumus_sci_nt   <= 80 ? '#008000' : ( rumus_sci_nt   > 60 && rumus_sci_nt   <= 70 ? '#FFFF00' : ( rumus_sci_nt   > 50 && rumus_sci_nt   <= 60 ? '#FFFF00' : ( rumus_sci_nt   > 40 && rumus_sci_nt   <= 50 ? '#FFFF00' : ( rumus_sci_nt   > 30 && rumus_sci_nt   <= 40 ? 'red' : ( rumus_sci_nt   > 20 && rumus_sci_nt   <= 30 ? 'red' : ( rumus_sci_nt   > 10 && rumus_sci_nt   <= 20 ? 'red' : 'red'))))))));
    let sci_color_kb     = rumus_sci_kb     > 90 && rumus_sci_kb   <= 100 ? '#008000' : ( rumus_sci_kb   > 80 && rumus_sci_kb   <= 90 ? '#008000' : ( rumus_sci_kb   > 70 && rumus_sci_kb   <= 80 ? '#008000' : ( rumus_sci_kb   > 60 && rumus_sci_kb   <= 70 ? '#FFFF00' : ( rumus_sci_kb   > 50 && rumus_sci_kb   <= 60 ? '#FFFF00' : ( rumus_sci_kb   > 40 && rumus_sci_kb   <= 50 ? '#FFFF00' : ( rumus_sci_kb   > 30 && rumus_sci_kb   <= 40 ? 'red' : ( rumus_sci_kb   > 20 && rumus_sci_kb   <= 30 ? 'red' : ( rumus_sci_kb   > 10 && rumus_sci_kb   <= 20 ? 'red' : 'red'))))))));
    let sci_color_kt     = rumus_sci_kt     > 90 && rumus_sci_kt   <= 100 ? '#008000' : ( rumus_sci_kt   > 80 && rumus_sci_kt   <= 90 ? '#008000' : ( rumus_sci_kt   > 70 && rumus_sci_kt   <= 80 ? '#008000' : ( rumus_sci_kt   > 60 && rumus_sci_kt   <= 70 ? '#FFFF00' : ( rumus_sci_kt   > 50 && rumus_sci_kt   <= 60 ? '#FFFF00' : ( rumus_sci_kt   > 40 && rumus_sci_kt   <= 50 ? '#FFFF00' : ( rumus_sci_kt   > 30 && rumus_sci_kt   <= 40 ? 'red' : ( rumus_sci_kt   > 20 && rumus_sci_kt   <= 30 ? 'red' : ( rumus_sci_kt   > 10 && rumus_sci_kt   <= 20 ? 'red' : 'red'))))))));
    let sci_color_ks     = rumus_sci_ks     > 90 && rumus_sci_ks   <= 100 ? '#008000' : ( rumus_sci_ks   > 80 && rumus_sci_ks   <= 90 ? '#008000' : ( rumus_sci_ks   > 70 && rumus_sci_ks   <= 80 ? '#008000' : ( rumus_sci_ks   > 60 && rumus_sci_ks   <= 70 ? '#FFFF00' : ( rumus_sci_ks   > 50 && rumus_sci_ks   <= 60 ? '#FFFF00' : ( rumus_sci_ks   > 40 && rumus_sci_ks   <= 50 ? '#FFFF00' : ( rumus_sci_ks   > 30 && rumus_sci_ks   <= 40 ? 'red' : ( rumus_sci_ks   > 20 && rumus_sci_ks   <= 30 ? 'red' : ( rumus_sci_ks   > 10 && rumus_sci_ks   <= 20 ? 'red' : 'red'))))))));
    let sci_color_ki     = rumus_sci_ki     > 90 && rumus_sci_ki   <= 100 ? '#008000' : ( rumus_sci_ki   > 80 && rumus_sci_ki   <= 90 ? '#008000' : ( rumus_sci_ki   > 70 && rumus_sci_ki   <= 80 ? '#008000' : ( rumus_sci_ki   > 60 && rumus_sci_ki   <= 70 ? '#FFFF00' : ( rumus_sci_ki   > 50 && rumus_sci_ki   <= 60 ? '#FFFF00' : ( rumus_sci_ki   > 40 && rumus_sci_ki   <= 50 ? '#FFFF00' : ( rumus_sci_ki   > 30 && rumus_sci_ki   <= 40 ? 'red' : ( rumus_sci_ki   > 20 && rumus_sci_ki   <= 30 ? 'red' : ( rumus_sci_ki   > 10 && rumus_sci_ki   <= 20 ? 'red' : 'red'))))))));
    let sci_color_ku     = rumus_sci_ku     > 90 && rumus_sci_ku   <= 100 ? '#008000' : ( rumus_sci_ku   > 80 && rumus_sci_ku   <= 90 ? '#008000' : ( rumus_sci_ku   > 70 && rumus_sci_ku   <= 80 ? '#008000' : ( rumus_sci_ku   > 60 && rumus_sci_ku   <= 70 ? '#FFFF00' : ( rumus_sci_ku   > 50 && rumus_sci_ku   <= 60 ? '#FFFF00' : ( rumus_sci_ku   > 40 && rumus_sci_ku   <= 50 ? '#FFFF00' : ( rumus_sci_ku   > 30 && rumus_sci_ku   <= 40 ? 'red' : ( rumus_sci_ku   > 20 && rumus_sci_ku   <= 30 ? 'red' : ( rumus_sci_ku   > 10 && rumus_sci_ku   <= 20 ? 'red' : 'red'))))))));
    let sci_color_sw     = rumus_sci_sw     > 90 && rumus_sci_sw   <= 100 ? '#008000' : ( rumus_sci_sw   > 80 && rumus_sci_sw   <= 90 ? '#008000' : ( rumus_sci_sw   > 70 && rumus_sci_sw   <= 80 ? '#008000' : ( rumus_sci_sw   > 60 && rumus_sci_sw   <= 70 ? '#FFFF00' : ( rumus_sci_sw   > 50 && rumus_sci_sw   <= 60 ? '#FFFF00' : ( rumus_sci_sw   > 40 && rumus_sci_sw   <= 50 ? '#FFFF00' : ( rumus_sci_sw   > 30 && rumus_sci_sw   <= 40 ? 'red' : ( rumus_sci_sw   > 20 && rumus_sci_sw   <= 30 ? 'red' : ( rumus_sci_sw   > 10 && rumus_sci_sw   <= 20 ? 'red' : 'red'))))))));
    let sci_color_st     = rumus_sci_st     > 90 && rumus_sci_st   <= 100 ? '#008000' : ( rumus_sci_st   > 80 && rumus_sci_st   <= 90 ? '#008000' : ( rumus_sci_st   > 70 && rumus_sci_st   <= 80 ? '#008000' : ( rumus_sci_st   > 60 && rumus_sci_st   <= 70 ? '#FFFF00' : ( rumus_sci_st   > 50 && rumus_sci_st   <= 60 ? '#FFFF00' : ( rumus_sci_st   > 40 && rumus_sci_st   <= 50 ? '#FFFF00' : ( rumus_sci_st   > 30 && rumus_sci_st   <= 40 ? 'red' : ( rumus_sci_st   > 20 && rumus_sci_st   <= 30 ? 'red' : ( rumus_sci_st   > 10 && rumus_sci_st   <= 20 ? 'red' : 'red'))))))));
    let sci_color_se     = rumus_sci_se     > 90 && rumus_sci_se   <= 100 ? '#008000' : ( rumus_sci_se   > 80 && rumus_sci_se   <= 90 ? '#008000' : ( rumus_sci_se   > 70 && rumus_sci_se   <= 80 ? '#008000' : ( rumus_sci_se   > 60 && rumus_sci_se   <= 70 ? '#FFFF00' : ( rumus_sci_se   > 50 && rumus_sci_se   <= 60 ? '#FFFF00' : ( rumus_sci_se   > 40 && rumus_sci_se   <= 50 ? '#FFFF00' : ( rumus_sci_se   > 30 && rumus_sci_se   <= 40 ? 'red' : ( rumus_sci_se   > 20 && rumus_sci_se   <= 30 ? 'red' : ( rumus_sci_se   > 10 && rumus_sci_se   <= 20 ? 'red' : 'red'))))))));
    let sci_color_sg     = rumus_sci_sg     > 90 && rumus_sci_sg   <= 100 ? '#008000' : ( rumus_sci_sg   > 80 && rumus_sci_sg   <= 90 ? '#008000' : ( rumus_sci_sg   > 70 && rumus_sci_sg   <= 80 ? '#008000' : ( rumus_sci_sg   > 60 && rumus_sci_sg   <= 70 ? '#FFFF00' : ( rumus_sci_sg   > 50 && rumus_sci_sg   <= 60 ? '#FFFF00' : ( rumus_sci_sg   > 40 && rumus_sci_sg   <= 50 ? '#FFFF00' : ( rumus_sci_sg   > 30 && rumus_sci_sg   <= 40 ? 'red' : ( rumus_sci_sg   > 20 && rumus_sci_sg   <= 30 ? 'red' : ( rumus_sci_sg   > 10 && rumus_sci_sg   <= 20 ? 'red' : 'red'))))))));
    let sci_color_go     = rumus_sci_go     > 90 && rumus_sci_go   <= 100 ? '#008000' : ( rumus_sci_go   > 80 && rumus_sci_go   <= 90 ? '#008000' : ( rumus_sci_go   > 70 && rumus_sci_go   <= 80 ? '#008000' : ( rumus_sci_go   > 60 && rumus_sci_go   <= 70 ? '#FFFF00' : ( rumus_sci_go   > 50 && rumus_sci_go   <= 60 ? '#FFFF00' : ( rumus_sci_go   > 40 && rumus_sci_go   <= 50 ? '#FFFF00' : ( rumus_sci_go   > 30 && rumus_sci_go   <= 40 ? 'red' : ( rumus_sci_go   > 20 && rumus_sci_go   <= 30 ? 'red' : ( rumus_sci_go   > 10 && rumus_sci_go   <= 20 ? 'red' : 'red'))))))));
    let sci_color_sr     = rumus_sci_sr     > 90 && rumus_sci_sr   <= 100 ? '#008000' : ( rumus_sci_sr   > 80 && rumus_sci_sr   <= 90 ? '#008000' : ( rumus_sci_sr   > 70 && rumus_sci_sr   <= 80 ? '#008000' : ( rumus_sci_sr   > 60 && rumus_sci_sr   <= 70 ? '#FFFF00' : ( rumus_sci_sr   > 50 && rumus_sci_sr   <= 60 ? '#FFFF00' : ( rumus_sci_sr   > 40 && rumus_sci_sr   <= 50 ? '#FFFF00' : ( rumus_sci_sr   > 30 && rumus_sci_sr   <= 40 ? 'red' : ( rumus_sci_sr   > 20 && rumus_sci_sr   <= 30 ? 'red' : ( rumus_sci_sr   > 10 && rumus_sci_sr   <= 20 ? 'red' : 'red'))))))));
    let sci_color_ma     = rumus_sci_ma     > 90 && rumus_sci_ma   <= 100 ? '#008000' : ( rumus_sci_ma   > 80 && rumus_sci_ma   <= 90 ? '#008000' : ( rumus_sci_ma   > 70 && rumus_sci_ma   <= 80 ? '#008000' : ( rumus_sci_ma   > 60 && rumus_sci_ma   <= 70 ? '#FFFF00' : ( rumus_sci_ma   > 50 && rumus_sci_ma   <= 60 ? '#FFFF00' : ( rumus_sci_ma   > 40 && rumus_sci_ma   <= 50 ? '#FFFF00' : ( rumus_sci_ma   > 30 && rumus_sci_ma   <= 40 ? 'red' : ( rumus_sci_ma   > 20 && rumus_sci_ma   <= 30 ? 'red' : ( rumus_sci_ma   > 10 && rumus_sci_ma   <= 20 ? 'red' : 'red'))))))));
    let sci_color_la     = rumus_sci_la     > 90 && rumus_sci_la   <= 100 ? '#008000' : ( rumus_sci_la   > 80 && rumus_sci_la   <= 90 ? '#008000' : ( rumus_sci_la   > 70 && rumus_sci_la   <= 80 ? '#008000' : ( rumus_sci_la   > 60 && rumus_sci_la   <= 70 ? '#FFFF00' : ( rumus_sci_la   > 50 && rumus_sci_la   <= 60 ? '#FFFF00' : ( rumus_sci_la   > 40 && rumus_sci_la   <= 50 ? '#FFFF00' : ( rumus_sci_la   > 30 && rumus_sci_la   <= 40 ? 'red' : ( rumus_sci_la   > 20 && rumus_sci_la   <= 30 ? 'red' : ( rumus_sci_la   > 10 && rumus_sci_la   <= 20 ? 'red' : 'red'))))))));
    let sci_color_ib     = rumus_sci_ib     > 90 && rumus_sci_ib   <= 100 ? '#008000' : ( rumus_sci_ib   > 80 && rumus_sci_ib   <= 90 ? '#008000' : ( rumus_sci_ib   > 70 && rumus_sci_ib   <= 80 ? '#008000' : ( rumus_sci_ib   > 60 && rumus_sci_ib   <= 70 ? '#FFFF00' : ( rumus_sci_ib   > 50 && rumus_sci_ib   <= 60 ? '#FFFF00' : ( rumus_sci_ib   > 40 && rumus_sci_ib   <= 50 ? '#FFFF00' : ( rumus_sci_ib   > 30 && rumus_sci_ib   <= 40 ? 'red' : ( rumus_sci_ib   > 20 && rumus_sci_ib   <= 30 ? 'red' : ( rumus_sci_ib   > 10 && rumus_sci_ib   <= 20 ? 'red' : 'red'))))))));
    let sci_color_pa     = rumus_sci_pa     > 90 && rumus_sci_pa   <= 100 ? '#008000' : ( rumus_sci_pa   > 80 && rumus_sci_pa   <= 90 ? '#008000' : ( rumus_sci_pa   > 70 && rumus_sci_pa   <= 80 ? '#008000' : ( rumus_sci_pa   > 60 && rumus_sci_pa   <= 70 ? '#FFFF00' : ( rumus_sci_pa   > 50 && rumus_sci_pa   <= 60 ? '#FFFF00' : ( rumus_sci_pa   > 40 && rumus_sci_pa   <= 50 ? '#FFFF00' : ( rumus_sci_pa   > 30 && rumus_sci_pa   <= 40 ? 'red' : ( rumus_sci_pa   > 20 && rumus_sci_pa   <= 30 ? 'red' : ( rumus_sci_pa   > 10 && rumus_sci_pa   <= 20 ? 'red' : 'red'))))))));

    // WARNA GRADIENT
    // let sci_color_ac     = rumus_sci_ac     > 90 && rumus_sci_ac   <= 100 ? '#008000' : ( rumus_sci_ac   > 80 && rumus_sci_ac   <= 90 ? '#32CD32' : ( rumus_sci_ac   > 70 && rumus_sci_ac   <= 80 ? '#ADFF2F' : ( rumus_sci_ac   > 60 && rumus_sci_ac   <= 70 ? '#FFFF00' : ( rumus_sci_ac   > 50 && rumus_sci_ac   <= 60 ? '#FFD700' : ( rumus_sci_ac   > 40 && rumus_sci_ac   <= 50 ? '#DAA520' : ( rumus_sci_ac   > 30 && rumus_sci_ac   <= 40 ? '#FFA500' : ( rumus_sci_ac   > 20 && rumus_sci_ac   <= 30 ? '#FF8C00' : ( rumus_sci_ac   > 10 && rumus_sci_ac   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_su     = rumus_sci_su     > 90 && rumus_sci_su   <= 100 ? '#008000' : ( rumus_sci_su   > 80 && rumus_sci_su   <= 90 ? '#32CD32' : ( rumus_sci_su   > 70 && rumus_sci_su   <= 80 ? '#ADFF2F' : ( rumus_sci_su   > 60 && rumus_sci_su   <= 70 ? '#FFFF00' : ( rumus_sci_su   > 50 && rumus_sci_su   <= 60 ? '#FFD700' : ( rumus_sci_su   > 40 && rumus_sci_su   <= 50 ? '#DAA520' : ( rumus_sci_su   > 30 && rumus_sci_su   <= 40 ? '#FFA500' : ( rumus_sci_su   > 20 && rumus_sci_su   <= 30 ? '#FF8C00' : ( rumus_sci_su   > 10 && rumus_sci_su   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_sb     = rumus_sci_sb     > 90 && rumus_sci_sb   <= 100 ? '#008000' : ( rumus_sci_sb   > 80 && rumus_sci_sb   <= 90 ? '#32CD32' : ( rumus_sci_sb   > 70 && rumus_sci_sb   <= 80 ? '#ADFF2F' : ( rumus_sci_sb   > 60 && rumus_sci_sb   <= 70 ? '#FFFF00' : ( rumus_sci_sb   > 50 && rumus_sci_sb   <= 60 ? '#FFD700' : ( rumus_sci_sb   > 40 && rumus_sci_sb   <= 50 ? '#DAA520' : ( rumus_sci_sb   > 30 && rumus_sci_sb   <= 40 ? '#FFA500' : ( rumus_sci_sb   > 20 && rumus_sci_sb   <= 30 ? '#FF8C00' : ( rumus_sci_sb   > 10 && rumus_sci_sb   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_ri     = rumus_sci_ri     > 90 && rumus_sci_ri   <= 100 ? '#008000' : ( rumus_sci_ri   > 80 && rumus_sci_ri   <= 90 ? '#32CD32' : ( rumus_sci_ri   > 70 && rumus_sci_ri   <= 80 ? '#ADFF2F' : ( rumus_sci_ri   > 60 && rumus_sci_ri   <= 70 ? '#FFFF00' : ( rumus_sci_ri   > 50 && rumus_sci_ri   <= 60 ? '#FFD700' : ( rumus_sci_ri   > 40 && rumus_sci_ri   <= 50 ? '#DAA520' : ( rumus_sci_ri   > 30 && rumus_sci_ri   <= 40 ? '#FFA500' : ( rumus_sci_ri   > 20 && rumus_sci_ri   <= 30 ? '#FF8C00' : ( rumus_sci_ri   > 10 && rumus_sci_ri   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_ja     = rumus_sci_ja     > 90 && rumus_sci_ja   <= 100 ? '#008000' : ( rumus_sci_ja   > 80 && rumus_sci_ja   <= 90 ? '#32CD32' : ( rumus_sci_ja   > 70 && rumus_sci_ja   <= 80 ? '#ADFF2F' : ( rumus_sci_ja   > 60 && rumus_sci_ja   <= 70 ? '#FFFF00' : ( rumus_sci_ja   > 50 && rumus_sci_ja   <= 60 ? '#FFD700' : ( rumus_sci_ja   > 40 && rumus_sci_ja   <= 50 ? '#DAA520' : ( rumus_sci_ja   > 30 && rumus_sci_ja   <= 40 ? '#FFA500' : ( rumus_sci_ja   > 20 && rumus_sci_ja   <= 30 ? '#FF8C00' : ( rumus_sci_ja   > 10 && rumus_sci_ja   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_sl     = rumus_sci_sl     > 90 && rumus_sci_sl   <= 100 ? '#008000' : ( rumus_sci_sl   > 80 && rumus_sci_sl   <= 90 ? '#32CD32' : ( rumus_sci_sl   > 70 && rumus_sci_sl   <= 80 ? '#ADFF2F' : ( rumus_sci_sl   > 60 && rumus_sci_sl   <= 70 ? '#FFFF00' : ( rumus_sci_sl   > 50 && rumus_sci_sl   <= 60 ? '#FFD700' : ( rumus_sci_sl   > 40 && rumus_sci_sl   <= 50 ? '#DAA520' : ( rumus_sci_sl   > 30 && rumus_sci_sl   <= 40 ? '#FFA500' : ( rumus_sci_sl   > 20 && rumus_sci_sl   <= 30 ? '#FF8C00' : ( rumus_sci_sl   > 10 && rumus_sci_sl   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_be     = rumus_sci_be     > 90 && rumus_sci_be   <= 100 ? '#008000' : ( rumus_sci_be   > 80 && rumus_sci_be   <= 90 ? '#32CD32' : ( rumus_sci_be   > 70 && rumus_sci_be   <= 80 ? '#ADFF2F' : ( rumus_sci_be   > 60 && rumus_sci_be   <= 70 ? '#FFFF00' : ( rumus_sci_be   > 50 && rumus_sci_be   <= 60 ? '#FFD700' : ( rumus_sci_be   > 40 && rumus_sci_be   <= 50 ? '#DAA520' : ( rumus_sci_be   > 30 && rumus_sci_be   <= 40 ? '#FFA500' : ( rumus_sci_be   > 20 && rumus_sci_be   <= 30 ? '#FF8C00' : ( rumus_sci_be   > 10 && rumus_sci_be   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_1024   = rumus_sci_1024   > 90 && rumus_sci_1024 <= 100 ? '#008000' : ( rumus_sci_1024 > 80 && rumus_sci_1024 <= 90 ? '#32CD32' : ( rumus_sci_1024 > 70 && rumus_sci_1024 <= 80 ? '#ADFF2F' : ( rumus_sci_1024 > 60 && rumus_sci_1024 <= 70 ? '#FFFF00' : ( rumus_sci_1024 > 50 && rumus_sci_1024 <= 60 ? '#FFD700' : ( rumus_sci_1024 > 40 && rumus_sci_1024 <= 50 ? '#DAA520' : ( rumus_sci_1024 > 30 && rumus_sci_1024 <= 40 ? '#FFA500' : ( rumus_sci_1024 > 20 && rumus_sci_1024 <= 30 ? '#FF8C00' : ( rumus_sci_1024 > 10 && rumus_sci_1024 <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_bb     = rumus_sci_bb     > 90 && rumus_sci_bb   <= 100 ? '#008000' : ( rumus_sci_bb   > 80 && rumus_sci_bb   <= 90 ? '#32CD32' : ( rumus_sci_bb   > 70 && rumus_sci_bb   <= 80 ? '#ADFF2F' : ( rumus_sci_bb   > 60 && rumus_sci_bb   <= 70 ? '#FFFF00' : ( rumus_sci_bb   > 50 && rumus_sci_bb   <= 60 ? '#FFD700' : ( rumus_sci_bb   > 40 && rumus_sci_bb   <= 50 ? '#DAA520' : ( rumus_sci_bb   > 30 && rumus_sci_bb   <= 40 ? '#FFA500' : ( rumus_sci_bb   > 20 && rumus_sci_bb   <= 30 ? '#FF8C00' : ( rumus_sci_bb   > 10 && rumus_sci_bb   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_kr     = rumus_sci_kr     > 90 && rumus_sci_kr   <= 100 ? '#008000' : ( rumus_sci_kr   > 80 && rumus_sci_kr   <= 90 ? '#32CD32' : ( rumus_sci_kr   > 70 && rumus_sci_kr   <= 80 ? '#ADFF2F' : ( rumus_sci_kr   > 60 && rumus_sci_kr   <= 70 ? '#FFFF00' : ( rumus_sci_kr   > 50 && rumus_sci_kr   <= 60 ? '#FFD700' : ( rumus_sci_kr   > 40 && rumus_sci_kr   <= 50 ? '#DAA520' : ( rumus_sci_kr   > 30 && rumus_sci_kr   <= 40 ? '#FFA500' : ( rumus_sci_kr   > 20 && rumus_sci_kr   <= 30 ? '#FF8C00' : ( rumus_sci_kr   > 10 && rumus_sci_kr   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_jk     = rumus_sci_jk     > 90 && rumus_sci_jk   <= 100 ? '#008000' : ( rumus_sci_jk   > 80 && rumus_sci_jk   <= 90 ? '#32CD32' : ( rumus_sci_jk   > 70 && rumus_sci_jk   <= 80 ? '#ADFF2F' : ( rumus_sci_jk   > 60 && rumus_sci_jk   <= 70 ? '#FFFF00' : ( rumus_sci_jk   > 50 && rumus_sci_jk   <= 60 ? '#FFD700' : ( rumus_sci_jk   > 40 && rumus_sci_jk   <= 50 ? '#DAA520' : ( rumus_sci_jk   > 30 && rumus_sci_jk   <= 40 ? '#FFA500' : ( rumus_sci_jk   > 20 && rumus_sci_jk   <= 30 ? '#FF8C00' : ( rumus_sci_jk   > 10 && rumus_sci_jk   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_jr     = rumus_sci_jr     > 90 && rumus_sci_jr   <= 100 ? '#008000' : ( rumus_sci_jr   > 80 && rumus_sci_jr   <= 90 ? '#32CD32' : ( rumus_sci_jr   > 70 && rumus_sci_jr   <= 80 ? '#ADFF2F' : ( rumus_sci_jr   > 60 && rumus_sci_jr   <= 70 ? '#FFFF00' : ( rumus_sci_jr   > 50 && rumus_sci_jr   <= 60 ? '#FFD700' : ( rumus_sci_jr   > 40 && rumus_sci_jr   <= 50 ? '#DAA520' : ( rumus_sci_jr   > 30 && rumus_sci_jr   <= 40 ? '#FFA500' : ( rumus_sci_jr   > 20 && rumus_sci_jr   <= 30 ? '#FF8C00' : ( rumus_sci_jr   > 10 && rumus_sci_jr   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_jt     = rumus_sci_jt     > 90 && rumus_sci_jt   <= 100 ? '#008000' : ( rumus_sci_jt   > 80 && rumus_sci_jt   <= 90 ? '#32CD32' : ( rumus_sci_jt   > 70 && rumus_sci_jt   <= 80 ? '#ADFF2F' : ( rumus_sci_jt   > 60 && rumus_sci_jt   <= 70 ? '#FFFF00' : ( rumus_sci_jt   > 50 && rumus_sci_jt   <= 60 ? '#FFD700' : ( rumus_sci_jt   > 40 && rumus_sci_jt   <= 50 ? '#DAA520' : ( rumus_sci_jt   > 30 && rumus_sci_jt   <= 40 ? '#FFA500' : ( rumus_sci_jt   > 20 && rumus_sci_jt   <= 30 ? '#FF8C00' : ( rumus_sci_jt   > 10 && rumus_sci_jt   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_yo     = rumus_sci_yo     > 90 && rumus_sci_yo   <= 100 ? '#008000' : ( rumus_sci_yo   > 80 && rumus_sci_yo   <= 90 ? '#32CD32' : ( rumus_sci_yo   > 70 && rumus_sci_yo   <= 80 ? '#ADFF2F' : ( rumus_sci_yo   > 60 && rumus_sci_yo   <= 70 ? '#FFFF00' : ( rumus_sci_yo   > 50 && rumus_sci_yo   <= 60 ? '#FFD700' : ( rumus_sci_yo   > 40 && rumus_sci_yo   <= 50 ? '#DAA520' : ( rumus_sci_yo   > 30 && rumus_sci_yo   <= 40 ? '#FFA500' : ( rumus_sci_yo   > 20 && rumus_sci_yo   <= 30 ? '#FF8C00' : ( rumus_sci_yo   > 10 && rumus_sci_yo   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_ji     = rumus_sci_ji     > 90 && rumus_sci_ji   <= 100 ? '#008000' : ( rumus_sci_ji   > 80 && rumus_sci_ji   <= 90 ? '#32CD32' : ( rumus_sci_ji   > 70 && rumus_sci_ji   <= 80 ? '#ADFF2F' : ( rumus_sci_ji   > 60 && rumus_sci_ji   <= 70 ? '#FFFF00' : ( rumus_sci_ji   > 50 && rumus_sci_ji   <= 60 ? '#FFD700' : ( rumus_sci_ji   > 40 && rumus_sci_ji   <= 50 ? '#DAA520' : ( rumus_sci_ji   > 30 && rumus_sci_ji   <= 40 ? '#FFA500' : ( rumus_sci_ji   > 20 && rumus_sci_ji   <= 30 ? '#FF8C00' : ( rumus_sci_ji   > 10 && rumus_sci_ji   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_bt     = rumus_sci_bt     > 90 && rumus_sci_bt   <= 100 ? '#008000' : ( rumus_sci_bt   > 80 && rumus_sci_bt   <= 90 ? '#32CD32' : ( rumus_sci_bt   > 70 && rumus_sci_bt   <= 80 ? '#ADFF2F' : ( rumus_sci_bt   > 60 && rumus_sci_bt   <= 70 ? '#FFFF00' : ( rumus_sci_bt   > 50 && rumus_sci_bt   <= 60 ? '#FFD700' : ( rumus_sci_bt   > 40 && rumus_sci_bt   <= 50 ? '#DAA520' : ( rumus_sci_bt   > 30 && rumus_sci_bt   <= 40 ? '#FFA500' : ( rumus_sci_bt   > 20 && rumus_sci_bt   <= 30 ? '#FF8C00' : ( rumus_sci_bt   > 10 && rumus_sci_bt   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_ba     = rumus_sci_ba     > 90 && rumus_sci_ba   <= 100 ? '#008000' : ( rumus_sci_ba   > 80 && rumus_sci_ba   <= 90 ? '#32CD32' : ( rumus_sci_ba   > 70 && rumus_sci_ba   <= 80 ? '#ADFF2F' : ( rumus_sci_ba   > 60 && rumus_sci_ba   <= 70 ? '#FFFF00' : ( rumus_sci_ba   > 50 && rumus_sci_ba   <= 60 ? '#FFD700' : ( rumus_sci_ba   > 40 && rumus_sci_ba   <= 50 ? '#DAA520' : ( rumus_sci_ba   > 30 && rumus_sci_ba   <= 40 ? '#FFA500' : ( rumus_sci_ba   > 20 && rumus_sci_ba   <= 30 ? '#FF8C00' : ( rumus_sci_ba   > 10 && rumus_sci_ba   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_nb     = rumus_sci_nb     > 90 && rumus_sci_nb   <= 100 ? '#008000' : ( rumus_sci_nb   > 80 && rumus_sci_nb   <= 90 ? '#32CD32' : ( rumus_sci_nb   > 70 && rumus_sci_nb   <= 80 ? '#ADFF2F' : ( rumus_sci_nb   > 60 && rumus_sci_nb   <= 70 ? '#FFFF00' : ( rumus_sci_nb   > 50 && rumus_sci_nb   <= 60 ? '#FFD700' : ( rumus_sci_nb   > 40 && rumus_sci_nb   <= 50 ? '#DAA520' : ( rumus_sci_nb   > 30 && rumus_sci_nb   <= 40 ? '#FFA500' : ( rumus_sci_nb   > 20 && rumus_sci_nb   <= 30 ? '#FF8C00' : ( rumus_sci_nb   > 10 && rumus_sci_nb   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_nt     = rumus_sci_nt     > 90 && rumus_sci_nt   <= 100 ? '#008000' : ( rumus_sci_nt   > 80 && rumus_sci_nt   <= 90 ? '#32CD32' : ( rumus_sci_nt   > 70 && rumus_sci_nt   <= 80 ? '#ADFF2F' : ( rumus_sci_nt   > 60 && rumus_sci_nt   <= 70 ? '#FFFF00' : ( rumus_sci_nt   > 50 && rumus_sci_nt   <= 60 ? '#FFD700' : ( rumus_sci_nt   > 40 && rumus_sci_nt   <= 50 ? '#DAA520' : ( rumus_sci_nt   > 30 && rumus_sci_nt   <= 40 ? '#FFA500' : ( rumus_sci_nt   > 20 && rumus_sci_nt   <= 30 ? '#FF8C00' : ( rumus_sci_nt   > 10 && rumus_sci_nt   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_kb     = rumus_sci_kb     > 90 && rumus_sci_kb   <= 100 ? '#008000' : ( rumus_sci_kb   > 80 && rumus_sci_kb   <= 90 ? '#32CD32' : ( rumus_sci_kb   > 70 && rumus_sci_kb   <= 80 ? '#ADFF2F' : ( rumus_sci_kb   > 60 && rumus_sci_kb   <= 70 ? '#FFFF00' : ( rumus_sci_kb   > 50 && rumus_sci_kb   <= 60 ? '#FFD700' : ( rumus_sci_kb   > 40 && rumus_sci_kb   <= 50 ? '#DAA520' : ( rumus_sci_kb   > 30 && rumus_sci_kb   <= 40 ? '#FFA500' : ( rumus_sci_kb   > 20 && rumus_sci_kb   <= 30 ? '#FF8C00' : ( rumus_sci_kb   > 10 && rumus_sci_kb   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_kt     = rumus_sci_kt     > 90 && rumus_sci_kt   <= 100 ? '#008000' : ( rumus_sci_kt   > 80 && rumus_sci_kt   <= 90 ? '#32CD32' : ( rumus_sci_kt   > 70 && rumus_sci_kt   <= 80 ? '#ADFF2F' : ( rumus_sci_kt   > 60 && rumus_sci_kt   <= 70 ? '#FFFF00' : ( rumus_sci_kt   > 50 && rumus_sci_kt   <= 60 ? '#FFD700' : ( rumus_sci_kt   > 40 && rumus_sci_kt   <= 50 ? '#DAA520' : ( rumus_sci_kt   > 30 && rumus_sci_kt   <= 40 ? '#FFA500' : ( rumus_sci_kt   > 20 && rumus_sci_kt   <= 30 ? '#FF8C00' : ( rumus_sci_kt   > 10 && rumus_sci_kt   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_ks     = rumus_sci_ks     > 90 && rumus_sci_ks   <= 100 ? '#008000' : ( rumus_sci_ks   > 80 && rumus_sci_ks   <= 90 ? '#32CD32' : ( rumus_sci_ks   > 70 && rumus_sci_ks   <= 80 ? '#ADFF2F' : ( rumus_sci_ks   > 60 && rumus_sci_ks   <= 70 ? '#FFFF00' : ( rumus_sci_ks   > 50 && rumus_sci_ks   <= 60 ? '#FFD700' : ( rumus_sci_ks   > 40 && rumus_sci_ks   <= 50 ? '#DAA520' : ( rumus_sci_ks   > 30 && rumus_sci_ks   <= 40 ? '#FFA500' : ( rumus_sci_ks   > 20 && rumus_sci_ks   <= 30 ? '#FF8C00' : ( rumus_sci_ks   > 10 && rumus_sci_ks   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_ki     = rumus_sci_ki     > 90 && rumus_sci_ki   <= 100 ? '#008000' : ( rumus_sci_ki   > 80 && rumus_sci_ki   <= 90 ? '#32CD32' : ( rumus_sci_ki   > 70 && rumus_sci_ki   <= 80 ? '#ADFF2F' : ( rumus_sci_ki   > 60 && rumus_sci_ki   <= 70 ? '#FFFF00' : ( rumus_sci_ki   > 50 && rumus_sci_ki   <= 60 ? '#FFD700' : ( rumus_sci_ki   > 40 && rumus_sci_ki   <= 50 ? '#DAA520' : ( rumus_sci_ki   > 30 && rumus_sci_ki   <= 40 ? '#FFA500' : ( rumus_sci_ki   > 20 && rumus_sci_ki   <= 30 ? '#FF8C00' : ( rumus_sci_ki   > 10 && rumus_sci_ki   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_ku     = rumus_sci_ku     > 90 && rumus_sci_ku   <= 100 ? '#008000' : ( rumus_sci_ku   > 80 && rumus_sci_ku   <= 90 ? '#32CD32' : ( rumus_sci_ku   > 70 && rumus_sci_ku   <= 80 ? '#ADFF2F' : ( rumus_sci_ku   > 60 && rumus_sci_ku   <= 70 ? '#FFFF00' : ( rumus_sci_ku   > 50 && rumus_sci_ku   <= 60 ? '#FFD700' : ( rumus_sci_ku   > 40 && rumus_sci_ku   <= 50 ? '#DAA520' : ( rumus_sci_ku   > 30 && rumus_sci_ku   <= 40 ? '#FFA500' : ( rumus_sci_ku   > 20 && rumus_sci_ku   <= 30 ? '#FF8C00' : ( rumus_sci_ku   > 10 && rumus_sci_ku   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_sw     = rumus_sci_sw     > 90 && rumus_sci_sw   <= 100 ? '#008000' : ( rumus_sci_sw   > 80 && rumus_sci_sw   <= 90 ? '#32CD32' : ( rumus_sci_sw   > 70 && rumus_sci_sw   <= 80 ? '#ADFF2F' : ( rumus_sci_sw   > 60 && rumus_sci_sw   <= 70 ? '#FFFF00' : ( rumus_sci_sw   > 50 && rumus_sci_sw   <= 60 ? '#FFD700' : ( rumus_sci_sw   > 40 && rumus_sci_sw   <= 50 ? '#DAA520' : ( rumus_sci_sw   > 30 && rumus_sci_sw   <= 40 ? '#FFA500' : ( rumus_sci_sw   > 20 && rumus_sci_sw   <= 30 ? '#FF8C00' : ( rumus_sci_sw   > 10 && rumus_sci_sw   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_st     = rumus_sci_st     > 90 && rumus_sci_st   <= 100 ? '#008000' : ( rumus_sci_st   > 80 && rumus_sci_st   <= 90 ? '#32CD32' : ( rumus_sci_st   > 70 && rumus_sci_st   <= 80 ? '#ADFF2F' : ( rumus_sci_st   > 60 && rumus_sci_st   <= 70 ? '#FFFF00' : ( rumus_sci_st   > 50 && rumus_sci_st   <= 60 ? '#FFD700' : ( rumus_sci_st   > 40 && rumus_sci_st   <= 50 ? '#DAA520' : ( rumus_sci_st   > 30 && rumus_sci_st   <= 40 ? '#FFA500' : ( rumus_sci_st   > 20 && rumus_sci_st   <= 30 ? '#FF8C00' : ( rumus_sci_st   > 10 && rumus_sci_st   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_se     = rumus_sci_se     > 90 && rumus_sci_se   <= 100 ? '#008000' : ( rumus_sci_se   > 80 && rumus_sci_se   <= 90 ? '#32CD32' : ( rumus_sci_se   > 70 && rumus_sci_se   <= 80 ? '#ADFF2F' : ( rumus_sci_se   > 60 && rumus_sci_se   <= 70 ? '#FFFF00' : ( rumus_sci_se   > 50 && rumus_sci_se   <= 60 ? '#FFD700' : ( rumus_sci_se   > 40 && rumus_sci_se   <= 50 ? '#DAA520' : ( rumus_sci_se   > 30 && rumus_sci_se   <= 40 ? '#FFA500' : ( rumus_sci_se   > 20 && rumus_sci_se   <= 30 ? '#FF8C00' : ( rumus_sci_se   > 10 && rumus_sci_se   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_sg     = rumus_sci_sg     > 90 && rumus_sci_sg   <= 100 ? '#008000' : ( rumus_sci_sg   > 80 && rumus_sci_sg   <= 90 ? '#32CD32' : ( rumus_sci_sg   > 70 && rumus_sci_sg   <= 80 ? '#ADFF2F' : ( rumus_sci_sg   > 60 && rumus_sci_sg   <= 70 ? '#FFFF00' : ( rumus_sci_sg   > 50 && rumus_sci_sg   <= 60 ? '#FFD700' : ( rumus_sci_sg   > 40 && rumus_sci_sg   <= 50 ? '#DAA520' : ( rumus_sci_sg   > 30 && rumus_sci_sg   <= 40 ? '#FFA500' : ( rumus_sci_sg   > 20 && rumus_sci_sg   <= 30 ? '#FF8C00' : ( rumus_sci_sg   > 10 && rumus_sci_sg   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_go     = rumus_sci_go     > 90 && rumus_sci_go   <= 100 ? '#008000' : ( rumus_sci_go   > 80 && rumus_sci_go   <= 90 ? '#32CD32' : ( rumus_sci_go   > 70 && rumus_sci_go   <= 80 ? '#ADFF2F' : ( rumus_sci_go   > 60 && rumus_sci_go   <= 70 ? '#FFFF00' : ( rumus_sci_go   > 50 && rumus_sci_go   <= 60 ? '#FFD700' : ( rumus_sci_go   > 40 && rumus_sci_go   <= 50 ? '#DAA520' : ( rumus_sci_go   > 30 && rumus_sci_go   <= 40 ? '#FFA500' : ( rumus_sci_go   > 20 && rumus_sci_go   <= 30 ? '#FF8C00' : ( rumus_sci_go   > 10 && rumus_sci_go   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_sr     = rumus_sci_sr     > 90 && rumus_sci_sr   <= 100 ? '#008000' : ( rumus_sci_sr   > 80 && rumus_sci_sr   <= 90 ? '#32CD32' : ( rumus_sci_sr   > 70 && rumus_sci_sr   <= 80 ? '#ADFF2F' : ( rumus_sci_sr   > 60 && rumus_sci_sr   <= 70 ? '#FFFF00' : ( rumus_sci_sr   > 50 && rumus_sci_sr   <= 60 ? '#FFD700' : ( rumus_sci_sr   > 40 && rumus_sci_sr   <= 50 ? '#DAA520' : ( rumus_sci_sr   > 30 && rumus_sci_sr   <= 40 ? '#FFA500' : ( rumus_sci_sr   > 20 && rumus_sci_sr   <= 30 ? '#FF8C00' : ( rumus_sci_sr   > 10 && rumus_sci_sr   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_ma     = rumus_sci_ma     > 90 && rumus_sci_ma   <= 100 ? '#008000' : ( rumus_sci_ma   > 80 && rumus_sci_ma   <= 90 ? '#32CD32' : ( rumus_sci_ma   > 70 && rumus_sci_ma   <= 80 ? '#ADFF2F' : ( rumus_sci_ma   > 60 && rumus_sci_ma   <= 70 ? '#FFFF00' : ( rumus_sci_ma   > 50 && rumus_sci_ma   <= 60 ? '#FFD700' : ( rumus_sci_ma   > 40 && rumus_sci_ma   <= 50 ? '#DAA520' : ( rumus_sci_ma   > 30 && rumus_sci_ma   <= 40 ? '#FFA500' : ( rumus_sci_ma   > 20 && rumus_sci_ma   <= 30 ? '#FF8C00' : ( rumus_sci_ma   > 10 && rumus_sci_ma   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_la     = rumus_sci_la     > 90 && rumus_sci_la   <= 100 ? '#008000' : ( rumus_sci_la   > 80 && rumus_sci_la   <= 90 ? '#32CD32' : ( rumus_sci_la   > 70 && rumus_sci_la   <= 80 ? '#ADFF2F' : ( rumus_sci_la   > 60 && rumus_sci_la   <= 70 ? '#FFFF00' : ( rumus_sci_la   > 50 && rumus_sci_la   <= 60 ? '#FFD700' : ( rumus_sci_la   > 40 && rumus_sci_la   <= 50 ? '#DAA520' : ( rumus_sci_la   > 30 && rumus_sci_la   <= 40 ? '#FFA500' : ( rumus_sci_la   > 20 && rumus_sci_la   <= 30 ? '#FF8C00' : ( rumus_sci_la   > 10 && rumus_sci_la   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_ib     = rumus_sci_ib     > 90 && rumus_sci_ib   <= 100 ? '#008000' : ( rumus_sci_ib   > 80 && rumus_sci_ib   <= 90 ? '#32CD32' : ( rumus_sci_ib   > 70 && rumus_sci_ib   <= 80 ? '#ADFF2F' : ( rumus_sci_ib   > 60 && rumus_sci_ib   <= 70 ? '#FFFF00' : ( rumus_sci_ib   > 50 && rumus_sci_ib   <= 60 ? '#FFD700' : ( rumus_sci_ib   > 40 && rumus_sci_ib   <= 50 ? '#DAA520' : ( rumus_sci_ib   > 30 && rumus_sci_ib   <= 40 ? '#FFA500' : ( rumus_sci_ib   > 20 && rumus_sci_ib   <= 30 ? '#FF8C00' : ( rumus_sci_ib   > 10 && rumus_sci_ib   <= 20 ? '#FF4500' : 'red'))))))));
    // let sci_color_pa     = rumus_sci_pa     > 90 && rumus_sci_pa   <= 100 ? '#008000' : ( rumus_sci_pa   > 80 && rumus_sci_pa   <= 90 ? '#32CD32' : ( rumus_sci_pa   > 70 && rumus_sci_pa   <= 80 ? '#ADFF2F' : ( rumus_sci_pa   > 60 && rumus_sci_pa   <= 70 ? '#FFFF00' : ( rumus_sci_pa   > 50 && rumus_sci_pa   <= 60 ? '#FFD700' : ( rumus_sci_pa   > 40 && rumus_sci_pa   <= 50 ? '#DAA520' : ( rumus_sci_pa   > 30 && rumus_sci_pa   <= 40 ? '#FFA500' : ( rumus_sci_pa   > 20 && rumus_sci_pa   <= 30 ? '#FF8C00' : ( rumus_sci_pa   > 10 && rumus_sci_pa   <= 20 ? '#FF4500' : 'red'))))))));


    //TEXT COLOR THEAD TABLE
    let text_sci_color_ac     = ( rumus_sci_ac   > 50 && rumus_sci_ac   <= 70 ? 'black' : 'white');
    let text_sci_color_su     = ( rumus_sci_su   > 50 && rumus_sci_su   <= 70 ? 'black' : 'white');
    let text_sci_color_sb     = ( rumus_sci_sb   > 50 && rumus_sci_sb   <= 70 ? 'black' : 'white');
    let text_sci_color_ri     = ( rumus_sci_ri   > 50 && rumus_sci_ri   <= 70 ? 'black' : 'white');
    let text_sci_color_ja     = ( rumus_sci_ja   > 50 && rumus_sci_ja   <= 70 ? 'black' : 'white');
    let text_sci_color_sl     = ( rumus_sci_sl   > 50 && rumus_sci_sl   <= 70 ? 'black' : 'white');
    let text_sci_color_be     = ( rumus_sci_be   > 50 && rumus_sci_be   <= 70 ? 'black' : 'white');
    let text_sci_color_1024   = ( rumus_sci_1024 > 50 && rumus_sci_1024 <= 70 ? 'black' : 'white');
    let text_sci_color_bb     = ( rumus_sci_bb   > 50 && rumus_sci_bb   <= 70 ? 'black' : 'white');
    let text_sci_color_kr     = ( rumus_sci_kr   > 50 && rumus_sci_kr   <= 70 ? 'black' : 'white');
    let text_sci_color_jk     = ( rumus_sci_jk   > 50 && rumus_sci_jk   <= 70 ? 'black' : 'white');
    let text_sci_color_jr     = ( rumus_sci_jr   > 50 && rumus_sci_jr   <= 70 ? 'black' : 'white');
    let text_sci_color_jt     = ( rumus_sci_jt   > 50 && rumus_sci_jt   <= 70 ? 'black' : 'white');
    let text_sci_color_yo     = ( rumus_sci_yo   > 50 && rumus_sci_yo   <= 70 ? 'black' : 'white');
    let text_sci_color_ji     = ( rumus_sci_ji   > 50 && rumus_sci_ji   <= 70 ? 'black' : 'white');
    let text_sci_color_bt     = ( rumus_sci_bt   > 50 && rumus_sci_bt   <= 70 ? 'black' : 'white');
    let text_sci_color_ba     = ( rumus_sci_ba   > 50 && rumus_sci_ba   <= 70 ? 'black' : 'white');
    let text_sci_color_nb     = ( rumus_sci_nb   > 50 && rumus_sci_nb   <= 70 ? 'black' : 'white');
    let text_sci_color_nt     = ( rumus_sci_nt   > 50 && rumus_sci_nt   <= 70 ? 'black' : 'white');
    let text_sci_color_kb     = ( rumus_sci_kb   > 50 && rumus_sci_kb   <= 70 ? 'black' : 'white');
    let text_sci_color_kt     = ( rumus_sci_kt   > 50 && rumus_sci_kt   <= 70 ? 'black' : 'white');
    let text_sci_color_ks     = ( rumus_sci_ks   > 50 && rumus_sci_ks   <= 70 ? 'black' : 'white');
    let text_sci_color_ki     = ( rumus_sci_ki   > 50 && rumus_sci_ki   <= 70 ? 'black' : 'white');
    let text_sci_color_ku     = ( rumus_sci_ku   > 50 && rumus_sci_ku   <= 70 ? 'black' : 'white');
    let text_sci_color_sw     = ( rumus_sci_sw   > 50 && rumus_sci_sw   <= 70 ? 'black' : 'white');
    let text_sci_color_st     = ( rumus_sci_st   > 50 && rumus_sci_st   <= 70 ? 'black' : 'white');
    let text_sci_color_se     = ( rumus_sci_se   > 50 && rumus_sci_se   <= 70 ? 'black' : 'white');
    let text_sci_color_sg     = ( rumus_sci_sg   > 50 && rumus_sci_sg   <= 70 ? 'black' : 'white');
    let text_sci_color_go     = ( rumus_sci_go   > 50 && rumus_sci_go   <= 70 ? 'black' : 'white');
    let text_sci_color_sr     = ( rumus_sci_sr   > 50 && rumus_sci_sr   <= 70 ? 'black' : 'white');
    let text_sci_color_ma     = ( rumus_sci_ma   > 50 && rumus_sci_ma   <= 70 ? 'black' : 'white');
    let text_sci_color_la     = ( rumus_sci_la   > 50 && rumus_sci_la   <= 70 ? 'black' : 'white');
    let text_sci_color_ib     = ( rumus_sci_ib   > 50 && rumus_sci_ib   <= 70 ? 'black' : 'white');
    let text_sci_color_pa     = ( rumus_sci_pa   > 50 && rumus_sci_pa   <= 70 ? 'black' : 'white');

    // let sci_color_ac   = rumus_sci_ac   >= 90 ? 'green' : ( rumus_sci_ac   <= 89 && rumus_sci_ac   >= 60 ? 'yellow' : 'red');
    // let sci_color_su   = rumus_sci_su   >= 90 ? 'green' : ( rumus_sci_su   <= 89 && rumus_sci_su   >= 60 ? 'yellow' : 'red');
    // let sci_color_sb   = rumus_sci_sb   >= 90 ? 'green' : ( rumus_sci_sb   <= 89 && rumus_sci_sb   >= 60 ? 'yellow' : 'red');
    // let sci_color_ri   = rumus_sci_ri   >= 90 ? 'green' : ( rumus_sci_ri   <= 89 && rumus_sci_ri   >= 60 ? 'yellow' : 'red');
    // let sci_color_ja   = rumus_sci_ja   >= 90 ? 'green' : ( rumus_sci_ja   <= 89 && rumus_sci_ja   >= 60 ? 'yellow' : 'red');
    // let sci_color_sl   = rumus_sci_sl   >= 90 ? 'green' : ( rumus_sci_sl   <= 89 && rumus_sci_sl   >= 60 ? 'yellow' : 'red');
    // let sci_color_be   = rumus_sci_be   >= 90 ? 'green' : ( rumus_sci_be   <= 89 && rumus_sci_be   >= 60 ? 'yellow' : 'red');
    // let sci_color_1024 = rumus_sci_1024 >= 90 ? 'green' : ( rumus_sci_1024 <= 89 && rumus_sci_1024 >= 60 ? 'yellow' : 'red');
    // let sci_color_bb   = rumus_sci_bb   >= 90 ? 'green' : ( rumus_sci_bb   <= 89 && rumus_sci_bb   >= 60 ? 'yellow' : 'red');
    // let sci_color_kr   = rumus_sci_kr   >= 90 ? 'green' : ( rumus_sci_kr   <= 89 && rumus_sci_kr   >= 60 ? 'yellow' : 'red');
    // let sci_color_jk   = rumus_sci_jk   >= 90 ? 'green' : ( rumus_sci_jk   <= 89 && rumus_sci_jk   >= 60 ? 'yellow' : 'red');
    // let sci_color_jr   = rumus_sci_jr   >= 90 ? 'green' : ( rumus_sci_jr   <= 89 && rumus_sci_jr   >= 60 ? 'yellow' : 'red');
    // let sci_color_jt   = rumus_sci_jt   >= 90 ? 'green' : ( rumus_sci_jt   <= 89 && rumus_sci_jt   >= 60 ? 'yellow' : 'red');
    // let sci_color_yo   = rumus_sci_yo   >= 90 ? 'green' : ( rumus_sci_yo   <= 89 && rumus_sci_yo   >= 60 ? 'yellow' : 'red');
    // let sci_color_ji   = rumus_sci_ji   >= 90 ? 'green' : ( rumus_sci_ji   <= 89 && rumus_sci_ji   >= 60 ? 'yellow' : 'red');
    // let sci_color_bt   = rumus_sci_bt   >= 90 ? 'green' : ( rumus_sci_bt   <= 89 && rumus_sci_bt   >= 60 ? 'yellow' : 'red');
    // let sci_color_ba   = rumus_sci_ba   >= 90 ? 'green' : ( rumus_sci_ba   <= 89 && rumus_sci_ba   >= 60 ? 'yellow' : 'red');
    // let sci_color_nb   = rumus_sci_nb   >= 90 ? 'green' : ( rumus_sci_nb   <= 89 && rumus_sci_nb   >= 60 ? 'yellow' : 'red');
    // let sci_color_nt   = rumus_sci_nt   >= 90 ? 'green' : ( rumus_sci_nt   <= 89 && rumus_sci_nt   >= 60 ? 'yellow' : 'red');
    // let sci_color_kb   = rumus_sci_kb   >= 90 ? 'green' : ( rumus_sci_kb   <= 89 && rumus_sci_kb   >= 60 ? 'yellow' : 'red');
    // let sci_color_kt   = rumus_sci_kt   >= 90 ? 'green' : ( rumus_sci_kt   <= 89 && rumus_sci_kt   >= 60 ? 'yellow' : 'red');
    // let sci_color_ks   = rumus_sci_ks   >= 90 ? 'green' : ( rumus_sci_ks   <= 89 && rumus_sci_ks   >= 60 ? 'yellow' : 'red');
    // let sci_color_ki   = rumus_sci_ki   >= 90 ? 'green' : ( rumus_sci_ki   <= 89 && rumus_sci_ki   >= 60 ? 'yellow' : 'red');
    // let sci_color_ku   = rumus_sci_ku   >= 90 ? 'green' : ( rumus_sci_ku   <= 89 && rumus_sci_ku   >= 60 ? 'yellow' : 'red');
    // let sci_color_sw   = rumus_sci_sw   >= 90 ? 'green' : ( rumus_sci_sw   <= 89 && rumus_sci_sw   >= 60 ? 'yellow' : 'red');
    // let sci_color_st   = rumus_sci_st   >= 90 ? 'green' : ( rumus_sci_st   <= 89 && rumus_sci_st   >= 60 ? 'yellow' : 'red');
    // let sci_color_se   = rumus_sci_se   >= 90 ? 'green' : ( rumus_sci_se   <= 89 && rumus_sci_se   >= 60 ? 'yellow' : 'red');
    // let sci_color_sg   = rumus_sci_sg   >= 90 ? 'green' : ( rumus_sci_sg   <= 89 && rumus_sci_sg   >= 60 ? 'yellow' : 'red');
    // let sci_color_go   = rumus_sci_go   >= 90 ? 'green' : ( rumus_sci_go   <= 89 && rumus_sci_go   >= 60 ? 'yellow' : 'red');
    // let sci_color_sr   = rumus_sci_sr   >= 90 ? 'green' : ( rumus_sci_sr   <= 89 && rumus_sci_sr   >= 60 ? 'yellow' : 'red');
    // let sci_color_ma   = rumus_sci_ma   >= 90 ? 'green' : ( rumus_sci_ma   <= 89 && rumus_sci_ma   >= 60 ? 'yellow' : 'red');
    // let sci_color_la   = rumus_sci_la   >= 90 ? 'green' : ( rumus_sci_la   <= 89 && rumus_sci_la   >= 60 ? 'yellow' : 'red');
    // let sci_color_pa   = rumus_sci_pa   >= 90 ? 'green' : ( rumus_sci_pa   <= 89 && rumus_sci_pa   >= 60 ? 'yellow' : 'red');
    // let sci_color_ib   = rumus_sci_ib   >= 90 ? 'green' : ( rumus_sci_ib   <= 89 && rumus_sci_ib   >= 60 ? 'yellow' : 'red');
    
    let data_highchart = [
        // ['id-ac',   ['<b> ( '+ rumus_sci_ac.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][0]  ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][0]  ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][0]  , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][0]]  , sci_color_ac   ],
        // ['id-su',   ['<b> ( '+ rumus_sci_su.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][1]  ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][1]  ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][1]  , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][1]]  , sci_color_su   ],
        // ['id-sb',   ['<b> ( '+ rumus_sci_sb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][2]  ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][2]  ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][2]  , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][2]]  , sci_color_sb   ],
        // ['id-ri',   ['<b> ( '+ rumus_sci_ri.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][3]  ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][3]  ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][3]  , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][3]]  , sci_color_ri   ],
        // ['id-ja',   ['<b> ( '+ rumus_sci_ja.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][4]  ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][4]  ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][4]  , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][4]]  , sci_color_ja   ],
        // ['id-sl',   ['<b> ( '+ rumus_sci_sl.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][5]  ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][5]  ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][5]  , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][5]]  , sci_color_sl   ],
        // ['id-be',   ['<b> ( '+ rumus_sci_be.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][6]  ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][6]  ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][6]  , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][6]]  , sci_color_be   ],
        // ['id-1024', ['<b> ( '+ rumus_sci_1024.toLocaleString(undefined, {maximumFractionDigits:2}) +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][7]  ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][7]  ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][7]  , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][7]]  , sci_color_1024 ],
        // ['id-bb',   ['<b> ( '+ rumus_sci_bb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][8]  ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][8]  ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][8]  , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][8]]  , sci_color_bb   ],
        // ['id-kr',   ['<b> ( '+ rumus_sci_kr.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][9]  ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][9]  ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][9]  , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][9]]  , sci_color_kr   ],
        // ['id-jk',   ['<b> ( '+ rumus_sci_jk.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][10] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][10] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][10] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][10]] , sci_color_jk   ],
        // ['id-jr',   ['<b> ( '+ rumus_sci_jr.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][11] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][11] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][11] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][11]] , sci_color_jr   ],
        // ['id-jt',   ['<b> ( '+ rumus_sci_jt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][12] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][12] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][12] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][12]] , sci_color_jt   ],
        // ['id-yo',   ['<b> ( '+ rumus_sci_yo.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][13] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][13] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][13] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][13]] , sci_color_yo   ],
        // ['id-ji',   ['<b> ( '+ rumus_sci_ji.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][14] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][14] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][14] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][14]] , sci_color_ji   ],
        // ['id-bt',   ['<b> ( '+ rumus_sci_bt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][15] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][15] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][15] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][15]] , sci_color_bt   ],
        // ['id-ba',   ['<b> ( '+ rumus_sci_ba.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][16] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][16] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][16] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][16]] , sci_color_ba   ],
        // ['id-nb',   ['<b> ( '+ rumus_sci_nb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][17] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][17] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][17] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][17]] , sci_color_nb   ],
        // ['id-nt',   ['<b> ( '+ rumus_sci_nt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][18] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][18] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][18] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][18]] , sci_color_nt   ],
        // ['id-kb',   ['<b> ( '+ rumus_sci_kb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][19] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][19] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][19] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][19]] , sci_color_kb   ],
        // ['id-kt',   ['<b> ( '+ rumus_sci_kt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][20] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][20] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][20] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][20]] , sci_color_kt   ],
        // ['id-ks',   ['<b> ( '+ rumus_sci_ks.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][21] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][21] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][21] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][21]] , sci_color_ks   ],
        // ['id-ki',   ['<b> ( '+ rumus_sci_ki.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][22] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][22] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][22] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][22]] , sci_color_ki   ],
        // ['id-ku',   ['<b> ( '+ rumus_sci_ku.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][23] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][23] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][23] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][23]] , sci_color_ku   ],
        // ['id-sw',   ['<b> ( '+ rumus_sci_sw.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][24] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][24] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][24] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][24]] , sci_color_sw   ],
        // ['id-st',   ['<b> ( '+ rumus_sci_st.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][25] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][25] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][25] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][25]] , sci_color_st   ],
        // ['id-se',   ['<b> ( '+ rumus_sci_se.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][26] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][26] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][26] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][26]] , sci_color_se   ],
        // ['id-sg',   ['<b> ( '+ rumus_sci_sg.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][27] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][27] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][27] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][27]] , sci_color_sg   ],
        // ['id-go',   ['<b> ( '+ rumus_sci_go.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][28] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][28] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][28] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][28]] , sci_color_go   ],
        // ['id-sr',   ['<b> ( '+ rumus_sci_sr.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][29] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][29] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][29] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][29]] , sci_color_sr   ],
        // ['id-ma',   ['<b> ( '+ rumus_sci_ma.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][30] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][30] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][30] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][30]] , sci_color_ma   ],
        // ['id-la',   ['<b> ( '+ rumus_sci_la.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][31] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][31] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][31] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][31]] , sci_color_la   ],
        // ['id-pa',   ['<b> ( '+ rumus_sci_pa.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][32] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][32] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][32] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][32]] , sci_color_pa   ],
        // ['id-ib',   ['<b> ( '+ rumus_sci_ib.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Tersertifikasi ' + selectedOptionHighChartLabelName ,'</b><br>Total Perusahaan : <b>'+dataTotalPerusahaanHighChart[0][33] ,'</b><br>Total Perusahaan Tersertifikasi Aktif : <b>'+dataTotalPerusahaanTersertifikasiAktifHighChart[0][33] ,'</b><br>Total Perusahaan Tersertifikasi Tidak Aktif ( Expired ) : <b>'+dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][33] , '</b><br>Total Perusahaan Belum Tersertifikasi : <b>'+dataTotalPerusahaanBelumBersertifikatHighChart[0][33]] , sci_color_ib   ],

        // REAL DATA
        // ['id-ac',   [rumus_sci_ac.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_ac.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][0]  , dataTotalPerusahaanTersertifikasiAktifHighChart[0][0]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][0]  , dataTotalPerusahaanBelumBersertifikatHighChart[0][0]]  , sci_color_ac   , text_sci_color_ac   ],
        // ['id-su',   [rumus_sci_su.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_su.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][1]  , dataTotalPerusahaanTersertifikasiAktifHighChart[0][1]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][1]  , dataTotalPerusahaanBelumBersertifikatHighChart[0][1]]  , sci_color_su   , text_sci_color_su   ],
        // ['id-sb',   [rumus_sci_sb.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_sb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][2]  , dataTotalPerusahaanTersertifikasiAktifHighChart[0][2]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][2]  , dataTotalPerusahaanBelumBersertifikatHighChart[0][2]]  , sci_color_sb   , text_sci_color_sb   ],
        // ['id-ri',   [rumus_sci_ri.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_ri.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][3]  , dataTotalPerusahaanTersertifikasiAktifHighChart[0][3]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][3]  , dataTotalPerusahaanBelumBersertifikatHighChart[0][3]]  , sci_color_ri   , text_sci_color_ri   ],
        // ['id-ja',   [rumus_sci_ja.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_ja.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][4]  , dataTotalPerusahaanTersertifikasiAktifHighChart[0][4]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][4]  , dataTotalPerusahaanBelumBersertifikatHighChart[0][4]]  , sci_color_ja   , text_sci_color_ja   ],
        // ['id-sl',   [rumus_sci_sl.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_sl.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][5]  , dataTotalPerusahaanTersertifikasiAktifHighChart[0][5]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][5]  , dataTotalPerusahaanBelumBersertifikatHighChart[0][5]]  , sci_color_sl   , text_sci_color_sl   ],
        // ['id-be',   [rumus_sci_be.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_be.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][6]  , dataTotalPerusahaanTersertifikasiAktifHighChart[0][6]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][6]  , dataTotalPerusahaanBelumBersertifikatHighChart[0][6]]  , sci_color_be   , text_sci_color_be   ],
        // ['id-1024', [rumus_sci_1024.toLocaleString(undefined, {maximumFractionDigits:2})] ,[' ( '+ rumus_sci_1024.toLocaleString(undefined, {maximumFractionDigits:2}) +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][7]  , dataTotalPerusahaanTersertifikasiAktifHighChart[0][7]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][7]  , dataTotalPerusahaanBelumBersertifikatHighChart[0][7]]  , sci_color_1024 , text_sci_color_1024 ],
        // ['id-bb',   [rumus_sci_bb.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_bb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][8]  , dataTotalPerusahaanTersertifikasiAktifHighChart[0][8]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][8]  , dataTotalPerusahaanBelumBersertifikatHighChart[0][8]]  , sci_color_bb   , text_sci_color_bb   ],
        // ['id-kr',   [rumus_sci_kr.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_kr.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][9]  , dataTotalPerusahaanTersertifikasiAktifHighChart[0][9]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][9]  , dataTotalPerusahaanBelumBersertifikatHighChart[0][9]]  , sci_color_kr   , text_sci_color_kr   ],
        // ['id-jk',   [rumus_sci_jk.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_jk.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][10] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][10] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][10] , dataTotalPerusahaanBelumBersertifikatHighChart[0][10]] , sci_color_jk   , text_sci_color_jk   ],
        // ['id-jr',   [rumus_sci_jr.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_jr.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][11] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][11] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][11] , dataTotalPerusahaanBelumBersertifikatHighChart[0][11]] , sci_color_jr   , text_sci_color_jr   ],
        // ['id-jt',   [rumus_sci_jt.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_jt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][12] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][12] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][12] , dataTotalPerusahaanBelumBersertifikatHighChart[0][12]] , sci_color_jt   , text_sci_color_jt   ],
        // ['id-yo',   [rumus_sci_yo.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_yo.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][13] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][13] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][13] , dataTotalPerusahaanBelumBersertifikatHighChart[0][13]] , sci_color_yo   , text_sci_color_yo   ],
        // ['id-ji',   [rumus_sci_ji.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_ji.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][14] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][14] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][14] , dataTotalPerusahaanBelumBersertifikatHighChart[0][14]] , sci_color_ji   , text_sci_color_ji   ],
        // ['id-bt',   [rumus_sci_bt.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_bt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][15] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][15] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][15] , dataTotalPerusahaanBelumBersertifikatHighChart[0][15]] , sci_color_bt   , text_sci_color_bt   ],
        // ['id-ba',   [rumus_sci_ba.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_ba.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][16] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][16] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][16] , dataTotalPerusahaanBelumBersertifikatHighChart[0][16]] , sci_color_ba   , text_sci_color_ba   ],
        // ['id-nb',   [rumus_sci_nb.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_nb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][17] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][17] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][17] , dataTotalPerusahaanBelumBersertifikatHighChart[0][17]] , sci_color_nb   , text_sci_color_nb   ],
        // ['id-nt',   [rumus_sci_nt.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_nt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][18] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][18] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][18] , dataTotalPerusahaanBelumBersertifikatHighChart[0][18]] , sci_color_nt   , text_sci_color_nt   ],
        // ['id-kb',   [rumus_sci_kb.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_kb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][19] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][19] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][19] , dataTotalPerusahaanBelumBersertifikatHighChart[0][19]] , sci_color_kb   , text_sci_color_kb   ],
        // ['id-kt',   [rumus_sci_kt.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_kt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][20] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][20] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][20] , dataTotalPerusahaanBelumBersertifikatHighChart[0][20]] , sci_color_kt   , text_sci_color_kt   ],
        // ['id-ks',   [rumus_sci_ks.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_ks.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][21] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][21] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][21] , dataTotalPerusahaanBelumBersertifikatHighChart[0][21]] , sci_color_ks   , text_sci_color_ks   ],
        // ['id-ki',   [rumus_sci_ki.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_ki.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][22] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][22] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][22] , dataTotalPerusahaanBelumBersertifikatHighChart[0][22]] , sci_color_ki   , text_sci_color_ki   ],
        // ['id-ku',   [rumus_sci_ku.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_ku.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][23] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][23] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][23] , dataTotalPerusahaanBelumBersertifikatHighChart[0][23]] , sci_color_ku   , text_sci_color_ku   ],
        // ['id-sw',   [rumus_sci_sw.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_sw.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][24] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][24] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][24] , dataTotalPerusahaanBelumBersertifikatHighChart[0][24]] , sci_color_sw   , text_sci_color_sw   ],
        // ['id-st',   [rumus_sci_st.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_st.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][25] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][25] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][25] , dataTotalPerusahaanBelumBersertifikatHighChart[0][25]] , sci_color_st   , text_sci_color_st   ],
        // ['id-se',   [rumus_sci_se.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_se.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][26] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][26] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][26] , dataTotalPerusahaanBelumBersertifikatHighChart[0][26]] , sci_color_se   , text_sci_color_se   ],
        // ['id-sg',   [rumus_sci_sg.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_sg.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][27] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][27] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][27] , dataTotalPerusahaanBelumBersertifikatHighChart[0][27]] , sci_color_sg   , text_sci_color_sg   ],
        // ['id-go',   [rumus_sci_go.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_go.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][28] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][28] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][28] , dataTotalPerusahaanBelumBersertifikatHighChart[0][28]] , sci_color_go   , text_sci_color_go   ],
        // ['id-sr',   [rumus_sci_sr.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_sr.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][29] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][29] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][29] , dataTotalPerusahaanBelumBersertifikatHighChart[0][29]] , sci_color_sr   , text_sci_color_sr   ],
        // ['id-ma',   [rumus_sci_ma.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_ma.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][30] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][30] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][30] , dataTotalPerusahaanBelumBersertifikatHighChart[0][30]] , sci_color_ma   , text_sci_color_ma   ],
        // ['id-la',   [rumus_sci_la.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_la.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][31] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][31] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][31] , dataTotalPerusahaanBelumBersertifikatHighChart[0][31]] , sci_color_la   , text_sci_color_la   ],
        // ['id-ib',   [rumus_sci_ib.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_ib.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][33] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][33] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][33] , dataTotalPerusahaanBelumBersertifikatHighChart[0][33]] , sci_color_ib   , text_sci_color_ib   ],
        // ['id-pa',   [rumus_sci_pa.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[' ( '+ rumus_sci_pa.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) Perusahaan Sudah Tersertifikasi ' + selectedOptionHighChartLabelName , dataTotalPerusahaanHighChart[0][32] , dataTotalPerusahaanTersertifikasiAktifHighChart[0][32] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][32] , dataTotalPerusahaanBelumBersertifikatHighChart[0][32]] , sci_color_pa   , text_sci_color_pa   ],

        //DATA DAMI
        ['id-ac',   [rumus_sci_ac.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_ac.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 137 : dataTotalPerusahaanHighChart[0][0]  ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][0]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][0]  , ( selectedOptionHighChart == 10 ? ( 137 - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][0]  + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][0] )) : dataTotalPerusahaanBelumBersertifikatHighChart[0][0]  )] , sci_color_ac   , text_sci_color_ac   ],
        ['id-su',   [rumus_sci_su.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_su.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 324 : dataTotalPerusahaanHighChart[0][1]  ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][1]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][1]  , ( selectedOptionHighChart == 10 ? ( 324 - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][1]  + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][1] )) : dataTotalPerusahaanBelumBersertifikatHighChart[0][1]  )] , sci_color_su   , text_sci_color_su   ],
        ['id-sb',   [rumus_sci_sb.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_sb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 56  : dataTotalPerusahaanHighChart[0][2]  ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][2]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][2]  , ( selectedOptionHighChart == 10 ? ( 56  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][2]  + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][2] )) : dataTotalPerusahaanBelumBersertifikatHighChart[0][2]  )] , sci_color_sb   , text_sci_color_sb   ],
        ['id-ri',   [rumus_sci_ri.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_ri.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 280 : dataTotalPerusahaanHighChart[0][3]  ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][3]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][3]  , ( selectedOptionHighChart == 10 ? ( 280 - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][3]  + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][3] )) : dataTotalPerusahaanBelumBersertifikatHighChart[0][3]  )] , sci_color_ri   , text_sci_color_ri   ],
        ['id-ja',   [rumus_sci_ja.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_ja.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 164 : dataTotalPerusahaanHighChart[0][4]  ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][4]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][4]  , ( selectedOptionHighChart == 10 ? ( 164 - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][4]  + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][4] )) : dataTotalPerusahaanBelumBersertifikatHighChart[0][4]  )] , sci_color_ja   , text_sci_color_ja   ],
        ['id-sl',   [rumus_sci_sl.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_sl.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 170 : dataTotalPerusahaanHighChart[0][5]  ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][5]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][5]  , ( selectedOptionHighChart == 10 ? ( 170 - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][5]  + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][5] )) : dataTotalPerusahaanBelumBersertifikatHighChart[0][5]  )] , sci_color_sl   , text_sci_color_sl   ],
        ['id-be',   [rumus_sci_be.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_be.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 54  : dataTotalPerusahaanHighChart[0][6]  ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][6]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][6]  , ( selectedOptionHighChart == 10 ? ( 54  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][6]  + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][6] )) : dataTotalPerusahaanBelumBersertifikatHighChart[0][6]  )] , sci_color_be   , text_sci_color_be   ],
        ['id-1024', [rumus_sci_1024.toLocaleString(undefined, {maximumFractionDigits:2})] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_1024.toLocaleString(undefined, {maximumFractionDigits:2}) +' % ) ', ( selectedOptionHighChart == 10 ? 81  : dataTotalPerusahaanHighChart[0][7]  ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][7]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][7]  , ( selectedOptionHighChart == 10 ? ( 81  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][7]  + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][7] )) : dataTotalPerusahaanBelumBersertifikatHighChart[0][7]  )] , sci_color_1024 , text_sci_color_1024 ],
        ['id-bb',   [rumus_sci_bb.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_bb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 53  : dataTotalPerusahaanHighChart[0][8]  ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][8]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][8]  , ( selectedOptionHighChart == 10 ? ( 53  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][8]  + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][8] )) : dataTotalPerusahaanBelumBersertifikatHighChart[0][8]  )] , sci_color_bb   , text_sci_color_bb   ],
        ['id-kr',   [rumus_sci_kr.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_kr.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 3   : dataTotalPerusahaanHighChart[0][9]  ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][9]  , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][9]  , ( selectedOptionHighChart == 10 ? ( 3   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][9]  + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][9] )) : dataTotalPerusahaanBelumBersertifikatHighChart[0][9]  )] , sci_color_kr   , text_sci_color_kr   ],
        ['id-jk',   [rumus_sci_jk.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_jk.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 0   : dataTotalPerusahaanHighChart[0][10] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][10] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][10] , ( selectedOptionHighChart == 10 ? ( 0   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][10] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][10])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][10] )] , sci_color_jk   , text_sci_color_jk   ],
        ['id-jr',   [rumus_sci_jr.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_jr.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 7   : dataTotalPerusahaanHighChart[0][11] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][11] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][11] , ( selectedOptionHighChart == 10 ? ( 7   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][11] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][11])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][11] )] , sci_color_jr   , text_sci_color_jr   ],
        ['id-jt',   [rumus_sci_jt.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_jt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 0   : dataTotalPerusahaanHighChart[0][12] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][12] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][12] , ( selectedOptionHighChart == 10 ? ( 0   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][12] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][12])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][12] )] , sci_color_jt   , text_sci_color_jt   ],
        ['id-yo',   [rumus_sci_yo.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_yo.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 0   : dataTotalPerusahaanHighChart[0][13] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][13] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][13] , ( selectedOptionHighChart == 10 ? ( 0   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][13] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][13])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][13] )] , sci_color_yo   , text_sci_color_yo   ],
        ['id-ji',   [rumus_sci_ji.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_ji.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 0   : dataTotalPerusahaanHighChart[0][14] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][14] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][14] , ( selectedOptionHighChart == 10 ? ( 0   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][14] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][14])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][14] )] , sci_color_ji   , text_sci_color_ji   ],
        ['id-bt',   [rumus_sci_bt.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_bt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 5   : dataTotalPerusahaanHighChart[0][15] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][15] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][15] , ( selectedOptionHighChart == 10 ? ( 5   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][15] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][15])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][15] )] , sci_color_bt   , text_sci_color_bt   ],
        ['id-ba',   [rumus_sci_ba.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_ba.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 0   : dataTotalPerusahaanHighChart[0][16] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][16] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][16] , ( selectedOptionHighChart == 10 ? ( 0   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][16] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][16])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][16] )] , sci_color_ba   , text_sci_color_ba   ],
        ['id-nb',   [rumus_sci_nb.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_nb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 0   : dataTotalPerusahaanHighChart[0][17] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][17] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][17] , ( selectedOptionHighChart == 10 ? ( 0   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][17] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][17])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][17] )] , sci_color_nb   , text_sci_color_nb   ],
        ['id-nt',   [rumus_sci_nt.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_nt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 0   : dataTotalPerusahaanHighChart[0][18] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][18] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][18] , ( selectedOptionHighChart == 10 ? ( 0   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][18] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][18])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][18] )] , sci_color_nt   , text_sci_color_nt   ],
        ['id-kb',   [rumus_sci_kb.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_kb.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 349 : dataTotalPerusahaanHighChart[0][19] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][19] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][19] , ( selectedOptionHighChart == 10 ? ( 349 - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][19] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][19])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][19] )] , sci_color_kb   , text_sci_color_kb   ],
        ['id-kt',   [rumus_sci_kt.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_kt.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 203 : dataTotalPerusahaanHighChart[0][20] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][20] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][20] , ( selectedOptionHighChart == 10 ? ( 203 - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][20] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][20])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][20] )] , sci_color_kt   , text_sci_color_kt   ],
        ['id-ks',   [rumus_sci_ks.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_ks.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 90  : dataTotalPerusahaanHighChart[0][21] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][21] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][21] , ( selectedOptionHighChart == 10 ? ( 90  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][21] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][21])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][21] )] , sci_color_ks   , text_sci_color_ks   ],
        ['id-ki',   [rumus_sci_ki.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_ki.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 318 : dataTotalPerusahaanHighChart[0][22] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][22] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][22] , ( selectedOptionHighChart == 10 ? ( 318 - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][22] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][22])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][22] )] , sci_color_ki   , text_sci_color_ki   ],
        ['id-ku',   [rumus_sci_ku.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_ku.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 64  : dataTotalPerusahaanHighChart[0][23] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][23] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][23] , ( selectedOptionHighChart == 10 ? ( 64  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][23] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][23])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][23] )] , sci_color_ku   , text_sci_color_ku   ],
        ['id-sw',   [rumus_sci_sw.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_sw.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 0   : dataTotalPerusahaanHighChart[0][24] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][24] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][24] , ( selectedOptionHighChart == 10 ? ( 0   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][24] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][24])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][24] )] , sci_color_sw   , text_sci_color_sw   ],
        ['id-st',   [rumus_sci_st.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_st.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 19  : dataTotalPerusahaanHighChart[0][25] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][25] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][25] , ( selectedOptionHighChart == 10 ? ( 19  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][25] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][25])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][25] )] , sci_color_st   , text_sci_color_st   ],
        ['id-se',   [rumus_sci_se.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_se.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 8   : dataTotalPerusahaanHighChart[0][26] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][26] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][26] , ( selectedOptionHighChart == 10 ? ( 8   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][26] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][26])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][26] )] , sci_color_se   , text_sci_color_se   ],
        ['id-sg',   [rumus_sci_sg.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_sg.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 20  : dataTotalPerusahaanHighChart[0][27] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][27] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][27] , ( selectedOptionHighChart == 10 ? ( 20  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][27] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][27])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][27] )] , sci_color_sg   , text_sci_color_sg   ],
        ['id-go',   [rumus_sci_go.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_go.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 4   : dataTotalPerusahaanHighChart[0][28] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][28] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][28] , ( selectedOptionHighChart == 10 ? ( 4   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][28] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][28])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][28] )] , sci_color_go   , text_sci_color_go   ],
        ['id-sr',   [rumus_sci_sr.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_sr.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 14  : dataTotalPerusahaanHighChart[0][29] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][29] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][29] , ( selectedOptionHighChart == 10 ? ( 14  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][29] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][29])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][29] )] , sci_color_sr   , text_sci_color_sr   ],
        ['id-ma',   [rumus_sci_ma.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_ma.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 9   : dataTotalPerusahaanHighChart[0][30] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][30] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][30] , ( selectedOptionHighChart == 10 ? ( 9   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][30] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][30])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][30] )] , sci_color_ma   , text_sci_color_ma   ],
        ['id-la',   [rumus_sci_la.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_la.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 1   : dataTotalPerusahaanHighChart[0][31] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][31] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][31] , ( selectedOptionHighChart == 10 ? ( 1   - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][31] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][31])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][31] )] , sci_color_la   , text_sci_color_la   ],
        ['id-ib',   [rumus_sci_ib.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_ib.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 10  : dataTotalPerusahaanHighChart[0][33] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][33] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][33] , ( selectedOptionHighChart == 10 ? ( 10  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][33] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][33])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][33] )] , sci_color_ib   , text_sci_color_ib   ],
        ['id-pa',   [rumus_sci_pa.toLocaleString(undefined, {maximumFractionDigits:2})  ] ,[ (selectedOptionHighChart == 4 ? 'Restaurant' : selectedOptionHighChart == 9 ? 'Hotel' : selectedOptionHighChartLabelName) + ' <br> Certification Performance Achievement ' + ' ( '+ rumus_sci_pa.toLocaleString(undefined, {maximumFractionDigits:2})   +' % ) ', ( selectedOptionHighChart == 10 ? 23  : dataTotalPerusahaanHighChart[0][32] ), dataTotalPerusahaanTersertifikasiAktifHighChart[0][32] , dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][32] , ( selectedOptionHighChart == 10 ? ( 23  - (dataTotalPerusahaanTersertifikasiAktifHighChart[0][32] + dataTotalPerusahaanTersertifikasiTidakAktifHighChart[0][32])) : dataTotalPerusahaanBelumBersertifikatHighChart[0][32] )] , sci_color_pa   , text_sci_color_pa   ],
    ];

    let options_highchart = {

        chart: {
            width: null,
            height: 550,
            backgroundColor: 'transparent',
            style: {
                fontFamily: 'Poppins, sans-serif'
            }
        },
        title: {
            text: "",
            style: {
                color: '#e0f2fe'
            }
        },
        plotOptions: {
            map: {
                states: {
                    hover: {
                        color: "{point.color}"
                    }
                }
            }
        },
        colorAxis: {
            // min: 0,
            min: 0,
            max: 100,
            tickInterval: 10,
            stops: [[0, 'red'], [0.10, 'red'], [0.20, 'red'], [0.30, 'red'],[0.40, 'red'],[0.41, 'yellow'],[0.50, 'yellow'],[0.60, 'yellow'],[0.70, 'yellow'],[0.71, 'green'],[0.80, 'green'],[0.90, 'green'], [1, 'green']],
            labels: {
                format: '{value}%',
                style: {
                    color: '#94a3b8'
                }
            }
        },
        // colorAxis: {
        //     min:  1,
        //     max:  data_highchart.value,
        //     type: 'logarithmic',
        //     minColor: '#DC143C',
        //     maxColor: '#008000',
        //     stops: [
        //         [0, '#DC143C'],
        //         [0.67, '#FFD700'],
        //         [1, '#008000']
        //     ],
        //     labels: {
        //         format: '{value}%'
        //     }
        // },
        legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
            itemStyle: {
                color: '#94a3b8',
                fontWeight: '500'
            },
            itemHoverStyle: {
                color: '#06b6d4'
            },
            title: {
                style: {
                    color: '#e0f2fe',
                    fontWeight: '600'
                }
            }
        },
        // legend: {
        //     title: {
        //         text: 'Population density per km²',
        //         style: {
        //             color: ( // theme
        //                 Highcharts.defaultOptions &&
        //                 Highcharts.defaultOptions.legend &&
        //                 Highcharts.defaultOptions.legend.title &&
        //                 Highcharts.defaultOptions.legend.title.style &&
        //                 Highcharts.defaultOptions.legend.title.style.color
        //             ) || 'black',
        //         }
        //     },
        //     width: 600,
        //     floating: false,
        //     align: 'left',
        //     x: 70, // = marginLeft - default spacingLeft
        //     itemWidth: 600,
        //     borderWidth: 1
        // },
        tooltip: {
            backgroundColor: 'rgba(10, 25, 47, 0.6)',
            borderWidth: 1,
            borderColor: 'rgba(6, 182, 212, 0.3)',
            borderRadius: 16,
            shadow: true,
            useHTML: true,
            padding: 0,
            style: {
                color: '#e0f2fe',
                fontFamily: 'Poppins, sans-serif'
            },
            pointFormat: '<div style="min-width: 320px; max-width: 380px; overflow: hidden; border-radius: 16px; background: rgba(10, 25, 47, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(6, 182, 212, 0.4); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);">'+
                            '<div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(37, 99, 235, 0.08) 100%); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 16px 20px; border-bottom: 1px solid rgba(6, 182, 212, 0.25);">'+
                                '<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">'+
                                    '<img src="{point.properties.image}" style="width: 32px; height: 32px; object-fit: contain; flex-shrink: 0;"/>'+
                                    '<div style="font-size: 18px; font-weight: 700; color: #06b6d4; line-height: 1.2;">{point.name}</div>'+
                                '</div>'+
                                '<div style="font-size: 12px; color: #e0f2fe; line-height: 1.2; padding-top: 4px;">{point.value_total.0}</div>'+
                            '</div>'+
                            '<div style="padding: 0;">'+
                                '<table style="width: 100%; border-collapse: collapse; font-size: 12px; table-layout: fixed;">'+
                                    '<thead>'+
                                        '<tr style="background: {point.color};">'+
                                            '<th style="padding: 12px; text-align: left; color: {point.text_color}; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.15); width: 70%;">Description</th>'+
                                            '<th style="padding: 12px; text-align: center; color: {point.text_color}; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.15); width: 30%;">Total</th>'+
                                        '</tr>'+
                                    '</thead>'+
                                    '<tbody>'+
                                        '<tr style="background: rgba(30, 58, 95, 0.4); border-bottom: 1px solid rgba(6, 182, 212, 0.15);">'+
                                            '<td style="padding: 12px; color: #e0f2fe; word-wrap: break-word;">Certificate <b style="color: #22d3ee;">Active</b></td>'+
                                            '<td style="padding: 12px; text-align: center; color: #e0f2fe; font-weight: 600;">{point.value_total.2}</td>'+
                                        '</tr>'+
                                        '<tr style="background: rgba(30, 58, 95, 0.25); border-bottom: 1px solid rgba(6, 182, 212, 0.15);">'+
                                            '<td style="padding: 12px; color: #e0f2fe; word-wrap: break-word;">Certificate <b style="color: #fbbf24;">Expired</b></td>'+
                                            '<td style="padding: 12px; text-align: center; color: #e0f2fe; font-weight: 600;">{point.value_total.3}</td>'+
                                        '</tr>'+
                                        '<tr style="background: rgba(30, 58, 95, 0.4); border-bottom: 1px solid rgba(6, 182, 212, 0.15);">'+
                                            '<td style="padding: 12px; color: #e0f2fe; word-wrap: break-word;">Not Yet <b style="color: #94a3b8;">Certificated</b></td>'+
                                            '<td style="padding: 12px; text-align: center; color: #e0f2fe; font-weight: 600;">{point.value_total.4}</td>'+
                                        '</tr>'+
                                        '<tr style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(37, 99, 235, 0.2) 100%); border-top: 2px solid rgba(6, 182, 212, 0.5);">'+
                                            '<td style="padding: 14px; text-align: center; color: #06b6d4; font-weight: 700;">Total Companies</td>'+
                                            '<td style="padding: 14px; text-align: center; color: #06b6d4; font-weight: 700; font-size: 14px;">{point.value_total.1}</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>'+
                            '</div>'+
                         '</div>',
            positioner: function () {
                return { x: 0, y: 190 };
            }
        },
        subtitle: {
            text: "INDONESIA",
            floating: true,
            align: "center",
            // y: -10,
            x: -30,
            style: {
            fontSize: "16px",
            color: '#06b6d4'
            }
        },
        series: [
            {
                animation: {
                    duration: 1000,
                },
                mapData: idnAll,
                data: data_highchart,
                keys: ['hc-key', 'value', 'value_total', 'color', 'text_color'],
                name: "Province",
                dataLabels: {
                    enabled: true,
                    format: "{point.name}",
                    style: {
                        color: '#e0f2fe',
                        textOutline: '1px contrast',
                        fontWeight: '500'
                    }
                },
            }
        ],
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        mapView: {
            // projection: {
            //     name: 'WebMercator'
            // },
            center: [15, 58],
            zoom: -2.5  
        },
        navigation: {
            buttonOptions: {
                // verticalAlign: 'top',
                // y: -20,
                x: -40
            }
        }
    };

    let options_highchart_detail = {
        
    }


    return (
        <div>
            <div className="row">
                <div className="col-md d-flex flex-wrap justify-content-center !px-[5ex] !pb-[2ex]">
                <Select
                    defaultValue={{ label: "ISPO ( Indonesia Sustainable Palm Oil )", value: 10 }}
                    value={selectedOptionHighChart.label}
                    onChange={handleChangesHighchart}
                    options={options_select_highchart}
                    className="filter_sert"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: 'rgba(10, 25, 47, 0.85)',
                            borderColor: 'rgba(6, 182, 212, 0.3)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                            minHeight: '50px',
                            '&:hover': {
                                borderColor: 'rgba(6, 182, 212, 0.5)',
                                boxShadow: '0 4px 20px rgba(6, 182, 212, 0.2)',
                            },
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: '#ffffff',
                            fontSize: '15px',
                            fontWeight: '500',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '15px',
                        }),
                        dropdownIndicator: (provided) => ({
                            ...provided,
                            color: '#22d3ee',
                            padding: '8px',
                            '&:hover': {
                                color: '#06b6d4',
                            },
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: 'rgba(10, 25, 47, 0.95)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            borderRadius: '12px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                            marginTop: '8px',
                            overflow: 'hidden',
                        }),
                        menuList: (provided) => ({
                            ...provided,
                            padding: '8px',
                            backgroundColor: 'transparent',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected
                                ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(37, 99, 235, 0.2) 100%)'
                                : state.isFocused
                                    ? 'rgba(6, 182, 212, 0.15)'
                                    : 'transparent',
                            color: state.isSelected ? '#22d3ee' : '#e0f2fe',
                            fontSize: '14px',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            margin: '2px 0',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                                color: '#ffffff',
                            },
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: '#ffffff',
                        }),
                        valueContainer: (provided) => ({
                            ...provided,
                            padding: '8px 12px',
                        }),
                    }}
                />
                </div>
            </div>
            <div className="high_chart_maps">
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={"mapChart"}
                    options={options_highchart}
                />
            </div>

            {/* <div id="wrapper">
                <div id="container"></div>
                <div id="info">
                    <span className="f32"><span id="flag"></span></span>
                    <h2></h2>
                    <div className="subheader">Click countries to view history</div>
                    <div id="country-chart"></div>
                </div>
            </div> */}

        </div>
        

    );


}

export default CustomHighMap;
