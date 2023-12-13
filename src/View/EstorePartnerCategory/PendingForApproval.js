import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import HomeService from "../../Service/HomeService";
import { toast } from "react-hot-toast";
import PageLoader from "../../Loader/PageLoader";
import Swal from "sweetalert2";

const PendingForApproval = () => {
  const [allPendingPartnerList, setAllPendingPArtnerList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    FetchPendingPartnerList();
  }, []);

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
          Owner Name
        </div>
      ),
      selector: (row) => row.ownerName,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Company Name
        </div>
      ),
      selector: (row) => row.cmpanyName,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
        >
          Action
        </div>
      ),
      selector: (row) => row.action,
    },
  ];

  const HandleClick = (id) => {


     Swal.fire({
       title: 'Are you sure?',

       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes',
     }).then(result => {
       if (result.isConfirmed) {
         HomeService.PartnerApprovedByAdmin(id)
           .then(res => {
             if (res && res?.status) {
               toast.success(res?.message);
               FetchPendingPartnerList();
             } else {
               toast.error(res?.message);
             }
           })
           .catch(err => {
             console.log(err);
           });
       }
     });

   
  };

  const FetchPendingPartnerList = () => {
    setLoading(true);
    HomeService.ViewAllPendingPartnerList()
      .then((res) => {
        if (res && res?.status) {
          setLoading(false);
          let resArr = res?.data?.map((item, index) => {
            return {
              sl: index + 1,
              ownerName: item?.ownerName,
              cmpanyName: item?.cmpanyName,
              action: (
                <button type="button" class="btn btn-success" onClick={() => HandleClick(item?._id)}>
                  APPROVE
                </button>
              ),
            };
          });
          setAllPendingPArtnerList(resArr);
        } else {
          toast.error(res?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  color: "#868e96",
                  margin: "35px",
                }}
                className="card-title"
              >
                Pending For Approval List
              </div>
              <DataTable
                columns={columns}
                data={allPendingPartnerList}
                pagination
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingForApproval;
