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
    const [investment, setInvestment] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');

                if (!token) {
                    setError('Please log in before proceeding.');
                    setIsLoggedIn(false);
                    return;
                }

                setIsLoggedIn(true);

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

                // Calculate the current value of the user's holdings
                const currentValueCalc = purchaseResponse.data.purchases.reduce((acc, purchase) => {
                    return acc + (purchase.total_amount * cryptoToUsdMap[purchase.crypto_name] || 0);
                }, 0);
                
                setCurrentValue(currentValueCalc);

                // Fetch user's total investment
                const invesmentResponse = await axios.get('http://localhost:3000/investment-info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Set the investment value; ensure it's a number
                const fetchedInvestment = invesmentResponse.data.investment || 0;
                setInvestment(fetchedInvestment);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Start investing to see your portfolio.');
            }
        };

        fetchData();
    }, []);

    // Calculate the profit or loss
    const profit = currentValue - investment;

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
        <div className='content-container'>
            <Navbar />
            {error && <h1>{error}</h1>}
            {isLoggedIn && (
                <div className='portfolio-container'>
                    {data.length === 0 ? (
                        <></>
                    ) : (
                        <div className='doughnut-chart'>
                            <Doughnut data={chartData} />
                        </div>
                    )}

                    <div className='portfolio-info'>
                        <h1 id='total-invested'>Total invested: ${investment !== undefined ? Math.floor(investment * 100) / 100 : '0.00'}</h1>
                        <h1 
                            style={{
                                color: profit >= 0 ? 'green' : 'red'
                            }}
                        >
                            Profit: {profit < 0 ? '- $' + Math.abs(profit.toFixed(2)) : '$ ' + profit.toFixed(2)}
                        </h1>
                    </div>
                </div>
                )}
        </div>
    );
}

export default Portfolio;
