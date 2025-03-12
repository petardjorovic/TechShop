import { useSelector } from "react-redux";

function useConvertPrice() {
  const { currency, symbol } = useSelector((state) => state.currencyStore);
  const convertPrice = (priceInEuros) => {
    switch (currency) {
      case "USD":
        return symbol + (priceInEuros * 1.09).toFixed(2);
      case "RSD":
        return (priceInEuros * 117).toFixed(2) + symbol;
      case "EUR":
        return priceInEuros.toFixed(2) + symbol;
    }
  };
  return convertPrice;
}

export default useConvertPrice;
