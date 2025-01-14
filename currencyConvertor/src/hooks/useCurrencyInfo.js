import { useEffect, useState } from "react";

// Custom hook to fetch currency data
function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => setData(res[currency]))
            .catch((err) => console.error("Error fetching data:", err));
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
