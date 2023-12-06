import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import HomeService from "../../Service/HomeService";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ImageLoader from "../../Loader/ImageLoader";
import HttpClientXml from "../../Utils/HttpClientXml";
import PageLoader from "../../Loader/PageLoader"

const AddAndManageMood = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imageLoader, setImageLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [allMood, setAllMood] = useState([]);

  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchAllMood();
  }, []);

  const HandleCrossClick = () => {
    setImage("");
    let file = document.querySelector("#categoryBanner");
    file.value = "";
  };

  const onEdit = (item) => {
    window.scroll(0, 0);
    console.log("item", item);
    setImage(item?.image);
    setName(item?.mood);
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
        HomeService.DeleteMood(id)
          .then((res) => {
            if (res && res.status) {
              toast.success("Deleted Successfully");

              fetchAllMood();
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
    let data = new FormData();
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

  const fetchAllMood = () => {
    setLoading(true);
    HomeService.ViewAllMood()
      .then((res) => {
        console.log("ResAllBlog", res.data);
        if (res && res?.status) {
          setLoading(false);
          // setLoader(false)
          let arr = res?.data?.map((item, index) => {
            return {
              sl: index + 1,
              mood: item?.mood,
              CategoryBanner: (
                <>
                  {item?.image ? (
                    <img
                      style={{
                        height: "29%",
                        width: "29%",
                        borderRadius: "9px",
                        margin: "5px",
                      }}
                      src={item?.image}
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
          setAllMood(arr);
        }
        console.log("RESPONSE", res);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const AddMood = () => {
    let data = {
      mood: name,
      image: image,
    };

    if (name && image) {
      HomeService.AddMood(data)
        .then((res) => {
          if (res && res.status) {
            toast.success(res.message);
            fetchAllMood();
            setImage("");
            setName("");
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
          Mood Name
        </div>
      ),
      selector: (row) => row.mood,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Image
        </div>
      ),
      selector: (row) => row.CategoryBanner,
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

  const UpdateMood = () => {
    console.log("ID", id);
    let data = {
      mood: name,
      image: image,
    };
    if (name && image) {
      HomeService.UpdateMood(id, data)
        .then((res) => {
          if (res && res.status) {
            toast.success("Updated Successfully");
            setHide(true);

            setImage("");
            setName("");
            fetchAllMood();
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
      toast.error("All field are required");
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
                  Add Mood
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
                  Edit Mood
                </div>
              )}

              <div class="form-group">
                <div class="form-group">
                  <label for="exampleInputEmail1">
                    Mood Name<span style={{ color: "red" }}>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    value={name}
                    onChange={(e) => setName(e?.target?.value)}
                    aria-describedby="emailHelp"
                    placeholder="Enter mood name"
                  />
                </div>
                <label for="exampleInputEmail1">
                  Image<span style={{ color: "red" }}>*</span> :
                </label>

                <input
                  class="form-control"
                  onChange={(e) => HandleImage(e)}
                  type="file"
                  id="categoryBanner"
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

              {hide ? (
                <button class="btn btn-primary" onClick={AddMood}>
                  Submit
                </button>
              ) : (
                <button class="btn btn-primary" onClick={UpdateMood}>
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
                Manage Mood
              </div>
              <DataTable columns={columns} data={allMood} pagination />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAndManageMood;
