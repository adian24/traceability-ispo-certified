import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { logoVertikal } from "../../assets";
import "./payment.css";
import {
  orderByTransCode,
  UpdateOrder,
  NotifNewOrderForOpr
} from "../../config/Redux/action/paymentTrans";
import {
  getOprByOprId
} from "../../config/Redux/action/getOprByOprId";
import { Spinner } from "react-bootstrap";
import moment from 'moment'

const Failure = () => {
  const [order_id, setOrder_id]                                         = useState("");
  // const [transaction_status, setTransaction_status]                     = useState("");
  const [tempDataUpdate, setTempDataUpdate]                             = useState();
  const [tempDataUpdateNotifNewOrder, setTempDataUpdateNotifNewOrder]   = useState();
  const dispatch                                                        = useDispatch();
  const { loadingDataOrder, dataOrder }                                 = useSelector((s) => s.PaymentTrans);
  const {dataOperator }                                                 = useSelector((s) => s.GetOprByOprId);

  useEffect(() => {
    //?order_id=ORDER-101-1662089172&status_code=200&transaction_status=settlement
    // ?order_id=ORDER-101-1622248866&status_code=201&transaction_status=pending
    let search                = window.location.search;
    let params                = new URLSearchParams(search);
    // console.log('paramssss',params.get("order_id"))

    const order_id            = params.get("order_id");
    // const transaction_status  = params.get("transaction_status");

    async function updatedataa() {
      if (order_id) {
        await setOrder_id(order_id);
        // await setTransaction_status(transaction_status);

        //get data order by trans code
        await dispatch(orderByTransCode({ trans_code: order_id }));
        await dispatch(getOprByOprId({ opr_id: dataOrder.opr_id }));
        
        // variable temporary update data
        await setTempDataUpdate({
          trans_code: order_id,
          trans_status: 0,
          date_today: new Date(),
          opr_id: dataOrder.opr_id,
          cust_id: dataOrder.cust_id,
        });

        await setTempDataUpdateNotifNewOrder({
          trans_status: 0,
          opr_id: dataOrder.opr_id,
          cust_id: dataOrder.cust_id,
        });
      }
    }
    updatedataa();
  }, [order_id]);

  // useEffect(() => {
  //   if (dataOrder) {
  //     dispatch(UpdateOrder(tempDataUpdate));
  //   }
  // }, [dataOrder]);

  const toHistory = async () => {
    if(order_id) {
      await dispatch(UpdateOrder(tempDataUpdate));
      await dispatch(NotifNewOrderForOpr(tempDataUpdateNotifNewOrder));
      window.ReactNativeWebView.postMessage("Failure");
    }
  };

  console.log('dataOrder',dataOrder)
  console.log('dataOperator',dataOperator)
  
  var totalHari    = 0;
  var totalMandays = 0;
  var biaya_payment_gateway = dataOrder.biaya_payment_gateway;
  var total_pembayaran = dataOrder.price;
  
  return (
    <>
      {loadingDataOrder ? (
        <Spinner color="primary" />
      ) : (
        <>
          <div style={{ overflowX: "hidden" }}>
            <div className="" style={{background:'white'}}>
              <Card className="" >
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center">
                    <img src={logoVertikal} className="img-pga" alt="logo" />
                  </div>
                  <p className="text-contain">
                    Maaf, Transaksi anda gagal. Coba ulangi lagi!
                  </p>
                  <p className="text-contain">
                    Status :{" "}
                    {/* {transaction_status ? (
                      <span className="text-status" style={{ color:'red', fontWeight:'bold' }}>{transaction_status}</span>
                    ) : ( */}
                      <span className="text-status">Gagal</span>
                    {/* // )} */}
                  </p>
                </Card.Body>
              </Card>
            </div>
            <div style={{ backgroundColor:'purple', paddingBottom: "10px", margin: 10  }}>
              <div>
                <table className="table" style={{ fontSize:10, color:'white', fontWeight:'bold'}}>
                  <tr>
                    <td>Detail Pesanan</td>
                  </tr>
                </table>
                {/* Detail Pemesanan */}
                <Card style={{  marginTop:-20, marginLeft:10, marginRight:10  }}>
                  <div className="row" style={{ padding:10}}>
                    <div className="col-1">
                      <img style={{ width:'30px', height:'30px', border:'1px solid purple', borderRadius:5 }} alt="detail" src={logoVertikal} />
                    </div>
                    <div className="col-8 ml-2" style={{alignItems:'center', display:'grid' }}>
                      <div className="row">
                        <div className="col-12" style={{  fontSize:15, fontWeight:'bold' }}>
                          {dataOrder?.opr_name}
                        </div>
                        <div className="col-12" style={{  fontSize:9 }}>
                          <i>Tanggal Pesanan : {moment(dataOrder.create_date).format('dddd, MMMM Do, YYYY')}</i>
                        </div>
                      </div>
                    </div>
                  </div>
                
                    <div className="row" style={{ paddingLeft:10, fontSize:10 }}>
                      <div className="col-11 ml-2 mr-2 " style={{ borderBottom:'1px solid silver' }}>
                      { dataOrder.notes != 'undefined' ? 
                          <p><i>Catatan: {dataOrder.notes}</i></p>
                        : null
                      }
                      </div>
                    </div>
                    
                  <Card.Body>
                    <p style={{ fontWeight:'bold', fontSize:12 }}>Informasi Perusahaan dan Standar yang di Audit</p>
                    <table border="1" className="table table-bordered" style={{ fontSize:10 }}>
                      {/* <tr>
                        <td>{order_id ? order_id : "order ID not available"}</td>
                        <td align="right">Lihat Progress</td>
                      </tr> */}
                      <tr>
                        <td>Perusahaan</td>
                        <td align="right">{dataOrder.company_service}</td>
                      </tr>
                      <tr>
                        <td>Audit Standard</td>
                        <td align="right">{dataOrder.audit_standard}</td>
                      </tr>
                    </table>

                    <p style={{ fontWeight:'bold', fontSize:12 }}>Lokasi Audit</p>
                    <p style={{ fontSize:10 }}>{dataOrder.detail_address} Kec.  {dataOrder.nama_kecamatan} Kota {dataOrder.nama_kota} Prov. {dataOrder.nama_provinsi}</p>
                  

                    <p style={{ fontWeight:'bold', fontSize:12 }}>Detail Audit dan Rincian Pembayaran</p>

                    <table className="table" style={{ fontSize:10, background: '#e2b4e2' }}>
                      <tr>
                        <td>Metode Pembayaran</td>
                        <td align="right">
                          {
                            dataOrder.metode_pembayaran == "vabca" ? "BCA Virtual Account" : 
                            (dataOrder.metode_pembayaran == "vamandiri" ? "Mandiri Virtual Account" : 
                            (dataOrder.metode_pembayaran == "vabni" ? "BNI Virtual Account" : 
                            (dataOrder.metode_pembayaran == "vapermata" ? "Permata Virtual Account" : 
                            (dataOrder.metode_pembayaran == "vabri" ? "BRI Virtual Account" : "-"))))
                          }
                        </td>
                      </tr>
                    </table>

                    <table border="1" className="table table-bordered" style={{ fontSize:10 }}>
                      <tr>
                        <td align='center'><b>Tanggal Audit</b></td>
                        <td align='center'><b>Hari</b></td>
                        <td align='center'><b>Mandays/Hari</b></td>
                      </tr>
                      {
                        dataOrder?.data_schedule?.map(inputField => (
                          totalHari += inputField.total_booked_per_day,
                          totalMandays += inputField.mandays_per_day,
                          <tr>
                            <td>{moment(inputField.date_booked).format('dddd, MMMM Do, YYYY')}</td>
                            <td align="center">{inputField.total_booked_per_day} </td>
                            <td align="right">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'IDR' }).format(inputField.mandays_per_day)} </td>
                          </tr>
                        ))
                      }
                    <tr>
                        <td>
                          <b>Total Mandays</b>
                        </td>
                        <td align="center">
                          <b>{totalHari}</b>
                        </td>
                        <td align="right">
                          { new Intl.NumberFormat('en-ID',{ style: 'currency', currency: 'IDR' }).format(totalMandays)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}><b>Biaya Penanganan</b></td>
                        <td align="right">
                          { new Intl.NumberFormat('en-ID',{ style: 'currency', currency: 'IDR' }).format(biaya_payment_gateway)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}><b>Total Pembayaran</b></td>
                        <td align="right">
                          <b>
                            { new Intl.NumberFormat('en-ID',{ style: 'currency', currency: 'IDR' }).format(total_pembayaran)}
                          </b>
                        </td>
                      </tr>
                    </table>
                    
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Failure;

