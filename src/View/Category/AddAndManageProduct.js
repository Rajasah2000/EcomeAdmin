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
    catID: "",
    subCatID: "",
    unitID: "",
    weight: null,
    brandName: "",
    size: [],
    color: [],
    productDetails: "",
    discountPercentage: null,
    productName: "",
    ActualProductPrice: null,
    productImg: [],
    quantity: null
};

const AddAndManageProduct = () => {
    const [formData, setFormData] = useState(INITIAL);
    const [catData, setCatData] = useState([]);
    const [subcatData, setsubCatData] = useState([]);
    const [unitData, setUnitData] = useState([]);
    const [AllProductData, setAllProductData] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);
    const [hide, setHide] = useState(true);
    const [id, setId] = useState("");


    useEffect(() => {
        fetchAllProductData();
        fetchAllCatData();
        fetchAllUnitData();
    }, []);

    // useEffect(()=>{
    //     if(formData?.catID){
    //         fetchAllsubCatData(formData.catID)
    //     }
    // },[formData.catID])


    // const PrimaryVarient = [
    //     { label: "1", value: "1" },
    //     { label: "2", value: "2" },
    //     { label: "3", value: "3" },
    //     { label: "4", value: "4" },
    //     { label: "5", value: "5" },
    //     { label: "6", value: "6" },
    // ];

    const PrimaryVarient = [
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
        { label: "M", value: "M" },
        { label: "XXL", value: "XXL" },
    ];

    const fetchAllCatData = async () => {
        const res = await HomeService.ViewAllCategory();
        // console.log("fvfvc", res);
        if (res && res.status) {
            setCatData(res?.data);
            // fetchAllsubCatData();
        } else {
            toast.error(res?.message || "error");
        }
    };

    const fetchAllsubCatData = async (id) => {
        const res = await HomeService.ViewAllSubCategory(id);
        if (res && res.status) {
            setsubCatData(res?.data);
        } else {
            toast.error(res?.message || "error");
        }
    };

    const fetchAllUnitData = async () => {
        const res = await HomeService.ViewAllUnit();
        if (res && res.status) {
            setUnitData(res?.data);
        } else {
            toast.error(res?.message || "error");
        }
    };

    const HandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const HandlePrimaryVarient = (e) => {
        // console.log("PrimaryEvent", e);
        setSelectedOptions(e);
        let arr = [];
        e?.map((item) => {
            return arr.push(item?.value, "  ");
        });
        setFormData({
            ...formData,
            size: arr,
        });
    };

    const HandleColorChange = (e, i) => {
        // console.log("COLORDATA", colorData);
        setColorData((prev) => {
            let update = JSON.parse(JSON.stringify(prev));
            update[i][e.target.name] = e.target.value;

            return [...update];
        });
        let arr = [];
        let tempArr = JSON.parse(JSON.stringify(colorData));
        tempArr[i][e.target.name] = e.target.value;
        tempArr?.forEach((element) => {
            arr.push(element?.color);
        });
        setFormData({ ...formData, color: arr });
    };

    const HandleImage = async (e) => {
        let file = e.target.files
        let imgArr = formData?.productImg
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
                setFormData(prev => ({ ...prev, productImg: imgArr }))
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
            catID: item?.catID,
            subCatID: item?.subCatID,
            unitID: item?.unitID,
            weight: item?.weight,
            size: item?.size,
            color: item?.color,
            brandName: item?.brandName,
            productDetails: item?.productDetails,
            discountPercentage: item?.discountPercentage,
            quantity: item?.quantity,
            productName: item?.productName,
            ActualProductPrice: item?.ActualProductPrice,
            productImg: item?.productImg,
        });
        setId(item?._id);
        setHide(false);
    };

    const onDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't  to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                HomeService.DeleteProduct(id)
                    .then((res) => {
                        if (res && res.status) {
                            toast.success("Deleted Successfully");

                            fetchAllProductData();
                        } else {
                            toast.error(res?.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };

    const fetchAllProductData = () => {
        setLoading(true);
        HomeService.ViewAllProduct()
            .then((res) => {
                if (res && res?.status) {
                    setLoading(false);
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            catID: item?.catID,
                            subCatID: item?.subCatID,
                            unitID: item?.unitID,
                            weight: item?.weight,
                            size: item?.size,
                            color: item?.color,
                            productDetails: item?.productDetails,
                            brandName: item?.brandName,
                            productName: item?.productName,
                            ActualProductPrice: item?.ActualProductPrice,
                            discountPercentage: item?.discountPercentage,
                            quantity: item?.quantity,
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
                                    <svg
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
                                    </svg>
                                </div>
                            ),
                        };
                    });
                    setAllProductData(arr);
                }
                console.log("RESPONSE", res);
            })
            .catch((err) => {
                setLoading(false);
                console.log("err", err);
            });
    };

    const AddProductData = () => {
        let data = formData;
        // console.log(data,"datadata")
        if (
            formData?.catID &&
            formData?.subCatID &&
            formData?.unitID &&
            formData?.brandName &&
            formData?.productName &&
            formData?.ActualProductPrice &&
            formData?.weight &&
            formData?.discountPercentage &&
            formData?.quantity &&
            formData?.productImg
        ) {
            HomeService.AddProduct(data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        setFormData(INITIAL);
                        setSelectedOptions([]);
                        setColorData([])
                        fetchAllProductData();
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
                    brandName
                </div>
            ),
            selector: (row) => row.brandName,
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
                    size
                </div>
            ),
            selector: (row) => row.size,
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
                    color
                </div>
            ),
            selector: (row) => row.color,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    ActualProductPrice
                </div>
            ),
            selector: (row) => row.ActualProductPrice,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    ProductImage
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
                    Action
                </div>
            ),
            selector: (row) => row.action,
        },
    ];

    const UpdateProductData = () => {
        let data = formData;
        if (
            formData?.catID &&
            formData?.subCatID &&
            formData?.unitID &&
            formData?.brandName &&
            formData?.productName &&
            formData?.ActualProductPrice &&
            formData?.weight &&
            formData?.discountPercentage &&
            formData?.quantity &&
            formData?.productImg
        ) {
            HomeService.UpdateProduct(id, data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        setFormData(INITIAL);
                        setSelectedOptions([]);
                        setColorData([]);
                        fetchAllProductData();
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
                            {hide ? (
                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: "20px",
                                        color: "#868e96",
                                        margin: "35px",
                                    }}
                                    className="card-title"
                                >
                                    Add Product
                                </div>
                            ) : (
                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: "20px",
                                        color: "#868e96",
                                        margin: "35px",
                                    }}
                                    className="card-title"
                                >
                                    Edit Product
                                </div>
                            )}

                            <div class="row" style={{ marginBottom: "1rem" }}>
                                <div className="col">
                                    <label htmlFor="formGroupExampleInput">Select Category</label>
                                    <select
                                        class="form-control"
                                        aria-label="Default select example"
                                        name="catID"
                                        value={formData.catID}
                                        onChange={(e) => {
                                            HandleChange(e);
                                            fetchAllsubCatData(e.target.value)
                                        }}
                                    >
                                        <option value={""} disabled>
                                            Select category
                                        </option>
                                        {catData?.map((item, i) => (
                                            <option key={i} value={item?._id}>
                                                {item?.catName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div class="row" style={{ marginBottom: "1rem" }}>
                                <div className="col">
                                    <label htmlFor="formGroupExampleInput">Select Sub-Category</label>
                                    <select
                                        class="form-control"
                                        aria-label="Default select example"
                                        name="subCatID"
                                        value={formData.subCatID}
                                        onChange={(e) => HandleChange(e)}
                                    >
                                        <option value={""} disabled>
                                            Select subcategory
                                        </option>
                                        {subcatData?.map((item, i) => (
                                            <option key={i} value={item?._id}>
                                                {item?.subCatName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div class="row" style={{ marginBottom: "1rem" }}>
                                <div className="col">
                                    <label htmlFor="formGroupExampleInput">Select Unit</label>
                                    <select
                                        class="form-control"
                                        aria-label="Default select example"
                                        name="unitID"
                                        value={formData.unitID}
                                        onChange={HandleChange}
                                    >
                                        <option value={""} disabled>
                                            Select Unit
                                        </option>
                                        {unitData?.map((item, i) => (
                                            <option key={i} value={item?._id}>
                                                {item?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div class="row" style={{ marginBottom: "1rem" }}>
                                <div class="col">
                                    <label for="inputEmail4">
                                        Product Name<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="productName"
                                        value={formData?.productName}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter productName..."
                                    />
                                </div>

                                <div class="col">
                                    <label for="inputEmail4">
                                        Product actual Price<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        name="ActualProductPrice"
                                        value={formData?.ActualProductPrice}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter productPrice..."
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div class="col">
                                    <label for="inputEmail4">
                                        Brand Name<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="brandName"
                                        value={formData?.brandName}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter brandName..."
                                    />
                                </div>

                                <div class="col">
                                    <label for="inputEmail4">
                                        Product Weight<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        name="weight"
                                        value={formData?.weight}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter weight..."
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="formGroupExampleInput">
                                        Select Size
                                    </label>


                                    <Select
                                        className="select"
                                        options={PrimaryVarient}
                                        value={selectedOptions}
                                        name="size"
                                        isMulti
                                        onChange={HandlePrimaryVarient}
                                    />
                                </div>


                                <div className="add_prdt">
                                    <div className="form-group">
                                        <div>
                                            <span
                                                style={{
                                                    marginLeft: "0.1rem",
                                                    fontSize: ".8rem",
                                                    color: "#ada8a8",
                                                }}
                                            >
                                                {" "}
                                                Color :{" "}
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-warning"
                                                style={{ fontSize: "9px", marginLeft: "12px" }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setColorData((prev) => {
                                                        let update = JSON.parse(JSON.stringify(prev));
                                                        update.push({
                                                            color: "#000000",
                                                        });
                                                        return [...update];
                                                    });

                                                    let arr = [];
                                                    let tempArr = JSON.parse(JSON.stringify(colorData));
                                                    tempArr.push({
                                                        color: "#000000",
                                                    });
                                                    tempArr?.forEach((element) => {
                                                        arr.push(element?.color);
                                                    });
                                                    setFormData({ ...formData, color: arr });
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {colorData.map((item, i) => {

                                            return (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        margin: "12px  2px",
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <input
                                                        style={{ width: "14.5rem" }}
                                                        name="color"
                                                        value={item?.color}
                                                        type="color"
                                                        onChange={(e) => {
                                                            HandleColorChange(e, i);
                                                        }}
                                                    />
                                                    {i == 0 ? null : (
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            style={{ fontSize: "10px", marginLeft: "12px" }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setColorData((prv) => {
                                                                    let update = JSON.parse(JSON.stringify(prv));
                                                                    update.splice(i, 1);
                                                                    return update;
                                                                });
                                                                let arr = [];
                                                                let tempArr = JSON.parse(
                                                                    JSON.stringify(colorData)
                                                                );
                                                                tempArr.splice(i, 1);
                                                                tempArr?.forEach((element) => {
                                                                    arr.push(element?.color);
                                                                });
                                                                setFormData({ ...formData, color: arr });
                                                                setFormData({
                                                                    ...formData,
                                                                    color: arr,
                                                                });
                                                            }}
                                                        >
                                                            -
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div class="col">
                                    <label for="inputEmail4">
                                        productDetails<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="productDetails"
                                        value={formData?.productDetails}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter productDetails..."
                                    />
                                </div>
                                <div class="col">
                                    <label for="inputEmail4">
                                        Product discountPercentage<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        name="discountPercentage"
                                        value={formData?.discountPercentage}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter discountPercentage..."
                                    />
                                </div>
                            </div>

                            <div>
                                <div class="col">
                                    <label for="inputEmail4">
                                        Product quantity<span style={{ color: "red" }}></span> :
                                    </label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        name="quantity"
                                        value={formData?.quantity}
                                        onChange={(e) => HandleChange(e)}
                                        placeholder="Enter quantity..."
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
                                        {formData?.productImg?.map((item, i) =>
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
                                                        let imgArr = formData?.productImg?.filter((item, ind) => ind !== i)
                                                        setFormData(prev => ({ ...prev, productImg: imgArr }))
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

                            {hide ? (
                                <button
                                    class="btn btn-primary"
                                    style={{ marginTop: "1rem" }}
                                    onClick={AddProductData}
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    class="btn btn-primary"
                                    style={{ marginTop: "1rem" }}
                                    onClick={UpdateProductData}
                                >
                                    Update
                                </button>
                            )}

                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#868e96",
                                    margin: "35px",
                                }}
                                className="card-title"
                            >
                                Manage Product
                            </div>
                            <DataTable columns={columns} data={AllProductData} pagination />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddAndManageProduct;

