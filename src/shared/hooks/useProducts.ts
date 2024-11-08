import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { PRODUCTS_QUERY } from "../graphql";
import { ProductType } from "../models";
import { useProductsStore } from "../store";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate } from "react-router-dom";

export interface UseProductsType {
  products: ProductType[] | null;
  loading: boolean;
  error: any;
  term: string;
  from: number;
  to: number;
  handleGoToDetailPage: (product: ProductType) => void;
  handleSetTerm: (term: string) => void;
  handleNext: () => void;
  handleBack: () => void;
}

export const useProducts = (): UseProductsType => {
  const [getProducts, stateProducts] = useLazyQuery(PRODUCTS_QUERY, {
    fetchPolicy: "no-cache",
  });
  const { products, queryParams, handleSetProducts } = useProductsStore();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(5);

  const [term, setTerm] = useState("");
  const { handleAddQueryParams } = useProductsStore();
  const navigate = useNavigate();

  const getProductsByTerm = useDebouncedCallback((value) => {
    handleAddQueryParams(["ft", "_from", "_to"], [value, "0", "5"]);
  }, 1000);

  const handleSetTerm = (term: string) => {
    setTerm(term);
    getProductsByTerm(term);
  };

  const handleGoToDetailPage = (product: ProductType) => {
    navigate(`/product/${product.productId}`, { state: { product } });
  };

  useEffect(() => {
    handleAddQueryParams(["_from", "_to"], [from.toString(), to.toString()]);
  }, [from, to]);

  const handleNext = () => {
    setFrom((prevFrom) => prevFrom + 5);
    setTo((prevTo) => prevTo + 5);
  };

  const handleBack = () => {
    setFrom((prevFrom) => Math.max(prevFrom - 5, 0));
    setTo((prevTo) => Math.max(prevTo - 5, 5));
  };

  useEffect(() => {
    getProducts({
      variables: {
        queryParams: `_from=${from}&_to=${to}`,
      },
    });
  }, []);

  useEffect(() => {
    if (stateProducts.data && stateProducts.data.products) {
      handleSetProducts(stateProducts.data.products);
    }
  }, [stateProducts.data]);

  useEffect(() => {
    if (queryParams) {
      getProducts({
        variables: {
          queryParams,
        },
      });
    }
  }, [queryParams]);

  return {
    products,
    term,
    loading: stateProducts.loading,
    error: stateProducts.error,
    from,
    to,
    handleSetTerm,
    handleGoToDetailPage,
    handleNext,
    handleBack,
  };
};
