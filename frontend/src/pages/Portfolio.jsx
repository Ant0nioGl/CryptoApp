import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar/Navbar";
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Portfolio() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [cryptoPrices, setCryptoPrices] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');

                if (!token) {
                    setError('User is not logged in');
                    return;
                }

                // Fetch user's purchase info
                const purchaseResponse = await axios.get('http://localhost:3000/purchase-info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setData(purchaseResponse.data.purchases);

                // Fetch latest cryptocurrency prices
                const priceResponse = await axios.get('http://localhost:3000/api/listings');
                const cryptoData = priceResponse.data.data;

                // Create a map of cryptocurrency symbols to their USD prices
                const cryptoToUsdMap = cryptoData.reduce((acc, crypto) => {
                    acc[crypto.symbol] = crypto.quote.USD.price;
                    return acc;
                }, {});

                setCryptoPrices(cryptoToUsdMap);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch purchase data or cryptocurrency prices');
            }
        };

        fetchData();
    }, []);

    // Prepare data for the Doughnut chart
    const chartData = {
        labels: data.map(purchase => purchase.crypto_name),
        datasets: [
            {
                data: data.map(purchase => purchase.total_amount * cryptoPrices[purchase.crypto_name] || 0),
                backgroundColor: [
                    '#FF6384', 
                    '#36A2EB', 
                    '#FFCE56', 
                    '#4BC0C0', 
                    '#9966FF', 
                    '#FF9F40', 
                    '#C9CBCF', 
                    '#7E57C2', 
                    '#66BB6A', 
                    '#EC407A',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#C9CBCF',
                    '#7E57C2',
                    '#66BB6A',
                    '#EC407A',
                ]
            }
        ]
    };

    return (
        <div>
            <Navbar />
            {error && <h1>{error}</h1>}
            <div>
                {data.length === 0 ? (
                    <p>No purchases found</p>
                ) : (
                    <div className='doughnut-chart'>
                        <Doughnut data={chartData} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Portfolio;
