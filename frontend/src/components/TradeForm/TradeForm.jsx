import React, { useState } from 'react';
import './TradeForm.css';

function TradeForm() {
    const fiatCurrencies = ['USD', 'EUR'];
    const cryptoCurrencies = ['BTC', 'ETH', 'LTC'];

    const [amount, setAmount] = useState('');
    const [fiatCurrency, setFiatCurrency] = useState('USD'); // Default to 'USD'
    const [cryptoCurrency, setCryptoCurrency] = useState('');
    const [filteredCryptoCurrencies, setFilteredCryptoCurrencies] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`You want to buy ${cryptoCurrency} with ${amount} ${fiatCurrency}.`);
        // Handle the form submission logic here
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
