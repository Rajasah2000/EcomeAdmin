import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import HomeService from "../../../Service/HomeService";
import DataTable from "react-data-table-component";
import HttpClientXml from "../../../Utils/HttpClientXml";
import PageLoader from "../../../Loader/PageLoader";
import ImageLoader from "../../../Loader/ImageLoader";
import Swal from "sweetalert2";
import SelectableInput from "./SelectableInput";

const AddAndManageCourse = () => {
    const [courseData, setCourseData] = useState([])
    const [description, setdescription] = useState("")
    const [courseCatID, setcourseCatID] = useState("")
    const [learningTopics, setlearningTopics] = useState([])
    const [requirements, setrequirements] = useState([])
    const [duration, setduration] = useState("")
    const [completionCertificate, setcompletionCertificate] = useState("")
    const [problemSovingSession, setproblemSovingSession] = useState("")
    const [freeCourse, setfreeCourse] = useState("")
    const [thumbnailImage, setthumbnailImage] = useState("")
    const [introVideo, setintroVideo] = useState("")
    const [courseName, setcourseName] = useState("")
    const [hide, setHide] = useState(true);
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);
    const [CategoryData, setCategoryData] = useState([]);
    const [CategoryId, setCategoryId] = useState("");
    const [courseFee, setcourseFee] = useState("");
    const [image, setImage] = useState("");
    const [catId, setCatId] = useState("");
    const [imageLoader, setImageLoader] = useState(false);
    const [imageLoad, setImageLoad] = useState(false);
    const [imageLoader3, setImageLoader3] = useState(false);
    const [imageLoader4, setImageLoader4] = useState(false);
    const [imageLoader5, setImageLoader5] = useState(false);

    useEffect(() => {
        fetchCategoryData();
        fetchAllCourses();
    }, []);

    const iniDocumentDetails = {
        lectureTitle: "",
        lectureDescription: "",
        docFile: "",
        docVideo: ""
    };
    const [documentValues, setDocumentValues] = useState([iniDocumentDetails]);


    const iniCourseDetails = {
        docTitle: "",
        docDescription: "",
        documents: [iniDocumentDetails]
    }
    const [formValues, setFormValues] = useState([iniCourseDetails]);

    console.log("formvaluesss", formValues)

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    };

    const addFormFields = () => {
        setFormValues([...formValues, iniCourseDetails]);
    };

    const removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };


    const handleDocumentChange = (ind, index, e) => {
        // console.log("indhhh", ind, formValues)
        let newDocArr = [...formValues[ind].documents];
        newDocArr[index][e.target.name] = e.target.value;
        setFormValues(prev => {
            return prev?.map((item, i) => {
                if (i === ind) {
                    return ({ ...item, documents: newDocArr })
                } else {
                    return item
                }
            })
        })
    };

    // Function to add more document fields
    const addDocumentFields = (ind) => {
        let newDocArr = [...formValues[ind].documents, {
            lectureTitle: "",
            lectureDescription: "",
            docFile: "",
            docVideo: ""
        }];
        setFormValues(prev => {
            return prev?.map((item, i) => {
                if (i === ind) {
                    return ({ ...item, documents: newDocArr })
                } else {
                    return item
                }
            })
        })

    };

    const HandleDocImage = async (ind, index, e) => {
        setImageLoader4(true)
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);

        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

        if (res && res.status) {
            // console.log("UploadImageRes", res);
            let newDocArr = [...formValues[ind].documents];
            newDocArr[index].docFile = res?.url;
            setFormValues(prev => {
                return prev?.map((item, i) => {
                    if (i === ind) {
                        return ({ ...item, documents: newDocArr })
                    } else {
                        return item
                    }
                })
            })

        } else {
            toast.error(res?.message);
        }
        setImageLoader4(false);
    };

    const HandleDocVideo = async (ind, index, e) => {
        setImageLoader5(true)
        let file = e.target.files[0];
        let data = new FormData();
        data.append("video", file);
        let res = await HttpClientXml.fileUplode("video-upload", "POST", data);
        if (res && res.status) {
            let newDocArr = [...formValues[ind].documents];
            newDocArr[index].docVideo = res?.transcoderUrl;
            setFormValues(prev => {
                return prev?.map((item, i) => {
                    if (i === ind) {
                        return ({ ...item, documents: newDocArr })
                    } else {
                        return item
                    }
                })
            })

            // console.log("UploadVideoRes", res);
            // let newFormValues = [...documentValues];
            // newFormValues[ind].docVideo = res?.transcoderUrl;
            // setDocumentValues(newFormValues);

        } else {
            toast.error(res?.message);
        }
        setImageLoader5(false);
    };

    // Function to remove document fields
    const removeDocumentFields = (ind) => {
        let newDocArr = [...formValues[ind].documents];
        newDocArr.splice(ind, 1);
        setFormValues(prev => {
            return prev?.map((item, i) => {
                if (i === ind) {
                    return ({ ...item, documents: newDocArr })
                } else {
                    return item
                }
            })
        })
    };

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

    const fetchAllCourses = () => {
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
                            freeCourse: item?.freeCourse,
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

                            introVideo: (
                                <>
                                    {item?.introVideo ? (
                                        <img
                                            style={{
                                                height: "65%",
                                                width: "65%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.introVideo}
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
            })
            .catch((err) => {
                setLoading(false);
            });
    }

    const onEdit = (item) => {
        window.scroll(0, 0);
        console.log("item", item);
        setId(item?._id);
        setcourseName(item?.courseName);
        setdescription(item?.description);
        setcourseCatID(item?.courseCatID);
        setlearningTopics(item?.learningTopics);
        setrequirements(item?.requirements);
        setduration(item?.duration);
        setcourseFee(item?.courseFee);
        setcompletionCertificate(item?.completionCertificate);
        setproblemSovingSession(item?.problemSovingSession);
        setfreeCourse(item?.freeCourse);
        setthumbnailImage(item?.thumbnailImage);
        setintroVideo(item?.introVideo);
        setFormValues(item?.courseDetails)
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


    const AddSubCategory = () => {
        let data = {
            courseCatID: courseCatID,
            courseName: courseName,
            description: description,
            learningTopics: learningTopics,
            requirements: requirements,
            duration: duration,
            completionCertificate: completionCertificate,
            problemSovingSession: problemSovingSession,
            freeCourse: freeCourse,
            thumbnailImage: thumbnailImage,
            introVideo: introVideo,
            courseFee: courseFee,
            courseDetails: formValues
        };
        console.log(data, "Addcourse")
        if (courseName && description && learningTopics && requirements && duration && completionCertificate && problemSovingSession && freeCourse && courseFee) {
            HomeService.AddCourse(data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        setcourseName("");
                        setdescription("");
                        setcourseCatID("");
                        setlearningTopics([]);
                        setrequirements([]);
                        setduration("");
                        setcourseFee("")
                        setcompletionCertificate("");
                        setproblemSovingSession("");
                        setfreeCourse("");
                        setthumbnailImage("");
                        setintroVideo("");
                        setFormValues([iniCourseDetails]);
                        // setCategoryId("");
                        fetchAllCourses();
                        // let file = document.querySelector("#images");
                        // file.value = "";
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
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Course Name
                </div>
            ),
            selector: (row) => row.courseName,
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Duration
                </div>
            ),
            selector: (row) => row.duration,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    course Description
                </div>
            ),
            selector: (row) => row.description,
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
            selector: (row) => row.thumbnailImage,
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
            courseCatID: courseCatID,
            courseName: courseName,
            description: description,
            learningTopics: learningTopics,
            requirements: requirements,
            duration: duration,
            completionCertificate: completionCertificate,
            problemSovingSession: problemSovingSession,
            freeCourse: freeCourse,
            thumbnailImage: thumbnailImage,
            introVideo: introVideo,
            courseFee: courseFee,
            courseDetails: formValues,
        };

        if (courseName && description && learningTopics && requirements && duration && completionCertificate && problemSovingSession && freeCourse && courseFee) {
            HomeService.UpdateCourse(id, data)
                .then((res) => {
                    console.log("Response Update", res);
                    if (res && res.status) {
                        toast.success(res.message);
                        setcourseName("");
                        setdescription("")
                        setcourseCatID("")
                        // setCatId("")
                        setlearningTopics([]);
                        setrequirements([]);
                        setduration("");
                        setcourseFee("");
                        setcompletionCertificate("");
                        setproblemSovingSession("");
                        setfreeCourse("");
                        setthumbnailImage("");
                        setintroVideo("");
                        setFormValues([iniCourseDetails]);
                        // setCategoryId("");
                        fetchAllCourses();
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

    const HandleImage = async (e) => {
        setImageLoader(true);

        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);

        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

        if (res && res.status) {
            setthumbnailImage(res?.url);
        } else {
            toast.error(res?.message);
        }
        setImageLoader(false);
    };


    const HandleVideo = async (e) => {
        setImageLoad(true);

        let file = e.target.files[0];
        let data = new FormData();
        data.append("video", file);
        console.log('data video', file, data)
        let res = await HttpClientXml.fileUplode("video-upload", "POST", data);

        if (res && res.status) {
            console.log("UploadVideoRes", res);
            setintroVideo(res?.transcoderUrl);
        } else {
            toast.error(res?.message);
        }
        setImageLoad(false);
    };

    const HandleCrossClick = () => {
        setthumbnailImage("");
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
                                            value={courseCatID}
                                            onChange={(e) => setcourseCatID(e?.target?.value)}
                                        >
                                            <option value={""}>Select a category name.......</option>
                                            {CategoryData?.map((item) => {
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
                                            course Name<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter course name..."
                                            name="courseName"
                                            value={courseName}
                                            onChange={(e) => setcourseName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row">
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
                                    <div class="col">
                                        <label for="inputEmail4">
                                            description<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter description..."
                                            value={description}
                                            onChange={(e) => setdescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div class="col">
                                        <SelectableInput
                                            title="Add learningTopics "
                                            value={learningTopics}
                                            onChange={(val) => setlearningTopics(val)}
                                            className="form-group"
                                            placeholder="Enter learningTopics"
                                        />
                                    </div>
                                    <div class="col">
                                        <SelectableInput
                                            title="Add requirements "
                                            value={requirements}
                                            onChange={(val) => setrequirements(val)}
                                            className="form-group"
                                            placeholder="Enter requirements"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div class="col">
                                        <label for="inputEmail4">
                                            duration<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter duration..."
                                            value={duration}
                                            onChange={(e) => setduration(e.target.value)}
                                        />
                                    </div>


                                    <div className="col">
                                        <div>
                                            <label htmlFor="formGroupExampleInput">Completion Certificate</label>
                                        </div>
                                        <div className="d-flex flex-wrap">
                                            <div
                                                classname="form-check form-check-inline"
                                                style={{ marginRight: "1rem" }}
                                            >
                                                <input
                                                    classname="form-check-input"
                                                    type="radio"
                                                    name="completionCertificate"
                                                    id="inlineRadio1"
                                                    value="true"
                                                    onChange={() =>
                                                        setcompletionCertificate("true")
                                                    }
                                                />
                                                <label classname="form-check-label" for="inlineRadio1">
                                                    Yes
                                                </label>
                                            </div>

                                            <div
                                                classname="form-check form-check-inline"
                                                style={{ marginRight: "1rem" }}
                                            >
                                                <input
                                                    classname="form-check-input"
                                                    type="radio"
                                                    name="completionCertificate"
                                                    id="inlineRadio1"
                                                    value="false"
                                                    onChange={() =>
                                                        setcompletionCertificate("false")
                                                    }
                                                />
                                                <label classname="form-check-label" for="inlineRadio1">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <br />
                                <div className="row">
                                    <div class="col">
                                        <label for="inputEmail4">
                                            problemSovingSession<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="number"
                                            class="form-control"
                                            placeholder="Enter no. of problemSovingSession..."
                                            value={problemSovingSession}
                                            onChange={(e) => setproblemSovingSession(e.target.value)}
                                        />
                                    </div>


                                    <div className="col">
                                        <div>
                                            <label htmlFor="formGroupExampleInput">Free Course</label>
                                        </div>
                                        <div className="d-flex flex-wrap">
                                            <div
                                                classname="form-check form-check-inline"
                                                style={{ marginRight: "1rem" }}
                                            >
                                                <input
                                                    classname="form-check-input"
                                                    type="radio"
                                                    name="freeCourse"
                                                    id="inlineRadio1"
                                                    value="true"
                                                    onChange={() =>
                                                        setfreeCourse(true)
                                                    }
                                                />
                                                <label classname="form-check-label" for="inlineRadio1">
                                                    Yes
                                                </label>
                                            </div>

                                            <div
                                                classname="form-check form-check-inline"
                                                style={{ marginRight: "1rem" }}
                                            >
                                                <input
                                                    classname="form-check-input"
                                                    type="radio"
                                                    name="freeCourse"
                                                    id="inlineRadio1"
                                                    value="false"
                                                    onChange={() =>
                                                        setfreeCourse(false)
                                                    }
                                                />
                                                <label classname="form-check-label" for="inlineRadio1">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="row" style={{ marginBottom: "1rem" }}>
                                    <div class="col">
                                        <label for="inputEmail4">
                                            introVideo<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <input
                                                class="form-control"
                                                type="file"
                                                onChange={(e) => HandleVideo(e)}
                                                accept="video/*"
                                                id="images"
                                            />
                                            {imageLoad ? (
                                                <>
                                                    <ImageLoader />{" "}
                                                </>
                                            ) : null}
                                            {/* {introVideo && (
                                                <>
                                                    <div>
                                                        <img
                                                            style={{
                                                                height: "20%",
                                                                width: "20%",
                                                                marginTop: "12px",
                                                                borderRadius: "5px",
                                                            }}
                                                            src={introVideo}
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
                                            )} */}
                                        </div>
                                    </div>


                                    <div class="col">
                                        <label for="inputEmail4">
                                            thumbnailImage<span style={{ color: "red" }}>*</span> :
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
                                            {thumbnailImage && (
                                                <>
                                                    <div>
                                                        <img
                                                            style={{
                                                                height: "20%",
                                                                width: "20%",
                                                                marginTop: "12px",
                                                                borderRadius: "5px",
                                                            }}
                                                            src={thumbnailImage}
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


                                <div className="row" data-aos="fade-up">
                                    <div className="col-lg-12">

                                        {formValues.map((element, ind) => (

                                            <div style={{ border: "solid 1px #ced4da", padding: "1em", margin: "1em 0", borderRadius: "0.25rem" }} className="_form-inline" key={ind}>
                                                <div className="form-group mb-2 mt-1">
                                                    <label for="inputEmail4">
                                                        docTitle:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="docTitle"
                                                        placeholder={`docTitle ${ind + 1}`}
                                                        value={element.docTitle || ""}
                                                        onChange={(e) => handleChange(ind, e)}
                                                    />
                                                </div>
                                                <div className="form-group mb-2 mt-1">
                                                    <label for="inputEmail4">
                                                        docDescription:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="docDescription"
                                                        placeholder={`docDescription ${ind + 1}`}
                                                        value={element.docDescription || ""}
                                                        onChange={(e) => handleChange(ind, e)}
                                                    />
                                                </div>
                                                <div style={{ border: "1.5px solid rgb(206, 212, 218)", padding: "1rem 1rem 1rem 1rem" }}>
                                                    <div className="row" data-aos="fade-up">
                                                        <div className="col-lg-12">
                                                            {element?.documents?.map((element, index) => (
                                                                <div key={index} className="_form-inline">
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <label for="inputEmail4">
                                                                                Lecture Title:
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                class="form-control"
                                                                                name="lectureTitle"
                                                                                placeholder={`Lecture Title ${index + 1}`}
                                                                                value={element.lectureTitle}
                                                                                onChange={(e) => handleDocumentChange(ind, index, e)}
                                                                            />
                                                                        </div>

                                                                        <div className="col">
                                                                            <label for="inputEmail4">
                                                                                Lecture Description:
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                class="form-control"
                                                                                name="lectureDescription"
                                                                                placeholder={`Lecture Description ${index + 1}`}
                                                                                value={element.lectureDescription}
                                                                                onChange={(e) => handleDocumentChange(ind, index, e)}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <label for="exampleInputEmail1" style={{ marginTop: "1rem" }}>
                                                                                Document file :
                                                                            </label>
                                                                            <input
                                                                                class="form-control"
                                                                                onChange={(e) => HandleDocImage(ind, index, e)}
                                                                                type="file"
                                                                                id="docFile"
                                                                            />
                                                                            {imageLoader4 ? (
                                                                                <>
                                                                                    <ImageLoader />
                                                                                </>
                                                                            ) : null}
                                                                            {element?.docFile && (
                                                                                <>
                                                                                    <div>
                                                                                        <img
                                                                                            style={{
                                                                                                height: "10%",
                                                                                                width: "10%",
                                                                                                marginTop: "12px",
                                                                                                borderRadius: "5px",
                                                                                            }}
                                                                                            src={element?.docFile}
                                                                                        />

                                                                                    </div>
                                                                                </>
                                                                            )}

                                                                        </div>

                                                                        <div className="col">
                                                                            <label for="exampleInputEmail1" style={{ marginTop: "1rem" }}>
                                                                                Document Video :
                                                                            </label>
                                                                            <input
                                                                                class="form-control"
                                                                                onChange={(e) => HandleDocVideo(ind, index, e)}
                                                                                type="file"
                                                                                id="docVideo"
                                                                                accept="video/*"
                                                                            />
                                                                            {imageLoader5 ? (
                                                                                <>
                                                                                    <ImageLoader />
                                                                                </>
                                                                            ) : null}

                                                                        </div>
                                                                    </div>

                                                                    {index ? (
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-danger ml-1"
                                                                            onClick={() => removeDocumentFields(ind)}
                                                                        >
                                                                            <i class="fas fa-trash"></i>
                                                                        </button>
                                                                    ) : null}
                                                                </div>
                                                            ))}
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-success"
                                                                    onClick={() => addDocumentFields(ind)}
                                                                >
                                                                    Add More Documents
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {ind ? (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger ml-1"
                                                        onClick={() => removeFormFields(ind)}
                                                    >
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                ) : null}
                                            </div>
                                        ))}
                                        <div className="button-section mt-2">
                                            <button
                                                className="btn btn-sm btn-success"
                                                type="button"
                                                onClick={() => addFormFields()}
                                            >
                                                <i class="fas fa-plus"></i>
                                            </button>
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
                                Manage Course
                            </div>

                            <DataTable
                                columns={columns}
                                data={courseData}
                                pagination
                            />

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddAndManageCourse