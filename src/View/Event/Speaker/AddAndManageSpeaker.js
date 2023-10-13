import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import HomeService from "../../../Service/HomeService";
import PageLoader from "../../../Loader/PageLoader";
import ImageLoader from "../../../Loader/ImageLoader";
import HttpClientXml from "../../../Utils/HttpClientXml";
import moment from "moment";
import { Player } from "video-react";
import { getDateInMMDDYYYY } from "../../../Utils/DateFunction";

const INITIAL = {
    eventID: "",
    sessionID: "",
    speakerType: "",
    companyName:"",
    speakerName: "",
    designation: "",
    description: "",
    video:"",
    priority: null,
    images: "",
};

const AddAndManageSpeaker = () => {
  const [eventData, setEventData] = useState(INITIAL);
  const [AllEventData , setAllEventData] = useState([]);
  const [AllSpeakerData , setAllSpeakerData] = useState([]);
    const [AllSessionData ,setAllSessionData] = useState([])
  const [loading, setLoading] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [videoLoader, setVideoLoder] = useState(false);
  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");


  console.log("VIDEO", eventData?.video);

  useEffect(() => {
    fetchAllSpeakerData();
    fetchAllEventData();
    // fetchAllSessionData();
  }, []);

  const fetchAllEventData = async() => {
    let res = await HomeService.ViewAllEvent();
    if(res && res?.status){
        setAllEventData(res?.data);
    }else{
        toast.error(res?.message)
    }
  }

  const fetchAllSessionData = async(id) => {
    let data ={
        eventID: id
    }

    console.log("DATA", id);
    let res = await HomeService.ViewEventWiseSession(data);
    if(res && res?.status){
        setAllSessionData(res?.data);
    }else{
        toast.error(res?.message)
    }
  }

  const HandleChange = (e) => {
    setEventData({
        ...eventData , [e.target.name]:e.target.value
    })
  }

  const HandleChanges = (e) => {
    setEventData({
        ...eventData , [e.target.name]:e.target.value
    })

    e.target.value !== "" ?  fetchAllSessionData(e.target.value) : setAllSessionData([]);
  }


  const HandleCrossClick = () => {
    setEventData({
        ...eventData,images:""
    })
    let file = document.querySelector("#LearningCategory");
    file.value = "";
  };



  const HandleImage = async (e) => {
    setImageLoader(true);
    let file = e.target.files[0];
    let data = new FormData();
    data.append("image", file);
    let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);
    if (res && res.status) {
      // console.log("UploadImage", res);
      setEventData({
        ...eventData , images:res?.url
      })
    //   setImage(res?.url);
      setImageLoader(false);
    } else {
      toast.error(res?.message);
      setImageLoader(false);
    }
  };

  const HandleVideo = async (e) => {
    setVideoLoder(true);
    let file = e.target.files[0];
    let data = new FormData();
    data.append("video", file);
    let res = await HttpClientXml.fileUplode("video-upload", "POST", data);
    if (res && res.status) {
      // console.log("UploadImage", res);
      setEventData({
        ...eventData , video:res?.originalUrl
      })
    //   setImage(res?.url);
    setVideoLoder(false);
    } else {
      toast.error(res?.message);
      setVideoLoder(false);
    }
  };

  const onEdit = (item) => {
    window.scroll(0, 0);
    setEventData({
        ...eventData ,eventID:item?.eventID,
        sessionID:item?.sessionID,
        speakerType: item?.speakerType,  // getDateInMMDDYYYY(item?.startDate), // moment(item?.startDate).format('MM-DD-YYYY HH:mm:ss'),
        speakerName:item?.speakerName,
        companyName:item?.companyName,
        designation:item?.designation,
        description:item?.description,
        video:item?.video,
        priority:item?.priority,
        images:item?.images
    })
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
        HomeService.DeleteSpeaker(id)
          .then((res) => {
            if (res && res.status) {
              toast.success("Deleted Successfully");

              fetchAllSpeakerData();
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

  const fetchAllSpeakerData = () => {
    setLoading(true);
    HomeService.ViewAllSpeaker()
      .then((res) => {
        if (res && res?.status) {
          setLoading(false);
          let arr = res?.data?.map((item, index) => {
            return {
              sl: index + 1,
              eventName:item?.EventDetails?.eventName,
              sessionName:item?.sessionDetails?.sessionName,
              speakerType:item?.speakerType,
              speakerName:item?.speakerName,
              companyName:item?.companyName,
              designation:item?.designation,
              description:item?.description,
              priority:item?.priority,
              images: (
                <>
                  {item?.images ? (
                    <img
                      style={{
                        height: "65%",
                        width: "65%",
                        borderRadius: "9px",
                        margin: "5px",
                      }}
                      src={item?.images}
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
          setAllSpeakerData(arr);
        }
        console.log("RESPONSE", res);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

    const AddSession = () => {
      let data = eventData;
      if (eventData?.eventID && eventData?.sessionID && eventData?.speakerType && eventData?.speakerName && eventData?.companyName&&
        eventData?.designation && eventData?.description && eventData?.priority && eventData?.images && eventData?.video ) {
        HomeService.AddSpeaker(data)
          .then((res) => {
            if (res && res.status) {
              toast.success(res.message);
              setEventData(INITIAL)
              fetchAllSpeakerData();

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
          EventName
        </div>
      ),
      selector: (row) => row.eventName,
      width:"15rem"
    },

    {
        name: (
          <div
            style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
          >
            SessionName
          </div>
        ),
        selector: (row) => row.sessionName,
      },
      
      {
        name: (
          <div
            style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
          >
            SpeakerType
          </div>
        ),
        selector: (row) => row.speakerType,
      },
      {
        name: (
          <div
            style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
          >
            SpeakerName
          </div>
        ),
        selector: (row) => row.speakerName,
      },
      {
        name: (
          <div
            style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
          >
            CompanyName
          </div>
        ),
        selector: (row) => row.companyName,
      },
      {
        name: (
          <div
            style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
          >
            Designation
          </div>
        ),
        selector: (row) => row.designation,
      },
      {
        name: (
          <div
            style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
          >
            Description
          </div>
        ),
        selector: (row) => row.description,
      },
      
      {
        name: (
          <div
            style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
          >
            Priority
          </div>
        ),
        selector: (row) => row.priority,
      },
      {
        name: (
          <div
            style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
          >
            Image
          </div>
        ),
        selector: (row) => row.images,
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

    const UpdateSession = () => {
        let data = eventData;
        if (eventData?.eventID && eventData?.sessionID && eventData?.speakerType && eventData?.speakerName && eventData?.companyName&&
            eventData?.designation && eventData?.description && eventData?.priority && eventData?.images && eventData?.video ) {
          HomeService.UpdateSpeaker(id,data)
            .then((res) => {
              if (res && res.status) {
                toast.success(res.message);
                setEventData(INITIAL)
                fetchAllSpeakerData();
                setHide(true)
  
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
                  Add Speaker
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
                  Edit Speaker
                </div>
              )}

              <div class="row" style={{ marginBottom: "1rem" }}>
                <div class="col">
                  <label for="inputEmail4">
                    Event Name<span style={{ color: "red" }}>*</span> :
                  </label>

                  <select
                    style={{ marginBottom: "21px" }}
                    class="form-select"
                    aria-label="select category"
                    name="eventID"
                    value={eventData?.eventID}
                    onChange={(e) => HandleChanges(e)}
                  >
                    <option value={""}>Select a event name.......</option>
                    {AllEventData?.map((item) => {
                      return (
                        <option id={item?._id} value={item?._id}>
                          {item?.eventName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div class="col">
                  <label for="inputEmail4">
                    Session Name<span style={{ color: "red" }}>*</span> :
                  </label>

                  <select
                    style={{ marginBottom: "21px" }}
                    class="form-select"
                    aria-label="select category"
                    name="sessionID"
                    value={eventData?.sessionID}
                    onChange={(e) => HandleChange(e)}
                  >
                    <option value={""}>Select a session name.......</option>
                    {AllSessionData?.map((item) => {
                      return (
                        <option id={item?._id} value={item?._id}>
                          {item?.sessionName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div class="row" style={{ marginBottom: "1rem" }}>
                <div class="col">
                  <label for="inputEmail4">
                  SpeakerType<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="speakerType"
                    value={eventData?.speakerType}
                    onChange={(e) => HandleChange(e)}
                    placeholder="Enter speakerType..."
                  />
                </div>

                <div class="col">
                  <label for="inputEmail4">
                  SpeakerName<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="speakerName"
                    value={eventData?.speakerName}
                    onChange={(e) => HandleChange(e)}
                    placeholder="Enter speakerName..."
                  />
                </div>
              </div>

              <div class="row" style={{ marginBottom: "1rem" }}>
              <div class="col">
                  <label for="inputEmail4">
                  Designation<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="designation"
                    value={eventData?.designation}
                    onChange={(e) => HandleChange(e)}
                    placeholder="Enter designation..."
                  />
                </div>

                <div class="col">
                  <label for="inputEmail4">
                  Description<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="description"
                    value={eventData?.description}
                    onChange={(e) => HandleChange(e)}
                    placeholder="Enter description..."
                  />
                </div>
              </div>

              <div class="row" style={{ marginBottom: "1rem" }}>
                <div class="col">
                  <label for="inputEmail4">
                    Priority<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    name="priority"
                    placeholder="Enter priority..."
                    value={eventData?.priority}
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
                <div class="col">
                  <label for="inputEmail4">
                  CompanyName<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="companyName"
                    placeholder="Enter companyName..."
                    value={eventData?.companyName}
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
              </div>

              <div>
                <label for="exampleInputEmail1">
                  Image<span style={{ color: "red" }}>*</span> :
                </label>

                <input
                  class="form-control"
                  onChange={(e) => HandleImage(e)}
                  name="images"
                  type="file"
                  id="LearningCategory"
                  accept="image/*"
                />
              </div>

              {imageLoader ? (
                <>
                  <ImageLoader />{" "}
                </>
              ) : null}

              {eventData?.images && (
                <>
                  <div>
                    <img
                      style={{
                        height: "10%",
                        width: "10%",
                        marginTop: "12px",
                        borderRadius: "5px",
                      }}
                      src={eventData?.images}
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

            <div>
                <label for="exampleInputEmail1">
                video<span style={{ color: "red" }}>*</span> :
                </label>

                <input
                  class="form-control"
                  onChange={(e) => HandleVideo(e)}
                  name="video"
                  type="file"
                  id="LearningCategory"
                  accept="video/*"
                />
              </div>


              {videoLoader ? (
                <>
                  <ImageLoader />{" "}
                </>
              ) : null}

              {eventData?.video && (
                <>
                  <div style={{ marginTop : "12px"}}>
                  <video width="400" height="200" controls>
        <source src={eventData?.video} type="video/mp4"/>
    </video>


                    {/* <Player
                        playsInline
                        src={eventData?.video}
                        fluid={true}
                        width={180}
                        height={120}
                      /> */}

                  </div>
                </>
              )}

              {hide ? (
                <button class="btn btn-primary" style={{ marginTop:"1rem"}} onClick={AddSession}>
                  Submit
                </button>
              ) : (
                <button class="btn btn-primary"  style={{ marginTop:"1rem"}} onClick={UpdateSession}>
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
                Manage Speaker
              </div>
              <DataTable columns={columns} data={AllSpeakerData} pagination />
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default AddAndManageSpeaker