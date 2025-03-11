import React from "react";
import { useParams } from "react-router-dom";

function SingleProductPage() {
  const { productId } = useParams();
  return (
    <div className="container">
      <h1>SingleProductPage {productId}</h1>
    </div>
  );
}

export default SingleProductPage;
