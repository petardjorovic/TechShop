import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productServices";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import ProductCardComponent from "../../components/ProductCard/ProductCardComponent";
import SearchBarComponent from "../../components/SearchBar/SearchBarComponent";
import "./ShopPage.scss";
import PaginationComponent from "../../components/Pagination/PaginationComponent";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAllProducts = async () => {
      dispatch(showLoader(true));
      const res = await getAllProducts();
      dispatch(showLoader(false));
      if (res.status === "success") {
        setProducts(res.products);
        setFilteredProducts(res.products);
      }
    };
    fetchAllProducts();
  }, []);

  const lastProductsIndex = currentPage * productsPerPage;
  const firstProductsIndex = lastProductsIndex - productsPerPage;
  const paginationProducts = filteredProducts.slice(
    firstProductsIndex,
    lastProductsIndex
  );

  return (
    <>
      <div className="container">
        <SearchBarComponent
          products={products}
          setFilteredProducts={setFilteredProducts}
          filteredProducts={filteredProducts}
          setCurrentPage={setCurrentPage}
        />
        <div className="products-wrapper">
          {/* filteredProducts */}
          {paginationProducts.length > 0 ? (
            paginationProducts.map((el, i) => {
              return <ProductCardComponent key={i} product={el} />;
            })
          ) : (
            <div>There are no products</div>
          )}
        </div>
        {filteredProducts.length > 0 && (
          <PaginationComponent
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            filteredProducts={filteredProducts}
            productsPerPage={productsPerPage}
            setFilteredProducts={setFilteredProducts}
          />
        )}
      </div>
    </>
  );
}

export default ShopPage;
