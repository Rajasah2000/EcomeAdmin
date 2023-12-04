import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import HomeService from "../../Service/HomeService";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import ImageLoader from "../../Loader/ImageLoader";
import HttpClientXml from "../../Utils/HttpClientXml";
import AddAndManageMusicAlbum from "./AddAndManageMusicAlbum";
import moment from "moment";

const INITIAL = {
    musicCategoryID: "",
    musicGenreID: "",
    moodID: [],
    contentType: "",
    musicType: "",
    musicName: "",
    audioName: "",
    singerName: "",
    musicDuration: "",
    releaseYear: "",
    uploadThumbnail: "",
    AddMusic: "",
    listenFree: "",
};
const AddAndManageMusic = ({ musicval, setmusicval }) => {
    const [musicData, setmusicData] = useState(INITIAL);
    // console.log(musicval,setmusicval,"AddAndManageMusic")
    const [AllmusicData, setAllmusicData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(true);
    const [catData, setCatData] = useState([]);
    const [genreData, setGenreData] = useState([]);
    const [moodData, setMoodData] = useState([]);
    // const [thumbnail, setThumbnail] = useState("");
    // const [musicImage, setmusicImage] = useState("")
    const [imageLoader, setImageLoader] = useState(false);
    const [imageLoader2, setImageLoader2] = useState(false);
    const [selectedmusicId, setSelectedmusicId] = useState(null);

    console.log("musicval", musicval);

    useEffect(() => {
        fetchAllmusicData();
        fetchAllCategoryData();
        fetchAllGenreData();
        fetchAllMoodData();
    }, []);

    //for add all music
    const Addmusic = () => {
        let data = musicData;
        console.log(data, "music");
        if (musicData?.musicCategoryID &&
            musicData?.musicGenreID &&
            musicData?.moodID &&
            musicData?.contentType &&
            musicData?.musicType &&
            musicData?.musicName &&
            musicData?.audioName &&
            musicData?.singerName &&
            musicData?.musicDuration &&
            musicData?.releaseYear &&
            musicData?.uploadThumbnail
            // && musicData?.AddMusic
        ) {
            HomeService.AddMusic(data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        setmusicData(INITIAL);
                        fetchAllmusicData();
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

        console.log("GHGDK", musicData);
    };

    //for delete functionality
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
                HomeService.DeleteMusic(id)
                    .then((res) => {
                        if (res && res.status) {
                            toast.success("Deleted Successfully");

                            fetchAllmusicData();
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

    // Update the music data
    const Updatemusic = () => {
        if (selectedmusicId) {
            HomeService.UpdateMusic(selectedmusicId, musicData)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        setmusicData(INITIAL);
                        setSelectedmusicId(null); // Clear the selected music ID
                        fetchAllmusicData();
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("Please select a music to update.");
        }
    };

    const onEdit = (music) => {

        console.log("music", music);
        window.scroll(0, 0);
        // setThumbnail(music?.uploadThumbnail);
        setHide(false);
        setSelectedmusicId(music._id);
        setmusicData({ ...music, releaseYear: moment(music?.releaseYear).format("YYYY-MM-DD") })
        setmusicData({ ...music });
    };

    //handeling upload thumbnail
    const HandleImage = async (e) => {
        setImageLoader(true);
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);

        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

        if (res && res.status) {
            console.log("UploadImage", res);
            // setThumbnail(res?.url);
            setmusicData((prev) => ({ ...prev, uploadThumbnail: res?.url }));
        } else {
            toast.error(res?.message);
        }
        setImageLoader(false);
    };

    //handeling music image
    const HandlemusicImage = async (e) => {
        setImageLoader2(true);
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);

        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

        if (res && res.status) {
            console.log("UploadImage", res);
            // setmusicImage(res?.url);
            setmusicData((prev) => ({ ...prev, AddMusic: res?.url }));
        } else {
            toast.error(res?.message);
        }
        setImageLoader2(false);
    };

    //for cross button for upload thumbnail
    const HandleCrossClick = () => {
        // setThumbnail("");
        // let file = document.querySelector("#thumbnail");
        // file.value = "";
        setmusicData((prev) => ({ ...prev, uploadThumbnail: "" }));
    };

    //for cross button for add music
    const HandleCrossClick2 = () => {
        // setmusicImage("");
        // let file = document.querySelector("#addmusic");
        // file.value = "";
        setmusicData((prev) => ({ ...prev, AddMusic: "" }));
    };

    //for fetch all musicdata
    const fetchAllmusicData = () => {
        setLoading(true);
        HomeService.ViewAllMusic()
            .then((res) => {
                if (res && res?.status) {
                    setLoading(false);
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            musicName: item?.musicName,
                            singerName: item?.singerName,
                            musicDuration: item?.musicDuration,
                            contentType: item?.contentType,
                            audioName: item?.audioName,
                            listenFree: item?.listenFree,
                            musicType: item?.musicType,
                            addedBy: item?.addedBy,
                            releaseYear: item?.releaseYear,
                            uploadThumbnail: (
                                <>
                                    {item?.uploadThumbnail ? (
                                        <img
                                            style={{
                                                height: "65%",
                                                width: "65%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.uploadThumbnail}
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
                            AddMusic: (
                                <>
                                    {item?.AddMusic ? (
                                        <img
                                            style={{
                                                height: "65%",
                                                width: "65%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.AddMusic}
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
                    setAllmusicData(arr);
                }
                // console.log("RESPONSE", res);
            })
            .catch((err) => {
                setLoading(false);
                // console.log("err", err);
            });
    };

    //fetch all category data
    const fetchAllCategoryData = async () => {
        const res = await HomeService.ViewAllMusicCategory();
        // console.log("fvfvc", res);
        if (res && res.status) {
            // setCatLoader(false)
            setCatData(res?.data);
        } else {
            toast.error(res?.message || "error");
        }
    };

    //fetch all genre data
    const fetchAllGenreData = async () => {
        const res = await HomeService.ViewAllMusicGenre();
        // console.log("fvfvc", res);
        if (res && res.status) {
            setGenreData(res?.data);
        } else {
            toast.error(res?.message || "error");
        }
    };

    //fetch all mood data
    const fetchAllMoodData = async () => {
        const res = await HomeService.ViewAllMood();
        // console.log("fvfvc", res);
        if (res && res.status) {
            setMoodData(res?.data);
        } else {
            toast.error(res?.message || "error");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setmusicData((prev) => ({ ...prev, [name]: value }));
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
                    musicName
                </div>
            ),
            selector: (row) => row.musicName,
            width: "15rem",
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    musicDuration
                </div>
            ),
            selector: (row) => row.musicDuration,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    ReleaseYear
                </div>
            ),
            selector: (row) => row.releaseYear,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    AudioName
                </div>
            ),
            selector: (row) => row.audioName,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    singerName
                </div>
            ),
            selector: (row) => row.singerName,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    musicType
                </div>
            ),
            selector: (row) => row.musicType,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    ContentType
                </div>
            ),
            selector: (row) => row.contentType,
        },
        // {
        //     name: (
        //         <div
        //             style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        //         >
        //             ListenFree
        //         </div>
        //     ),
        //     selector: (row) => row.listenFree,
        // },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    UploadThumbnail
                </div>
            ),
            selector: (row) => row.uploadThumbnail,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Addmusic
                </div>
            ),
            selector: (row) => row.AddMusic,
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

    return (
        <div component="div" className="TabsAnimation appear-done enter-done">
            <div className="main-card mb-3 card">
                <div className="card-body">
                    {musicData.musicType === "album" ? (
                        <AddAndManageMusicAlbum />
                    ) : (
                        <>
                            <div>
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
                                        Add music
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
                                        Edit music
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="formGroupExampleInput">Select ContentType</label>
                                        <select
                                            class="form-control"
                                            aria-label="Default select example"
                                            name="contentType"
                                            value={musicData.contentType}
                                            onChange={handleChange}
                                        >
                                            <option value={""}>Select contentType</option>
                                            {/* <option value={"podCast"}>PodCast</option> */}
                                            <option value={"music"}>Music</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="formGroupExampleInput">Select musicType</label>
                                        <select
                                            class="form-control"
                                            aria-label="Default select example"
                                            name="musicType"
                                            value={musicData.musicType}
                                            onChange={handleChange}
                                        >
                                            <option value={""}>Select musicType</option>
                                            <option value={"music"}>music</option>
                                            <option value={"album"}>album</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="formGroupExampleInput">Select Category</label>
                                        <select
                                            class="form-control"
                                            aria-label="Default select example"
                                            name="musicCategoryID"
                                            value={musicData.musicCategoryID}
                                            onChange={handleChange}
                                        >
                                            <option value={""} disabled>
                                                Select Category
                                            </option>
                                            {catData.map((item, i) => (
                                                <option key={i} value={item?._id}>
                                                    {item?.catName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label htmlFor="formGroupExampleInput">Select Genre</label>
                                        <select
                                            class="form-control"
                                            aria-label="Default select example"
                                            name="musicGenreID"
                                            value={musicData.musicGenreID}
                                            onChange={handleChange}
                                        >
                                            <option value={""} disabled>
                                                Select Genre
                                            </option>
                                            {genreData.map((item, i) => (
                                                <option key={i} value={item?._id}>
                                                    {item?.genreName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="formGroupExampleInput">Select Mood</label>
                                        <select
                                            class="form-control"
                                            aria-label="Default select example"
                                            name="moodID"
                                            value={musicData.moodID}
                                            onChange={handleChange}
                                        >
                                            <option value={""} disabled>
                                                Select Mood
                                            </option>
                                            {moodData.map((item, i) => (
                                                <option key={i} value={item?._id}>
                                                    {item?.mood}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label htmlFor="formGroupExampleInput">Audio Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Audio Name"
                                            name="audioName"
                                            value={musicData.audioName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="formGroupExampleInput">music Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="music Name"
                                            name="musicName"
                                            value={musicData.musicName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="formGroupExampleInput">Singer Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Artist Name"
                                            name="singerName"
                                            value={musicData.singerName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div class="row" style={{ marginBottom: "1rem" }}>
                                    <div class="col">
                                        <label for="inputEmail4">
                                            Release Year<span style={{ color: "red" }}></span> :
                                        </label>
                                        <input
                                            type="date"
                                            class="form-control"
                                            name="releaseYear"
                                            value={musicData?.releaseYear}
                                            onChange={handleChange}
                                            placeholder="Enter release year"
                                        />
                                    </div>
                                    <div class="col">
                                        <label for="inputEmail4">
                                            music Duration<span style={{ color: "red" }}></span> :
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="musicDuration"
                                            value={musicData?.musicDuration}
                                            onChange={handleChange}
                                            placeholder="Enter music duration"
                                        />
                                    </div>
                                </div>

                                <div className="col">
                                    {/* <div className="d-flex flex-wrap"> */}
                                    <div>
                                        <label htmlFor="formGroupExampleInput">Listen Free</label>
                                    </div>
                                    <div className="d-flex flex-wrap">
                                        <div
                                            classname="form-check form-check-inline"
                                            style={{ marginRight: "1rem" }}
                                        >
                                            <input
                                                classname="form-check-input"
                                                type="radio"
                                                name="listenFree"
                                                id="inlineRadio1"
                                                value="true"
                                                onChange={() =>
                                                    setmusicData((prev) => ({ ...prev, listenFree: "true" }))
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
                                                name="listenFree"
                                                id="inlineRadio1"
                                                value="false"
                                                onChange={() =>
                                                    setmusicData((prev) => ({ ...prev, listenFree: "false" }))
                                                }
                                            />
                                            <label classname="form-check-label" for="inlineRadio1">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <label for="exampleInputEmail1">
                                    Thumbnail<span style={{ color: "red" }}></span> :
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
                                {musicData?.uploadThumbnail && (
                                    <>
                                        <div>
                                            <img
                                                style={{
                                                    height: "10%",
                                                    width: "10%",
                                                    marginTop: "12px",
                                                    borderRadius: "5px",
                                                }}
                                                src={musicData?.uploadThumbnail}
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

                                <label for="exampleInputEmail1">
                                    Addmusic<span style={{ color: "red" }}></span> :
                                </label>
                                <input
                                    class="form-control"
                                    onChange={(e) => HandlemusicImage(e)}
                                    type="file"
                                    id="addmusic"
                                    accept="image/*"
                                />
                                {imageLoader2 ? (
                                    <>
                                        <ImageLoader />{" "}
                                    </>
                                ) : null}
                                {musicData?.AddMusic && (
                                    <>
                                        <div>
                                            <img
                                                style={{
                                                    height: "10%",
                                                    width: "10%",
                                                    marginTop: "12px",
                                                    borderRadius: "5px",
                                                }}
                                                src={musicData?.AddMusic}
                                            />
                                            <button
                                                onClick={() => HandleCrossClick2()}
                                                style={{ color: "red" }}
                                                type="button"
                                                class="btn-close"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                    </>
                                )}

                                {hide ? (
                                    <button
                                        class="btn btn-primary"
                                        style={{ marginTop: "1rem" }}
                                        onClick={Addmusic}
                                    >
                                        Submit
                                    </button>
                                ) : (
                                    <button
                                        class="btn btn-primary"
                                        style={{ marginTop: "1rem" }}
                                        onClick={Updatemusic}
                                    >
                                        Update
                                    </button>
                                )}
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
                                Manage music
                            </div>
                            <DataTable columns={columns} data={AllmusicData} pagination />
                        </>
                    )}
                </div>

            </div>

        </div>
    );
};

export default AddAndManageMusic;
