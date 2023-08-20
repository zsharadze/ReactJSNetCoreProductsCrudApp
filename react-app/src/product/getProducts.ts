import { ApiResponseProducts, ProductData } from "./types";

export async function getProducts(pageSize, pageIndex) {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "product/getproducts/?pageSize="+pageSize+"&pageIndex=" + pageIndex
    );
    const body = (await response.json()) as unknown;
    assertIsProducts(body);
    return body;
  } catch (error) {
    console.log("error: " + error);
  }
}

export function assertIsProducts(
  productData: any
): asserts productData is ApiResponseProducts {
  console.log('productData',productData)
  if (!Array.isArray(productData.productList)) {
    throw new Error("products isn't an array");
  }
  if (productData.productList.length === 0) {
    return;
  }
  productData.productList.forEach((product) => {
    if (!("id" in product)) {
      throw new Error("product doesn't contain id");
    }
    if (typeof product.id !== "number") {
      throw new Error("id is not a number");
    }
    if (!("title" in product)) {
      throw new Error("product doesn't contain title");
    }
    if (typeof product.title !== "string") {
      throw new Error("title is not a string");
    }
    if (!("description" in product)) {
      throw new Error("product doesn't contain description");
    }
    if (typeof product.description !== "string") {
      throw new Error("description is not a string");
    }
    if (!("price" in product)) {
      throw new Error("product doesn't contain price");
    }
    if (typeof product.price !== "number") {
      throw new Error("price is not a number");
    }
    if (!("views" in product)) {
      throw new Error("product doesn't contain views");
    }
    if (typeof product.views !== "number") {
      throw new Error("views is not a number");
    }
  });
}
