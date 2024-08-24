import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import HomeService from "../../Service/HomeService";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import PageLoader from "../../Loader/PageLoader";
import Helpers from "../../Utils/Helpers";
// import "../../App.css"

const AddandManageCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState('');
  const [allState, setAllState] = useState([]);
  const [loading, setLoading] = useState(false);

  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const onEdit = (item) => {
    window.scroll(0,0)
    // console.log("item", item);
    setName(item?.name);
    setId(item?._id);
    setHide(false);
    setImage(item?.image)
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
        Helpers(`http://localhost:3004/api/admin/delete-category/${id}`, 'DELETE')
          .then((res) => {
            if (res && res.status) {
              toast.success("Deleted Successfully");

              fetchAllCategory();
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

  const fetchAllCategory = async() => {
    setLoading(true);
    try {
       const res = await Helpers('http://localhost:3004/api/admin/get-all-category', 'GET');
       if(res && res?.status){
        setLoading(false);
          // setLoader(false)
          console.log("Response",res?.data);
          let arr = res?.data?.map((item, index) => {
            return {
              sl: index + 1,
              Name: item?.name,
              img: (
                <>
                  {item?.image? (
                    <img
                      style={{
                        height: '15%',
                        width: '15%',
                        borderRadius: '9px',
                        margin: '5px',
                      }}
                      src={item?.image}
                    />
                  ) : (
                    <img
                      style={{
                        height: '51%',
                        width: '51%',
                        borderRadius: '9px',
                        margin: '5px',
                      }}
                      src={
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                      }
                    />
                  )}
                </>
              ),
              action: (
                <div style={{ display: 'flex', flexDirection: 'coloum' }}>
                  <svg
                    onClick={() => onEdit(item)}
                    style={{
                      height: '20px',
                      width: '20px',
                      cursor: 'pointer',
                      marginRight: '20px',
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
                      color: 'red',
                      height: '20px',
                      cursor: 'pointer',
                      width: '20px',
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
          })
          setAllState(arr);
       }else{

       }
    } catch (error) {
       setLoading(false);
        console.log("err", error);
    }
  };

  const AddCategory = async() => {
    let data = {
      name: name,
      image:image
    };

    if (name && image) {
      try {
          const res = await Helpers('http://localhost:3004/api/admin/add-category', 'POST',data);
       if(res && res?.status){
        toast.success(res.msg);
            fetchAllCategory();
            setName("");
            setImage("");
             let file = document.querySelector('#productImage');
             file.value = '';
       }else{
         toast.error(res?.msg);
       }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Category & Image Name Field Is Required");
    }
  };

  const columns = [
    {
      name: <div style={{ fontSize: '14px', color: '#495057', fontWeight: 'bolder' }}>SL</div>,
      selector: row => row.sl,
    },
    {
      name: <div style={{ fontSize: '14px', color: '#495057', fontWeight: 'bolder' }}>Category Name</div>,
      selector: row => row.Name,
    },
    {
      name: <div style={{ fontSize: '14px', color: '#495057', fontWeight: 'bolder' }}>Category Icon</div>,
      selector: row => row.img,
    },
    {
      name: (
        <div
          style={{
            fontSize: '14px',
            color: '#495057',
            marginLeft: '15px',
            fontWeight: 'bolder',
          }}
        >
          Action
        </div>
      ),
      selector: row => row.action,
    },
  ];

  const UpdateCategory = async() => {
   let data = {
      name: name,
      image:image
    };

    if (name && image) {
      try {
          const res = await Helpers(`http://localhost:3004/api/admin/edit-category/${id}`, 'PUT',data);
       if(res && res?.status){
        toast.success(res.message);
            fetchAllCategory();
            setName("");
            setHide(true);
            setImage("");
             let file = document.querySelector('#productImage');
             file.value = '';
       }else{
         toast.error(res?.message);
       }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Category & Image Name Field Is Required");
    }
  };

   const ImageHandler = async e => {
     const file = e.target.files[0];
     const data = new FormData();
     data.append('image', file);

     try {
       const response = await fetch('http://localhost:3004/api/admin/image-upload', {
         method: 'POST',
         body: data,
       });
       const responseData = await response.json();

       if (responseData && responseData.status) {
         setImage(responseData.url);
       } else {
         toast.error('Failed to upload image');
       }
     } catch (error) {
       console.error('Error uploading image:', error);
       toast.error('Failed to upload image');
     }
   };
  return (
    <>
      {loading ? (
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
        // <>
        //   <div class="loader"></div>
        //   <div class="loader2"></div>
        //   <div class="loader3"></div>
        // </>
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

              <div class="form-group">
                <label for="exampleInputEmail1">
                  Category Name<span style={{ color: 'red' }}>*</span> :
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter category name..."
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">
                  Image <span style={{ color: 'red' }}>*</span> :
                </label>
                <input type="file" class="form-control" name="image" id="imagefile" onChange={ImageHandler} />
                {image && <img src={image} style={{ width: '5%', marginTop: '12px', borderRadius: '12px' }} />}
              </div>

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
              <DataTable columns={columns} data={allState} pagination />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddandManageCategory
