import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar/Navbar";
import Tab from '../components/Tab/Tab';

function Market() {
    const [cryptoData, setCryptoData] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [percentChange, setPercentChange] = useState("percent_change_24h");
    const [error, setError] = useState(null);
    const noOfCrypto = 50 // To change in the future?

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3000/api/listings');
              setCryptoData(response.data.data);
  
              // Extract top crypto IDs
              const cryptoIds = response.data.data
                  .filter((_, index) => index < noOfCrypto)
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

    const handlePercentChange = (value) => {
        setPercentChange(value);
    };

    function formatMarketCap(marketCap) {
        if (marketCap >= 1e12) {
            return `${(marketCap / 1e12).toFixed(2)} T`; // Trillions
        } else if (marketCap >= 1e9) {
            return `${(marketCap / 1e9).toFixed(2)} B`; // Billions
        } else if (marketCap >= 1e6) {
            return `${(marketCap / 1e6).toFixed(2)} M`; // Millions
        } else if (marketCap >= 1e3) {
            return `${(marketCap / 1e3).toFixed(2)} K`; // Thousands
        } else {
            return marketCap.toString(); // Less than 1K
        }
    }    

    return (
        <div>
            <Navbar />
            <div className='tabs-container'>
                <Tab
                    rank={"#"}
                    name={"Header"}
                    symbol={""}
                    cryptoIcon={'/coin.png'}
                    marketCap={"Market cap"}
                    price={"Price"}
                    percentChange={"% 24h"}
                    onChangePercentChange={handlePercentChange}
                />
                {cryptoData.filter((_, index) => index < noOfCrypto).map(crypto => {
                    const meta = metadata && metadata[crypto.id];
                    const percentChangeValue = crypto.quote.USD[percentChange];
                    return (
                        <Tab
                            key={crypto.id}
                            rank={crypto.cmc_rank}
                            name={crypto.name} //currently not used
                            symbol={meta ? meta.symbol : ''}
                            cryptoIcon={meta ? meta.logo : '/coin.png'}
                            marketCap={`$${formatMarketCap(crypto.quote.USD.market_cap)}`}
                            price={`$${crypto.quote.USD.price < 1 ? crypto.quote.USD.price.toFixed(6) : crypto.quote.USD.price.toFixed(2)}`}
                            percentChange={`${percentChangeValue.toFixed(2)}%`}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Market;
