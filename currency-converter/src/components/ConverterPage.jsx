import React, { useState } from 'react';
import '../App.css';


const ConverterPage = () => {
  // These are our variables to store data
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  // This function will convert the currency
  const convertCurrency = async () => {
    // First, let's check if user entered an amount
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }


    // Don't convert if both currencies are the same
    if (fromCurrency === toCurrency) {
      setResult(amount);
      setError('');
      return;
    }


    // Show loading message
    setIsLoading(true);
    setError('');


    try {
      // This is the API we will use to get exchange rates
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
     
      // Fetch data from the API
      const response = await fetch(apiUrl);
     
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }


      // Convert response to JSON
      const data = await response.json();
     
      // Get the exchange rate for the target currency
      const exchangeRate = data.rates[toCurrency];
     
      // Calculate the converted amount
      const convertedAmount = (amount * exchangeRate).toFixed(2);
     
      // Show the result
      setResult(convertedAmount);
     
    } catch (err) {
      // If something goes wrong, show error message
      console.log('Error:', err);
      setError('Sorry, could not convert currency. Please try again.');
    } finally {
      // Hide loading message
      setIsLoading(false);
    }
  };


  // This function swaps the currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('');
    setError('');
  };


  // This function clears the form
  const clearForm = () => {
    setAmount('');
    setResult('');
    setError('');
  };


  // This function handles when user types in amount field
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    // Clear result when amount changes
    if (result) {
      setResult('');
    }
  };


  // This function handles when user changes the "from" currency
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
    setResult('');
    setError('');
  };


  // This function handles when user changes the "to" currency
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
    setResult('');
    setError('');
  };


  // This function goes back to welcome page
  const goBack = () => {
    window.location.href = '/';
  };


  return (
    <div className="converter-page">
      <div className="converter-container">
        <div className="header">
          <h1>Currency Converter</h1>
          <p>Convert between different currencies</p>
        </div>
       
        <div className="converter-form">
          {/* First currency selection */}
          <div className="input-group">
            <label htmlFor="from-currency">From Currency:</label>
            <select
              id="from-currency"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="MXN">MXN - Mexican Peso</option>
              <option value="KRW">KRW - South Korean Won</option>
              <option value="SGD">SGD - Singapore Dollar</option>
              <option value="NZD">NZD - New Zealand Dollar</option>
              <option value="SEK">SEK - Swedish Krona</option>
              <option value="NOK">NOK - Norwegian Krone</option>
              <option value="DKK">DKK - Danish Krone</option>
              <option value="PLN">PLN - Polish Zloty</option>
              <option value="CZK">CZK - Czech Koruna</option>
              <option value="HUF">HUF - Hungarian Forint</option>
            </select>
          </div>


          {/* Swap button */}
          <div className="swap-button-container">
            <button
              type="button"
              className="swap-button"
              onClick={swapCurrencies}
              title="Swap currencies"
            >
              ⇄
            </button>
          </div>


          {/* Second currency selection */}
          <div className="input-group">
            <label htmlFor="to-currency">To Currency:</label>
            <select
              id="to-currency"
              value={toCurrency}
              onChange={handleToCurrencyChange}
            >
              <option value="EUR">EUR - Euro</option>
              <option value="USD">USD - US Dollar</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="MXN">MXN - Mexican Peso</option>
              <option value="KRW">KRW - South Korean Won</option>
              <option value="SGD">SGD - Singapore Dollar</option>
              <option value="NZD">NZD - New Zealand Dollar</option>
              <option value="SEK">SEK - Swedish Krona</option>
              <option value="NOK">NOK - Norwegian Krone</option>
              <option value="DKK">DKK - Danish Krone</option>
              <option value="PLN">PLN - Polish Zloty</option>
              <option value="CZK">CZK - Czech Koruna</option>
              <option value="HUF">HUF - Hungarian Forint</option>
            </select>
          </div>


          {/* Amount input */}
          <div className="input-group">
            <label htmlFor="amount">Amount to Convert:</label>
            <div className="amount-input-container">
              <span className="currency-symbol">$</span>
              <input
                id="amount"
                type="number"
                placeholder="Enter amount here"
                min="0"
                step="0.01"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>


          {/* Result display */}
          <div className="input-group">
            <label htmlFor="result">Converted Amount:</label>
            <input
              id="result"
              type="text"
              placeholder="Result will show here after conversion"
              readOnly
              value={result}
            />
          </div>


          {/* Action buttons */}
          <div className="button-group">
            <button
              type="button"
              className="convert-button"
              onClick={convertCurrency}
              disabled={isLoading}
            >
              {isLoading ? 'Converting...' : 'Convert Currency'}
            </button>
           
            <button
              type="button"
              className="clear-button"
              onClick={clearForm}
            >
              Clear Form
            </button>
          </div>


          {/* Error message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          {/* Loading message */}
          {isLoading && (
            <div className="loading-message">
              Getting exchange rates...
            </div>
          )}
        </div>


        {/* Navigation */}
        <div className="navigation">
          <button className="back-button" onClick={goBack}>
            ← Back to Welcome Page
          </button>
        </div>
      </div>
    </div>
  );
};


export default ConverterPage;



