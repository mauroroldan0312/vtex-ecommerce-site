import { useProductsContext } from "../../shared/providers/ProductsProvider";

const ProductListFilters = () => {
  const {
    term,
    from,
    productsToExport,
    handleSetTerm,
    handleExportToExcel,
    handleBack,
    handleNext,
  } = useProductsContext();

  return (
    <div className="flex display justify-between pa3">
      <div className="flex ">
        <div className="mb3 mr2 mt1 ml2 ">
          <input
            value={term}
            type="text"
            id="filterInput"
            placeholder="Filter by text"
            style={{
              borderRadius: "24px",
              padding: "10px 20px",
              boxShadow: "0 1px 6px rgba(32,33,36,0.28)",
              border: "1px solid #dfe1e5",
              backgroundColor: "#fff",
              color: "#202124",
              fontSize: "16px",
              outline: "none",
            }}
            onChange={(e) => handleSetTerm(e.target.value)}
          />
        </div>
        <div className="mb3 mt1">
          <button
            disabled={productsToExport.length === 0}
            id="exportButton"
            className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue"
            style={{
              borderRadius: "24px",
              padding: "10px 20px",
              boxShadow: "0 1px 6px rgba(32,33,36,0.28)",
              border: "1px solid #dfe1e5",
              backgroundColor:
                productsToExport.length === 0 ? "#d3d3d3" : "#4285f4",
              color: productsToExport.length === 0 ? "#a9a9a9" : "#fff",
              fontSize: "16px",
              outline: "none",
              cursor: productsToExport.length === 0 ? "not-allowed" : "pointer",
            }}
            onClick={handleExportToExcel}
          >
            Export to CSV
          </button>
        </div>
      </div>
      <div className="flex justify-between mt1">
        <button
          className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue"
          style={{
            borderRadius: "24px",
            padding: "5px 20px",
            height: "30px",
            boxShadow: "0 1px 6px rgba(32,33,36,0.28)",
            border: "1px solid #dfe1e5",
            backgroundColor: from === 0 ? "#d3d3d3" : "#4285f4",
            color: from === 0 ? "#a9a9a9" : "#fff",
            fontSize: "16px",
            outline: "none",
            cursor: from === 0 ? "not-allowed" : "pointer",
          }}
          onClick={handleBack}
          disabled={from === 0}
        >
          Back
        </button>
        <button
          className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue"
          style={{
            borderRadius: "24px",
            padding: "5px 20px",
            height: "30px",
            boxShadow: "0 1px 6px rgba(32,33,36,0.28)",
            border: "1px solid #dfe1e5",
            backgroundColor: "#4285f4",
            color: "#fff",
            fontSize: "16px",
            outline: "none",
            cursor: "pointer",
          }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListFilters;
