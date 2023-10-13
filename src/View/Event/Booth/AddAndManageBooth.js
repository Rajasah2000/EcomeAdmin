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
import { getDateInMMDDYYYY } from "../../../Utils/DateFunction";

const INITIAL = {
  eventID: "",
  sponserName: "",
  sponserDetails: "",
  sessionDate: "",
  websiteLink: "",
  priority: "",
  images: "",
};

const AddAndManageBooth = () => {
  const [eventData, setEventData] = useState(INITIAL);
  const [AllEventData, setAllEventData] = useState([]);
  const [AllSponserData, setAllSponserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [imageLoader1, setImageLoader1] = useState(false);
  const [imageLoader2, setImageLoader2] = useState(false);
  const [videoLoader, setVideoLoder] = useState(false);

  console.log("VIDEOFILE", eventData?.video);

  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchAllSponserData();
    fetchAllEventData();
  }, []);

  const HandleVideo = async (e) => {
    setVideoLoder(true);
    let file = e.target.files[0];
    let data = new FormData();
    data.append("video", file);
    let res = await HttpClientXml.fileUplode("video-upload", "POST", data);
    if (res && res.status) {
      // console.log("UploadImage", res);
      setEventData({
        ...eventData,
        introVideo: res?.transcoderUrl,
      });
      //   setImage(res?.url);
      setVideoLoder(false);
    } else {
      toast.error(res?.message);
      setVideoLoder(false);
    }
  };

  const fetchAllEventData = async () => {
    let res = await HomeService.ViewAllEvent();
    if (res && res?.status) {
      setAllEventData(res?.data);
    } else {
      toast.error(res?.message);
    }
  };

  const HandleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleCrossClick = (name) => {
    if (name == "LearningCategory") {
      setEventData({
        ...eventData,
        CEOimage: "",
      });
      let file = document.querySelector("#LearningCategory");
      file.value = "";
    } else if (name == "LearningCategory1") {
      setEventData({
        ...eventData,
        logo: "",
      });
      let file = document.querySelector("#LearningCategory1");
      file.value = "";
    } else if (name == "LearningCategory2") {
      setEventData({
        ...eventData,
        bannerImage: "",
      });
      let file = document.querySelector("#LearningCategory2");
      file.value = "";
    }
  };

  const HandleImage = async (e, name) => {
    if (name == "CEOimage") {
      setImageLoader(true);
    } else if (name == "logo") {
      setImageLoader1(true);
    } else if (name == "bannerImage") {
      setImageLoader2(true);
    }

    let file = e.target.files[0];
    let data = new FormData();
    data.append("image", file);
    let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);
    if (res && res.status) {
      setEventData({
        ...eventData,
        [e.target.name]: res?.url,
      });
      if (name == "CEOimage") {
        setImageLoader(false);
      } else if (name == "logo") {
        setImageLoader1(false);
      } else if (name == "bannerImage") {
        setImageLoader2(false);
      }
    } else {
      toast.error(res?.message);
      if (name == "CEOimage") {
        setImageLoader(false);
      } else if (name == "logo") {
        setImageLoader1(false);
      } else if (name == "bannerImage") {
        setImageLoader2(false);
      }
    }
  };

  const onEdit = (item) => {
    window.scroll(0, 0);
    setEventData({
      ...eventData,
      eventID: item?.eventID,
      sponserName: item?.sponserName,
      sponserDetails: item?.sponserDetails,
      websiteLink: item?.websiteLink,
      priority: item?.priority,
      images: item?.images,
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
        HomeService.DeleteSponser(id)
          .then((res) => {
            if (res && res.status) {
              toast.success("Deleted Successfully");

              fetchAllSponserData();
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

  const fetchAllSponserData = () => {
    setLoading(true);
    HomeService.ViewAllSponser()
      .then((res) => {
        if (res && res?.status) {
          setLoading(false);
          let arr = res?.data?.map((item, index) => {
            return {
              sl: index + 1,
              eventName: item?.EventDetails?.eventName,
              sponserName: item?.sponserName,
              sponserDetails: item?.sponserDetails,
              websiteLink: item?.websiteLink,
              priority: item?.priority,
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
          setAllSponserData(arr);
        }
        console.log("RESPONSE", res);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const AddSponser = () => {
    let data = eventData;
    if (
      eventData?.eventID &&
      eventData?.sponserName &&
      eventData?.sponserDetails &&
      eventData?.websiteLink &&
      eventData?.priority &&
      eventData?.images
    ) {
      HomeService.AddSponser(data)
        .then((res) => {
          if (res && res.status) {
            toast.success(res.message);
            setEventData(INITIAL);
            fetchAllSponserData();
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
      width: "15rem",
    },

    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          SponserName
        </div>
      ),
      selector: (row) => row.sponserName,
    },

    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          SponserDetails
        </div>
      ),
      selector: (row) => row.sponserDetails,
    },

    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          WebsiteLink
        </div>
      ),
      selector: (row) => row.websiteLink,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Images
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

  const UpdateSponser = () => {
    let data = eventData;
    if (
      eventData?.eventID &&
      eventData?.sponserName &&
      eventData?.sponserDetails &&
      eventData?.websiteLink &&
      eventData?.priority &&
      eventData?.images
    ) {
      HomeService.UpdateSponser(id, data)
        .then((res) => {
          if (res && res.status) {
            toast.success(res.message);
            setEventData(INITIAL);
            fetchAllSponserData();
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
                  Add Booth
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
                  Edit Booth
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
                    onChange={(e) => HandleChange(e)}
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
                    CompanyName<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="companyName"
                    value={eventData?.companyName}
                    onChange={(e) => HandleChange(e)}
                    placeholder="Enter companyName..."
                  />
                </div>
              </div>

              <div class="row" style={{ marginBottom: "1rem" }}>
                <div class="col">
                  <label for="inputEmail4">
                    CompanyDetails<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="companyDetails"
                    value={eventData?.companyDetails}
                    onChange={(e) => HandleChange(e)}
                    placeholder="Enter companyDetails..."
                  />
                </div>

                <div class="col">
                  <label for="inputEmail4">
                    CEO Name<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="CEOname"
                    value={eventData?.CEOname}
                    onChange={(e) => HandleChange(e)}
                    placeholder="Enter CEOname..."
                  />
                </div>
              </div>

              <div class="row" style={{ marginBottom: "1rem" }}>
                <div class="col">
                  <label for="inputEmail4">
                    CEO Description<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    name="CEOdescription"
                    placeholder="Enter CEOdescription..."
                    value={eventData?.CEOdescription}
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
              </div>

              <div>
                <label for="exampleInputEmail1">
                  CEOimage<span style={{ color: "red" }}>*</span> :
                </label>

                <input
                  class="form-control"
                  onChange={(e) => HandleImage(e, "CEOimage")}
                  name="CEOimage"
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

              {eventData?.CEOimage && (
                <>
                  <div>
                    <img
                      style={{
                        height: "10%",
                        width: "10%",
                        marginTop: "12px",
                        borderRadius: "5px",
                      }}
                      src={eventData?.CEOimage}
                    />
                    <button
                      onClick={() => HandleCrossClick("LearningCategory")}
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
                  Logo<span style={{ color: "red" }}>*</span> :
                </label>

                <input
                  class="form-control"
                  onChange={(e) => HandleImage(e, "logo")}
                  name="logo"
                  type="file"
                  id="LearningCategory1"
                  accept="image/*"
                />
              </div>

              {imageLoader1 ? (
                <>
                  <ImageLoader />{" "}
                </>
              ) : null}

              {eventData?.logo && (
                <>
                  <div>
                    <img
                      style={{
                        height: "10%",
                        width: "10%",
                        marginTop: "12px",
                        borderRadius: "5px",
                      }}
                      src={eventData?.logo}
                    />
                    <button
                      onClick={() => HandleCrossClick("LearningCategory1")}
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
                  BannerImage<span style={{ color: "red" }}>*</span> :
                </label>

                <input
                  class="form-control"
                  onChange={(e) => HandleImage(e, "bannerImage")}
                  name="bannerImage"
                  type="file"
                  id="LearningCategory2"
                  accept="image/*"
                />
              </div>

              {imageLoader2 ? (
                <>
                  <ImageLoader />{" "}
                </>
              ) : null}

              {eventData?.bannerImage && (
                <>
                  <div>
                    <img
                      style={{
                        height: "10%",
                        width: "10%",
                        marginTop: "12px",
                        borderRadius: "5px",
                      }}
                      src={eventData?.bannerImage}
                    />
                    <button
                      onClick={() => HandleCrossClick("LearningCategory2")}
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
                  IntroVideo<span style={{ color: "red" }}>*</span> :
                </label>

                <input
                  class="form-control"
                  onChange={(e) => HandleVideo(e)}
                  name="introVideo"
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

              {eventData?.introVideo && (
                <>
                  <div style={{ marginTop: "1rem" }}>
                    <video width="400" height="200" controls>
                      <source src={eventData?.video} type="video/mp4" />
                    </video>
                    {/* <button
                      onClick={() => HandleCrossClick()}
                      style={{ color: "red" }}
                      type="button"
                      class="btn-close"
                      aria-label="Close"
                    ></button> */}
                  </div>
                </>
              )}

              {hide ? (
                <button
                  class="btn btn-primary"
                  style={{ marginTop: "1rem" }}
                  onClick={AddSponser}
                >
                  Submit
                </button>
              ) : (
                <button
                  class="btn btn-primary"
                  style={{ marginTop: "1rem" }}
                  onClick={UpdateSponser}
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
                Manage Booth
              </div>
              <DataTable columns={columns} data={AllSponserData} pagination />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAndManageBooth;
