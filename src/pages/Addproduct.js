import { useState } from "react";
import { storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function Addproduct() {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [name, setname] = useState("");
  const [category, setCategory] = useState("");
  const [discription, setDiscription] = useState([]);
  const [price, setPrice] = useState([]);

  function generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = generatePassword();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = async () => {
    try {
      if (images.length > 4) {
        alert("Maximum four images could be set");
        setImages([]);
      } else {
        images.map(async (image) => {
          const storageRef = ref(storage, `images/${image.id}`);
          let Uploaded = await uploadBytes(storageRef, image);
          let url = await getDownloadURL(storageRef);
          setUrls((img) => [...img, url]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const productdata = async () => {
    const docRef = await addDoc(collection(db, "products"), {
      productName: name,
      discription: discription,
      price: price,
      category: category,
      imageUrl: urls,
    });
    // console.log("Document written with ID: ", docRef.id);
    setCategory("");
    setDiscription("");
    setPrice("");
    setname("");
    setUrls([]);
  };

  return (
    <>
      <h1 className="text-center">Add Product</h1>
      <div className="container">
        <div className="row">
          <div className="col-6 mx-auto">
            <div className="row justify-content-md-center">
              <form>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    name="productImage"
                    multiple
                    className="form-control"
                    onChange={handleChange}
                  />
                  <label className="input-group-text" onClick={handleUpload}>
                    Upload
                  </label>
                </div>
                <div className="mb-3 col-12 d-flex justify-content-center align-item-center">
                  {urls.map((img, i) => {
                    return (
                      <div key={i}>
                        <img width="100px" src={img} alt="img" />
                      </div>
                    );
                  })}
                </div>

                <div className="mb-3 col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      value={name}
                      className="form-control"
                      placeholder="Product Name"
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                    <label>Product Name</label>
                  </div>
                </div>

                <select
                  className="form-select mb-3 col-12"
                  aria-label="Default select example"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option>Select Category</option>
                  <option value="tech">Tech</option>
                  <option value="food">Food</option>
                  <option value="clothes">Clothes</option>
                </select>

                <div className="mb-3 col-12">
                  <label className="form-label">Product Discription</label>
                  <textarea
                    value={discription}
                    className="form-control"
                    rows="3"
                    onChange={(e) => {
                      setDiscription(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="mb-3 col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      value={price}
                      className="form-control"
                      placeholder="Discription"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                    <label>Product Price</label>
                  </div>
                </div>
                <div className="mt-3 col-12 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={productdata}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addproduct;
