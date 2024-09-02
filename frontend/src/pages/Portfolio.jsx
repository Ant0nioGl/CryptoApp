import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar/Navbar";

function Portfolio() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');

                if (!token) {
                    setError('User is not logged in');
                    return;
                }

                const response = await axios.get('http://localhost:3000/purchase-info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setData(response.data.purchases);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch purchase data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            {error && <h1>{error}</h1>}
            <div>
                {data.length === 0 ? (
                    <p>No purchases found</p>
                ) : (
                    <ul>
                        {data.map((purchase, index) => (
                            <li key={index}>
                                <strong>Crypto:</strong> {purchase.crypto_name}, 
                                <strong> Amount:</strong> {purchase.total_amount}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Portfolio;
