export type ProductData = {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  views?: number;
  imgName?: string;
};

export type ApiResponseProducts = {
  success: boolean,
  message: string,
  productList: ProductData[]
  pager: {
    totalItems: number,
    currentPage: number,
    pageSize: number,
    totalPages: number,
    startPage: number,
    endPage: number,
    paginationSummary: string,
    hasPrevious: boolean,
    hasNext: boolean
  }
};