import {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar/Navbar";
import Tab from '../components/Tab/Tab';

function Home() {
    const [cryptoData, setCryptoData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetch data from the backend
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/listings');
          setCryptoData(response.data.data);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to fetch cryptocurrency data');
        }
      };
  
      fetchData();
    }, []);

    let headerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '20px',
        margin: '15px',
        width: '75vw'
    }

    let textStyle = {
        fontSize: '1.25rem',
        color: 'gold'
    }
    
    return (
        <div>
            <Navbar />
            <div className='tabs-container'>
                <div style={headerStyle}>
                    <a style={textStyle}>Name</a>
                    <a style={textStyle}>Market Cap</a>
                    <a style={textStyle}>Price</a>
                    <a style={textStyle}> 24h %</a>
                </div>
                {cryptoData.filter((_, index) => index < 20).map(crypto =>
                <Tab
                    key={crypto.id} 
                    rank={crypto.cmc_rank}
                    name={crypto.name}
                    marketCap={`$${crypto.quote.USD.market_cap.toLocaleString()}`}
                    price={`$${crypto.quote.USD.price.toFixed(2)}`}
                    percentChange={`${crypto.quote.USD.percent_change_24h.toFixed(2)}%`}
                    iconPath={crypto.quote.USD.percent_change_24h > 0 ? "/stocks-up.png" : "/stocks-down.png"}
                />
                )}
            </div>
        </div>
    );
}

export default Home;
