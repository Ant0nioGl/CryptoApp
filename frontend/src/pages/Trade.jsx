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

    return (
        <div>
            <Navbar />
            <TradeForm />
            <div className="crypto-list">
                {error && <p>{error}</p>}
                {cryptoData.map(crypto => (
                    <div key={crypto.id} className="crypto-item">
                        <span>{crypto.name}</span>
                        <span>${crypto.quote.USD.price.toFixed(4)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trade;
