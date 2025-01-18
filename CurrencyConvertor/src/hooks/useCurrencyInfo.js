import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?from=${currency}`)
      .then((res) => res.json())
      .then((res) => setData(res.rates)); // rates object holds currency rates
  }, [currency]); // Remove 'data' from the dependency array

  return data;
}

export default useCurrencyInfo;
