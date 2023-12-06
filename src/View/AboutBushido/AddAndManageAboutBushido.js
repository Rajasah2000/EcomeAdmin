import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import HomeService from "../../Service/HomeService";
import PageLoader from "../../Loader/PageLoader";
import ImageLoader from "../../Loader/ImageLoader";
import HttpClientXml from "../../Utils/HttpClientXml";
import Select from 'react-select';


const INITIAL = {
    introduction:"",
    valueProposition:"",
    brands:"",
    recognitions:"",
    portfolio:[],
};


const AddAndManageAboutBushido = () => {
    const [formData, setFormData] = useState(INITIAL);
    const [AllAboutBushidoData, setAllAboutBushidoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);
    const [hide, setHide] = useState(true);
    const [id, setId] = useState("");


    useEffect(() => {
        fetchAllAboutBushidoData();
    }, []);
  
    const HandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const HandleImage = async (e) => {
        let file = e.target.files
        let imgArr = formData?.portfolio
        for (let item of file) {
            let data = new FormData();
            data.append("image", item);
            // console.log(data, "daaaaa");
            setImageLoader(true)
            let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);
            // console.log("resultImg", res);
            if (res && res?.status) {
                setImageLoader(false)
                let url = res?.url;
                imgArr = [...imgArr, url]
                setFormData(prev => ({ ...prev, portfolio: imgArr }))
            } else {
                setImageLoader(false)
                toast?.error(res?.message || "something wrong")
            }
        }
    }

    const onEdit = (item) => {
        window.scroll(0, 0);
        setFormData({
            ...formData,
            introduction: item?.introduction,
            valueProposition: item?.valueProposition,
            brands: item?.brands,
            recognitions: item?.recognitions,
            portfolio: item?.portfolio,
        });
        setId(item?._id);
        setHide(false);
    };

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

    const fetchAllAboutBushidoData = () => {
        setLoading(true);
        HomeService.ViewAllAboutBushido()
            .then((res) => {
                if (res && res?.status) {
                    setLoading(false);
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            introduction: item?.introduction,
                            valueProposition: item?.valueProposition,
                            brands: item?.brands,
                            recognitions: item?.recognitions,
                            portfolio: (
                                <>
                                    {item?.portfolio ? (
                                        <img
                                            style={{
                                                height: "65%",
                                                width: "65%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.portfolio?.[0]}
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
                                <div style={{ display: "flex", flexDirection: "coloum" , marginLeft:"12px" }}>
                                    <svg
                                        onClick={() => onEdit(item)}
                                        style={{
                                            height: "20px",
                                            width: "20px",
                                            cursor: "pointer",
                                            marginRight: "20px",
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-pencil-square"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                        />
                                    </svg>
                                    {/* <svg
                                        onClick={() => onDelete(item?._id)}
                                        style={{
                                            color: "red",
                                            height: "20px",
                                            cursor: "pointer",
                                            width: "20px",
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-trash3"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg> */}
                                </div>
                            ),
                        };
                    });
                    setAllAboutBushidoData(arr);
                }
                console.log("RESPONSE", res);
            })
            .catch((err) => {
                setLoading(false);
                console.log("err", err);
            });
    };

    const AddAboutBushidoData = () => {
        // let data = formData;
        // // console.log(data,"datadata")
        // if (
        //     formData?.introduction &&
        //    formData?.valueProposition &&
        //    formData?.brands &&
        //    formData?.recognitions &&
        //    formData?.portfolio
        // ) {
        //     HomeService.AddAboutBushido(data)
        //         .then((res) => {
        //             if (res && res.status) {
        //                 toast.success(res.message);
        //                 setFormData(INITIAL);
        //                 setSelectedOptions([]);
        //                 setColorData([])
        //                 fetchAllAboutBushidoData();
        //             } else {
        //                 toast.error(res?.message);
        //             }
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // } else {
        //     toast.error("All fields are required");
        // }
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
                    introduction
                </div>
            ),
            selector: (row) => row.introduction.slice(0,20),
            width: "15rem",
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    valueProposition
                </div>
            ),
            selector: (row) => row.valueProposition.slice(0,30),
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    brands
                </div>
            ),
            selector: (row) => row.brands.slice(0,40),
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    recognitions
                </div>
            ),
            selector: (row) => row.recognitions.slice(0,50),
        },
        // {
        //     name: (
        //         <div
        //             style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        //         >
        //             unit
        //         </div>
        //     ),
        //     selector: (row) => row?.name,
        // },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    portfolio
                </div>
            ),
            selector: (row) => row.portfolio,
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
                    Action
                </div>
            ),
            selector: (row) => row.action,
        },
    ];

    const UpdateAboutBushidoData = () => {
        let data = formData;
        if (
            formData?.introduction &&
            formData?.valueProposition &&
            formData?.brands &&
            formData?.recognitions &&
            formData?.portfolio
        ) {
            HomeService.UpdateAboutBushido(id, data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        setFormData(INITIAL);
                        fetchAllAboutBushidoData();
                        setHide(true);
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("All fields are required");
        }
    };

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
                                    Update About Bushido
                                </div>
                           


                            <div class="row" style={{ marginBottom: "1rem" }}>
                                <div class="col">
                                    <label for="inputEmail4">
                                    Introduction<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="textarea"
                                        class="form-control"
                                        name="introduction"
                                        value={formData?.introduction}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter Introduction..."
                                    />
                                </div>

                                <div class="col">
                                    <label for="inputEmail4">
                                    Value Proposition<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="textarea"
                                        class="form-control"
                                        name="valueProposition"
                                        value={formData?.valueProposition}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter valueProposition..."
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div class="col">
                                    <label for="inputEmail4">
                                    Brands<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="textarea"
                                        class="form-control"
                                        name="brands"
                                        value={formData?.brands}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter brands..."
                                    />
                                </div>

                                <div class="col">
                                    <label for="inputEmail4">
                                    Recognitions<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="textarea"
                                        class="form-control"
                                        name="recognitions"
                                        value={formData?.recognitions}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter recognitions..."
                                    />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col">
                                    <label htmlFor="formGroupExampleInput">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        placeholder="Image"
                                        onChange={HandleImage}
                                        name="image"
                                        accept="image/*"
                                        multiple
                                    />

                                    {imageLoader ? (
                                        <>
                                            <ImageLoader />{" "}
                                        </>
                                    ) : null}

                                    {/* pictures */}
                                    <div>
                                        {formData?.portfolio?.map((item, i) =>
                                            <span key={i}>
                                                < img
                                                    src={item}
                                                    className="img-fluid m-1"
                                                    alt="Responsive image"
                                                    style={{ height: "5rem", width: "5rem" }}
                                                />
                                                <span
                                                    style={{ fontSize: "25px", cursor: "pointer" }}
                                                    onClick={() => {
                                                        let imgArr = formData?.portfolio?.filter((item, ind) => ind !== i)
                                                        setFormData(prev => ({ ...prev, portfolio: imgArr }))
                                                    }}
                                                >
                                                    x
                                                </span>
                                            </span>
                                        )
                                        }
                                    </div>

                                    {/* </div> */}
                                </div>


                            </div>

                       
                                <button
                                    class="btn btn-primary"
                                    style={{ marginTop: "1rem" }}
                                    onClick={UpdateAboutBushidoData}
                                >
                                    Update
                                </button>
                       

                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#868e96",
                                    margin: "35px",
                                }}
                                className="card-title"
                            >
                                Manage About Bushido
                            </div>
                            <DataTable columns={columns} data={AllAboutBushidoData} pagination />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddAndManageAboutBushido;

