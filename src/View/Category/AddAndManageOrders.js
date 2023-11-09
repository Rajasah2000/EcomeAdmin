import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import HomeService from "../../Service/HomeService";
import PageLoader from "../../Loader/PageLoader";
import ImageLoader from "../../Loader/ImageLoader";
import HttpClientXml from "../../Utils/HttpClientXml";
import Modal from 'react-modal';


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
    const [loading, setLoading] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);
    const [hide, setHide] = useState(true);
    const [id, setId] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);


    useEffect(() => {
        fetchAllOrdersData();
    }, []);


    // const onDelete = (id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         // text: "You won't  to delete this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             HomeService.DeleteAboutBushido(id)
    //                 .then((res) => {
    //                     if (res && res.status) {
    //                         toast.success("Deleted Successfully");

    //                         fetchAllAboutBushidoData();
    //                     } else {
    //                         toast.error(res?.message);
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 });
    //         }
    //     });
    // };

    const onAccept = (item) => {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
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
                                    <button
                                        onClick={() => onAccept(item)}
                                        style={{
                                            height: "20px",
                                            width: "60px",
                                            cursor: "pointer",
                                            marginRight: "20px",
                                        }}
                                    >

                                        Pending
                                    </button>

                                </div>
                            ),
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
                    Status
                </div>
            ),
            selector: (row) => row.action,
        },
    ];


    return (
        <>
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
                                <button onClick={closeModal}>close</button>
                                <div>Order Status</div>
                                <form>
                                    <button>Accept</button>
                                    <button>Reject</button>
                                </form>
                            </Modal>

                            <DataTable columns={columns} data={AllOrdersData} pagination />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddAndManageOrders;


