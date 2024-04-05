import React, { useEffect, useState } from "react";
import Helpers from "../../Utils/Helpers";
import toast from "react-hot-toast";

const AddTrendingProduct = () => {
  const [hide, setHide] = useState(true);
  const [categoryData, setCategoryData] = useState([])
  const [categoryId , setCategoryId] = useState('');
  const [productName , setProductName] = useState("");
  const [description , setDescription]= useState("");
  const [price, setPrice] = useState(null);
  const [quantity , setQuantity] = useState(null);
  const [offerpercent , setofferpercent] = useState(null);
  const [rating , setRating] = useState(null);
  const [image, setImage] = useState("")

  const [id, setId] = useState("");
 const ImageHandler = async (e) => {
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

const clearAllState = () => {
    // setCategoryId("");
    setProductName("");
    setPrice("");
    setDescription("");
    setQuantity("");
    setImage("");
    setofferpercent("");
    setRating("")
}

const HandleAddProduct = async(e) => {
    e.preventDefault()
    let data = {
    // categoryId:categoryId,
    name:productName,
    slug:productName,
    description:description,
    price:price,
    // category:categoryId,
    quantity:quantity,
    images:image,
    percentOff:offerpercent,
    ratings:rating
    }
    if(productName && description  &&price && quantity &&image &&offerpercent &&rating){
        try {
       const res = await Helpers('http://localhost:3004/api/admin/add-tranding-product', 'POST' , data);
       if(res && res?.status){
        toast.success("Product added successfully");
        let file = document.querySelector('#imagefile');
        file.value = ""
        clearAllState();
       }else{
        toast.error("Failed to add product")
       }
    } catch (error) {
        console.log("err", error);
    }
    }else{
        toast.error("All fields are required ")
    }
}

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
            Add Product
          </div>

          <form enctype="multipart/form-data">
            <div class="form-row" style={{ marginBottom: "9px" }}>
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
              {image && <img src={image} style={{ width:"25%", marginTop:"12px", borderRadius:"12px"}}/> }
            </div>
          </form>

          <button
            class="btn btn-primary"
             onClick={HandleAddProduct}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    //   )}
  );
};

export default AddTrendingProduct
