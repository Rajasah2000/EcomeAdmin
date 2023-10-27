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
  eventName: "",
  timezone: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  eventDetails: "",
  hostedBy: "",
  floorNo: null,
  tablePerFloor: null,
  eventType: "",
  eventRoom: "",
  seatPrice: "",
  venue: "",
  priority: null,
  color: "",
  images: "",
  tableLogo: []
};

const AddAndManageEvents = () => {
  const [eventData, setEventData] = useState(INITIAL);
  const [timeZoneData, setTimeZoneData] = useState([]);
  const [AllEventData, setAllEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [imageLoad, setImageLoad] = useState(false)
  const [check, setChecked] = useState(false);
  const [check1, setChecked1] = useState(false)
  const [disable, setDisable] = useState(true)
  const [hide, setHide] = useState(true);
  const [logoData, setLogoData] = useState([]);
  const [id, setId] = useState("");


  useEffect(() => {
    fetchAllEventData();
    fetchTimeZoneData();
  }, []);

  //for fetching Time Zone data
  const fetchTimeZoneData = async () => {
    let res = await HomeService.ViewAllTimeZoneData();
    if (res && res?.status) {
      setTimeZoneData(res?.data);
    } else {
      toast.error(res?.message)
    }
  }

  //for onChange operation
  const HandleChange = (e) => {
    if (e.target.name == "eventRoom") {
      e.target.value ? setChecked1(true) : setChecked1(false)
    }
    if (e.target.name == "timezone") {
      e.target.value ? setChecked(true) : setChecked(false)

      setEventData({
        ...eventData, [e.target.name]: e.target.value
      })
    }
    else if (e.target.name == "eventType" && e.target.value == "Free") {
      setEventData({
        ...eventData, seatPrice: "0", eventType: e.target.value
      })
      setDisable(true)
    }
    else if (e.target.name == "eventType" && e.target.value == "Paid") {
      setEventData({
        ...eventData, seatPrice: "", eventType: e.target.value
      });
      setDisable(false)
    }
    else if (e.target.name == "eventType" && e.target.value == "") {
      setEventData({
        ...eventData, seatPrice: "", eventType: e.target.value
      });
      setDisable(true)
    } else {
      // alert("Hui")
      setEventData({
        ...eventData, [e.target.name]: e.target.value
      })
    }
  }

  //for cross button over tablelogo
  const HandleCrossClick2 = (index) => {
    const updatedTableLogo = [...eventData.tableLogo];
    updatedTableLogo.splice(index, 1);
    setEventData({
      ...eventData,
      tableLogo: updatedTableLogo,
    });
    let file = document.querySelector("#LearningCategory");
    file.value = "";
  };

  //for cross button over single image
  const HandleCrossClick = () => {
    setEventData({
      ...eventData, images: ""
    })
    let file = document.querySelector("#LearningCategorys");
    file.value = "";
  };


  //for single image upload
  const HandleImage = async (e) => {
    setImageLoader(true);
    let file = e.target.files[0];
    let data = new FormData();
    data.append("image", file);
    let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);
    if (res && res.status) {
      // console.log("UploadImage", res);
      setEventData({
        ...eventData, images: res?.url
      })
      // setImage(res?.url);
      setImageLoader(false);
    } else {
      toast.error(res?.message);
      setImageLoader(false);
    }
  };

  //for multiple image upload in tablelogo
  const HandleImages = async (e) => {
    setImageLoad(true);
    let arr = [];
    let file = e.target.files;

    if (file.length <= eventData.tablePerFloor) {
      for (let element of file) {
        let data = new FormData();
        data.append("image", element);
        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);
        if (res && res?.status) {
          arr.push({
            logo: res?.url
          });
        } else {
          toast.error(res?.message);
        }
      }
      setImageLoad(false);
      file && setLogoData(arr);

      setEventData({
        ...eventData, tableLogo: arr
      });
    } else {
      toast.error(`You can only upload up to ${eventData.tablePerFloor} images.`);
      let file = document.querySelector("#LearningCategory");
      file.value = "";
    }
  };


  //for edit functionality
  const onEdit = (item) => {
    console.log("STARTDATE", getDateInMMDDYYYY(item?.startDate));
    window.scroll(0, 0);
    setEventData({
      ...eventData, eventName: item?.eventName,
      timezone: item?.timezone,
      startDate: moment(item?.startDate).format('YYYY-MM-DD'),  // getDateInMMDDYYYY(item?.startDate), // moment(item?.startDate).format('MM-DD-YYYY HH:mm:ss'),
      endDate: moment(item?.endDate).format('YYYY-MM-DD'),
      startTime: item?.startTime,
      endTime: item?.endTime,
      eventDetails: item?.eventDetails,
      hostedBy: item?.hostedBy,
      eventType: item?.eventType,
      eventRoom: item?.eventRoom,
      floorNo: item?.floorNo,
      tablePerFloor: item?.tablePerFloor,
      seatPrice: item?.seatPrice,
      venue: item?.venue,
      priority: item?.priority,
      color: item?.color,
      images: item?.images,
      tableLogo: item?.tableLogo
    })
    setChecked(true)
    setChecked1(true)
    setId(item?._id);
    setHide(false);
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
        HomeService.DeleteEvent(id)
          .then((res) => {
            if (res && res.status) {
              toast.success("Deleted Successfully");

              fetchAllEventData();
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

  //for fetch all eventdata
  const fetchAllEventData = () => {
    setLoading(true);
    HomeService.ViewAllEvent()
      .then((res) => {
        if (res && res?.status) {
          setLoading(false);
          let arr = res?.data?.map((item, index) => {
            return {
              sl: index + 1,
              eventName: item?.eventName,
              timezone: item?.timezone,
              startDate: item?.startDate,
              endDate: item?.endDate,
              startTime: item?.startTime,
              endTime: item?.endTime,
              eventDetails: item?.eventDetails,
              hostedBy: item?.hostedBy,
              eventType: item?.eventType,
              eventRoom: item?.eventRoom,
              floorNo: item?.floorNo,
              tablePerFloor: item?.tablePerFloor,
              seatPrice: item?.seatPrice,
              venue: item?.venue,
              priority: item?.priority,
              color: item?.color,
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
          setAllEventData(arr);
        }
        console.log("RESPONSE", res);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  //for add all events
  const AddEvent = () => {
    let data = eventData;
    if (eventData?.eventName && eventData?.timezone && eventData?.startDate && eventData?.endDate && eventData?.startTime &&
      eventData?.endTime, eventData?.eventDetails && eventData?.hostedBy && eventData?.floorNo && eventData?.tablePerFloor &&
      eventData?.eventType && eventData?.eventRoom && eventData?.seatPrice && eventData?.venue && eventData?.priority && eventData?.color &&
      eventData?.images) {
      HomeService.AddEvent(data)
        .then((res) => {
          if (res && res.status) {
            toast.success(res.message);
            // console.log(eventData,"eveveveev");
            setEventData(INITIAL)
            fetchAllEventData();

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

    console.log("GHGDJAK", eventData);
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
      width: "15rem"
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          StartDate
        </div>
      ),
      selector: (row) => row.startDate,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          EndDate
        </div>
      ),
      selector: (row) => row.endDate,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          StartTime
        </div>
      ),
      selector: (row) => row.startTime,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          EndTime
        </div>
      ),
      selector: (row) => row.endTime,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          EventDetails
        </div>
      ),
      selector: (row) => row.eventDetails,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          HostedBy
        </div>
      ),
      selector: (row) => row.hostedBy,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          EventType
        </div>
      ),
      selector: (row) => row.eventType,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          EventRoom
        </div>
      ),
      selector: (row) => row.eventRoom,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          FloorNo
        </div>
      ),
      selector: (row) => row.floorNo,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          tablePerFloor
        </div>
      ),
      selector: (row) => row.tablePerFloor,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          SeatPrice
        </div>
      ),
      selector: (row) => row.seatPrice,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Venue
        </div>
      ),
      selector: (row) => row.venue,
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
          Color code
        </div>
      ),
      selector: (row) => row.color,
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

  //for update in event
  const UpdateEvent = () => {
    let data = eventData;
    if (eventData?.eventName && eventData?.timezone && eventData?.startDate && eventData?.endDate && eventData?.startTime &&
      eventData?.endTime, eventData?.eventDetails && eventData?.hostedBy && eventData?.floorNo && eventData?.tablePerFloor &&
      eventData?.eventType && eventData?.eventRoom && eventData?.seatPrice && eventData?.venue && eventData?.priority && eventData?.color &&
      eventData?.images) {
      HomeService.UpdateEvent(id, data)
        .then((res) => {
          if (res && res.status) {
            toast.success(res.message);
            setEventData(INITIAL)
            fetchAllEventData();
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
      {/* {loading ? (
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
      ) : ( */}
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
                Add Event
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
                Edit Event
              </div>
            )}

            <div class="row" style={{ marginBottom: "1rem" }}>
              <div class="col">
                <label for="inputEmail4">
                  EventName<span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="eventName"
                  value={eventData?.eventName}
                  onChange={(e) => HandleChange(e)}
                  placeholder="Enter event name..."
                />
              </div>
              <div class="col">
                <label for="inputEmail4">
                  Time Zone<span style={{ color: "red" }}>*</span> :
                </label>

                <select
                  style={{ marginBottom: "21px" }}
                  class="form-select"
                  aria-label="select category"
                  name="timezone"
                  value={eventData?.timezone}
                  onChange={(e) => HandleChange(e)}
                >
                  <option value={""}>Select a timezone.......</option>
                  {timeZoneData?.map((item) => {
                    return (
                      <option id={item?._id} value={item?._id}>
                        {item?.value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>


            {
              check ? <>

                <div class="row" style={{ marginBottom: "1rem" }}>
                  <div class="col">
                    <label for="inputEmail4">
                      StartDate<span style={{ color: "red" }}>*</span> :
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      name="startDate"
                      value={eventData?.startDate}
                      onChange={(e) => HandleChange(e)}
                      placeholder="Enter start date..."
                    />
                  </div>

                  <div class="col">
                    <label for="inputEmail4">
                      EndDate<span style={{ color: "red" }}>*</span> :
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      name="endDate"
                      placeholder="Enter end date..."
                      value={eventData?.endDate}
                      onChange={(e) => HandleChange(e)}
                    />
                  </div>
                </div>
                <div class="row" style={{ marginBottom: "1rem" }}>
                  <div class="col">
                    <label for="inputEmail4">
                      Start Time<span style={{ color: "red" }}>*</span> :
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      name="startTime"
                      value={eventData?.startTime}
                      onChange={(e) => HandleChange(e)}
                      placeholder="Enter start time..."
                    />
                  </div>

                  <div class="col">
                    <label for="inputEmail4">
                      End Time<span style={{ color: "red" }}>*</span> :
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      class="form-control"
                      placeholder="Enter end time..."
                      value={eventData?.endTime}
                      onChange={(e) => HandleChange(e)}
                    />
                  </div>
                </div></>
                :
                null
            }


            <div class="row" style={{ marginBottom: "1rem" }}>
              <div class="col">
                <label for="inputEmail4">
                  Event Details<span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="eventDetails"
                  value={eventData?.eventDetails}
                  onChange={(e) => HandleChange(e)}
                  placeholder="Enter event details..."
                />
              </div>

              <div class="col">
                <label for="inputEmail4">
                  HostedBy<span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="text"
                  name="hostedBy"
                  class="form-control"
                  placeholder="Enter hostedBy..."
                  value={eventData?.hostedBy}
                  onChange={(e) => HandleChange(e)}
                />
              </div>
            </div>





            <div class="row" style={{ marginBottom: "1rem" }}>
              <div class="col">
                <label for="inputEmail4">
                  Event Type<span style={{ color: "red" }}>*</span> :
                </label>
                <select
                  style={{ marginBottom: "21px" }}
                  class="form-select"
                  aria-label="select category"
                  name="eventType"
                  value={eventData?.eventType}
                  onChange={(e) => HandleChange(e)}
                >
                  <option value="">Select option...</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>

                </select>
              </div>
              <div class="col">
                <label for="inputEmail4">
                  Seat Price<span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="number"
                  name="seatPrice"
                  class="form-control"
                  disabled={disable}
                  value={eventData?.seatPrice}
                  onChange={(e) => HandleChange(e)}
                  placeholder="Enter seatPrice..."
                />
              </div>

            </div>


            <div class="row" style={{ marginBottom: "1rem" }}>
              <div class="col">
                <label for="inputEmail4">
                  Event Room<span style={{ color: "red" }}>*</span> :
                </label>
                <select
                  style={{ marginBottom: "21px" }}
                  class="form-select"
                  aria-label="select category"
                  name="eventRoom"
                  value={eventData?.eventRoom}
                  onChange={(e) => HandleChange(e)}
                >
                  <option value="">Select option...</option>
                  <option value="table networking">table networking</option>


                </select>
              </div>
            </div>

            {
              check1 ? <div class="row" style={{ marginBottom: "1rem" }}>
                <div class="col">
                  <label for="inputEmail4">
                    FloorNo<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="number"
                    name="floorNo"
                    class="form-control"
                    value={eventData?.floorNo}
                    onChange={(e) => HandleChange(e)}
                    placeholder="Enter floor no..."
                  />
                </div>

                <div class="col">
                  <label for="inputEmail4">
                    TablePerFloor<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="number"
                    name="tablePerFloor"
                    class="form-control"
                    placeholder="Enter tablePerFloor..."
                    value={eventData?.tablePerFloor}
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
              </div> : null
            }


            <div>
              <label for="exampleInputEmail1">
                Table Logo<span style={{ color: "red" }}>*</span> :
              </label>

              <input
                class="form-control"
                onChange={(e) => HandleImages(e)}
                name="logo"
                type="file"
                multiple
                id="LearningCategory"
                accept="image/*"
              />
            </div>

            {imageLoad ? (
              <>
                <ImageLoader />{" "}
              </>
            ) : null}

            {eventData?.tableLogo && eventData?.tableLogo?.map((item, index) => {
              // console.log(item, "item")
              return (

                <>
                  <div>
                    <img
                      style={{
                        height: "10%",
                        width: "10%",
                        marginTop: "12px",
                        borderRadius: "5px",
                      }}
                      src={item?.logo}
                    />
                    <button
                      onClick={() => HandleCrossClick2(index)}
                      style={{ color: "red" }}
                      type="button"
                      class="btn-close"
                      aria-label="Close"
                    ></button>
                  </div>
                </>

              )
            }


            )}


            <div class="row" style={{ marginBottom: "1rem" }}>


              <div class="col">
                <label for="inputEmail4">
                  Venue<span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="text"
                  name="venue"
                  class="form-control"
                  placeholder="Enter venue..."
                  value={eventData?.venue}
                  onChange={(e) => HandleChange(e)}
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
                  Color<span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="color"
                  name="color"
                  class="form-control"
                  placeholder="Enter color..."
                  value={eventData?.color}
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
                id="LearningCategorys"
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

            {hide ? (
              <button class="btn btn-primary" style={{ marginTop: "1rem" }} onClick={AddEvent}>
                Submit
              </button>
            ) : (
              <button class="btn btn-primary" style={{ marginTop: "1rem" }} onClick={UpdateEvent}>
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
              Manage Event
            </div>
            <DataTable columns={columns} data={AllEventData} pagination />
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
export default AddAndManageEvents;
