import React from "react";
import { useProductsContext } from "../shared/providers/ProductsProvider";
import ProductListFilters from "../components/ProductListFilters";

const ProductList: React.FC = () => {
  const {
    products,
    loading,
    handleGoToDetailPage,
    handleToggleProductsToExport,
  } = useProductsContext() ?? {};

  return (
    <div
      className="mt6 mw7 center bg-white"
      style={{
        border: "1px solid #dadce0",
        borderRadius: "8px",
        boxShadow:
          "0 1px 3px rgba(60,64,67,0.3), 0 1px 2px rgba(60,64,67,0.15)",
      }}
    >
      <ProductListFilters />

      {loading && (
        <div className="tc bg-black mw6 center">
          <h2 className="f4">Loading products...</h2>
        </div>
      )}

      {products?.length === 0 && !loading && (
        <div className="tc bg-black mw6 center">
          <h2 className="f4">No products found</h2>
          <p className="f6">Try adjusting your filters or check back later.</p>
        </div>
      )}

      {products?.length && !loading ? (
        <main className="mw6 center bg-white pa3">
          {products?.map((product) => {
            const ListPrice =
              product.items[0].sellers[0].commertialOffer.ListPrice;
            const Price = product.items[0].sellers[0].commertialOffer.Price;

            return (
              <article>
                <a className="link dt w-100 bb b--black-10 pb2 mt2  blue">
                  <div className="dtc v-mid">
                    <input
                      type="checkbox"
                      className="mr2"
                      onChange={() => handleToggleProductsToExport(product)}
                    />
                  </div>
                  <div className="dtc w3">
                    <img
                      src={product.items[0].images[0].imageUrl}
                      className="db w-100"
                    />
                  </div>
                  <div className="dtc v-top pl2">
                    <h1 className="f6 f5-ns fw6 lh-title black mv0">
                      {product.productTitle}
                    </h1>

                    <dl className="mt2 f6">
                      {ListPrice !== Price && (
                        <dt className="ml0 strike">
                          {ListPrice.toLocaleString("en-CO", {
                            style: "currency",
                            currency: "COP",
                          })}
                        </dt>
                      )}

                      <dd className="ml0">
                        {Price.toLocaleString("en-CO", {
                          style: "currency",
                          currency: "COP",
                        })}
                      </dd>
                    </dl>
                    <button
                      className="f6 link dim br1 ph3 pv2 mb2 dib white bg-blue pointer"
                      onClick={() => {
                        handleGoToDetailPage(product);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </a>
              </article>
            );
          })}
        </main>
      ) : null}
    </div>
  );
};

export default ProductList;
