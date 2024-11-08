import React from "react";
import { useLocation } from "react-router-dom";

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const state = location.state;

  const ListPrice =
    state?.product.items[0].sellers[0].commertialOffer.ListPrice;
  const Price = state?.product.items[0].sellers[0].commertialOffer.Price;

  const handlePrintPage = () => {
    const header = document.getElementById("header-container");
    if (header) {
      header.style.display = "none";
    }
    window.print();
    if (header) {
      header.style.display = "";
    }
  };

  return (
    <div
      className="mt6 mw8 center pa3"
      style={{
        background: "#f8f9fa",
        border: "1px solid #dadce0",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <button
        onClick={() => window.history.back()}
        style={{
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          cursor: "pointer",
          marginBottom: "16px",
        }}
      >
        Volver
      </button>

      <h1 className="f3 f2-ns fw6 lh-title black">ProductDetail Page</h1>

      <p className="f5 f4-ns mv3 black">
        Product ID: {state?.product.productId}
      </p>
      <p className="f5 f4-ns mv3 black">
        Product Name: {state?.product.productName}
      </p>
      <img
        className="w-100 w-50-ns"
        style={{ width: "300px", height: "300px" }}
        src={state?.product.items[0].images[0].imageUrl}
        alt={state?.product.productName}
      />
      <div className="dtc v-top pl2 mt3">
        <h2 className="f4 f3-ns fw6 lh-title black mv0">
          {state?.product.productTitle}
        </h2>

        <dl className="mt2 f5 f4-ns">
          {ListPrice !== Price && (
            <dt className="ml0 strike red">
              {ListPrice.toLocaleString("en-CO", {
                style: "currency",
                currency: "COP",
              })}
            </dt>
          )}

          <dd className="ml0 fw6 black">
            {Price.toLocaleString("en-CO", {
              style: "currency",
              currency: "COP",
            })}
          </dd>
        </dl>
      </div>

      <button
        onClick={handlePrintPage}
        style={{
          background: "#34a853",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "6px 12px",
          cursor: "pointer",
          marginTop: "16px",
          fontSize: "14px",
        }}
      >
        Imprimir
      </button>
    </div>
  );
};

export default ProductDetail;
