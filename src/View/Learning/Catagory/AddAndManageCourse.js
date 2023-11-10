import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import HomeService from "../../../Service/HomeService";
import DataTable from "react-data-table-component";
import HttpClientXml from "../../../Utils/HttpClientXml";
import PageLoader from "../../../Loader/PageLoader";
import ImageLoader from "../../../Loader/ImageLoader";
import Swal from "sweetalert2";

const INITIAL = {
    courseName: "",
    description: "",
    courseCatID: "",
    learningTopics:[],
    requirements:[],
    duration:"",
    completionCertificate:"",
    problemSovingSession:null,
    freeCourse:"",
    thumbnailImage:"",
    introVideo:"",
    courseFee:null,

}
const AddAndManageCourse = () => {

    const [courseData, setCourseData] = useState(INITIAL)
    const [hide, setHide] = useState(true);
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);
    const [CategoryData, setCategoryData] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [CategoryId, setCategoryId] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const [courseFee, setcourseFee] = useState(null);
    const [image, setImage] = useState("");
    const [catId, setCatId] = useState("");

    const [imageLoader, setImageLoader] = useState(false);
    const [imageLoader3, setImageLoader3] = useState(false);

    useEffect(() => {
        fetchCategoryData();
        fetchAllCourses();
    }, []);

    const fetchCategoryData = () => {
        HomeService.ViewLearningCategory()
            .then((res) => {

                if (res && res?.status) {
                    setCategoryData(res?.data);
                } else {
                    toast.error(res?.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

const fetchAllCourses=()=>{
    setLoading(true);
        HomeService.ViewAllCourse()
            .then((res) => {
                if (res && res?.status) {
                    setLoading(false);
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            courseName: item?.courseName,
                            description: item?.description,
                            courseCatID: item?.courseCatID,
                            learningTopics: item?.learningTopics,
                            requirements: item?.requirements,
                            duration: item?.duration,
                            courseFee: item?.courseFee,
                            completionCertificate: item?.completionCertificate,
                            problemSovingSession: item?.problemSovingSession,
                            freeCourse:item?.freeCourse,
                            thumbnailImage: (
                                <>
                                    {item?.thumbnailImage ? (
                                        <img
                                            style={{
                                                height: "65%",
                                                width: "65%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.thumbnailImage}
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
                    setCourseData(arr);
                }
                // console.log("RESPONSE", res);
            })
            .catch((err) => {
                setLoading(false);
                // console.log("err", err);
            });
}

    const onEdit = (item) => {
        window.scroll(0, 0);
        console.log("item", item);
        setId(item?._id);
        // SetCategoryName(item?.catName);
        setImage(item?.image);
        // setSubCategoryName(item?.subCatName);
        setCategoryId(item?.catID);
        // setcourseFee(item?.courseFee);
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
                HomeService.DeleteCourse(id)
                    .then((res) => {
                        if (res && res.status) {
                            toast.success("Deleted Successfully");

                            fetchAllCourses();
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

    const fetchSubCategory = (catid) => {
        console.log("FDFDFFDF", catid);
        setImageLoader3(true);
        HomeService.ViewAllSubCategory(catid)
            .then((res) => {
                console.log("ResAllSubCategory", res.data);
                if (res && res?.status) {
                    // setLoader(false)
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            //   Name: item?.catName,
                            SubCategoryName: item?.subCatName,
                            courseFee: item?.courseFee,
                            Image: (
                                <>
                                    {item?.image ? (
                                        <img
                                            style={{
                                                height: "59%",
                                                width: "59%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.image}
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
                                        onClick={() => onDelete(item?._id, item?.catID)}
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
                    setSubCategoryData(arr);

                    setImageLoader3(false);
                }
                console.log("RESPONSE", res);
            })
            .catch((err) => {
                //   setLoader(false)
                console.log("err", err);
            });

        // setImageLoader3(false);
    };

    const AddSubCategory = () => {
        let data = {
            catID: CategoryId,
            subCatName: subCategoryName,
            image: image,
            courseFee: courseFee,
        };

        if (subCategoryName && image && courseFee && CategoryId) {
            HomeService.AddSubCategory(data)
                .then((res) => {
                    console.log("Response Add SubCategory", res);
                    if (res && res.status) {
                        toast.success(res.message);
                        fetchSubCategory();
                        fetchSubCategory();
                        setImage("");
                        setSubCategoryName("");
                        setCategoryId("");
                        setcourseFee("");
                        let file = document.querySelector("#images");
                        file.value = "";
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("All Fields Are Required");
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
        // {
        //   name: (
        //     <div
        //       style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        //     >
        //       Category Name
        //     </div>
        //   ),
        //   selector: (row) => row.Name,
        // },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    SubCategory Name
                </div>
            ),
            selector: (row) => row.SubCategoryName,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    courseFee
                </div>
            ),
            selector: (row) => row.courseFee,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Image
                </div>
            ),
            selector: (row) => row.Image,
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

    const UpdateCategory = () => {
        let data = {
            catID: CategoryId,
            image: image,
            courseFee: courseFee,
        };

        if (subCategoryName && image && courseFee && CategoryId) {
            HomeService.UpdateSubCategory(id, data)
                .then((res) => {
                    console.log("Response Add SubCategory", res);
                    if (res && res.status) {
                        toast.success("Updated Successfully");
                        setCatId(CategoryId);
                        fetchSubCategory(CategoryId);
                        setImage("");
                        setSubCategoryName("");
                        setCategoryId("");
                        setcourseFee("");
                        let file = document.querySelector("#images");
                        file.value = "";
                        setHide(true);
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("All Fields Are Required");
        }
    };

    const HandleImage = async (e) => {
        setImageLoader(true);

        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);

        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

        if (res && res.status) {
            setImage(res?.url);
        } else {
            toast.error(res?.message);
        }
        setImageLoader(false);
    };

    const HandleCrossClick = () => {
        setImage("");
        let file = document.querySelector("#images");
        file.value = "";
    };

    return (
        <>
            {imageLoader3 ? (
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
                                    Add Course
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
                                    Edit Course
                                </div>
                            )}

                            <form>
                                <div class="row" style={{ marginBottom: "1rem" }}>
                                    <div class="col">
                                        <label for="inputEmail4">
                                            Category Id<span style={{ color: "red" }}>*</span> :
                                        </label>

                                        <select
                                            style={{ marginBottom: "21px" }}
                                            class="form-select"
                                            aria-label="select category"
                                            value={CategoryId}
                                            onChange={(e) => setCategoryId(e?.target?.value)}
                                        >
                                            <option value={""}>Select a category name.......</option>
                                            {CategoryData.map((item) => {
                                                return (
                                                    <option id={item?._id} value={item?._id}>
                                                        {item?.catName}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div class="col">
                                        <label for="inputEmail4">
                                        courseFee<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="number"
                                            class="form-control"
                                            placeholder="Enter courseFee..."
                                            value={courseFee}
                                            onChange={(e) => setcourseFee(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div class="row" style={{ marginBottom: "1rem" }}>
                                    <div class="col">
                                        <label for="inputEmail4">
                                            SubCategory Name<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={subCategoryName}
                                            onChange={(e) => setSubCategoryName(e.target.value)}
                                            placeholder="Enter subcategory name..."
                                        />
                                    </div>
                                    <div class="col">
                                        <label for="inputEmail4">
                                            Image<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <input
                                                class="form-control"
                                                type="file"
                                                onChange={(e) => HandleImage(e)}
                                                accept="image/*"
                                                id="images"
                                            />
                                            {imageLoader ? (
                                                <>
                                                    <ImageLoader />{" "}
                                                </>
                                            ) : null}
                                            {image && (
                                                <>
                                                    <div>
                                                        <img
                                                            style={{
                                                                height: "20%",
                                                                width: "20%",
                                                                marginTop: "12px",
                                                                borderRadius: "5px",
                                                            }}
                                                            src={image}
                                                        />
                                                        <button
                                                            onClick={() => HandleCrossClick()}
                                                            style={{ color: "red" }}
                                                            type="button"
                                                            class="btn-close"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {hide ? (
                                <button class="btn btn-primary" onClick={AddSubCategory}>
                                    Submit
                                </button>
                            ) : (
                                <button class="btn btn-primary" onClick={UpdateCategory}>
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
                                Manage SubCategory
                            </div>
                            <label for="inputEmail4">
                                Category Name<span style={{ color: "red" }}>*</span> :
                            </label>

                            <select
                                style={{ marginBottom: "21px" }}
                                class="form-select"
                                aria-label="select category"
                                value={catId}
                                onChange={(e) => {
                                    setCatId(e?.target?.value);
                                    e.target.value && fetchSubCategory(e?.target?.value);
                                }}
                            >
                                <option value={""}>Select a category name.......</option>
                                {CategoryData.map((item) => {
                                    return (
                                        <option id={item?._id} value={item?._id}>
                                            {item?.catName}
                                        </option>
                                    );
                                })}
                            </select>
                            {catId && (
                                <DataTable
                                    columns={columns}
                                    data={courseData}
                                    pagination
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default AddAndManageCourse
