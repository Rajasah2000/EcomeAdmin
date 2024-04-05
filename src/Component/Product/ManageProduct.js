import React, { useEffect, useState } from "react";
import Helpers from "../../Utils/Helpers";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {
  
  const [data, setData] = useState([])
  const navigate = useNavigate();

  const [id, setId] = useState("");

    useEffect(() => {
    fetchAllProduct();
  }, []);

    const onEdit = (item) => {
    navigate('/edit-product',{state:item})
    // console.log("item", item);
    // setName(item?.name);
    // setId(item?._id);
    // setHide(false);
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
        Helpers(`http://localhost:3004/api/admin/delete-product/${id}`, 'DELETE')
          .then((res) => {
            if (res && res.status) {
              toast.success("Deleted Successfully");

              fetchAllProduct();
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

   const fetchAllProduct = async() => {
    try {
       const res = await Helpers('http://localhost:3004/api/admin/get-all-product', 'GET');
       if(res && res?.status){
        let arr = res?.data?.map((ele, index) => {
          return{
            sl:index+1,
            Name:ele?.categorydata[0]?.name,
            ProductName:ele?.name,
            image:<>
              <img style={{ width:"100px", objectFit:"cover" , height:"100px" , margin:"6px" , borderRadius:"2px"}} src={ele?.images}/>
            </>,
            Price:ele?.price,
            quantity:ele?.quantity,
            percentoff:ele?.percentOff,
            action: (
                <div style={{ display: "flex", flexDirection: "coloum" }}>
                  <svg
                    onClick={() => onEdit(ele)}
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
                    onClick={() => onDelete(ele?._id)}
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
          }
        })
        setData(arr)
       }
    } catch (error) {
        console.log("err", error);
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
       width:"12rem"
    },
     {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Product Name
        </div>
      ),
      selector: (row) => row.ProductName,
       width:"12rem"
    },
     {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Product Image
        </div>
      ),
      selector: (row) => row.image,
      width:"12rem"
    },
     {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Price
        </div>
      ),
      selector: (row) => row.Price,
    },
     {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Quantity
        </div>
      ),
      selector: (row) => row.quantity,
    }, {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          PercentOff
        </div>
      ),
      selector: (row) => row.percentoff,
       width:"8rem"
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
    //    {loading ? (
    //         <div
    //           style={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             height: "80vh",
    //           }}
    //         >
    //           <PageLoader />
    //         </div>
    //       ) : (
    <div component="div" className="TabsAnimation appear-done enter-done">
      <div className="main-card mb-3 card">
        <div className="card-body">
       
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              color: "#868e96",
              margin: "35px",
            }}
            className="card-title"
          >
            Manage Product
          </div>
          <DataTable columns={columns} data={data} pagination />
        </div>
      </div>
    </div>
    //   )}
  );
};

export default ManageProduct
