import React, {useState, useEffect, useCallback, useRef} from 'react';
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
import { getOprByOprId } from "../../config/Redux/action/getOprByOprId";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import Swal from 'sweetalert2';

// import { HEADER_MIDTRANS } from "../../component/data";

const Finish = () => {
  const [order_id, setOrder_id] = useState("");
  // const [transaction_status, setTransaction_status] = useState("");
  // const [vaNum, setVaNum] = useState([]);
  const [tempDataUpdate, setTempDataUpdate] = useState();

  const [tempDataUpdateNotifNewOrder, setTempDataUpdateNotifNewOrder] =
    useState();
  const dispatch = useDispatch();
  const { loadingDataOrder, dataOrder } = useSelector(
    (s) => s.PaymentTrans
  );
  const { dataOperator } = useSelector((s) => s.GetOprByOprId);
  const [intervalId, setIntervalId] = useState(null);
  const [StatusTrans, setStatusTrans] = useState(null);

  useEffect(() => {
    //?order_id=ORDER-101-1662089172&status_code=200&transaction_status=settlement
    // ?order_id=ORDER-101-1622248866&status_code=201&transaction_status=pending
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    // const transaction_status = params.get("transaction_status");

    async function updatedataa() {
      if (order_id) {
        await setOrder_id(order_id);
        // await setTransaction_status(transaction_status);
        //get data order by trans code
        await dispatch(orderByTransCode({ trans_code: order_id }));
        await dispatch(getOprByOprId({ opr_id: dataOrder.opr_id }));
        // await fetch(
        //   `https://api.sandbox.midtrans.com/v2/${order_id}/status`,
        //   {headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     Authorization: 'U0ItTWlkLXNlcnZlci1pY3ZLekIxVTNKZmpyZ2RwNXBkbjAyVXQ6',
        // }}
        // )
        //   .then(function (response) {
        //     console.log("res", response?.json)
        //   })
        //   .catch(function (error) {
        //     console.log("err", error.response)
        //   });

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
    // if (transaction_status == "settlement" || transaction_status == "picture") {
      await dispatch(UpdateOrder(tempDataUpdate));
      await dispatch(NotifNewOrderForOpr(tempDataUpdateNotifNewOrder));
      window.ReactNativeWebView.postMessage("Finish");
    // } else {
    //   window.ReactNativeWebView.postMessage("Finish");
    // }
  };

  var totalHari = 0;
  var totalMandays = 0;
  var biaya_payment_gateway = dataOrder.biaya_payment_gateway;
  var total_pembayaran = dataOrder.price;

  // var myHeaders = new Headers();
  // myHeaders.append("Accept", "application/json");
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", "SB-Mid-server-icvKzB1U3Jfjrgdp5pdn02Ut");

  // var raw = "\n\n";

  // var requestOptions = {
  //   method: 'GET',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };

  // useEffect(() => {
  //   fetch(`https://api.sandbox.midtrans.com/v2/${order_id}/status`, requestOptions)
  //   .then(response => console.log("Ss", response))
  //   // .then(result => console.log(result))
  //   .catch(error => console.log('error', error.data));
  // },[])

  // const fetchAPIMIdtrans = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Accept", "application/json");
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append(
  //     "Authorization",
  //     "Basic U0ItTWlkLXNlcnZlci1pY3ZLekIxVTNKZmpyZ2RwNXBkbjAyVXQ6"
  //   );

  //   const myRequest = new Request(
  //     `https://api.sandbox.midtrans.com/v2/PGA-16122022-3/status`,
  //     {
  //       method: "GET",
  //       headers: myHeaders,
  //       mode: "no-cors",
  //       redirect: "follow",
  //     }
  //   );

  //   fetch(myRequest)
  //     .then((res) => console.log("res", res))
  //     .catch((err) => console.log("err", err?.data?.Response));
  //   console.log("id", order_id);
  // };

  // useEffect(() => {
  //   fetchAPIMIdtrans();
  // }, []);

  const batalkanTransaksi = async (StatusTransactionUpdate) => {
    console.log('StatusTransactionUpdate dalem', StatusTransactionUpdate)
  
    await axios.post(`https://api-pga-cust.agrointernationalacademy.com/api/v1/customer/update_status_trans`, StatusTransactionUpdate)
    .then((res) => {
      console.log('Transaksi Berhasil Dibatalkan', res)
      dispatch(orderByTransCode({ trans_code: res.data.data.setData.trans_code }));
      Swal.fire({
        icon: 'success',
        title: 'Transaction Canceled',
        text: 'Please Check your transaction!!'
      })
      
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getStatusTrans = () => {
    // dispatch(getOprByOprId({ opr_id: dataOrder.opr_id }));
    
    axios
      .get(
        `https://api-pga-cust.agrointernationalacademy.com/api/v1/customer/get_trans_by_trans_code/${order_id}`,
      )
      .then(function (response) {
        // console.log('RESPON get trans', response?.data?.data[0].trans_status);
        setStatusTrans(response?.data?.data[0].trans_status)
        // if (response?.data?.data[0].trans_status === 0) {
        //   clearInterval(intervalId);
        // }
      })
      .catch(err => console.log('err', err?.response));
  };

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        setIntervalId(id);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(getStatusTrans, 2000);

  console.log('DATA ORDER trans status',StatusTrans)

  return (
    <>
      {loadingDataOrder ? (
        <Spinner color="primary" />
      ) : (
        <>
          <div style={{ overflowX: "hidden" }}>
            <div className="" style={{ background: "white" }}>
              <Card className="">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center">
                    <img src={logoVertikal} className="img-pga" alt="logo" />
                  </div>
                  {/* <p
                    style={{
                      fontFamily: "Poppins",
                      margin: 10,
                      color: "#4a4a4a",
                    }}
                  >
                    {transaction_status === "pending" &&
                      "Untuk Selanjutnya Harap Selesai kan Pembayaran nya jika belum bayar, dan Silahkan Update Status Pembayaran di Halaman History"}
                  </p> */}
                  <p className="text-contain text-center">Transaksi</p>
                  {/* <p className="text-contain">
                    Date : {date_today ? date_today : "10/21/2022"}
                  </p> */}
                  <p className="text-contain">
                    Status :{" "}
                    {/* {transaction_status ? (
                      transaction_status === "settlement" ||
                      transaction_status === "capture" ? ( */}
                        <span className="text-status">Pembayaran Berhasil</span>
                      {/* ) : (
                        <span
                          className="text-status"
                          style={{ color: "green", fontWeight: "bold" }}
                        >
                          {transaction_status == "PAID"
                            ? "Sudah di Bayar"
                            : transaction_status === "pending"
                            ? "Belum Dibayar"
                            : ""}
                        </span>
                      )
                    ) : (
                      <span className="text-status">Error</span>
                    )} */}
                  </p>
                  {/* <Button
                    className="btn-continue"
                    type="submit"
                    onClick={() => toHistory()}
                  >
                    Continue
                  </Button> */}
                </Card.Body>
              </Card>
            </div>
            <div style={{ backgroundColor: "purple", paddingBottom: "10px", margin: 10 }}>
              <div>
                <table
                  className="table"
                  style={{ fontSize: 10, color: "white", fontWeight: "bold" }}
                >
                  <tr>
                    <td>Detail Pesanan</td>
                  </tr>
                </table>
                {/* Detail Pemesanan */}
                <Card style={{ marginTop: -20, marginLeft: 10, marginRight: 10 }}>
                  <div className="row" style={{ padding: 10 }}>
                    <div className="col-1">
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          border: "1px solid purple",
                          borderRadius: 5,
                        }}
                        alt="detail"
                        src={logoVertikal}
                      />
                    </div>
                    <div
                      className="col-8 ml-2"
                      style={{ alignItems: "center", display: "grid" }}
                    >
                      <div className="row">
                        <div
                          className="col-12"
                          style={{ fontSize: 15, fontWeight: "bold" }}
                        >
                          {dataOrder?.opr_name}
                        </div>
                        <div className="col-12" style={{ fontSize: 9 }}>
                          <i>
                            Tanggal Pesanan :{" "}
                            {moment(dataOrder.create_date).format(
                              "dddd, MMMM Do, YYYY"
                            )}
                          </i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ paddingLeft: 10, fontSize: 10 }}>
                    <div
                      className="col-11 ml-2 mr-2 "
                      style={{ borderBottom: "1px solid silver" }}
                    >
                      {dataOrder.notes != "undefined" ? (
                        <p>
                          <i>Catatan: {dataOrder.notes}</i>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <Card.Body>
                    <p style={{ fontWeight: "bold", fontSize: 12 }}>
                      Informasi Perusahaan dan Standar yang di Audit
                    </p>
                    <table
                      border="1"
                      className="table table-bordered"
                      style={{ fontSize: 10 }}
                    >
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

                    <p style={{ fontWeight: "bold", fontSize: 12 }}>Lokasi Audit</p>
                    <p style={{ fontSize: 10 }}>
                      {dataOrder.detail_address} Kec. {dataOrder.nama_kecamatan}{" "}
                      Kota {dataOrder.nama_kota} Prov. {dataOrder.nama_provinsi}
                    </p>

                    <p style={{ fontWeight: "bold", fontSize: 12 }}>
                      Detail Audit dan Rincian Pembayaran
                    </p>

                    <table
                      className="table"
                      style={{ fontSize: 10, background: "#e2b4e2" }}
                    >
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

                    <table
                      border="1"
                      className="table table-bordered"
                      style={{ fontSize: 10 }}
                    >
                      <tr>
                        <td align="center">
                          <b>Tanggal Audit</b>
                        </td>
                        <td align="center">
                          <b>Hari</b>
                        </td>
                        <td align="center">
                          <b>Mandays/Hari</b>
                        </td>
                      </tr>
                      {dataOrder?.data_schedule?.map(
                        (inputField) => (
                          (totalHari += inputField.total_booked_per_day),
                          (totalMandays += inputField.mandays_per_day),
                          (
                            <tr>
                              <td>
                                {moment(inputField.date_booked).format(
                                  "dddd, MMMM Do, YYYY"
                                )}
                              </td>
                              <td align="center">
                                {inputField.total_booked_per_day}{" "}
                              </td>
                              <td align="right">
                                { new Intl.NumberFormat('en-ID',{ style: 'currency', currency: 'IDR' }).format(inputField.mandays_per_day)}
                              </td>
                            </tr>
                          )
                        )
                      )}
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

                    {

                      StatusTrans == 0 ? (
                        <Button
                          className="btn-continue"
                          type="submit"
                          onClick={() => {

                            Swal.fire({
                              title: 'Are you sure ?',
                              text: "You will cancel this transaction!!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, I do !!'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                batalkanTransaksi({
                                  trans_code: order_id,
                                  trans_status: 3,
                                  date_today: new Date(),
                                  cancle_by: 0,
                                  opr_id: dataOrder.opr_id,
                                  cust_id: dataOrder.cust_id,
                                })
                              }
                            })
                              
                          }
                          
                        }>  <i>Batalkan Transaksi</i>
                          
                        </Button>
                      ) : StatusTrans == 1 ? (
                        <span style={{ color:'purple', fontSize:10, float: 'left'}}><i>*Transaksi sudah di prosess oleh auditor.</i></span>
                      ) : StatusTrans == 3 ? (
                        <span style={{ color:'red', fontSize:10, float: 'left'}}><i>*Transaksi berhasil di batalkan.</i></span>
                      ) : null
                    }


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

export default Finish;
