import React, { useState } from 'react';
import './TradeForm.css';
import axios from 'axios';

function TradeForm({ cryptoToUsdMap }) {
    const fiatCurrencies = ['USD', 'EUR'];
    const cryptoCurrencies = Object.keys(cryptoToUsdMap);

    const [amount, setAmount] = useState('');
    const [fiatCurrency, setFiatCurrency] = useState('USD');
    const [cryptoCurrency, setCryptoCurrency] = useState('');
    const [filteredCryptoCurrencies, setFilteredCryptoCurrencies] = useState([]);

    const EUR_TO_USD = 1.11;

    const token = sessionStorage.getItem('token');
    if (!token) {
        return (
            <div>
                <h1>Please log in before proceeding.</h1>
            </div>
        );
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleFiatCurrencyChange = (e) => {
        setFiatCurrency(e.target.value);
    };

    const handleCryptoCurrencyChange = (e) => {
        const value = e.target.value;
        setCryptoCurrency(value);
        if (value) {
            setFilteredCryptoCurrencies(
                cryptoCurrencies.filter((currency) =>
                    currency.toLowerCase().startsWith(value.toLowerCase())
                )
            );
        } else {
            setFilteredCryptoCurrencies([]);
        }
    };

    const handleSelectCryptoCurrency = (currency) => {
        setCryptoCurrency(currency);
        setFilteredCryptoCurrencies([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cryptoValueInUsd = cryptoToUsdMap[cryptoCurrency];
        if (cryptoValueInUsd) {
            let noOfCryptoCoins = amount / cryptoValueInUsd;
            let priceAtPurchase = cryptoValueInUsd;

            if (fiatCurrency === 'EUR') {
                noOfCryptoCoins *= EUR_TO_USD;
                priceAtPurchase = cryptoValueInUsd / EUR_TO_USD; // Adjust price for EUR
            }

            // Prepare the data to send to the backend
            const tradeData = {
                crypto_name: cryptoCurrency,
                amount: noOfCryptoCoins,
                price_at_purchase: priceAtPurchase,
                fiat_currency: fiatCurrency
            };

            try {
                const response = await axios.post('http://localhost:3000/purchase', tradeData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 201) {
                    alert('Trade successful!');
                } else {
                    alert('Trade failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during trade:', error);
                alert('Trade failed. Please try again.');
            }
        } else {
            alert('Please select a valid cryptocurrency.');
        }
    };

    return (
        <form className="trade-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="fiatCurrency">Fiat Currency:</label>
                <select
                    id="fiatCurrency"
                    value={fiatCurrency}
                    onChange={handleFiatCurrencyChange}
                    required
                >
                    {fiatCurrencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="amount">Amount: {fiatCurrency !== '' ? `(${fiatCurrency})` : ''}</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Enter the amount..."
                    value={amount}
                    onChange={handleAmountChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="cryptoCurrency">Cryptocurrency:</label>
                <input
                    type="text"
                    id="cryptoCurrency"
                    value={cryptoCurrency}
                    onChange={handleCryptoCurrencyChange}
                    placeholder="Search cryptocurrency..."
                    required
                />
                {filteredCryptoCurrencies.length > 0 && (
                    <ul className="dropdown-list">
                        {filteredCryptoCurrencies.map((currency) => (
                            <li
                                key={currency}
                                onClick={() => handleSelectCryptoCurrency(currency)}
                            >
                                {currency}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button type="submit">Exchange</button>
        </form>
    );
}

export default TradeForm;
