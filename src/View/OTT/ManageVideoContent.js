import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import HomeService from "../../Service/HomeService";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ImageLoader from "../../Loader/ImageLoader";
import HttpClientXml from "../../Utils/HttpClientXml";
import PageLoader from "../../Loader/PageLoader";
import moment from "moment";
import { Link } from "react-router-dom";

const ManageVideoContent = () => {
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(true);

    const [contentType, setContentType] = useState("");
    const [productionName, setProductionName] = useState("");
    const [showTitle, setShowTitle] = useState("");
    const [directorName, setDirectorName] = useState("");

    const checkRadio = (target, val) => {
        // console.log(target);
        return val == target ? true : false
    }
    ///Add Cast
    const initialCastNames = [""]


    const [addCastName, setAddCastName] = useState(initialCastNames);

    const handleChange = (i, e) => {
        let newFormValues = [...addCastName];
        newFormValues[i] = e.target.value;
        setAddCastName(newFormValues);
        console.log(addCastName);
    };

    const addFormFields = () => {
        if (addCastName.length < 100) {
            setAddCastName([...addCastName, initialCastNames]);
        } else {
            Swal("")
            Swal("Error", "Not more than 3", "error");
        }
    };

    const removeFormFields = (i) => {
        let newFormValues = [...addCastName];
        newFormValues.splice(i, 1);
        setAddCastName(newFormValues);
    };
    ///Add Cast//
    const [ottCategoryID, setOttCategoryID] = useState("")
    const [allOttCategoryID, setAllDonationCategory] = useState([]);
    const FetchAllOttCategories = () => {
        HomeService.ViewOTTCategories()
            .then((res) => {
                console.log("AllState", res.data);
                if (res && res?.status) {
                    // setLoader(false)
                    let arr = res?.data;
                    setAllDonationCategory(arr);
                }
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    const [duration, setDuration] = useState(0)




    const [watchfreeStatus, setWatchfreeStatus] = useState("");

    const [description, setDescription] = useState("")
    const [imageLoader, setImageLoader] = useState(false);
    const [thumbnailImage, setThumbnailImage] = useState("");

    const HandleImage = async (e) => {
        setImageLoader(true);
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);
        // console.log('L86:', data);
        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

        if (res && res.status) {
            console.log("UploadImageRes", res);
            setThumbnailImage(res?.url);
        } else {
            toast.error(res?.message);
        }
        setImageLoader(false);
    };

    const [tailerVideoLoader, setTailerVideoLoader] = useState(false);
    const [movieTailer, setMovieTailer] = useState("");
    const HandleTailerVideo = async (e) => {
        setTailerVideoLoader(true);
        let file = e.target.files[0];
        // console.log("gfgf:",file);
        let data = new FormData();
        data.append("video", file);
        // console.log('L105:',data);
        let res = await HttpClientXml.fileVideoUplode("video-upload", "POST", data);

        if (res && res.status) {
            console.log("UploadImageRes", res);
            setMovieTailer(res?.transcoderUrl);
        } else {
            toast.error(res?.message);
        }
        setTailerVideoLoader(false);
    };

    const [videoLoader, setVideoLoader] = useState(false);
    const [movie, setMovie] = useState("");
    const HandleVideo = async (e) => {
        setVideoLoader(true);
        let file = e.target.files[0];
        // console.log("gfgf:",file);
        let data = new FormData();
        data.append("video", file);
        // console.log('L105:',data);
        let res = await HttpClientXml.fileVideoUplode("video-upload", "POST", data);

        if (res && res.status) {
            console.log("UploadImageRes", res);
            setMovie(res?.transcoderUrl);
        } else {
            toast.error(res?.message);
        }
        setVideoLoader(false);
    };

    const setInitialState = () => {
        setContentType("")
        setProductionName("")
        setShowTitle("")
        setDirectorName("")
        setAddCastName(initialCastNames)
        setOttCategoryID("")
        setDuration(0)
        setWatchfreeStatus("")
        setDescription("")
        setThumbnailImage("")
        setMovieTailer("")
        setMovie("")
        let trailer = document.querySelector("#trailer");
        trailer.value = "";
        let movie = document.querySelector("#movie");
        movie.value = "";
        let thumbnail = document.querySelector("#thumbnail");
        thumbnail.value = "";
    }


    const AddData = () => {
        let data = {}
        if (contentType === "movie") {
            data = {
                ottCategoryID: ottCategoryID,
                contentType: contentType,
                productionName: productionName,
                showTitle: showTitle,
                description: description,
                duration: duration,
                directorName: directorName,
                addCastName: addCastName,
                watchfreeStatus: watchfreeStatus,
                thumbnailImage: thumbnailImage,
                uploadMovieTailer: movieTailer,
                uploadMovie: movie
            };
        } else if (contentType === "ott") {
            data = {
                ottCategoryID: ottCategoryID,
                contentType: contentType,
                productionName: productionName,
                showTitle: showTitle,
                description: description,
                duration: duration,
                directorName: directorName,
                addCastName: addCastName,
                watchfreeStatus: watchfreeStatus,
                thumbnailImage: thumbnailImage,
                uploadMovieTailer: movieTailer,
            };
        }
        // console.log(data);
        if (contentType && productionName) {
            HomeService.AddVideoContent(data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        FetchAllData()
                        setInitialState()
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("Production name is required");
        }
    }

    const UpdateData = () => {
        console.log("ID", id);
        let data = {
            ottCategoryID: ottCategoryID,
            contentType: contentType,
            productionName: productionName,
            showTitle: showTitle,
            description: description,
            duration: duration,
            directorName: directorName,
            addCastName: addCastName,
            watchfreeStatus: watchfreeStatus,
            thumbnailImage: thumbnailImage,
            uploadMovieTailer: movieTailer,
            uploadMovie: movie
        };
        if (thumbnailImage && productionName) {
            HomeService.UpdateVideoContent(id, data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success("Updated Successfully");
                        setHide(true);

                        setInitialState()
                        FetchAllData();
                        
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("All fields is required");
        }
    };

    const [allData, setAllData] = useState([]);
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
                    Thumbnail
                </div>
            ),
            selector: (row) => row.thumbnailImage,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Content Type
                </div>
            ),
            selector: (row) => row.contentType,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Production Name
                </div>
            ),
            selector: (row) => row.productionName,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Title
                </div>
            ),
            selector: (row) => row.showTitle,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Director Name
                </div>
            ),
            selector: (row) => row.directorName,
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

                    Season
                </div>
            ),

            selector: (row) => {
                if (row.contentType === "ott") {
                    return (<><Link to={`/manage-season/${row.id}`}>Manage</Link></>)
                }

            },
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
    const FetchAllData = () => {
        setLoading(true);
        HomeService.ViewAllVideoContents()
            .then((res) => {
                console.log("Video Content:", res.data);
                if (res && res?.status) {
                    setLoading(false);
                    // setLoader(false)
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            id: item?._id,
                            contentType: item?.contentType,
                            productionName: item?.productionName,
                            showTitle: item?.showTitle,
                            directorName: item?.directorName,
                            duration: item?.duration,
                            thumbnailImage: (
                                <>
                                    {item?.thumbnailImage ? (
                                        <img
                                            style={{

                                                // width: "100%",
                                                maxHeight: "100px",

                                                margin: "5px",
                                            }}
                                            src={item?.thumbnailImage}
                                        />
                                    ) : (
                                        <img
                                            style={{

                                                width: "100%",

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
                    setAllData(arr);
                }
                console.log("RESPONSE", res);
            })
            .catch((err) => {
                setLoading(false);
                console.log("err", err);
            });
    };

    const [id, setId] = useState("");
    const onEdit = (item) => {
        window.scroll(0, 0);
        setContentType(item?.contentType);
        setOttCategoryID(item?.categoryData?._id)
        setProductionName(item?.productionName)
        setShowTitle(item?.showTitle)
        setDescription(item?.description)

        setDuration(item?.duration)
        setDirectorName(item?.directorName)
        setAddCastName(item?.addCastName)
        setWatchfreeStatus(item?.watchfreeStatus)
        setThumbnailImage(item?.thumbnailImage)
        setMovieTailer(item?.uploadMovieTailer)
        setMovie(item?.uploadMovie)
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
                HomeService.DeleteVideoContent(id)
                    .then((res) => {
                        if (res && res.status) {
                            toast.success("Deleted Successfully");
                            setInitialState()
                            FetchAllData();
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


    useEffect(() => {
        FetchAllOttCategories()
        FetchAllData()
    }, [])
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
                <>
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
                                        Add Video Content
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
                                        Update Video Content
                                    </div>
                                )}

                                <div class="form-group">
                                    <label for="exampleInputEmail1">
                                        Create Content for :
                                    </label>

                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="movie" id="flexRadioDefault1" onClick={(e) => setContentType(e.target.name)} checked={checkRadio(contentType, 'movie')} />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Movie
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="ott" id="flexRadioDefault2" onClick={(e) => setContentType(e.target.name)} checked={checkRadio(contentType, 'ott')} />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            OTT
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group" style={{ display: contentType === "" && "none" }}>



                                    <div class="row" style={{ marginBottom: "1rem" }}>
                                        <div class="col">
                                            <label for="inputEmail4">
                                                Production name:
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                value={productionName}
                                                onChange={(e) => setProductionName(e.target.value)}
                                                placeholder=""
                                            />
                                        </div>
                                    </div>

                                    <div class="row" style={{ marginBottom: "1rem" }}>
                                        <div class="col">
                                            <label for="inputEmail4">
                                                Title:
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                value={showTitle}
                                                onChange={(e) => setShowTitle(e.target.value)}
                                                placeholder=""
                                            />
                                        </div>

                                        <div class="col">
                                            <label for="inputEmail4">
                                                Director:
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                value={directorName}
                                                onChange={(e) => setDirectorName(e.target.value)}
                                                placeholder=""
                                            />
                                        </div>


                                    </div>

                                    <div class="row" style={{ marginBottom: "1rem" }}>
                                        <div class="col">
                                            <label for="inputEmail4">
                                                Cast Names:
                                            </label>
                                            <div className="button-section mt-2">
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    type="button"
                                                    onClick={() => addFormFields()}
                                                >
                                                    <i class="fas fa-plus"></i>
                                                </button>

                                            </div>

                                        </div>

                                        <div className="row" data-aos="fade-up">
                                            <div className="col-lg-4">
                                                <form>
                                                    {addCastName.map((element, index) => (
                                                        <div className="form-inline" key={index}>
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    name="castname"
                                                                    class="form-control"
                                                                    placeholder={`Cast${index + 1} name`}
                                                                    value={element || ""}
                                                                    onChange={(e) => handleChange(index, e)}
                                                                />
                                                            </div>


                                                            {index ? (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm text-danger ml-1"
                                                                    onClick={() => removeFormFields(index)}
                                                                >
                                                                    <i class="fas fa-trash"></i>
                                                                </button>
                                                            ) : null}
                                                        </div>
                                                    ))}

                                                </form>
                                            </div>
                                        </div>


                                    </div>



                                    <div class="row" style={{ marginBottom: "1rem" }}>
                                        <div class="col">
                                            <label for="exampleInputEmail1">
                                                Category:
                                            </label>
                                            <select className="form-control" onChange={(e) => setOttCategoryID(e.target.value)}>
                                                <option value="">Select</option>
                                                {allOttCategoryID?.map((ele, id) => {
                                                    return (
                                                        <option
                                                            selected={ele._id == ottCategoryID ? true : false}
                                                            value={ele._id}
                                                            key={ele._id}
                                                        >
                                                            {ele.catName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div class="col">
                                            <label for="inputEmail4">
                                                Duration:
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                placeholder=""
                                            />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="exampleInputEmail1">
                                            Watch free?
                                        </label>

                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="free" value={true} id="flexRadioDefault1" onClick={(e) => {setWatchfreeStatus(e.target.value);}} checked={checkRadio(watchfreeStatus, true)} />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Yes
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="paid" value={false} id="flexRadioDefault2" onClick={(e) => {setWatchfreeStatus(e.target.value);}} checked={checkRadio(watchfreeStatus, false)} />
                                            <label class="form-check-label" for="flexRadioDefault2">
                                                No
                                            </label>
                                        </div>
                                    </div>

                                    <div class="row" style={{ marginBottom: "1rem" }}>
                                        <div class="col">
                                            <label for="inputEmail4">
                                                Description:
                                            </label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                                        </div>
                                    </div>

                                    {/* Tailer Video upload */}

                                    <label for="exampleInputEmail1">
                                        Upload Tailer :
                                    </label>
                                    <input
                                        class="form-control"
                                        onChange={(e) => HandleTailerVideo(e)}
                                        type="file"
                                        id="trailer"
                                        accept="video/*"
                                    />
                                    {tailerVideoLoader ? (
                                        <>
                                            <ImageLoader />{" "}
                                        </>
                                    ) : null}
                                    {movieTailer && (
                                        <>
                                            <div>
                                                Uploaded Successfully

                                            </div>
                                        </>
                                    )}

                                    {/* //Tailer Video upload */}


                                    {/* Video upload */}
                                    <div style={{ display: contentType === "ott" && "none", marginTop: "1rem" }}>
                                        <label for="exampleInputEmail1">
                                            Upload Movie :
                                        </label>
                                        <input
                                            class="form-control"
                                            onChange={(e) => HandleVideo(e)}
                                            type="file"
                                            id="movie"
                                            accept="video/*"
                                        />
                                        {videoLoader ? (
                                            <>
                                                <ImageLoader />{" "}
                                            </>
                                        ) : null}
                                        {movie && (
                                            <>
                                                <div>
                                                    Uploaded Successfully

                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {/* //Video upload */}

                                    <label for="exampleInputEmail1" style={{ marginTop: "1rem" }}>
                                        Thumbnail Image :
                                    </label>
                                    <input
                                        class="form-control"
                                        onChange={(e) => HandleImage(e)}
                                        type="file"
                                        id="thumbnail"
                                        accept="image/*"
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
                                                        height: "10%",
                                                        width: "10%",
                                                        marginTop: "12px",
                                                        borderRadius: "5px",
                                                    }}
                                                    src={thumbnailImage}
                                                />

                                            </div>
                                        </>
                                    )}

                                    <div style={{ marginTop: "1rem" }}>
                                        {hide ? (
                                            <>
                                                <button class="btn btn-primary" onClick={AddData}>
                                                    Add
                                                </button>

                                                {/* <button class="btn btn-primary" onClick={setInitialState}>
                                        Reset
                                    </button> */}
                                            </>
                                        ) : (
                                            <button class="btn btn-primary" onClick={UpdateData}>
                                                Update
                                            </button>
                                        )}
                                    </div>
                                </div>



                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: "20px",
                                        color: "#868e96",
                                        margin: "35px",
                                    }}
                                    className="card-title"
                                >
                                    Content
                                </div>
                                <DataTable
                                    columns={columns}
                                    data={allData}
                                    pagination
                                    highlightOnHover
                                    paginationPerPage={3}
                                    paginationRowsPerPageOptions={[5, 15, 25, 50]}
                                    paginationComponentOptions={{
                                        rowsPerPageText: "Records per page:",
                                        rangeSeparatorText: "out of",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ManageVideoContent