import { useSelector } from "react-redux";

const useConvertPrice = (priceInEuros) => {
  const { currency, symbol } = useSelector((state) => state.currencyStore);
  switch (currency) {
    case "USD":
      return symbol + (priceInEuros * 1.09).toFixed(2);
    case "RSD":
      return (priceInEuros * 117).toFixed(2) + symbol;
    case "EUR":
      return priceInEuros.toFixed(2) + symbol;
  }
};

export default useConvertPrice;
