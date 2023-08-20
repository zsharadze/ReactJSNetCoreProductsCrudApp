import { useParams } from "react-router-dom";
import { ProductData } from "../product/types";
import { useEffect, useState } from "react";
import { getProduct } from "../product/getProduct";
import { addProduct } from "../product/addProduct";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "../LoadingOverlay";
import emptyImg from "../assets/images/emptyImg.png";

export function AddProduct() {
  const initialProduct: ProductData = {
    id: 0,
    title: undefined,
    description: undefined,
    price: undefined,
    views: 0,
    imgName: undefined,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductData>(initialProduct);
  const params = useParams();
  const id = params.id === undefined ? 0 : params.id;
  const navigate = useNavigate();
  const [picture, setPicture] = useState();
  let [isImageChoosen, setIsImageChoosen] = useState<boolean>(true);
  const [imgData, setImgData] = useState<string | ArrayBuffer | null>(null);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setIsImageChoosen(true);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
        setProduct((prevState) => ({
          ...prevState,
          imageUpdated: true,
        }));
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    let cancel = false;
    if (id !== 0) {
      setIsLoading(true);
       getProduct(Number(id)).then((data) => {
        setIsLoading(false);
        if (!cancel) {
          setProduct(data);
          setIsLoading(false);
        }
      });
    }
    return () => {
      cancel = true;
    };
  }, []);

  async function handleSubmit() {
    if (!product.title || !product.description || !product.price) return;
    if (!picture && !product.imgName) {
      setIsImageChoosen(false);
      return;
    }

    const formData = new FormData();
    formData.append("Id", product?.id!.toString());
    formData.append("Title", product.title);
    formData.append("Description", product.description);
    formData.append("Price", product.price.toString());
    formData.append("ImgName", product.imgName!);
    formData.append("ImageFile", picture!);

    setIsLoading(true);

    await addProduct(formData).then((response) => {
      setIsLoading(false);
      if (response.success) {
        navigate("/");
      } else {
        console.log("error: ", response.message);
      }
    });
  }

  return (
    <>
      <table className="m-2" style={{ width: "350px" }}>
        <tbody>
          <tr>
            <td style={{ width: "100px" }}>
              <label>Name:&nbsp;</label>
            </td>
            <td className="td2AddProduct">
              <input
                type="text"
                className={
                  "form-control" + (product?.title?.length ? "" : " errorInput")
                }
                onChange={(event) =>
                  setProduct((prevState) => ({
                    ...prevState,
                    title: event.target.value,
                  }))
                }
                value={product.title || ""}
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "90px" }}>
              <label>Description:&nbsp;</label>
            </td>
            <td className="td2AddProduct">
              <input
                type="text"
                className={
                  "form-control" +
                  (product?.description?.length ? "" : " errorInput")
                }
                onChange={(event) =>
                  setProduct((prevState) => ({
                    ...prevState,
                    description: event.target.value,
                  }))
                }
                value={product.description || ""}
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "90px" }}>
              <label>Price:&nbsp;</label>
            </td>
            <td className="td2AddProduct">
              <input
                type="number"
                className={
                  "form-control" + (!product?.price ? " errorInput" : "")
                }
                onChange={(event) => {
                  setProduct((prevState) => ({
                    ...prevState,
                    price: Number(event.target.value),
                  }));
                }}
                value={product.price || ""}
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "90px" }}>
              <label>Image:&nbsp;</label>
            </td>
            <td>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={onChangePicture}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <img
                src={
                  imgData === null
                    ? product.imgName
                      ? process.env.REACT_APP_API_URL +
                      "imgs/" +
                      product.imgName
                      : emptyImg
                    : (imgData! as string)
                }
                style={{ maxWidth: "294px", maxHeight: "170px" }}
                alt="img"
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button
                type="button"
                className="btn btn-primary float-right mt-2"
                style={{ marginLeft: "10px" }}
                onClick={handleSubmit}
              >
                {product?.id ? "Save" : "Add"}
              </button>
              <button
                type="button"
                className="btn btn-danger float-right mt-2"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="float-right">
              {!isImageChoosen && (
                <label style={{ color: "red", paddingTop: "5px" }}>
                  Select image to upload
                </label>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <LoadingOverlay isLoading={isLoading} />
    </>
  );
}
