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

const WalletEvent = () => {
    const [eventName, setEventName] = useState("");
    const [image, setImage] = useState("");
    const [donationCatID, setDonationCatID] = useState("")
    const [allDonationCategory, setAllDonationCategory] = useState([]);
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [raisingAmountStatus, setRaisingAmountStatus] = useState(false);
    const [raisingVolunteerStatus, setRaisingVolunteerStatus] = useState(false);
    const [raisingAmount, setRaisingAmount] = useState(0);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");



    const [buttonText, setButtonText] = useState("");
    const [imageLoader, setImageLoader] = useState(false);
    const [loading, setLoading] = useState(false);

    const [allState, setAllState] = useState([]);

    const [hide, setHide] = useState(true);
    const [id, setId] = useState("");

    const setInitialState = () => {
        setEventName("")
        setDonationCatID("")
        setDescription("")
        setAddress("")
        setRaisingAmountStatus(false)
        setRaisingVolunteerStatus(false)
        setRaisingAmount(0)
        setStartDate("")
        setEndDate("")
        setImage("")

    }

    const FetchAllDonationCategories = () => {
        HomeService.ViewAllDonationCategories()
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

    useEffect(() => {
        FetchAllDonationCategories()
        FetchAllData()
    }, []);

    const HandleCrossClick = () => {
        setImage("");
        let file = document.querySelector("#categoryBanner");
        file.value = "";
    };

    const onEdit = (item) => {
        window.scroll(0, 0);
        setEventName(item?.eventName);
        setDonationCatID(item?.donationCategory[0]._id);
        setDescription(item?.description);
        setAddress(item?.address);
        setImage(item?.image);
        setRaisingAmountStatus(item?.raisingAmountStatus)
        setRaisingVolunteerStatus(item?.raisingVolunteerStatus)
        if (item?.raisingAmountStatus) {
            setRaisingAmount(item?.raisingAmount)
        } else if (item?.raisingVolunteerStatus) {
            setRaisingAmount(item?.raisingAmount)
        }
        setStartDate(moment(item?.startDate).format("YYYY-MM-DD"))
        setEndDate(moment(item?.endDate).format("YYYY-MM-DD"))

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
                HomeService.DeleteDonationEvent(id)
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

    const HandleImage = async (e) => {
        setImageLoader(true);
        let file = e.target.files[0];
        let data = new FormData({});
        data.append("image", file);

        let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

        if (res && res.status) {
            console.log("UploadImageRes", res);
            setImage(res?.url);
        } else {
            toast.error(res?.message);
        }
        setImageLoader(false);
    };

    const AddData = () => {
        let data = {
            eventName: eventName,
            donationCatID: donationCatID,
            description: description,
            raisingAmount: raisingAmount,
            address: address,
            raisingAmountStatus: raisingAmountStatus,
            raisingVolunteerStatus: raisingVolunteerStatus,
            image: image,
            startDate: startDate,
            endDate: endDate,
            // description: desc,
        };
        console.log(data);
        if (image && eventName) {
            HomeService.AddDonationEvent(data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        FetchAllData()
                        setInitialState()


                        let file = document.querySelector("#categoryBanner");
                        file.value = "";
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("Project name is required");
        }
    };

    const FetchAllData = () => {
        setLoading(true);
        HomeService.ViewAllDonationEvents()
            .then((res) => {
                console.log("ResAllBlog", res.data);
                if (res && res?.status) {
                    setLoading(false);
                    // setLoader(false)
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            eventName: item?.eventName,
                            donationCategory: item?.donationCategory[0].catName,
                            description: item?.description,
                            raisingAmount: item?.raisingAmount,
                            volunteer: item?.volunteer,
                            image: (
                                <>
                                    {item?.image ? (
                                        <img
                                            style={{

                                                width: "100%",

                                                margin: "5px",
                                            }}
                                            src={item?.image}
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

                            address: item?.address,
                            raisingAmountStatus: item?.raisingAmountStatus,
                            raisingVolunteerStatus: item?.raisingVolunteerStatus,
                            raisedVolunteer: item?.raisedVolunteer,

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
                    setAllState(arr);
                }
                console.log("RESPONSE", res);
            })
            .catch((err) => {
                setLoading(false);
                console.log("err", err);
            });
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
                    Project Name
                </div>
            ),
            selector: (row) => row.eventName,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Category
                </div>
            ),
            selector: (row) => row.donationCategory,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Thumbnail
                </div>
            ),
            selector: (row) => row.image,
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
                    Location
                </div>
            ),
            selector: (row) => row.address,
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >

                    Purpose
                </div>
            ),

            selector: (row) => {
                if (row.raisingAmountStatus) {
                    return "Fund"
                }
                if (row.raisingVolunteerStatus) {
                    return "Volunteer"
                }
            },
        },

        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >

                    Value
                </div>
            ),
            selector: (row) => {
                if (row.raisingAmountStatus) {
                    return `$${row.raisingAmount}`
                }
                if (row.raisingVolunteerStatus) {
                    return row.raisingAmount
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

    const setAmountProject = () => {

        setRaisingAmountStatus(true)
        setRaisingVolunteerStatus(false)

    }

    const setVolunteerProject = () => {

        setRaisingVolunteerStatus(true)
        setRaisingAmountStatus(false)

    }


    const UpdateData = () => {
        console.log("ID", id);
        let data = {
            eventName: eventName,
            donationCatID: donationCatID,
            description: description,
            raisingAmount: raisingAmount,
            address: address,
            raisingAmountStatus: raisingAmountStatus,
            raisingVolunteerStatus: raisingVolunteerStatus,
            image: image,
            startDate: startDate,
            endDate: endDate,
        };
        if (image && eventName) {
            HomeService.UpdateDonationEvent(id, data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success("Updated Successfully");
                        setHide(true);

                        setInitialState()
                        FetchAllData();
                        let file = document.querySelector("#categoryBanner");
                        file.value = "";
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
                                    Update Event
                                </div>
                            )}

                            <div class="form-group">
                                <div class="row" style={{ marginBottom: "1rem" }}>
                                    <div class="_col">
                                        <label for="inputEmail4">
                                            Name Of The Project<span style={{ color: "red" }}>*</span> :
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={eventName}
                                            onChange={(e) => setEventName(e.target.value)}
                                            placeholder=""
                                        />
                                    </div>

                                    {/* <div class="_col">
                    <label for="inputEmail4">
                      Button Name<span style={{ color: "red" }}>*</span> :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter button name..."
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                    />
                  </div> */}
                                </div>

                                <label for="exampleInputEmail1">
                                    Thumbnail Image<span style={{ color: "red" }}>*</span> :
                                </label>

                                <input
                                    class="form-control"
                                    onChange={(e) => HandleImage(e)}
                                    type="file"
                                    id="image"
                                    accept="image/*"
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
                                                    height: "10%",
                                                    width: "10%",
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

                            <div class="form-group">
                                <label for="exampleInputEmail1">
                                    Category <span style={{ color: "red" }}>*</span> :
                                </label>
                                <select className="form-control" onChange={(e) => setDonationCatID(e.target.value)}>
                                    <option value="">Select</option>
                                    {allDonationCategory?.map((ele, id) => {
                                        console.log(ele);
                                        return (
                                            <option
                                                selected={ele._id == donationCatID ? true : false}
                                                value={ele._id}
                                                key={ele._id}
                                            >
                                                {ele.catName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>


                            <div class="form-group">
                                <label for="exampleInputEmail1">
                                    Description <span style={{ color: "red" }}>*</span> :
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder=""
                                />
                            </div>

                            <div class="form-group">
                                <label for="exampleInputEmail1">
                                    Project Location <span style={{ color: "red" }}>*</span> :
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder=""
                                />
                            </div>

                            <div class="form-group">
                                <label for="exampleInputEmail1">
                                    Create Project for :
                                </label>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={setVolunteerProject} checked={raisingVolunteerStatus} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Volunteer
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={setAmountProject} checked={raisingAmountStatus} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Money
                                    </label>
                                </div>



                            </div>


                            <div class="form-group" style={{ display: raisingVolunteerStatus ? "block" : "none" }}>
                                <label for="exampleInputEmail1">
                                    How many people required? <span style={{ color: "red" }}>*</span> :
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={raisingAmount}
                                    onChange={(e) => setRaisingAmount(e.target.value)}
                                    placeholder=""
                                />
                            </div>

                            <div class="form-group" style={{ display: raisingAmountStatus ? "block" : "none" }}>
                                <label for="exampleInputEmail1">
                                    Howmuch money want to raise? <span style={{ color: "red" }}>*</span> :
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={raisingAmount}
                                    onChange={(e) => setRaisingAmount(e.target.value)}
                                    placeholder=""
                                />
                            </div>


                            <div class="row" style={{ marginBottom: "1rem" }}>
                                <div class="col">
                                    <label for="inputEmail4">
                                        Start Date :
                                    </label>
                                    <input

                                        type="date"
                                        class="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        placeholder="Enter name..."
                                    />
                                </div>

                                <div class="col">
                                    <label for="inputEmail4">
                                        End Date :
                                    </label>
                                    <input
                                        type="date"
                                        class="form-control"
                                        placeholder="Enter position..."
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>










                            {hide ? (
                                <button class="btn btn-primary" onClick={AddData}>
                                    Add
                                </button>
                            ) : (
                                <button class="btn btn-primary" onClick={UpdateData}>
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
                                Events
                            </div>
                            <DataTable columns={columns} data={allState} pagination />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WalletEvent;
