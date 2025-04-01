import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productServices";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import ProductCardComponent from "../../components/ProductCard/ProductCardComponent";
import SearchBarComponent from "../../components/SearchBar/SearchBarComponent";
import "./ShopPage.scss";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);

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
  return (
    <>
      <div className="container">
        <SearchBarComponent
          products={products}
          setFilteredProducts={setFilteredProducts}
          filteredProducts={filteredProducts}
        />
        <div className="products-wrapper">
          {filteredProducts.length > 0 &&
            filteredProducts.map((el, i) => {
              return <ProductCardComponent key={i} product={el} />;
            })}
        </div>
      </div>
    </>
  );
}

export default ShopPage;
