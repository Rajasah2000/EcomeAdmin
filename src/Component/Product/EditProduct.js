import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Helpers from "../../Utils/Helpers";
import toast from "react-hot-toast";

const EditProduct = () => {
  // const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [offerpercent, setofferpercent] = useState(null);
  const [rating, setRating] = useState(null);
  const [image, setImage] = useState("");

  // const [id, setId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.pathname === "/edit-product") {
      console.log(location?.state);
      setCategoryId(location?.state?.categorydata[0]?._id);
      setProductName(location?.state?.name);
      setDescription(location?.state?.description);
      setPrice(location?.state?.price);
      setQuantity(location?.state?.quantity);
      setofferpercent(location?.state?.percentOff);
      setImage(location?.state?.images);
      setRating(location?.state?.ratings);
    }
  }, [location]);

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const fetchAllCategory = async () => {
    try {
      const res = await Helpers(
        "http://localhost:3004/api/admin/get-all-category",
        "GET"
      );
      if (res && res?.status) {
        setCategoryData(res?.data);
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const ImageHandler = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(
        "http://localhost:3004/api/admin/image-upload",
        {
          method: "POST",
          body: data,
        }
      );
      const responseData = await response.json();

      if (responseData && responseData.status) {
        setImage(responseData.url);
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  const clearAllState = () => {
    setCategoryId("");
    setProductName("");
    setPrice("");
    setDescription("");
    setQuantity("");
    setImage("");
    setofferpercent("");
    setRating("");
  };

  const HandleUpdateProduct = async (e) => {
    e.preventDefault();
    let data = {
      categoryId: categoryId,
      name: productName,
      slug: productName,
      description: description,
      price: price,
      category: categoryId,
      quantity: quantity,
      images: image,
      percentOff: offerpercent,
      ratings: rating,
    };
    if (
      categoryId &&
      productName &&
      description &&
      price &&
      quantity &&
      image &&
      offerpercent &&
      rating
    ) {
      try {
        const res = await Helpers(
          `http://localhost:3004/api/admin/update-product/${location?.state?._id}`,
          "PUT",
          data
        );
        if (res && res?.status) {
          toast.success("Product updated successfully");
          let file = document.querySelector("#imagefile");
          file.value = "";
          clearAllState();
          navigate("/manage-product");
        } else {
          toast.error(res?.msg);
        }
      } catch (error) {
        console.log("err", error);
      }
    } else {
      toast.error("All fields are required ");
    }
  };
  return (
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
            Update Product
          </div>

          <form enctype="multipart/form-data">
            <div class="form-row" style={{ marginBottom: "9px" }}>
              <div class="col">
                <label for="exampleInputEmail1">
                  Category<span style={{ color: "red" }}>*</span> :
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  id="inputState"
                  class="form-control"
                >
                  <option selected>Choose category ...</option>
                  {categoryData?.map((ele, index) => {
                    return <option value={ele?._id}>{ele?.name}</option>;
                  })}
                </select>
              </div>
              <div class="col">
                <label for="exampleInputEmail1">
                  Product Name <span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>

            <div class="form-group">
              <label for="exampleInputEmail1">
                Description <span style={{ color: "red" }}>*</span> :
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div class="form-row" style={{ marginBottom: "9px" }}>
              <div class="col">
                <label for="exampleInputEmail1">
                  Price <span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div class="col">
                <label for="exampleInputEmail1">
                  Quantity <span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <div class="form-row" style={{ marginBottom: "9px" }}>
              <div class="col">
                <label for="exampleInputEmail1">
                  Offer percent <span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter offer percent"
                  value={offerpercent}
                  onChange={(e) => setofferpercent(e.target.value)}
                />
              </div>
              <div class="col">
                <label for="exampleInputEmail1">
                  Rating <span style={{ color: "red" }}>*</span> :
                </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
            </div>

            <div class="form-group">
              <label for="exampleInputEmail1">
                Image <span style={{ color: "red" }}>*</span> :
              </label>
              <input
                type="file"
                class="form-control"
                name="image"
                id="imagefile"
                onChange={ImageHandler}
              />
              {image && (
                <img
                  src={image}
                  style={{
                    width: "25%",
                    marginTop: "12px",
                    borderRadius: "12px",
                  }}
                />
              )}
            </div>
          </form>

          <button class="btn btn-primary" onClick={HandleUpdateProduct}>
            Update
          </button>
        </div>
      </div>
    </div>
    //   )}
  );
};

export default EditProduct;
