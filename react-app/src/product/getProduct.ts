import { ProductData } from "./types";

export async function getProduct(id: number) : Promise<ProductData> {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "product/getproduct/?id=" + id
    );
    const body = (await response.json()) as ProductData;
    assertIsProduct(body);
    return body;
  } catch (error) {
    console.log("error: " + error);
  }

  return {};
}

export function assertIsProduct(
  productData: ProductData
): asserts productData is ProductData {

    if (!("id" in productData)) {
      throw new Error("product doesn't contain id");
    }
    if (typeof productData.id !== "number") {
      throw new Error("id is not a number");
    }
    if (!("title" in productData)) {
      throw new Error("product doesn't contain title");
    }
    if (typeof productData.title !== "string") {
      throw new Error("title is not a string");
    }
    if (!("description" in productData)) {
      throw new Error("product doesn't contain description");
    }
    if (typeof productData.description !== "string") {
      throw new Error("description is not a string");
    }
    if (!("price" in productData)) {
      throw new Error("product doesn't contain price");
    }
    if (typeof productData.price !== "number") {
      throw new Error("price is not a number");
    }
    if (!("views" in productData)) {
      throw new Error("product doesn't contain views");
    }
    if (typeof productData.views !== "number") {
      throw new Error("views is not a number");
    }

}
