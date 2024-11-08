import { create } from "zustand";
import { ProductType } from "../models";

interface ProductsStore {
  products: ProductType[] | null;
  queryParams: string;
  handleAddQueryParams: (queryParam: string[], value: string[]) => void;
  handleSetQueryParams: (queryParams: string) => void;
  handleSetProducts: (products: ProductType[]) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: null,
  queryParams: "",
  handleAddQueryParams: (queryParam: string[], value: string[]) => {
    set((state) => {
      const queryParamsObj = new URLSearchParams(state.queryParams);

      queryParam.forEach((param, index) => {
        queryParamsObj.set(param, encodeURIComponent(value[index]));
      });

      return { queryParams: queryParamsObj.toString() };
    });
  },
  handleSetQueryParams: (queryParams: string) => set({ queryParams }),
  handleSetProducts: (products: ProductType[]) => set({ products }),
}));
