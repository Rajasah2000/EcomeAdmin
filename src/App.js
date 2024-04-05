import React, { useEffect } from "react";
import "./App.css";
import PrivateRoutes from "./View/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../src/View/Dashboard/Index";
import "../src/assets/base.css";
import Main from "./Layout/Main";
import Login from "./AdminAuthentication/Login";
import Register from "./AdminAuthentication/Register";
// import AddAndManageCountry from "./View/Category/AddAndManageCountry";
import { Toaster } from "react-hot-toast";
// import AddCategory from "./View/Category/AddCategory";
// import AddAndManageAboutBushido from "./View/AboutBushido/AddAndManageAboutBushido";
import ResetPassword from "./AdminAuthentication/ResetPassword";
import SendEmail from "./SendEmail";
import AddandManageCategory from "./Component/Category/AddAndManageCategory";
import AddProduct from "./Component/Product/AddProduct";
import ManageProduct from "./Component/Product/ManageProduct";
import EditProduct from "./Component/Product/EditProduct";
import DealsOnAudioProduct from "./Component/DealsOnAudioProduct/DealsOnAudioProduct";
import ManageDealsonAudio from "./Component/DealsOnAudioProduct/ManageDealsonAudio";
import UpdateDealsOnAudio from "./Component/DealsOnAudioProduct/UpdateDealsOnAudio";
import AddBestSellingProduct from "./Component/BestSellingProduct/AddBestSellingProduct";
import ManageBestSellingProduct from "./Component/BestSellingProduct/ManageBestSellingProduct";
import UpdateBestSellingProduct from "./Component/BestSellingProduct/UpdateBestSellingProduct";
import AddTrendingProduct from "./Component/TrendingProduct/AddTrendingProduct";
import ManageTrendingProduct from "./Component/TrendingProduct/ManageTrendingProduct";
import UpdateTrendingProduct from "./Component/TrendingProduct/UpdateTrendingProduct";
// import AddandManageCategory from "./Component/Category/AddandManageCategory";

function App() {
  return (
    <React.Fragment>
      <Toaster />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Main />}>

            {/* Product  */}

            <Route path="/" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/manage-product" element={<ManageProduct />} />
            <Route path="/edit-product" element={<EditProduct />} />

            {/* Trending Product */}

         
            <Route path="/add-trending-product" element={<AddTrendingProduct />} />
            <Route path="/manage-trending-product" element={<ManageTrendingProduct />} />
            <Route path="/edit-trending-product" element={<UpdateTrendingProduct />} />

            {/* Best Selling Product */}

          
            <Route path="/add-best-product" element={<AddBestSellingProduct />} />
            <Route path="/manage-best-product" element={<ManageBestSellingProduct />} />
            <Route path="/edit-best-product" element={<UpdateBestSellingProduct />} />

            {/* Deals On Product */}

            <Route path="/add-deals-product" element={<DealsOnAudioProduct />} />
            <Route path="/manage-deals-product" element={<ManageDealsonAudio />} />
            <Route path="/edit-deals-product" element={<UpdateDealsOnAudio />} />

            {/* Category  */}
            <Route path="/add-and-manage-category" element={<AddandManageCategory />} />
            {/* <Route path="/add-and-manage-about-bushido" element={<AddAndManageAboutBushido />} /> */}
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sendemail" element={<SendEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
