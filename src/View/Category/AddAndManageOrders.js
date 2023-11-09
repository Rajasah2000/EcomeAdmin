import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DataTable from "react-data-table-component";
import HomeService from "../../Service/HomeService";
import PageLoader from "../../Loader/PageLoader";
import Modal from 'react-modal';
import OrderStatus from "./OrderStatus";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const AddAndManageOrders = () => {
    const [AllOrdersData, setAllOrdersData] = useState([]);
    const [AcceptedOrdersData, setAcceptedOrdersData] = useState([]);
    const [CancelledOrdersData, setCancelledOrdersData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(true);
    const [item, setItem] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);



    useEffect(() => {
        fetchAllOrdersData();
        fetchAcceptedOrdersData();
        fetchCancelledOrdersData();
    }, []);


    const onAccept = (item) => {
        setItem(item);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    function closeModal2() {
        setIsOpen2(false);
    }

    function handleStatus(e, val) {
        e.preventDefault();
        let data = {
            orderID: item?.orderID,
            productAcceptStatus: (val === "Accept") ? "Accept" : "Reject",
            price: item?.ActualProductPrice
        }
        // console.log("hjhjhjhjhjhjjhj", data, val);
        HomeService.UpdateAcceptRejectStatus(item?._id, data)
            .then((res) => {
                if (res && res.status) {
                    toast.success((val === "Accept") ? ("Accept Successfully") : ("Reject Successfully"))
                    setIsOpen(false)
                    fetchAllOrdersData();
                    setHide(true);

                } else {
                    toast.error(res?.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }



    const fetchAllOrdersData = () => {
        setLoading(true);
        HomeService.ViewAllOrders()
            .then((res) => {
                if (res && res?.status) {
                    setLoading(false);
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            userID: item?.userID,
                            orderID: item?.orderID,
                            invoiceNo: item?.invoiceNo,
                            productID: item?.productID,
                            eStorePartnerID: item?.eStorePartnerID,
                            productName: item?.productName,
                            qty: item?.qty,
                            ActualProductPrice: item?.ActualProductPrice,
                            color: item?.color,
                            discountPercentage: item?.discountPercentage,
                            discountedPrice: item?.discountedPrice,
                            productDetails: item?.productDetails,
                            size: item?.size,
                            totalPrice: item?.totalPrice,
                            orderStatus: item?.orderStatus,
                            productAcceptStatus: item?.productAcceptStatus,
                            couponCode: item?.couponCode,
                            couponDiscountedPercentage: item?.couponDiscountedPercentage,
                            totalProductAmt: item?.totalProductAmt,
                            receiverName: item?.receiverName,
                            receiverAddress: item?.receiverAddress,
                            receiverMobileNO: item?.receiverMobileNO,
                            landMark: item?.landMark,
                            pinCode: item?.pinCode,
                            addressType: item?.addressType,
                            paymentMethod: item?.paymentMethod,
                            deliveryCharge: item?.deliveryCharge,
                            paymentStatus: item?.paymentStatus,
                            isCouponApplied: item?.isCouponApplied,
                            CheckoutorderStatus: item?.CheckoutorderStatus,
                            productImg: (
                                <>
                                    {item?.productImg ? (
                                        <img
                                            style={{
                                                height: "65%",
                                                width: "65%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.productImg?.[0]}
                                        />
                                    ) : (
                                        <img
                                            style={{
                                                height: "11%",
                                                width: "11%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                                            }
                                        />
                                    )}
                                </>
                            ),
                            action: (
                                <div style={{ display: "flex", flexDirection: "coloum" }}>
                                    <>
                                        {
                                            (item?.productAcceptStatus === "Accept") ? (
                                                <>
                                                    <button className="btn btn-success"
                                                        onClick={() => {
                                                            toast.success("Already accepted");
                                                            setIsOpen2(true)
                                                        }}
                                                    >
                                                        Track Order
                                                    </button>
                                                </>
                                            ) : (item?.productAcceptStatus === "Reject") ? (
                                                <>
                                                    <button className="btn btn-danger"
                                                        onClick={() => toast.error("Already rejected")}
                                                    >
                                                        Rejected
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => onAccept(item)}
                                                    type="button"
                                                    class="btn btn-warning"
                                                >
                                                    Pending
                                                </button>
                                            )

                                        }
                                    </>


                                </div>
                            ),
                            actions: (
                                <button className="btn btn-warning">{item?.orderStatus}</button>
                            )

                        };
                    });
                    setAllOrdersData(arr);
                }
                console.log("RESPONSE", res);
            })
            .catch((err) => {
                setLoading(false);
                console.log("err", err);
            });
    };

    const fetchAcceptedOrdersData = () => {
        setLoading(true);
        HomeService.ViewAcceptedOrders()
            .then((res) => {
                if (res && res?.status) {
                    setLoading(false);
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            userID: item?.userID,
                            orderID: item?.orderID,
                            invoiceNo: item?.invoiceNo,
                            productID: item?.productID,
                            eStorePartnerID: item?.eStorePartnerID,
                            productName: item?.productName,
                            qty: item?.qty,
                            ActualProductPrice: item?.ActualProductPrice,
                            color: item?.color,
                            discountPercentage: item?.discountPercentage,
                            discountedPrice: item?.discountedPrice,
                            productDetails: item?.productDetails,
                            size: item?.size,
                            totalPrice: item?.totalPrice,
                            orderStatus: item?.orderStatus,
                            productAcceptStatus: item?.productAcceptStatus,
                            couponCode: item?.couponCode,
                            couponDiscountedPercentage: item?.couponDiscountedPercentage,
                            totalProductAmt: item?.totalProductAmt,
                            receiverName: item?.receiverName,
                            receiverAddress: item?.receiverAddress,
                            receiverMobileNO: item?.receiverMobileNO,
                            landMark: item?.landMark,
                            pinCode: item?.pinCode,
                            addressType: item?.addressType,
                            paymentMethod: item?.paymentMethod,
                            deliveryCharge: item?.deliveryCharge,
                            paymentStatus: item?.paymentStatus,
                            isCouponApplied: item?.isCouponApplied,
                            CheckoutorderStatus: item?.CheckoutorderStatus,
                            productImg: (
                                <>
                                    {item?.productImg ? (
                                        <img
                                            style={{
                                                height: "65%",
                                                width: "65%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.productImg?.[0]}
                                        />
                                    ) : (
                                        <img
                                            style={{
                                                height: "11%",
                                                width: "11%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                                            }
                                        />
                                    )}
                                </>
                            ),
                            action: (
                                <div style={{ display: "flex", flexDirection: "coloum" }}>
                                    <button className="btn btn-success">Accepted</button>

                                </div>
                            ),
                        };
                    });
                    setAcceptedOrdersData(arr);
                }
                console.log("RESPONSE", res);
            })
            .catch((err) => {
                setLoading(false);
                console.log("err", err);
            });
    };

    const fetchCancelledOrdersData = () => {
        setLoading(true);
        HomeService.ViewCancelledOrders()
            .then((res) => {
                if (res && res?.status) {
                    setLoading(false);
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            userID: item?.userID,
                            orderID: item?.orderID,
                            invoiceNo: item?.invoiceNo,
                            productID: item?.productID,
                            eStorePartnerID: item?.eStorePartnerID,
                            productName: item?.productName,
                            qty: item?.qty,
                            ActualProductPrice: item?.ActualProductPrice,
                            color: item?.color,
                            discountPercentage: item?.discountPercentage,
                            discountedPrice: item?.discountedPrice,
                            productDetails: item?.productDetails,
                            size: item?.size,
                            totalPrice: item?.totalPrice,
                            orderStatus: item?.orderStatus,
                            productAcceptStatus: item?.productAcceptStatus,
                            couponCode: item?.couponCode,
                            couponDiscountedPercentage: item?.couponDiscountedPercentage,
                            totalProductAmt: item?.totalProductAmt,
                            receiverName: item?.receiverName,
                            receiverAddress: item?.receiverAddress,
                            receiverMobileNO: item?.receiverMobileNO,
                            landMark: item?.landMark,
                            pinCode: item?.pinCode,
                            addressType: item?.addressType,
                            paymentMethod: item?.paymentMethod,
                            deliveryCharge: item?.deliveryCharge,
                            paymentStatus: item?.paymentStatus,
                            isCouponApplied: item?.isCouponApplied,
                            CheckoutorderStatus: item?.CheckoutorderStatus,
                            productImg: (
                                <>
                                    {item?.productImg ? (
                                        <img
                                            style={{
                                                height: "65%",
                                                width: "65%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.productImg?.[0]}
                                        />
                                    ) : (
                                        <img
                                            style={{
                                                height: "11%",
                                                width: "11%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                                            }
                                        />
                                    )}
                                </>
                            ),
                            action: (
                                <div style={{ display: "flex", flexDirection: "coloum" }}>
                                    <button className="btn btn-danger">Rejected</button>

                                </div>
                            ),
                        };
                    });
                    setCancelledOrdersData(arr);
                }
                console.log("RESPONSE", res);
            })
            .catch((err) => {
                setLoading(false);
                console.log("err", err);
            });
    };


    const acceptedcolumns = [
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    SL
                </div>
            ),
            selector: (row) => row.sl,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    productName
                </div>
            ),
            selector: (row) => row.productName,
            width: "15rem",
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    productDetails
                </div>
            ),
            selector: (row) => row.productDetails,
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    totalProductAmt
                </div>
            ),
            selector: (row) => row.totalProductAmt,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    receiverName
                </div>
            ),
            selector: (row) => row.receiverName,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    receiverMobileNO
                </div>
            ),
            selector: (row) => row?.receiverMobileNO,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    productImg
                </div>
            ),
            selector: (row) => row.productImg,
        },
        {
            name: (
                <div
                    style={{
                        fontSize: "14px",
                        color: "#495057",
                        marginLeft: "15px",
                        fontWeight: "bolder",
                    }}
                >
                    Status
                </div>
            ),
            selector: (row) => row.action,
        },
    ];


    const cancelledcolumns = [
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    SL
                </div>
            ),
            selector: (row) => row.sl,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    productName
                </div>
            ),
            selector: (row) => row.productName,
            width: "15rem",
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    productDetails
                </div>
            ),
            selector: (row) => row.productDetails,
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    totalProductAmt
                </div>
            ),
            selector: (row) => row.totalProductAmt,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    receiverName
                </div>
            ),
            selector: (row) => row.receiverName,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    receiverMobileNO
                </div>
            ),
            selector: (row) => row?.receiverMobileNO,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    productImg
                </div>
            ),
            selector: (row) => row.productImg,
        },
        {
            name: (
                <div
                    style={{
                        fontSize: "14px",
                        color: "#495057",
                        marginLeft: "15px",
                        fontWeight: "bolder",
                    }}
                >
                    Status
                </div>
            ),
            selector: (row) => row.action,
        },
    ];



    const columns = [
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    SL
                </div>
            ),
            selector: (row) => row.sl,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    productName
                </div>
            ),
            selector: (row) => row.productName,
            width: "15rem",
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    productDetails
                </div>
            ),
            selector: (row) => row.productDetails,
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    totalProductAmt
                </div>
            ),
            selector: (row) => row.totalProductAmt,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    receiverName
                </div>
            ),
            selector: (row) => row.receiverName,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    receiverMobileNO
                </div>
            ),
            selector: (row) => row?.receiverMobileNO,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    productImg
                </div>
            ),
            selector: (row) => row.productImg,
        },
        {
            name: (
                <div
                    style={{
                        fontSize: "14px",
                        color: "#495057",
                        marginLeft: "15px",
                        fontWeight: "bolder",
                    }}
                >
                    Product Status
                </div>
            ),
            selector: (row) => row.action,
        },
        {
            name: (
                <div
                    style={{
                        fontSize: "14px",
                        color: "#495057",
                        marginLeft: "15px",
                        fontWeight: "bolder",
                    }}
                >
                    Order Status
                </div>
            ),
            selector: (row) => row.actions,
        },
    ];


    return (
        <>
            {/* for manage all orders */}
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                    }}
                >
                    <PageLoader />
                </div>
            ) : (
                <div component="div" className="TabsAnimation appear-done enter-done">
                    <div className="main-card mb-3 card">
                        <div className="card-body">

                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#868e96",
                                    margin: "35px",
                                }}
                                className="card-title"
                            >
                                Manage Orders
                            </div>

                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <button className="btn btn-danger" style={{ marginLeft: "50px" }} onClick={closeModal}>X</button>
                                <h5 style={{ marginLeft: "20px" }}>Order Status</h5>
                                <form>

                                    <button className="btn btn-success" style={{ marginRight: "20px" }} onClick={(e) => handleStatus(e, "Accept")}>Accept</button>
                                    <button className="btn btn-danger" onClick={(e) => handleStatus(e, "Reject")}>Reject</button>
                                </form>
                            </Modal>

                            {/* Order Status     */}


                            <Modal
                                isOpen={modalIsOpen2}
                                onRequestClose={closeModal2}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <div>
                                    <button className="btn btn-danger" style={{ marginLeft: "50px" }} onClick={closeModal2}>X</button>
                                    <OrderStatus />
                                </div>
                            </Modal>

                            <DataTable columns={columns} data={AllOrdersData} pagination />
                            {/* <OrderStatus /> */}


                        </div>
                    </div>
                </div>
            )}

            {/* for manage accepted orders */}
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                    }}
                >
                    <PageLoader />
                </div>
            ) : (
                <div component="div" className="TabsAnimation appear-done enter-done">
                    <div className="main-card mb-3 card">
                        <div className="card-body">

                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#868e96",
                                    margin: "35px",
                                }}
                                className="card-title"
                            >
                                Manage Accepted Orders
                            </div>

                            <DataTable columns={acceptedcolumns} data={AcceptedOrdersData} pagination />
                        </div>
                    </div>
                </div>
            )}

            {/* for manage cancelled orders */}
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                    }}
                >
                    <PageLoader />
                </div>
            ) : (
                <div component="div" className="TabsAnimation appear-done enter-done">
                    <div className="main-card mb-3 card">
                        <div className="card-body">

                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#868e96",
                                    margin: "35px",
                                }}
                                className="card-title"
                            >
                                Manage Cancelled Orders
                            </div>

                            <DataTable columns={cancelledcolumns} data={CancelledOrdersData} pagination />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddAndManageOrders;


