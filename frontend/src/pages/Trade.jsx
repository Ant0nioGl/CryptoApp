import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar/Navbar";
import TradeForm from "../components/TradeForm/TradeForm.jsx";

function Trade() {
    const [cryptoData, setCryptoData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/listings');
                setCryptoData(response.data.data);
            } catch (err) {
                console.error('Error fetching cryptocurrency data:', err);
                setError('Failed to fetch cryptocurrency data');
            }
        };

        fetchCryptoData();
    }, []);

    // Create a map of currency to USD value
    const cryptoToUsdMap = cryptoData.reduce((acc, crypto) => {
        acc[crypto.symbol] = crypto.quote.USD.price;
        return acc;
    }, {});

    return (
        <div>
            <Navbar />
            <TradeForm cryptoToUsdMap={cryptoToUsdMap} />
            {error && <p>{error}</p>}
        </div>
    );
}

export default Trade;
