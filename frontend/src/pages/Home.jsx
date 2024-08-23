import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar/Navbar";
import Tab from '../components/Tab/Tab';

function Home() {
    const [cryptoData, setCryptoData] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3000/api/listings');
              setCryptoData(response.data.data);
  
              // Extract top 20 crypto IDs
              const cryptoIds = response.data.data
                  .filter((_, index) => index < 20)
                  .map(crypto => crypto.id)
                  .join(',');
  
              // Fetch icons/metadata using the GET request with query parameters
              const metadataResponse = await axios.get(`http://localhost:3000/api/metadata-info?ids=${cryptoIds}`);
              setMetadata(metadataResponse.data.data);
  
          } catch (err) {
              console.error('Error fetching data:', err);
              setError('Failed to fetch cryptocurrency data');
          }
      };
  
      fetchData();
  }, []);  

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '20px',
        margin: '15px',
        width: '75vw'
    };

    const textStyle = {
        fontSize: '1.25rem',
        color: 'gold'
    };

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
                {cryptoData.filter((_, index) => index < 20).map(crypto => {
                    const meta = metadata && metadata[crypto.id]
                    return (
                        <Tab
                            key={crypto.id}
                            rank={crypto.cmc_rank}
                            name={crypto.name}
                            cryptoIcon={meta ? meta.logo : '/coin.png'}
                            marketCap={`$${crypto.quote.USD.market_cap.toLocaleString()}`}
                            price={`$${crypto.quote.USD.price.toFixed(2)}`}
                            percentChange={`${crypto.quote.USD.percent_change_24h.toFixed(2)}%`}
                            graphIcon={crypto.quote.USD.percent_change_24h > 0 ? "/stocks-up.png" : "/stocks-down.png"}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
