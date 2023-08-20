import { ApiResponseProducts, ProductData } from "../product/types";
import { getProducts } from "../product/getProducts";
import { deleteProduct } from "../product/deleteProduct";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOverlay } from "../LoadingOverlay";
import Swal from 'sweetalert2';

export function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ApiResponseProducts>();
  const navigate = useNavigate();
  const pageSize = 9;

  useEffect(() => {
    let cancel = false;
    setIsLoading(true);
    getProducts(pageSize, 1).then((data) => {
      if (!cancel) {
        setProducts(data);
        setIsLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  }, []);

  async function handleDelete(id) {

    return Swal.fire({ // <-- return Promise
      title: 'Delete',
      text: 'Are you sure to delete?',
      icon: 'question',
      confirmButtonText: 'Delete',
      confirmButtonColor: '#DC004E',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: false,
      scrollbarPadding: false
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        console.log(id)
        deleteProduct(id).then((response) => {
          setIsLoading(false);
          if (response.success) {
            getProducts(pageSize, 1).then((data) => {
              setProducts(data);
              setIsLoading(false);
            });
          } else {
            console.log("error: ", response.message);
          }
        });;
      }
    });
  }

  function handlePageIndexChanged(pageIndex) {
    setIsLoading(true);
    getProducts(pageSize, pageIndex).then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }

  let pagerIndexBtns: Array<any> = [];
  let previousPageIndex = 0;
  let nextPageIndex = 0;

  if (products?.productList && products.pager) {
    for (let pageIndex = products.pager.startPage; pageIndex <= products.pager.endPage; pageIndex++) {
      pagerIndexBtns.push(<li key={pageIndex} className={"paginate_button page-item nolabelselect" + (pageIndex === products.pager.currentPage ? " active" : "")}><button className="page-link" onClick={() => handlePageIndexChanged(pageIndex)}>{pageIndex}</button></li>);
    }
    previousPageIndex = products.pager.currentPage - 1;
    nextPageIndex = products.pager.currentPage + 1;
  }


  return (
    <>
      <div className="products">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>Products</h2>
                <span
                  style={{ cursor: "pointer", float: "right" }}
                  onClick={() => navigate("addproduct")}
                >
                  <i className="fa fa-plus"></i> Add Product
                </span>
              </div>
            </div>
            {products && products.productList && products.productList.length > 0 &&
              products.productList.map((product) => (
                <div className="col-md-4" key={product.id}>
                  <div className="product-item">
                    <button className="productsImgButton" onClick={() => navigate("productdetails/" + product.id)} style={{ cursor: "pointer" }}>
                      {product?.imgName &&
                        <img src={process.env.REACT_APP_API_URL + "imgs/" + product?.imgName} alt="" />
                      }
                    </button>
                    <div className="down-content">
                      <button className="productsImgButton" onClick={() => navigate("productdetails/" + product.id)} style={{ cursor: "pointer" }}>
                        <h4>{product.title}</h4>
                      </button>
                      <h6>${product.price}</h6>
                      <p onClick={() => navigate("productdetails/" + product.id)} style={{ cursor: "pointer" }}> {product.description}</p>
                      <span className="editProduct">
                        <Link to={`/addproduct/${product.id}`} style={{ textDecoration: "none", color: "black" }}> <i className="fa fa-edit" title="Edit"></i> Edit</Link>
                      </span>
                      &nbsp;&nbsp;&nbsp;<span className="deleteProduct" onClick={() => handleDelete(product.id)}><i className="fa fa-trash" title="Delete"></i></span>
                      <span>Views ({product.views})</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="row">
            <div className="col-md-12">
            {products && products.pager &&
                                <div className="float-end">
                                    <div className="table_paginate paging_simple_numbers float-right" style={{marginBottom: "25px"}}>
                                        <ul className="pagination">
                                            <li className={"paginate_button page-item previous" + (!products.pager.hasPrevious ? " disabled" : "")}>
                                                <button className="page-link nolabelselect" onClick={() => handlePageIndexChanged(previousPageIndex)}>&lt;</button>
                                            </li>
                                            {pagerIndexBtns}
                                            {(products.pager.currentPage + 4) < products.pager.totalPages &&
                                                <>
                                                    <li className={"paginate_button page-item next" + (!products.pager.hasNext ? " disabled" : "")}>
                                                        <button className="page-link nolabelselect" onClick={() => handlePageIndexChanged(nextPageIndex)}>&gt;</button>
                                                    </li>
                                                    <li className="paginate_button page-item nolabelselect">
                                                        <button className="page-link nolabelselect">...</button>
                                                    </li>
                                                    <li className="paginate_button page-item nolabelselect">
                                                        <button className="page-link nolabelselect" onClick={() => handlePageIndexChanged(products.pager.totalPages)}>{products.pager.totalPages}</button>
                                                    </li>
                                                </>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            }
                            {products && products.pager &&
                                <span style={{ fontStyle: "italic" }}>{products.pager.paginationSummary}</span>}
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay isLoading={isLoading} />
    </>
  );
}
