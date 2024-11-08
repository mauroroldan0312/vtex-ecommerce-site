import { useState } from "react";
import { ProductType } from "../models";
import * as XLSX from "xlsx";

export interface UseExportProductsType {
  productsToExport: ProductType[];
  handleToggleProductsToExport: (product: ProductType) => void;
  handleExportToExcel: () => void;
}

export const useExportProducts = (): UseExportProductsType => {
  const [productsToExport, setProductsToExport] = useState<ProductType[]>([]);

  const handleToggleProductsToExport = (product: ProductType) => {
    if (productsToExport.includes(product)) {
      setProductsToExport(productsToExport.filter((p) => p !== product));
    } else {
      setProductsToExport([...productsToExport, product]);
    }
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(productsToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "products.xlsx");
  };

  return {
    productsToExport,
    handleToggleProductsToExport,
    handleExportToExcel,
  };
};
