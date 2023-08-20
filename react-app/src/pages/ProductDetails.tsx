import { ProductData } from "../product/types";
import { useEffect, useState } from "react";
import { getProduct } from "../product/getProduct";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "../LoadingOverlay";

export function ProductDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductData>();
  const params = useParams();
  const id = params.id === undefined ? undefined : params.id;
  const navigate = useNavigate();
  
  useEffect(() => {
    let cancel = false;
    setIsLoading(true);
    getProduct(Number(id)).then((data) => {
      if (!cancel) {
        setProduct(data);
        setIsLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  },[] );
  return (
    <>
    <div className="container">
        <span style={{marginRight:"40px", fontWeight: "bold", color: "#0390fc", cursor:"pointer"}} onClick={() => navigate("/")}>&lt;&lt; Go Back</span>
      <div className="row">      
        {product?.id ? (
          <div className="col-12-md detailsName" style={{marginLeft: "14px", marginBottom:"10px"}}>
            <h4>{product?.title}</h4>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="row">
        {product?.id ? (
          <>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <img
                className="detailsImg"
                src={
                  process.env.REACT_APP_API_URL + "imgs/" + product?.imgName
                }
                alt={product?.title}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <span className="inStockText text-success">In Stock</span>
              <h5 style={{fontWeight:"bold" ,marginTop: "15px"}}>Price: ${product?.price}</h5>
              <h5 style={{marginTop: "15px", marginBottom: "10px"}}>Description:</h5>
              <span className="detailsDescription">{product?.description}</span>
              <div style={{marginTop: "10px"}}><i className="fa fa-eye"></i> {product?.views}</div>
              <br />
            </div>
          </>
        ) : (
          <div>No product to display</div>
        )}
      </div>
    </div>
    <LoadingOverlay isLoading={isLoading} />
    </>
  );
}
