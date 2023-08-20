export async function deleteProduct(id: number) : Promise<any>  {
    console.log(id)
  try {
    return await fetch(process.env.REACT_APP_API_URL + "product/deleteproduct/?id=" + id, {
        method: "DELETE"
      })
        .then(async (response) => await response.json())
        .then((responseData) => {
          return responseData;
        })
        .catch((error) => console.warn(error));
  } catch (error) {
    console.log("error: " + error);
  }

  return {};
}