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
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const EditAndUpdateQA = () => {
    const { id } = useParams()
    const params = useParams();
    const location = useLocation();
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [podId, setPodId] = useState('')
    const [hide, setHide] = useState(true);
    const [courseID, setcourseID] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [duration, setduration] = useState(null);
    const [courseid, setcourseid] = useState("")
    const [question, setquestion] = useState("")
    const [a, seta] = useState("")
    const [b, setb] = useState("")
    const [c, setc] = useState("")
    const [d, setd] = useState("")
    const [correctAns, setcorrectAns] = useState("")


    useEffect(() => {
        if (location?.pathname == "/update-question") {
            console.log("LOCSATION", location?.state);
            setPodId(location?.state?.item?._id)
            setcourseID(location?.state?.item?.courseID);
            setduration(location?.state?.item?.duration);
            setquestion(location?.state?.item?.question)
            seta(location?.state?.item?.a)
            setb(location?.state?.item?.b)
            setc(location?.state?.item?.c)
            setd(location?.state?.item?.d)
            setcorrectAns(location?.state?.item?.correctAns)
        }
    }, [])

    const onEdit = (item) => {
        console.log(item, "iitteemm")
        window.scroll(0, 0);
        setHide(false);
        setPodId(item?._id)
        setcourseID(item?.courseID);
        setduration(item?.duration);
        setquestion(item?.question)
        seta(item?.a)
        setb(item?.b)
        setc(item?.c)
        setd(item?.d)
        setcorrectAns(item?.correctAns)
    };

    const UpdateData = () => {
        let data = {
            courseID: courseID,
            duration: duration,
            question: question,
            a: a,
            b: b,
            c: c,
            d: d,
            correctAns: correctAns
        };
        // console.log("gfgfgfgfgfgf", data);
        HomeService.UpdateSingleQuestion(podId, data)
            .then((res) => {
                if (res && res.status) {
                    toast.success(res?.message);
                    FetchAllData();
                    setcourseID("");
                    setquestion("");
                    setcorrectAns("");
                    seta("");
                    setb("");
                    setc("");
                    setd("");
                    toast.success(res?.message)
                    navigate("/manage-ques-ans")
                } else {
                    toast.error(res?.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // } else {
        //   toast.error("Error Occured!");
        // }
    }

    const [allData, setAllData] = useState([]);
    const FetchAllData = (id) => {
        setLoading(true);
        let data = {
            courseID: id
        }
        HomeService.ViewAllQuestionAnswers(data)
            .then((res) => {
                if (res && res?.status) {
                    setLoading(false);
                    console.log(res, "ressssssss")
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            id: item?._id,
                            courseID: item?.courseID,
                            duration: item?.duration,
                            question: item?.question,
                            a: item?.a,
                            b: item?.b,
                            c: item?.c,
                            d: item?.d,
                            correctAns: item?.correctAns,
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


    const fetchAllCourseData = async () => {
        const res = await HomeService.ViewAllCourse();
        if (res && res.status) {
            setCourseData(res?.data);
        } else {
            toast.error(res?.message || "error");
        }
    };

    const onDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                HomeService.DeleteSingleQuestion(id)
                    .then((res) => {
                        if (res && res.status) {
                            toast.success(res?.message);
                            FetchAllData();
                            fetchAllCourseData();
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
        fetchAllCourseData()
    }, [])

    return (
        <div>
            <div class="form-group">
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "20px",
                        color: "#868e96",
                        margin: "35px",
                    }}
                    className="card-title"
                >
                    Update Single Question and Answer
                </div>

                <div class="row" style={{ marginBottom: "1rem" }}>
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Select Course</label>
                        <select
                            class="form-control"
                            aria-label="Default select example"
                            name="courseID"
                            value={courseID}
                            onChange={(e) => setcourseID(e.target.value)}
                        >
                            <option value={""} disabled>
                                Select Course
                            </option>
                            {courseData?.map((item, i) => (
                                <option key={i} value={item?._id}>
                                    {item?.courseName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div class="row" style={{ marginBottom: "1rem" }}>
                    <div class="col">
                        <label for="inputEmail4">
                            duration:
                        </label>
                        <input
                            type="number"
                            class="form-control"
                            value={duration}
                            onChange={(e) => setduration(e.target.value)}
                            placeholder=""
                        />
                    </div>

                </div>

                <div class="row" style={{ marginBottom: "1rem" }}>
                    <div class="col">
                        <label for="inputEmail4">
                            question:
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            value={question}
                            onChange={(e) => setquestion(e.target.value)}
                            placeholder=""
                        />
                    </div>
                </div>

                <div class="row" style={{ marginBottom: "1rem" }}>
                    <div class="col">
                        <label for="inputEmail4">
                            a:
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            value={a}
                            onChange={(e) => seta(e.target.value)}
                            placeholder="Enter option a"
                        />
                    </div>
                </div>

                <div class="row" style={{ marginBottom: "1rem" }}>
                    <div class="col">
                        <label for="inputEmail4">
                            b:
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            value={b}
                            onChange={(e) => setb(e.target.value)}
                            placeholder="Enter option b"
                        />
                    </div>
                </div>

                <div class="row" style={{ marginBottom: "1rem" }}>
                    <div class="col">
                        <label for="inputEmail4">
                            c:
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            value={c}
                            onChange={(e) => setc(e.target.value)}
                            placeholder="Enter option c"
                        />
                    </div>
                </div>

                <div class="row" style={{ marginBottom: "1rem" }}>
                    <div class="col">
                        <label for="inputEmail4">
                            d:
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            value={d}
                            onChange={(e) => setd(e.target.value)}
                            placeholder="Enter option d"
                        />
                    </div>
                </div>

                <div class="row" style={{ marginBottom: "1rem" }}>
                    <div class="col">
                        <label for="inputEmail4">
                            correctAns:
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            value={correctAns}
                            onChange={(e) => setcorrectAns(e.target.value)}
                            placeholder="Choose correctans option"
                        />
                    </div>
                </div>


                <div style={{ marginTop: "1rem" }}>
                    <button class="btn btn-primary" onClick={UpdateData}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditAndUpdateQA
