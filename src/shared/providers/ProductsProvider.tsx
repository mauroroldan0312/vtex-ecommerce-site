import { createContext, ReactNode, useContext } from "react";
import { useProducts, UseProductsType } from "../hooks/useProducts";
import { useExportProducts, UseExportProductsType } from "../hooks";

export interface ProductsContextType
  extends UseProductsType,
    UseExportProductsType {}

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const context = useProducts();
  const exportProductsContext = useExportProducts();

  const state = {
    ...context,
    ...exportProductsContext,
  };

  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  );
};
