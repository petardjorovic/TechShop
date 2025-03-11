import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productServices";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import ProductCardComponent from "../../components/ProductCard/ProductCardComponent";
import "./ShopPage.scss";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllProducts = async () => {
      dispatch(showLoader(true));
      const res = await getAllProducts();
      dispatch(showLoader(false));
      if (res.status === "success") {
        setProducts(res.products);
      }
    };
    fetchAllProducts();
  }, []);
  return (
    <>
      <div className="container">
        <div className="products-wrapper">
          {products.length > 0 &&
            products.map((el, i) => {
              return <ProductCardComponent key={i} product={el} />;
            })}
        </div>
      </div>
    </>
  );
}

export default ShopPage;
