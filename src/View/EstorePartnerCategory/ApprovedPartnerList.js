import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import HomeService from "../../Service/HomeService";
import { toast } from "react-hot-toast";
import PageLoader from "../../Loader/PageLoader";

const ApprovedPartnerList = () => {
  const [allApprovedPartnerList, setAllApprovedPArtnerList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    FetchApprovedPartnerList();
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
  ];

  const FetchApprovedPartnerList = () => {
    setLoading(true);
    HomeService.ViewAllApprovedPartnerList()
      .then((res) => {
        if (res && res?.status) {
          setLoading(false);
          let resArr = res?.data?.map((item, index) => {
            return {
              sl: index + 1,
              ownerName: item?.ownerName,
              cmpanyName: item?.cmpanyName,
            };
          });
          setAllApprovedPArtnerList(resArr);
        } else {
          setLoading(false);
          toast.error(res?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
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
                Approved Partner list
              </div>
              <DataTable
                columns={columns}
                data={allApprovedPartnerList}
                pagination
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApprovedPartnerList;
