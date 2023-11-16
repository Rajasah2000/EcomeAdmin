import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import HomeService from "../../Service/HomeService";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import PageLoader from "../../Loader/PageLoader";
import { useParams } from "react-router-dom";
import EditAndUpdateQA from "./EditAndUpdateQA";
import { useNavigate } from "react-router-dom";


const AddAndManageQuesAns = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const [courseID, setcourseID] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [duration, setduration] = useState(null);
  const [courseid, setcourseid] = useState("")
  const [check, setCheck] = useState(true)

  ///Add questions and answers
  const initialques = {
    question: "",
    a: "",
    b: "",
    c: "",
    d: "",
    correctAns: "",
  };

  const [formValues, setFormValues] = useState([initialques]);

  const handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, initialques]);
  };

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const AddData = () => {
    let data = {
      courseID: courseID,
      duration: duration,
      questionAns: formValues,
    };
    console.log("gfgfgfgfgfgf", data);
    if (courseID && duration && formValues) {
      HomeService.AddQuestionAnswer(data)
        .then((res) => {
          if (res && res.status) {
            toast.success(res.message);
            FetchAllData();
            setFormValues([initialques]);
            setcourseID([]);
            setduration(null);
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
          courseID
        </div>
      ),
      selector: (row) => row?.courseID,
    },

    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Duration
        </div>
      ),
      selector: (row) => row?.duration,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Question
        </div>
      ),
      selector: (row) => row?.question,
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


  const FetchAllData = (id) => {
    setLoading(true);
    let data = {
      courseID: id
    }
    HomeService.ViewAllQuestionAnswers(data)
      .then((res) => {
        if (res && res?.status) {
          setLoading(false);
          let arr = res?.data?.map((item, index) => {
            return {
              sl: index + 1,
              id: item?._id,
              courseID: item?.courseID,
              duration: item?.duration,
              question: item?.question,
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
    // console.log("fvfvc", res);
    if (res && res.status) {
      setCourseData(res?.data);
    } else {
      toast.error(res?.message || "error");
    }
  };


  const onEdit = (item) => {
    window.scroll(0, 0);
    setCheck(false)
    setHide(false);
    navigate('/update-question', { state: { item } })
  };

  const onDeleteAll = (courseid) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        HomeService.DeleteAllQuestions(courseid)
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
  }

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
                {
                  check ? (
                    <>
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#868e96",
                          margin: "35px",
                        }}
                        className="card-title"
                      >
                        Add Questions and Answers
                      </div>


                      <div class="form-group">

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


                        <div className="row" data-aos="fade-up">
                          <div className="col-lg-12">


                            {formValues?.map((element, index) => (

                              <div style={{ border: "solid 1px #ced4da", padding: "1em", margin: "1em 0", borderRadius: "0.25rem" }} className="_form-inline" key={index}>
                                <div className="form-group mb-2 mt-1">
                                  <label for="inputEmail4">
                                    question:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="question"
                                    placeholder={`question ${index + 1}`}
                                    value={element.question || ""}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>

                                <div className="form-group mb-2 mt-1">

                                  <label for="inputEmail4">
                                    a:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="a"
                                    placeholder={`Enter option a ${index + 1}`}
                                    value={element.a || ""}
                                    onChange={(e) => handleChange(index, e)}
                                  />

                                </div>

                                <div className="form-group mb-2 mt-1">
                                  <label for="inputEmail4">
                                    b:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="b"
                                    placeholder={`Enter option b ${index + 1}`}
                                    value={element.b || ""}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>

                                <div className="form-group mb-2 mt-1">
                                  <label for="inputEmail4">
                                    c:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="c"
                                    placeholder={`Enter option c ${index + 1}`}
                                    value={element.c || ""}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>

                                <div className="form-group mb-2 mt-1">
                                  <label for="inputEmail4">
                                    d:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="d"
                                    placeholder={`Enter option d ${index + 1}`}
                                    value={element.d || ""}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>

                                <div className="form-group mb-2 mt-1">
                                  <label for="inputEmail4">
                                    correctAns:
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="correctAns"
                                    placeholder={`Choose correctAns option ${index + 1}`}
                                    value={element.correctAns || ""}
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
                                <i class="fas fa-plus"></i>
                              </button>

                            </div>

                          </div>
                        </div>


                        <div style={{ marginTop: "1rem" }}>

                          <button class="btn btn-primary" onClick={AddData}>
                            Add
                          </button>

                        </div>

                      </div>
                    </>
                  ) : (
                    <EditAndUpdateQA />
                  )
                }


                <div
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#868e96",
                    margin: "35px",
                  }}
                  className="card-title"
                >
                  Manage Questions&Answers
                </div>

                <label for="inputEmail4">
                  Course Name<span style={{ color: "red" }}>*</span> :
                </label>

                <select
                  style={{ marginBottom: "21px" }}
                  class="form-select"
                  aria-label="select course"
                  value={courseid}
                  onChange={(e) => {
                    setcourseid(e?.target?.value);
                    e.target.value && FetchAllData(e?.target?.value);
                  }}
                >
                  <option value={""}>Select a Course name.......</option>
                  {courseData?.map((item) => {
                    return (
                      <option id={item?._id} value={item?._id}>
                        {item?.courseName}
                      </option>
                    );
                  })}
                </select>

                <div>
                  <button className="btn btn-danger"
                    onClick={() => onDeleteAll(courseid)}
                    style={{
                      color: "white",
                      height: "40px",
                      cursor: "pointer",
                      width: "100px",
                    }}
                    // xmlns="http://www.w3.org/2000/svg"
                    // width="16"
                    // height="16"
                    // fill="currentColor"
                    // class="bi bi-trash3"
                    // viewBox="0 0 16 16"
                  >
                    Delete All
                    {/* <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" /> */}
                  </button>
                </div>

                {courseID && (
                  <DataTable
                    columns={columns}
                    data={allData}
                    pagination
                  />
                )}

              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AddAndManageQuesAns


