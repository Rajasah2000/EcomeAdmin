import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import HomeService from "../../Service/HomeService";
import DataTable from "react-data-table-component";
import HttpClientXml from "../../Utils/HttpClientXml";
import ImageLoader from "../../Loader/ImageLoader";
import PageLoader from "../../Loader/PageLoader";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [name, setName] = useState("");

  const [categoryName, setCategoryName] = useState([]);

  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");

  const [CategoryName, SetCategoryName] = useState("");
  const [position, setPosition] = useState(null);
  const [image, setImage] = useState("");
  const [bannerImage1, setBannerImage1] = useState("");
  const [bannerImage2, setBannerImage2] = useState("");

  const [imageLoader, setImageLoader] = useState(false);
  const [imageLoader1, setImageLoader1] = useState(false);
  const [imageLoader2, setImageLoader2] = useState(false);
  const [imageLoader3, setImageLoader3] = useState(false);


  useEffect(() => {
    fetchCategory();
  }, []);

  const onEdit = (item) => {
    window.scroll(0, 0);
    console.log("item", item);
    setId(item?._id);
    SetCategoryName(item?.catName);
    setImage(item?.image);
    setBannerImage1(item?.bannerImage1);
    setBannerImage2(item?.bannerImage2);
    setPosition(item?.position);
    setHide(false);
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
        HomeService.DeleteCategory(id)
          .then((res) => {
            if (res && res.status) {
              toast.success("Deleted Successfully");
              fetchCategory();
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

  const fetchCategory = () => {
    setImageLoader3(true);
    HomeService.ViewAllCategory()
      .then((res) => {
        console.log("ResAllCategory", res.data);
        if (res && res?.status) {
          // setLoader(false)
          let arr = res?.data?.map((item, index) => {
            return {
              sl: index + 1,
              Name: item?.catName,
              position: item?.position,
              Image: (
                <>
                  {item?.image ? (
                    <img
                      style={{
                        height: "59%",
                        width: "59%",
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
              BannerImage1: (
                <>
                  {item?.bannerImage1 ? (
                    <img
                      style={{
                        height: "59%",
                        width: "59%",
                        borderRadius: "9px",
                        margin: "5px",
                      }}
                      src={item?.bannerImage1}
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
              BannerImage2: (
                <>
                  {item?.bannerImage2 ? (
                    <img
                      style={{
                        height: "59%",
                        width: "59%",
                        borderRadius: "9px",
                        margin: "5px",
                      }}
                      src={item?.bannerImage2}
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
          setCategoryName(arr);
          setImageLoader3(false);
        }
        console.log("RESPONSE", res);
      })
      .catch((err) => {
        //   setLoader(false)
        console.log("err", err);
      });

    // setImageLoader3(false);
  };

  const AddCategory = () => {
    let data = {
      catName: CategoryName,
      image: image,
      bannerImage1: bannerImage1,
      bannerImage2: bannerImage2,
      position: position,
    };

    if (CategoryName && image && bannerImage1 && bannerImage2 && position) {
      HomeService.AddCategory(data)
        .then((res) => {
          console.log("Response Add Category", res);
          if (res && res.status) {
            toast.success(res.message);
            fetchCategory();
            SetCategoryName("");
            setImage("");
            setBannerImage1("");
            setBannerImage2("");
            setPosition("");
            let file = document.querySelector("#images");
            file.value = "";
            let file1 = document.querySelector("#bannerImage1");
            file1.value = "";
            let file2 = document.querySelector("#bannerImage2");
            file2.value = "";
          } else {
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("All Fields Are Required");
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
          Category Name
        </div>
      ),
      selector: (row) => row.Name,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Position
        </div>
      ),
      selector: (row) => row.position,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Image
        </div>
      ),
      selector: (row) => row.Image,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          BannerImage1
        </div>
      ),
      selector: (row) => row.BannerImage1,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          BannerImage2
        </div>
      ),
      selector: (row) => row.BannerImage2,
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


  const handleChange = (e) => {
if(e.target.value > 0  ){
setPosition(e.target.value);
}else{
  toast.error('Priority value cannot be negative or empty');
  setPosition("");
}
 
  }

  const UpdateCategory = () => {
    console.log("ID", id);
    let data = {
      catName: CategoryName,
      image: image,
      bannerImage1: bannerImage1,
      bannerImage2: bannerImage2,
      position: position,
    };
    if (CategoryName && image && bannerImage1 && bannerImage2 && position) {
      HomeService.UpdateCategory(id, data)
        .then((res) => {
          console.log("updated res", res);
          if (res && res.status) {
            toast.success("Updated Successfully");
            setHide(true);
            fetchCategory();
            SetCategoryName("");
            setImage("");
            setBannerImage1("");
            setBannerImage2("");
            setPosition("");
            let file = document.querySelector("#images");
            file.value = "";
            let file1 = document.querySelector("#bannerImage1");
            file1.value = "";
            let file2 = document.querySelector("#bannerImage2");
            file2.value = "";
          } else {
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("All Fields Are Mendatory");
    }
  };

  const HandleImage = async (e, ele) => {
    let type = ele;
    {
      type == "image"
        ? setImageLoader(true)
        : type == "bannerImage1"
        ? setImageLoader1(true)
        : setImageLoader2(true);
    }

    let file = e.target.files[0];
    let data = new FormData();
    data.append("image", file);

    let res = await HttpClientXml.fileUplode("upload-Image", "POST", data);

    if (res && res.status) {
      if (type === "image") {
        console.log("111");
        setImage(res?.url);
      } else if (type === "bannerImage1") {
        console.log("222");
        setBannerImage1(res?.url);
      } else {
        console.log("333");
        setBannerImage2(res?.url);
      }

      // setImageLoader(false);
      console.log("UploadImageRes", res);
    } else {
      toast.error(res?.message);
      // setImageLoader(false);
    }
    setImageLoader(false);
    setImageLoader1(false);
    setImageLoader2(false);
  };

  const HandleCrossClick = () => {
    setImage("");
    let file = document.querySelector("#images");
    file.value = "";
  };
  const HandleCrossClick1 = () => {
    setBannerImage1("");
    let file = document.querySelector("#bannerImage1");
    file.value = "";
  };
  const HandleCrossClick2 = () => {
    setBannerImage2("");
    let file = document.querySelector("#bannerImage2");
    file.value = "";
  };

  return (
    <>
      {imageLoader3 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
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
                    textAlign: 'center',
                    fontSize: '20px',
                    color: '#868e96',
                    margin: '35px',
                  }}
                  className="card-title"
                >
                  Add Category
                </div>
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    color: '#868e96',
                    margin: '35px',
                  }}
                  className="card-title"
                >
                  Edit Category
                </div>
              )}

              <form>
                <div class="row" style={{ marginBottom: '1rem' }}>
                  <div class="col">
                    <label for="inputEmail4">
                      Category Name<span style={{ color: 'red' }}>*</span> :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={CategoryName}
                      onChange={e => SetCategoryName(e.target.value)}
                      placeholder="Enter name..."
                    />
                  </div>

                  <div class="col">
                    <label for="inputEmail4">
                      Priority<span style={{ color: 'red' }}>*</span> :
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Enter Priority..."
                      min="0"
                      value={position}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                </div>
                <div class="row" style={{ marginBottom: '1rem' }}>
                  <div class="col">
                    <label for="inputEmail4">
                      Image<span style={{ color: 'red' }}>*</span> :
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <input
                        class="form-control"
                        type="file"
                        onChange={e => HandleImage(e, 'image')}
                        accept="image/*"
                        id="images"
                      />
                      {imageLoader ? (
                        <>
                          <ImageLoader />{' '}
                        </>
                      ) : null}
                      {image && (
                        <>
                          <div>
                            <img
                              style={{
                                height: '20%',
                                width: '20%',
                                marginTop: '12px',
                                borderRadius: '5px',
                              }}
                              src={image}
                            />
                            <button
                              onClick={() => HandleCrossClick()}
                              style={{ color: 'red' }}
                              type="button"
                              class="btn-close"
                              aria-label="Close"
                            ></button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                 

                  <div class="col">
                    <label for="inputEmail4">
                      Banner Image 1<span style={{ color: 'red' }}>*</span> :
                    </label>

                    <input
                      class="form-control"
                      onChange={e => HandleImage(e, 'bannerImage1')}
                      type="file"
                      id="bannerImage1"
                      accept="image/*"
                    />
                    {imageLoader1 ? (
                      <>
                        <ImageLoader />{' '}
                      </>
                    ) : null}
                    {bannerImage1 && (
                      <>
                        <div>
                          <img
                            style={{
                              height: '20%',
                              width: '20%',
                              marginTop: '12px',
                              borderRadius: '5px',
                            }}
                            src={bannerImage1}
                          />
                          <button
                            onClick={() => HandleCrossClick1()}
                            style={{ color: 'red' }}
                            type="button"
                            class="btn-close"
                            aria-label="Close"
                          ></button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">
                    Banner Image 2<span style={{ color: 'red' }}>*</span> :
                  </label>

                  <input
                    class="form-control"
                    onChange={e => HandleImage(e, 'bannerImage2')}
                    type="file"
                    id="bannerImage2"
                    accept="image/*"
                  />
                  {imageLoader2 ? (
                    <>
                      <ImageLoader />{' '}
                    </>
                  ) : null}
                  {bannerImage2 && (
                    <>
                      <div>
                        <img
                          style={{
                            height: '10%',
                            width: '10%',
                            marginTop: '12px',
                            borderRadius: '5px',
                          }}
                          src={bannerImage2}
                        />
                        <button
                          onClick={() => HandleCrossClick2()}
                          style={{ color: 'red' }}
                          type="button"
                          class="btn-close"
                          aria-label="Close"
                        ></button>
                      </div>
                    </>
                  )}
                </div>
              </form>

              {hide ? (
                <button class="btn btn-primary" onClick={AddCategory}>
                  Submit
                </button>
              ) : (
                <button class="btn btn-primary" onClick={UpdateCategory}>
                  Update
                </button>
              )}

              <div
                style={{
                  textAlign: 'center',
                  fontSize: '20px',
                  color: '#868e96',
                  margin: '35px',
                }}
                className="card-title"
              >
                Manage Category
              </div>
              <DataTable columns={columns} data={categoryName} pagination />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCategory;
