import { useState, useEffect } from 'react'
import axios from "axios"
import Navbar from '../components/Navbar/Navbar.jsx'

// TODO: Extract into components for separation of concerns if it will be used.
function Info() {  
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/crypto-map');
        setCryptoData(response.data.data.filter(crypto => crypto.rank <= 50).slice(0, 20));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch cryptocurrency data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      {error && <p>{error}</p>}
      <ul className='card-container'>
        {cryptoData.map(crypto => (
          <li className='card' key={crypto.id}>
            <h3>{crypto.name} ({crypto.symbol})</h3>
            <p>Rank: {crypto.rank}</p>
            <p>Active: {crypto.is_active ? 'Yes' : 'No'}</p>
            <p>First Historical Data: {new Date(crypto.first_historical_data).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Info
