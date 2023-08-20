
export async function addProduct(product) {
  for (var pair of product.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
  if (product.get("Id") === "0") {
    return await fetch(process.env.REACT_APP_API_URL + "product/addproduct", {
      method: "POST",
      body: product,
    })
      .then(async (response) => await response.json())
      .then((responseData) => {
        return responseData;
      })
      .catch((error) => console.warn(error));
  } else {
    return await fetch(
      process.env.REACT_APP_API_URL + "product/updateproduct",
      {
        method: "PUT",
        body: product,
      }
    )
      .then(async (response) => await response.json())
      .then((responseData) => {
        return responseData;
      })
      .catch((error) => console.warn(error));
  }
}