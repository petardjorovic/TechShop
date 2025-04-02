import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import "./PaginationComponent.scss";

function PaginationComponent({
  currentPage,
  setCurrentPage,
  filteredProducts,
  productsPerPage,
  setFilteredProducts,
}) {
  const lastProductsIndex = currentPage * productsPerPage;
  const firstProductsIndex = lastProductsIndex - productsPerPage;
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="pagination-wrapper">
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}

export default PaginationComponent;
