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
import { Link, useNavigate, useParams } from "react-router-dom";


const ManageEpisode = () => {
    const { show, id } = useParams()

    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(true);

    const [nameOfEpisode, setNameOfEpisode] = useState("")
    const [episodeNumber, setEpisodeNumber] = useState("")
    const [duration, setDuration] = useState("")
    const [episodeDescription, setEpisodeDescription] = useState("")






    const [imageLoader, setImageLoader] = useState(false);
    const [bannerImage, setBannerImage] = useState("");

    const HandleBannerImage = async (e) => {
        setImageLoader(true);
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);
        // console.log('L86:', data);
        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

        if (res && res.status) {
            console.log("UploadImageRes", res);
            setBannerImage(res?.url);
        } else {
            toast.error(res?.message);
        }
        setImageLoader(false);
    };

    const [tailerVideoLoader, setTailerVideoLoader] = useState(false);
    const [addEpisode, setAddEpisode] = useState("");

    const HandleTailerVideo = async (e) => {
        setTailerVideoLoader(true);
        let file = e.target.files[0];
        // console.log("gfgf:",file);
        let data = new FormData();
        data.append("video", file);
        // console.log('L105:',data);
        let res = await HttpClientXml.fileVideoUplode("video-upload", "POST", data);

        if (res && res.status) {
            // console.log("UploadImageRes", res);
            setAddEpisode(res?.transcoderUrl);
        } else {
            toast.error(res?.message);
        }
        setTailerVideoLoader(false);
    };




    ///Add Episode


    const initialEpisode = {
        nameOfEpisode: "",
        episodeNumber: "",
        addEpisode: "",
        bannerImage: "",
        duration: "",
        episodeDescription: "",
    };

    const [formValues, setFormValues] = useState([initialEpisode]);

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    };

    const [episodeImageLoader, setEpisodeImageLoader] = useState(false)
    const HandleEpisodeImage = async (i, e) => {
        setEpisodeImageLoader(true);
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);
        // console.log('L86:', data);
        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

        if (res && res.status) {
            console.log("UploadImageRes", res);
            // setBannerImage(res?.url);
            let newFormValues = [...formValues];
            newFormValues[i].bannerImage = res?.url;
            setFormValues(newFormValues);
            // console.log("L60: ",formValues[0].bannerImage);
        } else {
            toast.error(res?.message);
        }
        setEpisodeImageLoader(false);
    };


    const [episodeTailerVideoLoader, setEpisodeTailerVideoLoader] = useState(false)
    const handleEpisodeVideo = async (i, e) => {

        setEpisodeTailerVideoLoader(true);
        let file = e.target.files[0];
        // console.log("L49:", file);
        let data = new FormData();
        data.append("video", file);
        // console.log('L52:', data);
        let res = await HttpClientXml.fileVideoUplode("video-upload", "POST", data);
        // console.log("L54", res);
        if (res && res.status) {

            let newFormValues = [...formValues];
            newFormValues[i].addEpisode = res?.transcoderUrl;
            setFormValues(newFormValues);
        } else {
            toast.error(res?.message);
        }
        setEpisodeTailerVideoLoader(false);


    };

    const addFormFields = () => {
        // alert(formValues.length)
        if (formValues.length < 5000) {
            setFormValues([...formValues, initialEpisode]);
        } else {
            Swal("")
            Swal("Error", "Not more than 5000", "error");
        }
    };

    const removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };

    ///Add Episode//



    const setInitialState = () => {
        setNameOfEpisode("")
        setEpisodeNumber("")
        setEpisodeDescription("")
        setDuration("")

        let trailer = document.querySelector("#trailer");
        trailer.value = "";
        let thumbnail = document.querySelector("#thumbnail");
        thumbnail.value = "";
    }


    const AddData = () => {
        let data = {
            showID: show,
            seasonID: id,
            addEpisode: formValues,
        };

        console.log("L179:",data);
        // return
        if (show && id) {
            HomeService.AddEpisode(data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        FetchAllData()
                        // setInitialState()
                        setFormValues([{}]);
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("Error Occured!");
        }
    }

    const UpdateData = () => {
        let data = {
            nameOfEpisode: nameOfEpisode,
            episodeNumber: episodeNumber,
            addEpisode: addEpisode,
            bannerImage: bannerImage,
            duration: duration,
            episodeDescription: episodeDescription
        };

        console.log("L208:", data, episodeId);
        if (episodeId) {
            HomeService.UpdateEpisode(episodeId, data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        FetchAllData()
                        setInitialState()
                        setOnEditing(false)
                        setHide(true)
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("Error Occured!");
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
                    Name
                </div>
            ),
            selector: (row) => row.nameOfEpisode,
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Number
                </div>
            ),
            selector: (row) => row.episodeNumber,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Thumbnail
                </div>
            ),
            selector: (row) => row.bannerImage,
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
        // console.log(addShowID);
        HomeService.ViewEpisodesBySeason(id)
            .then((res) => {
                console.log("Video Content:", res.data);
                if (res && res?.status) {
                    setLoading(false);
                    // setLoader(false)
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            id: item?._id,
                            nameOfEpisode: item?.nameOfEpisode,
                            episodeNumber: item?.episodeNumber,
                            episodeDescription: item?.episodeDescription,
                            duration: item?.duration,
                            bannerImage: (
                                <>
                                    {item?.bannerImage ? (
                                        <img
                                            style={{

                                                // width: "100%",
                                                maxHeight: "100px",

                                                margin: "5px",
                                            }}
                                            src={item?.bannerImage}
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

    const [showId, setShowId] = useState("");
    const [onEditing, setOnEditing] = useState(false)
    const [seasonId, setSeasonId] = useState("");
    const [episodeId, setEpisodeId] = useState("")

    const onEdit = (item) => {
        window.scroll(0, 0);

        setNameOfEpisode(item?.nameOfEpisode)
        setEpisodeNumber(item?.episodeNumber)
        setDuration(item?.duration)
        setEpisodeDescription(item?.episodeDescription)

        setAddEpisode(item?.addEpisode)
        setBannerImage(item?.bannerImage)
        setOnEditing(true)

        setEpisodeId(item?._id)

        // setFormValues(null)
        console.log("L425:", item._id);

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
                HomeService.DeleteEpisode(id)
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
                                        Add Episode
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
                                        Update Episode
                                    </div>
                                )}



                                <div class="form-group">

                                    <div className="row" data-aos="fade-up" style={{ display: onEditing ? "block" : "none" }}>
                                        <div className="col-lg-12">
                                            {/* <form> */}




                                            <div style={{ border: "solid 1px #ced4da", padding: "1em", margin: "1em 0", borderRadius: "0.25rem" }} className="_form-inline">
                                                <div className="form-group mb-2 mt-1">
                                                    <label for="inputEmail4">
                                                        Episode Name:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="nameOfEpisode"
                                                        placeholder="Name of Episode"
                                                        value={nameOfEpisode}
                                                        onChange={(e) => setNameOfEpisode(e.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group mb-2 mt-1">
                                                    <label for="inputEmail4">
                                                        Episode Number:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="episodeNumber"
                                                        placeholder="Episode Number"
                                                        value={episodeNumber}
                                                        onChange={(e) => setEpisodeNumber(e.target.value)}
                                                    />
                                                </div>

                                                {/* Tailer Video upload */}

                                                <label for="exampleInputEmail1">
                                                    Episode Video :
                                                </label>
                                                <input
                                                    class="form-control"
                                                    onChange={(e) => HandleTailerVideo(e)}
                                                    type="file"
                                                    id="trailer"
                                                    accept="video/*"
                                                />
                                                {episodeTailerVideoLoader ? (
                                                    <>
                                                        <ImageLoader />{" "}
                                                    </>
                                                ) : null}
                                                {addEpisode && (
                                                    <>
                                                        <div>
                                                            Uploaded Successfully

                                                        </div>
                                                    </>
                                                )}

                                                {/* //Tailer Video upload */}


                                                {/* Image Upload */}
                                                <label for="exampleInputEmail1" style={{ marginTop: "1rem" }}>
                                                    Banner Image :
                                                </label>
                                                <input
                                                    class="form-control"
                                                    onChange={(e) => HandleBannerImage(e)}
                                                    type="file"
                                                    id="thumbnail"
                                                    accept="image/*"
                                                />
                                                {episodeImageLoader ? (
                                                    <>
                                                        <ImageLoader />
                                                    </>
                                                ) : null}
                                                {bannerImage && (
                                                    <>
                                                        <div>
                                                            <img
                                                                style={{
                                                                    height: "10%",
                                                                    width: "10%",
                                                                    marginTop: "12px",
                                                                    borderRadius: "5px",
                                                                }}
                                                                src={bannerImage}
                                                            />

                                                        </div>
                                                    </>
                                                )}
                                                {/* //Image Upload */}





                                                <div className="form-group mb-2 mt-1">
                                                    <label for="inputEmail4">
                                                        Episode Duration:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="duration"
                                                        placeholder="duration"
                                                        value={duration}
                                                        onChange={(e) => setDuration(e.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group mb-2 mt-1">
                                                    <label for="inputEmail4">
                                                        Episode Description:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="episodeDescription"
                                                        placeholder="episodeDescription"
                                                        value={episodeDescription}
                                                        onChange={(e) => setEpisodeDescription(e.target.value)}
                                                    />
                                                </div>



                                            </div>





                                            {/* </form> */}
                                        </div>
                                    </div>

                                    {/* Episode */}

                                    <div className="row" data-aos="fade-up" style={{ display: onEditing ? "none" : "block" }}>
                                        <div className="col-lg-12">
                                            {/* <form> */}


                                            {formValues?.map((element, index) => (

                                                <div style={{ border: "solid 1px #ced4da", padding: "1em", margin: "1em 0", borderRadius: "0.25rem" }} className="_form-inline" key={index}>
                                                    <div className="form-group mb-2 mt-1">
                                                        <label for="inputEmail4">
                                                            Episode Name:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name="nameOfEpisode"
                                                            placeholder="Name Of Episode"
                                                            value={element.nameOfEpisode || ""}
                                                            onChange={(e) => handleChange(index, e)}
                                                        />
                                                    </div>

                                                    <div className="form-group mb-2 mt-1">
                                                        <label for="inputEmail4">
                                                            Episode Number:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            class="form-control"
                                                            name="episodeNumber"
                                                            placeholder="Episode Number"
                                                            value={element.episodeNumber || ""}
                                                            onChange={(e) => handleChange(index, e)}
                                                        />
                                                    </div>

                                                    {/* Tailer Video upload */}

                                                    <label for="exampleInputEmail1">
                                                        Episode Video :
                                                    </label>
                                                    <input
                                                        class="form-control"
                                                        onChange={(e) => handleEpisodeVideo(index, e)}
                                                        type="file"
                                                        id="trailer"
                                                        accept="video/*"
                                                    />
                                                    {episodeTailerVideoLoader ? (
                                                        <>
                                                            <ImageLoader />{" "}
                                                        </>
                                                    ) : null}
                                                    {element.addEpisode && (
                                                        <>
                                                            <div>
                                                                Uploaded Successfully

                                                            </div>
                                                        </>
                                                    )}

                                                    {/* //Tailer Video upload */}


                                                    {/* Image Upload */}
                                                    <label for="exampleInputEmail1" style={{ marginTop: "1rem" }}>
                                                        Thumbnail Image :
                                                    </label>
                                                    <input
                                                        class="form-control"
                                                        onChange={(e) => HandleEpisodeImage(index, e)}
                                                        type="file"
                                                        id="thumbnail"
                                                        accept="image/*"
                                                    />
                                                    {episodeImageLoader ? (
                                                        <>
                                                            <ImageLoader />
                                                        </>
                                                    ) : null}
                                                    {element.bannerImage && (
                                                        <>
                                                            <div>
                                                                <img
                                                                    style={{
                                                                        height: "10%",
                                                                        width: "10%",
                                                                        marginTop: "12px",
                                                                        borderRadius: "5px",
                                                                    }}
                                                                    src={element.bannerImage}
                                                                />

                                                            </div>
                                                        </>
                                                    )}
                                                    {/* //Image Upload */}





                                                    <div className="form-group mb-2 mt-1">
                                                        <label for="inputEmail4">
                                                            Episode Duration:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name="duration"
                                                            placeholder="Duration"
                                                            value={element.duration || ""}
                                                            onChange={(e) => handleChange(index, e)}
                                                        />
                                                    </div>

                                                    <div className="form-group mb-2 mt-1">
                                                        <label for="inputEmail4">
                                                            Episode Description:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name="episodeDescription"
                                                            placeholder="Description"
                                                            value={element.episodeDescription || ""}
                                                            onChange={(e) => handleChange(index, e)}
                                                        />
                                                    </div>


                                                    {index ? (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger ml-1"
                                                            onClick={() => removeFormFields(index)}
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
                                                    <i class="fas fa-plus"> Episode</i>
                                                </button>

                                            </div>
                                            {/* </form> */}
                                        </div>
                                    </div>

                                    {/* //Episode */}

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
                                    Episode(s)
                                </div>
                                <DataTable
                                    columns={columns}
                                    data={allData}
                                    pagination
                                    highlightOnHover
                                    paginationPerPage={15}
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

export default ManageEpisode