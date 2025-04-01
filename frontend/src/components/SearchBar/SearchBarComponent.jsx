import React, { useEffect, useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import Slider from "@mui/material/Slider";

import "./SearchBarComponent.scss";
import { useSelector } from "react-redux";

function SearchBarComponent({
  products,
  setFilteredProducts,
  filteredProducts,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [slider, setSlider] = useState(0);
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(0);
  const { currency, symbol } = useSelector((state) => state.currencyStore);

  useEffect(() => {
    let max;
    if (products.length > 0) {
      let arr = products.map((prod) => prod.price);
      max = Math.max(...arr);
      setMaxPrice(max);
    }
  }, [products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    const newTerm = e.target.value.toLowerCase();

    let filtered = [...products];

    if (newTerm) {
      filtered = products.filter((prod) => {
        return prod.title.toLowerCase().includes(newTerm);
      });
    }

    applySort(filtered);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    let selectedSort = e.target.value;

    applySort(filteredProducts, selectedSort);
  };

  const applySort = (filtered, selectedSort = sort) => {
    let sorted = [...filtered];

    if (selectedSort === "asc") {
      sorted.sort((prod1, prod2) => prod1.price - prod2.price);
    } else if (selectedSort === "desc") {
      sorted.sort((prod1, prod2) => prod2.price - prod1.price);
    } else if (selectedSort === "default") {
      let newArr = products.filter((prod, i) => {
        return filtered.includes(prod);
      });
      sorted = newArr;
    }
    setFilteredProducts(sorted);
  };

  const handleSlider = (e) => {
    setSlider(e.target.value);
    let newSlide = Number(e.target.value);
    let filtered = [filteredProducts];
    filtered = products.filter((prod) => prod.price >= newSlide);
    setFilteredProducts(filtered);
  };

  const convertPriceCurrency = (priceInEuros) => {
    switch (currency) {
      case "USD":
        return (priceInEuros * 1.09).toFixed(0) + " " + symbol;
      case "RSD":
        return (priceInEuros * 117).toFixed(0) + " " + symbol;
      case "EUR":
        return priceInEuros.toFixed(0) + " " + symbol;
    }
  };

  return (
    <div className="search-bar-wrapper">
      <div className="slider">
        <p>Price: {convertPriceCurrency(slider)}</p>
        <Slider
          defaultValue={0}
          onChange={handleSlider}
          max={maxPrice}
          sx={{
            width: 200,
            color: "error.main",
            "& .MuiSlider-thumb": {
              borderRadius: "3px",
              width: 7,
            },
          }}
        />
      </div>
      <div className="search">
        <input
          type="text"
          id="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <span className="close-sign">
            <IoClose />
          </span>
        )}
        <button>
          <IoSearch size={20} />
        </button>
      </div>
      <div className="sort">
        <label htmlFor="">Sort by: </label>
        <select name="sort" id="sort" onChange={handleSort}>
          <option value="default">Default</option>
          <option value="asc">Low price</option>
          <option value="desc">High price</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBarComponent;
