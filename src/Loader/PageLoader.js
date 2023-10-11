import React from "react";
import { Circles } from "react-loader-spinner";
const PageLoader = () => {
  return (
    <div>
      <Circles
        height="100"
        width="100"
        // color="#4fa94d"
        color="red"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default PageLoader;
