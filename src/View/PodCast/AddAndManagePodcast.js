// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import HomeService from "../../Service/HomeService";
// import { toast } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ImageLoader from "../../Loader/ImageLoader";
// import HttpClientXml from "../../Utils/HttpClientXml";
// import AddAndManagePodcastSeries from "./AddAndManagePodcastSeries";

// const INITIAL = {
//     podcastCategoryID: "",
//     podcastGenreID: "",
//     moodID: [],
//     contentType: "",
//     podcastType: "",
//     podcastName: "",
//     audioName: "",
//     artistName: "",
//     podcastDuration: "",
//     releaseYear: "",
//     uploadThumbnail: "",
//     AddPodcast: "",
//     listenFree: "",
// };
// const AddAndManagePodcast = () => {
//     const [podcastData, setPodcastData] = useState(INITIAL);
//     const [AllPodcastData, setAllPodcastData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [hide, setHide] = useState(true);
//     const [catData, setCatData] = useState([]);
//     const [genreData, setGenreData] = useState([]);
//     const [moodData, setMoodData] = useState([]);
//     // const [thumbnail, setThumbnail] = useState("");
//     // const [podcastImage, setPodcastImage] = useState("")
//     const [imageLoader, setImageLoader] = useState(false);
//     const [imageLoader2, setImageLoader2] = useState(false);
//     const [selectedPodcastId, setSelectedPodcastId] = useState(null);

//     console.log("podcastData", podcastData);

//     useEffect(() => {
//         fetchAllPodcastData();
//         fetchAllCategoryData();
//         fetchAllGenreData();
//         fetchAllMoodData();
//     }, []);

//     //for add all Podcast
//     const AddPodcast = () => {
//         let data = podcastData;
//         console.log(data, "podcast");
//         if (podcastData?.podcastCategoryID && podcastData?.podcastGenreID) {
//             HomeService.AddPodcast(data)
//                 .then((res) => {
//                     if (res && res.status) {
//                         toast.success(res.message);
//                         setPodcastData(INITIAL);
//                         fetchAllPodcastData();
//                     } else {
//                         toast.error(res?.message);
//                     }
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         } else {
//             toast.error("All fields are required");
//         }

//         console.log("GHGDK", podcastData);
//     };

//     //for delete functionality
//     const onDelete = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             // text: "You won't  to delete this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 HomeService.DeletePodcast(id)
//                     .then((res) => {
//                         if (res && res.status) {
//                             toast.success("Deleted Successfully");

//                             fetchAllPodcastData();
//                         } else {
//                             toast.error(res?.message);
//                         }
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     });
//             }
//         });
//     };

//     // Update the podcast data
//     const UpdatePodcast = () => {
//         if (selectedPodcastId) {
//             HomeService.UpdatePodcast(selectedPodcastId, podcastData)
//                 .then((res) => {
//                     if (res && res.status) {
//                         toast.success(res.message);
//                         setPodcastData(INITIAL);
//                         setSelectedPodcastId(null); // Clear the selected podcast ID
//                         fetchAllPodcastData();
//                     } else {
//                         toast.error(res?.message);
//                     }
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         } else {
//             toast.error("Please select a podcast to update.");
//         }
//     };

//     const onEdit = (podcast) => {
//         window.scroll(0, 0);
//         // setThumbnail(podcast?.uploadThumbnail);
//         setHide(false);
//         setSelectedPodcastId(podcast._id);
//         setPodcastData({ ...podcast });
//     };

//     //handeling upload thumbnail
//     const HandleImage = async (e) => {
//         setImageLoader(true);
//         let file = e.target.files[0];
//         let data = new FormData();
//         data.append("image", file);

//         let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

//         if (res && res.status) {
//             console.log("UploadImage", res);
//             // setThumbnail(res?.url);
//             setPodcastData((prev) => ({ ...prev, uploadThumbnail: res?.url }));
//         } else {
//             toast.error(res?.message);
//         }
//         setImageLoader(false);
//     };

//     //handeling Podcast image
//     const HandlePodcastImage = async (e) => {
//         setImageLoader2(true);
//         let file = e.target.files[0];
//         let data = new FormData();
//         data.append("image", file);

//         let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

//         if (res && res.status) {
//             console.log("UploadImage", res);
//             // setPodcastImage(res?.url);
//             setPodcastData((prev) => ({ ...prev, AddPodcast: res?.url }));
//         } else {
//             toast.error(res?.message);
//         }
//         setImageLoader2(false);
//     };

//     //for cross button for upload thumbnail
//     const HandleCrossClick = () => {
//         // setThumbnail("");
//         // let file = document.querySelector("#thumbnail");
//         // file.value = "";
//         setPodcastData((prev) => ({ ...prev, uploadThumbnail: "" }));
//     };

//     //for cross button for add podcast
//     const HandleCrossClick2 = () => {
//         // setPodcastImage("");
//         // let file = document.querySelector("#addPodcast");
//         // file.value = "";
//         setPodcastData((prev) => ({ ...prev, AddPodcast: "" }));
//     };

//     //for fetch all podcastdata
//     const fetchAllPodcastData = () => {
//         setLoading(true);
//         HomeService.ViewAllPodcast()
//             .then((res) => {
//                 if (res && res?.status) {
//                     setLoading(false);
//                     let arr = res?.data?.map((item, index) => {
//                         return {
//                             sl: index + 1,
//                             podcastName: item?.podcastName,
//                             artistName: item?.artistName,
//                             podcastDuration: item?.podcastDuration,
//                             contentType: item?.contentType,
//                             audioName: item?.audioName,
//                             listenFree: item?.listenFree,
//                             podcastType: item?.podcastType,
//                             addedBy: item?.addedBy,
//                             releaseYear: item?.releaseYear,
//                             uploadThumbnail: (
//                                 <>
//                                     {item?.uploadThumbnail ? (
//                                         <img
//                                             style={{
//                                                 height: "65%",
//                                                 width: "65%",
//                                                 borderRadius: "9px",
//                                                 margin: "5px",
//                                             }}
//                                             src={item?.uploadThumbnail}
//                                         />
//                                     ) : (
//                                         <img
//                                             style={{
//                                                 height: "11%",
//                                                 width: "11%",
//                                                 borderRadius: "9px",
//                                                 margin: "5px",
//                                             }}
//                                             src={
//                                                 "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
//                                             }
//                                         />
//                                     )}
//                                 </>
//                             ),
//                             AddPodcast: (
//                                 <>
//                                     {item?.AddPodcast ? (
//                                         <img
//                                             style={{
//                                                 height: "65%",
//                                                 width: "65%",
//                                                 borderRadius: "9px",
//                                                 margin: "5px",
//                                             }}
//                                             src={item?.AddPodcast}
//                                         />
//                                     ) : (
//                                         <img
//                                             style={{
//                                                 height: "11%",
//                                                 width: "11%",
//                                                 borderRadius: "9px",
//                                                 margin: "5px",
//                                             }}
//                                             src={
//                                                 "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
//                                             }
//                                         />
//                                     )}
//                                 </>
//                             ),
//                             action: (
//                                 <div style={{ display: "flex", flexDirection: "coloum" }}>
//                                     <svg
//                                         onClick={() => onEdit(item)}
//                                         style={{
//                                             height: "20px",
//                                             width: "20px",
//                                             cursor: "pointer",
//                                             marginRight: "20px",
//                                         }}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         fill="currentColor"
//                                         class="bi bi-pencil-square"
//                                         viewBox="0 0 16 16"
//                                     >
//                                         <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                                         <path
//                                             fill-rule="evenodd"
//                                             d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
//                                         />
//                                     </svg>
//                                     <svg
//                                         onClick={() => onDelete(item?._id)}
//                                         style={{
//                                             color: "red",
//                                             height: "20px",
//                                             cursor: "pointer",
//                                             width: "20px",
//                                         }}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="16"
//                                         height="16"
//                                         fill="currentColor"
//                                         class="bi bi-trash3"
//                                         viewBox="0 0 16 16"
//                                     >
//                                         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
//                                     </svg>
//                                 </div>
//                             ),
//                         };
//                     });
//                     setAllPodcastData(arr);
//                 }
//                 // console.log("RESPONSE", res);
//             })
//             .catch((err) => {
//                 setLoading(false);
//                 // console.log("err", err);
//             });
//     };

//     //fetch all category data
//     const fetchAllCategoryData = async () => {
//         const res = await HomeService.ViewAllPodCastCategory();
//         // console.log("fvfvc", res);
//         if (res && res.status) {
//             // setCatLoader(false)
//             setCatData(res?.data);
//         } else {
//             toast.error(res?.message || "error");
//         }
//     };

//     //fetch all genre data
//     const fetchAllGenreData = async () => {
//         const res = await HomeService.ViewAllPodCastGenre();
//         // console.log("fvfvc", res);
//         if (res && res.status) {
//             setGenreData(res?.data);
//         } else {
//             toast.error(res?.message || "error");
//         }
//     };

//     //fetch all mood data
//     const fetchAllMoodData = async () => {
//         const res = await HomeService.ViewAllMood();
//         // console.log("fvfvc", res);
//         if (res && res.status) {
//             setMoodData(res?.data);
//         } else {
//             toast.error(res?.message || "error");
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPodcastData((prev) => ({ ...prev, [name]: value }));
//     };

//     const columns = [
//         {
//             name: (
//                 <div
//                     style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//                 >
//                     SL
//                 </div>
//             ),
//             selector: (row) => row.sl,
//         },
//         {
//             name: (
//                 <div
//                     style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//                 >
//                     PodcastName
//                 </div>
//             ),
//             selector: (row) => row.podcastName,
//             width: "15rem",
//         },
//         {
//             name: (
//                 <div
//                     style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//                 >
//                     PodCastDuration
//                 </div>
//             ),
//             selector: (row) => row.podcastDuration,
//         },
//         {
//             name: (
//                 <div
//                     style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//                 >
//                     ReleaseYear
//                 </div>
//             ),
//             selector: (row) => row.releaseYear,
//         },
//         {
//             name: (
//                 <div
//                     style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//                 >
//                     AudioName
//                 </div>
//             ),
//             selector: (row) => row.audioName,
//         },
//         {
//             name: (
//                 <div
//                     style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//                 >
//                     ArtistName
//                 </div>
//             ),
//             selector: (row) => row.artistName,
//         },
//         {
//             name: (
//                 <div
//                     style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//                 >
//                     PodcastType
//                 </div>
//             ),
//             selector: (row) => row.podcastType,
//         },
//         {
//             name: (
//                 <div
//                     style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//                 >
//                     ContentType
//                 </div>
//             ),
//             selector: (row) => row.contentType,
//         },
//         // {
//         //     name: (
//         //         <div
//         //             style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//         //         >
//         //             ListenFree
//         //         </div>
//         //     ),
//         //     selector: (row) => row.listenFree,
//         // },

//         {
//             name: (
//                 <div
//                     style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//                 >
//                     UploadThumbnail
//                 </div>
//             ),
//             selector: (row) => row.uploadThumbnail,
//         },
//         {
//             name: (
//                 <div
//                     style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
//                 >
//                     AddPodcast
//                 </div>
//             ),
//             selector: (row) => row.AddPodcast,
//         },

//         {
//             name: (
//                 <div
//                     style={{
//                         fontSize: "14px",
//                         color: "#495057",
//                         marginLeft: "15px",
//                         fontWeight: "bolder",
//                     }}
//                 >
//                     Action
//                 </div>
//             ),
//             selector: (row) => row.action,
//         },
//     ];

//     return (
//         <div component="div" className="TabsAnimation appear-done enter-done">
//             <div className="main-card mb-3 card">
//                 <div className="card-body">
//                     {hide ? (
//                         <div
//                             style={{
//                                 textAlign: "center",
//                                 fontSize: "20px",
//                                 color: "#868e96",
//                                 margin: "35px",
//                             }}
//                             className="card-title"
//                         >
//                             Add Podcast
//                         </div>
//                     ) : (
//                         <div
//                             style={{
//                                 textAlign: "center",
//                                 fontSize: "20px",
//                                 color: "#868e96",
//                                 margin: "35px",
//                             }}
//                             className="card-title"
//                         >
//                             Edit PodCast
//                         </div>
//                     )}

//                     <div className="row">
//                         <div className="col">
//                             <label htmlFor="formGroupExampleInput">Select ContentType</label>
//                             <select
//                                 class="form-control"
//                                 aria-label="Default select example"
//                                 name="contentType"
//                                 value={podcastData.contentType}
//                                 onChange={handleChange}
//                             >
//                                 <option value={""}>Select contentType</option>
//                                 <option value={"podcast"}>Podcast</option>
//                                 <option value={"music"}>Music</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col">
//                             <label htmlFor="formGroupExampleInput">Select PodcastType</label>
//                             <select
//                                 class="form-control"
//                                 aria-label="Default select example"
//                                 name="podcastType"
//                                 value={podcastData.podcastType}
//                                 onChange={handleChange}
//                             >
//                                 <option value={""}>Select PodcastType</option>
//                                 <option value={"single"}>single</option>
//                                 <option value={"series"}>series</option>
//                             </select>
//                         </div>
//                     </div>
//                     {
//                         podcastData.podcastType === "series"
//                             ?

//                             <AddAndManagePodcastSeries />
//                             :
//                             <div>
//                                 <div className="row">
//                                     <div className="col">
//                                         <label htmlFor="formGroupExampleInput">Select Category</label>
//                                         <select
//                                             class="form-control"
//                                             aria-label="Default select example"
//                                             name="podcastCategoryID"
//                                             value={podcastData.podcastCategoryID}
//                                             onChange={handleChange}
//                                         >
//                                             <option value={""} disabled>
//                                                 Select Category
//                                             </option>
//                                             {catData.map((item, i) => (
//                                                 <option key={i} value={item?._id}>
//                                                     {item?.catName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>

//                                     <div className="col">
//                                         <label htmlFor="formGroupExampleInput">Select Genre</label>
//                                         <select
//                                             class="form-control"
//                                             aria-label="Default select example"
//                                             name="podcastGenreID"
//                                             value={podcastData.podcastGenreID}
//                                             onChange={handleChange}
//                                         >
//                                             <option value={""} disabled>
//                                                 Select Genre
//                                             </option>
//                                             {genreData.map((item, i) => (
//                                                 <option key={i} value={item?._id}>
//                                                     {item?.genreName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>

//                                 <div className="row">
//                                     <div className="col">
//                                         <label htmlFor="formGroupExampleInput">Select Mood</label>
//                                         <select
//                                             class="form-control"
//                                             aria-label="Default select example"
//                                             name="moodID"
//                                             value={podcastData.moodID}
//                                             onChange={handleChange}
//                                         >
//                                             <option value={""} disabled>
//                                                 Select Mood
//                                             </option>
//                                             {moodData.map((item, i) => (
//                                                 <option key={i} value={item?._id}>
//                                                     {item?.mood}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>

//                                     <div className="col">
//                                         <label htmlFor="formGroupExampleInput">Audio Name</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="Audio Name"
//                                             name="audioName"
//                                             value={podcastData.audioName}
//                                             onChange={handleChange}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="row">
//                                     <div className="col">
//                                         <label htmlFor="formGroupExampleInput">Podcast Name</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="Podcast Name"
//                                             name="podcastName"
//                                             value={podcastData.podcastName}
//                                             onChange={handleChange}
//                                         />
//                                     </div>

//                                     <div className="col">
//                                         <label htmlFor="formGroupExampleInput">Artist Name</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="Artist Name"
//                                             name="artistName"
//                                             value={podcastData.artistName}
//                                             onChange={handleChange}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div class="row" style={{ marginBottom: "1rem" }}>
//                                     <div class="col">
//                                         <label for="inputEmail4">
//                                             Release Year<span style={{ color: "red" }}></span> :
//                                         </label>
//                                         <input
//                                             type="date"
//                                             class="form-control"
//                                             name="releaseYear"
//                                             value={podcastData?.releaseYear}
//                                             onChange={handleChange}
//                                             placeholder="Enter release year"
//                                         />
//                                     </div>
//                                     <div class="col">
//                                         <label for="inputEmail4">
//                                             Podcast Duration<span style={{ color: "red" }}></span> :
//                                         </label>
//                                         <input
//                                             type="text"
//                                             class="form-control"
//                                             name="podcastDuration"
//                                             value={podcastData?.podcastDuration}
//                                             onChange={handleChange}
//                                             placeholder="Enter podcast duration"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="col">
//                                     {/* <div className="d-flex flex-wrap"> */}
//                                     <div>
//                                         <label htmlFor="formGroupExampleInput">Listen Free</label>
//                                     </div>
//                                     <div className="d-flex flex-wrap">
//                                         <div
//                                             classname="form-check form-check-inline"
//                                             style={{ marginRight: "1rem" }}
//                                         >
//                                             <input
//                                                 classname="form-check-input"
//                                                 type="radio"
//                                                 name="listenFree"
//                                                 id="inlineRadio1"
//                                                 value="true"
//                                                 onChange={() =>
//                                                     setPodcastData((prev) => ({ ...prev, listenFree: "true" }))
//                                                 }
//                                             />
//                                             <label classname="form-check-label" for="inlineRadio1">
//                                                 Yes
//                                             </label>
//                                         </div>

//                                         <div
//                                             classname="form-check form-check-inline"
//                                             style={{ marginRight: "1rem" }}
//                                         >
//                                             <input
//                                                 classname="form-check-input"
//                                                 type="radio"
//                                                 name="listenFree"
//                                                 id="inlineRadio1"
//                                                 value="false"
//                                                 onChange={() =>
//                                                     setPodcastData((prev) => ({ ...prev, listenFree: "false" }))
//                                                 }
//                                             />
//                                             <label classname="form-check-label" for="inlineRadio1">
//                                                 No
//                                             </label>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <label for="exampleInputEmail1">
//                                     Thumbnail<span style={{ color: "red" }}></span> :
//                                 </label>

//                                 <input
//                                     class="form-control"
//                                     onChange={(e) => HandleImage(e)}
//                                     type="file"
//                                     id="thumbnail"
//                                     accept="image/*"
//                                 />
//                                 {imageLoader ? (
//                                     <>
//                                         <ImageLoader />{" "}
//                                     </>
//                                 ) : null}
//                                 {podcastData?.uploadThumbnail && (
//                                     <>
//                                         <div>
//                                             <img
//                                                 style={{
//                                                     height: "10%",
//                                                     width: "10%",
//                                                     marginTop: "12px",
//                                                     borderRadius: "5px",
//                                                 }}
//                                                 src={podcastData?.uploadThumbnail}
//                                             />
//                                             <button
//                                                 onClick={() => HandleCrossClick()}
//                                                 style={{ color: "red" }}
//                                                 type="button"
//                                                 class="btn-close"
//                                                 aria-label="Close"
//                                             ></button>
//                                         </div>
//                                     </>
//                                 )}

//                                 <label for="exampleInputEmail1">
//                                     AddPodcast<span style={{ color: "red" }}></span> :
//                                 </label>
//                                 <input
//                                     class="form-control"
//                                     onChange={(e) => HandlePodcastImage(e)}
//                                     type="file"
//                                     id="addPodcast"
//                                     accept="image/*"
//                                 />
//                                 {imageLoader2 ? (
//                                     <>
//                                         <ImageLoader />{" "}
//                                     </>
//                                 ) : null}
//                                 {podcastData?.AddPodcast && (
//                                     <>
//                                         <div>
//                                             <img
//                                                 style={{
//                                                     height: "10%",
//                                                     width: "10%",
//                                                     marginTop: "12px",
//                                                     borderRadius: "5px",
//                                                 }}
//                                                 src={podcastData?.AddPodcast}
//                                             />
//                                             <button
//                                                 onClick={() => HandleCrossClick2()}
//                                                 style={{ color: "red" }}
//                                                 type="button"
//                                                 class="btn-close"
//                                                 aria-label="Close"
//                                             ></button>
//                                         </div>
//                                     </>
//                                 )}
//                             </div>

//                     }

//                     {hide ? (
//                         <button
//                             class="btn btn-primary"
//                             style={{ marginTop: "1rem" }}
//                             onClick={AddPodcast}
//                         >
//                             Submit
//                         </button>
//                     ) : (
//                         <button
//                             class="btn btn-primary"
//                             style={{ marginTop: "1rem" }}
//                             onClick={UpdatePodcast}
//                         >
//                             Update
//                         </button>
//                     )}

//                     <div
//                         style={{
//                             textAlign: "center",
//                             fontSize: "20px",
//                             color: "#868e96",
//                             margin: "35px",
//                         }}
//                         className="card-title"
//                     >
//                         Manage Podcast
//                     </div>
//                     <DataTable columns={columns} data={AllPodcastData} pagination />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddAndManagePodcast;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import HomeService from "../../Service/HomeService";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import ImageLoader from "../../Loader/ImageLoader";
import HttpClientXml from "../../Utils/HttpClientXml";
import AddAndManagePodcastSeries from "./AddAndManagePodcastSeries";
import AddAndManageMusic from "./AddAndManageMusic"

const INITIAL = {
    podcastCategoryID: "",
    podcastGenreID: "",
    moodID: [],
    contentType: "",
    podcastType: "",
    podcastName: "",
    audioName: "",
    artistName: "",
    podcastDuration: "",
    releaseYear: "",
    uploadThumbnail: "",
    AddPodcast: "",
    listenFree: "",
};
const AddAndManagePodcast = () => {
    const [podcastData, setPodcastData] = useState(INITIAL);
    const [AllPodcastData, setAllPodcastData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [musicComp, setMusicComp] = useState(false)
    const [hide, setHide] = useState(true);
    const [catData, setCatData] = useState([]);
    const [genreData, setGenreData] = useState([]);
    const [moodData, setMoodData] = useState([]);
    // const [thumbnail, setThumbnail] = useState("");
    // const [podcastImage, setPodcastImage] = useState("")
    const [imageLoader, setImageLoader] = useState(false);
    const [imageLoader2, setImageLoader2] = useState(false);
    const [selectedPodcastId, setSelectedPodcastId] = useState(null);

    console.log("podcastData", podcastData);

    useEffect(() => {
        fetchAllPodcastData();
        fetchAllCategoryData();
        fetchAllGenreData();
        fetchAllMoodData();
    }, []);

    //for add all Podcast
    const AddPodcast = () => {
        let data = podcastData;
        console.log(data, "podcast");
        if (podcastData?.podcastCategoryID && podcastData?.podcastGenreID) {
            HomeService.AddPodcast(data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        setPodcastData(INITIAL);
                        fetchAllPodcastData();
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

        console.log("GHGDK", podcastData);
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
                HomeService.DeletePodcast(id)
                    .then((res) => {
                        if (res && res.status) {
                            toast.success("Deleted Successfully");

                            fetchAllPodcastData();
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

    // Update the podcast data
    const UpdatePodcast = () => {
        if (selectedPodcastId) {
            HomeService.UpdatePodcast(selectedPodcastId, podcastData)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        setPodcastData(INITIAL);
                        setSelectedPodcastId(null); // Clear the selected podcast ID
                        fetchAllPodcastData();
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("Please select a podcast to update.");
        }
    };

    const onEdit = (podcast) => {
        window.scroll(0, 0);
        // setThumbnail(podcast?.uploadThumbnail);
        setHide(false);
        setSelectedPodcastId(podcast._id);
        setPodcastData({ ...podcast });
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
            setPodcastData((prev) => ({ ...prev, uploadThumbnail: res?.url }));
        } else {
            toast.error(res?.message);
        }
        setImageLoader(false);
    };

    //handeling Podcast image
    const HandlePodcastImage = async (e) => {
        setImageLoader2(true);
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);

        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

        if (res && res.status) {
            console.log("UploadImage", res);
            // setPodcastImage(res?.url);
            setPodcastData((prev) => ({ ...prev, AddPodcast: res?.url }));
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
        setPodcastData((prev) => ({ ...prev, uploadThumbnail: "" }));
    };

    //for cross button for add podcast
    const HandleCrossClick2 = () => {
        // setPodcastImage("");
        // let file = document.querySelector("#addPodcast");
        // file.value = "";
        setPodcastData((prev) => ({ ...prev, AddPodcast: "" }));
    };

    //for fetch all podcastdata
    const fetchAllPodcastData = () => {
        setLoading(true);
        HomeService.ViewAllPodcast()
            .then((res) => {
                if (res && res?.status) {
                    setLoading(false);
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            podcastName: item?.podcastName,
                            artistName: item?.artistName,
                            podcastDuration: item?.podcastDuration,
                            contentType: item?.contentType,
                            audioName: item?.audioName,
                            listenFree: item?.listenFree,
                            podcastType: item?.podcastType,
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
                            AddPodcast: (
                                <>
                                    {item?.AddPodcast ? (
                                        <img
                                            style={{
                                                height: "65%",
                                                width: "65%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.AddPodcast}
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
                    setAllPodcastData(arr);
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
        const res = await HomeService.ViewAllPodCastCategory();
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
        const res = await HomeService.ViewAllPodCastGenre();
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

    const handleChange = (e, val) => {
        if (e.target.value == val) {
            setMusicComp(true)
        }
        const { name, value } = e.target;

        // if(e.target.value=="single")

        setPodcastData((prev) => ({ ...prev, [name]: value }));
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
                    PodcastName
                </div>
            ),
            selector: (row) => row.podcastName,
            width: "15rem",
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    PodCastDuration
                </div>
            ),
            selector: (row) => row.podcastDuration,
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
                    ArtistName
                </div>
            ),
            selector: (row) => row.artistName,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    PodcastType
                </div>
            ),
            selector: (row) => row.podcastType,
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
                    AddPodcast
                </div>
            ),
            selector: (row) => row.AddPodcast,
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
        <>
            {!musicComp ?
                <div component="div" className="TabsAnimation appear-done enter-done">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            {podcastData.podcastType === "series" ? (
                                <AddAndManagePodcastSeries />
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
                                                Add Podcast
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
                                                Edit PodCast
                                            </div>
                                        )}

                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="formGroupExampleInput">
                                                    Select ContentType
                                                </label>
                                                <select
                                                    class="form-control"
                                                    aria-label="Default select example"
                                                    name="contentType"
                                                    value={podcastData.contentType}
                                                    onChange={(e) => handleChange(e, "music")}
                                                >
                                                    <option value={""}>Select contentType</option>
                                                    <option value={"podcast"}>Podcast</option>
                                                    <option value={"music"}>Music</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="formGroupExampleInput">
                                                    Select PodcastType
                                                </label>
                                                <select
                                                    class="form-control"
                                                    aria-label="Default select example"
                                                    name="podcastType"
                                                    value={podcastData.podcastType}
                                                    onChange={handleChange}
                                                >
                                                    <option value={""}>Select PodcastType</option>
                                                    <option value={"single"}>single</option>
                                                    <option value={"series"}>series</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="formGroupExampleInput">Select Category</label>
                                                <select
                                                    class="form-control"
                                                    aria-label="Default select example"
                                                    name="podcastCategoryID"
                                                    value={podcastData.podcastCategoryID}
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
                                                    name="podcastGenreID"
                                                    value={podcastData.podcastGenreID}
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
                                                    value={podcastData.moodID}
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
                                                    value={podcastData.audioName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="formGroupExampleInput">Podcast Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Podcast Name"
                                                    name="podcastName"
                                                    value={podcastData.podcastName}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col">
                                                <label htmlFor="formGroupExampleInput">Artist Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Artist Name"
                                                    name="artistName"
                                                    value={podcastData.artistName}
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
                                                    value={podcastData?.releaseYear}
                                                    onChange={handleChange}
                                                    placeholder="Enter release year"
                                                />
                                            </div>
                                            <div class="col">
                                                <label for="inputEmail4">
                                                    Podcast Duration<span style={{ color: "red" }}></span> :
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name="podcastDuration"
                                                    value={podcastData?.podcastDuration}
                                                    onChange={handleChange}
                                                    placeholder="Enter podcast duration"
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
                                                            setPodcastData((prev) => ({
                                                                ...prev,
                                                                listenFree: "true",
                                                            }))
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
                                                            setPodcastData((prev) => ({
                                                                ...prev,
                                                                listenFree: "false",
                                                            }))
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
                                        {podcastData?.uploadThumbnail && (
                                            <>
                                                <div>
                                                    <img
                                                        style={{
                                                            height: "10%",
                                                            width: "10%",
                                                            marginTop: "12px",
                                                            borderRadius: "5px",
                                                        }}
                                                        src={podcastData?.uploadThumbnail}
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
                                            AddPodcast<span style={{ color: "red" }}></span> :
                                        </label>
                                        <input
                                            class="form-control"
                                            onChange={(e) => HandlePodcastImage(e)}
                                            type="file"
                                            id="addPodcast"
                                            accept="image/*"
                                        />
                                        {imageLoader2 ? (
                                            <>
                                                <ImageLoader />{" "}
                                            </>
                                        ) : null}
                                        {podcastData?.AddPodcast && (
                                            <>
                                                <div>
                                                    <img
                                                        style={{
                                                            height: "10%",
                                                            width: "10%",
                                                            marginTop: "12px",
                                                            borderRadius: "5px",
                                                        }}
                                                        src={podcastData?.AddPodcast}
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
                                                onClick={AddPodcast}
                                            >
                                                Submit
                                            </button>
                                        ) : (
                                            <button
                                                class="btn btn-primary"
                                                style={{ marginTop: "1rem" }}
                                                onClick={UpdatePodcast}
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
                                        Manage Podcast
                                    </div>
                                    <DataTable columns={columns} data={AllPodcastData} pagination />
                                </>
                            )}


                        </div>
                    </div>
                </div>

                : <AddAndManageMusic musicval={musicComp} setmusicval={setMusicComp} />
            }

        </>
    );
};

export default AddAndManagePodcast;
