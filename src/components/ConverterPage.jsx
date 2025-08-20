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
           

  <option value="USD">US Dollar (USD)</option>
  <option value="AED">United Arab Emirates Dirham (AED)</option>
  <option value="AFN">Afghan Afghani (AFN)</option>
  <option value="ALL">Albanian Lek (ALL)</option>
  <option value="AMD">Armenian Dram (AMD)</option>
  <option value="ANG">Netherlands Antillean Guilder (ANG)</option>
  <option value="AOA">Angolan Kwanza (AOA)</option>
  <option value="ARS">Argentine Peso (ARS)</option>
  <option value="AUD">Australian Dollar (AUD)</option>
  <option value="AWG">Aruban Florin (AWG)</option>
  <option value="AZN">Azerbaijani Manat (AZN)</option>
  <option value="BAM">Bosnia-Herzegovina Convertible Mark (BAM)</option>
  <option value="BBD">Barbadian Dollar (BBD)</option>
  <option value="BDT">Bangladeshi Taka (BDT)</option>
  <option value="BGN">Bulgarian Lev (BGN)</option>
  <option value="BHD">Bahraini Dinar (BHD)</option>
  <option value="BIF">Burundian Franc (BIF)</option>
  <option value="BMD">Bermudian Dollar (BMD)</option>
  <option value="BND">Brunei Dollar (BND)</option>
  <option value="BOB">Bolivian Boliviano (BOB)</option>
  <option value="BRL">Brazilian Real (BRL)</option>
  <option value="BSD">Bahamian Dollar (BSD)</option>
  <option value="BTN">Bhutanese Ngultrum (BTN)</option>
  <option value="BWP">Botswana Pula (BWP)</option>
  <option value="BYN">Belarusian Ruble (BYN)</option>
  <option value="BZD">Belize Dollar (BZD)</option>
  <option value="CAD">Canadian Dollar (CAD)</option>
  <option value="CDF">Congolese Franc (CDF)</option>
  <option value="CHF">Swiss Franc (CHF)</option>
  <option value="CLP">Chilean Peso (CLP)</option>
  <option value="CNY">Chinese Yuan (CNY)</option>
  <option value="COP">Colombian Peso (COP)</option>
  <option value="CRC">Costa Rican Colón (CRC)</option>
  <option value="CUP">Cuban Peso (CUP)</option>
  <option value="CVE">Cape Verdean Escudo (CVE)</option>
  <option value="CZK">Czech Koruna (CZK)</option>
  <option value="DJF">Djiboutian Franc (DJF)</option>
  <option value="DKK">Danish Krone (DKK)</option>
  <option value="DOP">Dominican Peso (DOP)</option>
  <option value="DZD">Algerian Dinar (DZD)</option>
  <option value="EGP">Egyptian Pound (EGP)</option>
  <option value="ERN">Eritrean Nakfa (ERN)</option>
  <option value="ETB">Ethiopian Birr (ETB)</option>
  <option value="EUR">Euro (EUR)</option>
  <option value="FJD">Fijian Dollar (FJD)</option>
  <option value="FKP">Falkland Islands Pound (FKP)</option>
  <option value="GBP">British Pound Sterling (GBP)</option>
  <option value="GEL">Georgian Lari (GEL)</option>
  <option value="GHS">Ghanaian Cedi (GHS)</option>
  <option value="GIP">Gibraltar Pound (GIP)</option>
  <option value="GMD">Gambian Dalasi (GMD)</option>
  <option value="GNF">Guinean Franc (GNF)</option>
  <option value="GTQ">Guatemalan Quetzal (GTQ)</option>
  <option value="GYD">Guyanese Dollar (GYD)</option>
  <option value="HKD">Hong Kong Dollar (HKD)</option>
  <option value="HNL">Honduran Lempira (HNL)</option>
  <option value="HRK">Croatian Kuna (HRK)</option>
  <option value="HTG">Haitian Gourde (HTG)</option>
  <option value="HUF">Hungarian Forint (HUF)</option>
  <option value="IDR">Indonesian Rupiah (IDR)</option>
  <option value="ILS">Israeli New Shekel (ILS)</option>
  <option value="INR">Indian Rupee (INR)</option>
  <option value="IQD">Iraqi Dinar (IQD)</option>
  <option value="IRR">Iranian Rial (IRR)</option>
  <option value="ISK">Icelandic Króna (ISK)</option>
  <option value="JMD">Jamaican Dollar (JMD)</option>
  <option value="JOD">Jordanian Dinar (JOD)</option>
  <option value="JPY">Japanese Yen (JPY)</option>
  <option value="KES">Kenyan Shilling (KES)</option>
  <option value="KGS">Kyrgyzstani Som (KGS)</option>
  <option value="KHR">Cambodian Riel (KHR)</option>
  <option value="KMF">Comorian Franc (KMF)</option>
  <option value="KRW">South Korean Won (KRW)</option>
  <option value="KWD">Kuwaiti Dinar (KWD)</option>
  <option value="KZT">Kazakhstani Tenge (KZT)</option>
  <option value="LAK">Lao Kip (LAK)</option>
  <option value="LBP">Lebanese Pound (LBP)</option>
  <option value="LKR">Sri Lankan Rupee (LKR)</option>
  <option value="LRD">Liberian Dollar (LRD)</option>
  <option value="LSL">Lesotho Loti (LSL)</option>
  <option value="LYD">Libyan Dinar (LYD)</option>
  <option value="MAD">Moroccan Dirham (MAD)</option>
  <option value="MDL">Moldovan Leu (MDL)</option>
  <option value="MGA">Malagasy Ariary (MGA)</option>
  <option value="MKD">Macedonian Denar (MKD)</option>
  <option value="MMK">Burmese Kyat (MMK)</option>
  <option value="MNT">Mongolian Tögrög (MNT)</option>
  <option value="MOP">Macanese Pataca (MOP)</option>
  <option value="MRU">Mauritanian Ouguiya (MRU)</option>
  <option value="MUR">Mauritian Rupee (MUR)</option>
  <option value="MVR">Maldivian Rufiyaa (MVR)</option>
  <option value="MWK">Malawian Kwacha (MWK)</option>
  <option value="MXN">Mexican Peso (MXN)</option>
  <option value="MYR">Malaysian Ringgit (MYR)</option>
  <option value="MZN">Mozambican Metical (MZN)</option>
  <option value="NAD">Namibian Dollar (NAD)</option>
  <option value="NGN">Nigerian Naira (NGN)</option>
  <option value="NIO">Nicaraguan Córdoba (NIO)</option>
  <option value="NOK">Norwegian Krone (NOK)</option>
  <option value="NPR">Nepalese Rupee (NPR)</option>
  <option value="NZD">New Zealand Dollar (NZD)</option>
  <option value="OMR">Omani Rial (OMR)</option>
  <option value="PAB">Panamanian Balboa (PAB)</option>
  <option value="PEN">Peruvian Sol (PEN)</option>
  <option value="PGK">Papua New Guinean Kina (PGK)</option>
  <option value="PHP">Philippine Peso (PHP)</option>
  <option value="PKR">Pakistani Rupee (PKR)</option>
  <option value="PLN">Polish Złoty (PLN)</option>
  <option value="PYG">Paraguayan Guaraní (PYG)</option>
  <option value="QAR">Qatari Riyal (QAR)</option>
  <option value="RON">Romanian Leu (RON)</option>
  <option value="RSD">Serbian Dinar (RSD)</option>
  <option value="RUB">Russian Ruble (RUB)</option>
  <option value="RWF">Rwandan Franc (RWF)</option>
  <option value="SAR">Saudi Riyal (SAR)</option>
  <option value="SBD">Solomon Islands Dollar (SBD)</option>
  <option value="SCR">Seychellois Rupee (SCR)</option>
  <option value="SDG">Sudanese Pound (SDG)</option>
  <option value="SEK">Swedish Krona (SEK)</option>
  <option value="SGD">Singapore Dollar (SGD)</option>
  <option value="SLL">Sierra Leonean Leone (SLL)</option>
  <option value="SOS">Somali Shilling (SOS)</option>
  <option value="SRD">Surinamese Dollar (SRD)</option>
  <option value="SSP">South Sudanese Pound (SSP)</option>
  <option value="STN">São Tomé and Príncipe Dobra (STN)</option>
  <option value="SYP">Syrian Pound (SYP)</option>
  <option value="SZL">Swazi Lilangeni (SZL)</option>
  <option value="THB">Thai Baht (THB)</option>
  <option value="TJS">Tajikistani Somoni (TJS)</option>
  <option value="TMT">Turkmenistani Manat (TMT)</option>
  <option value="TND">Tunisian Dinar (TND)</option>
  <option value="TOP">Tongan Paʻanga (TOP)</option>
  <option value="TRY">Turkish Lira (TRY)</option>
  <option value="TTD">Trinidad and Tobago Dollar (TTD)</option>
  <option value="TWD">New Taiwan Dollar (TWD)</option>
  <option value="TZS">Tanzanian Shilling (TZS)</option>
  <option value="UAH">Ukrainian Hryvnia (UAH)</option>
  <option value="UGX">Ugandan Shilling (UGX)</option>
  <option value="UYU">Uruguayan Peso (UYU)</option>
  <option value="UZS">Uzbekistani Soʻm (UZS)</option>
  <option value="VES">Venezuelan Bolívar Soberano (VES)</option>
  <option value="VND">Vietnamese Đồng (VND)</option>
  <option value="VUV">Vanuatu Vatu (VUV)</option>
  <option value="WST">Samoan Tala (WST)</option>
  <option value="XAF">Central African CFA Franc (XAF)</option>
  <option value="XCD">East Caribbean Dollar (XCD)</option>
  <option value="XDR">IMF Special Drawing Rights (XDR)</option>
  <option value="XOF">West African CFA Franc (XOF)</option>
  <option value="XPF">CFP Franc (XPF)</option>
  <option value="YER">Yemeni Rial (YER)</option>
  <option value="ZAR">South African Rand (ZAR)</option>
  <option value="ZMW">Zambian Kwacha (ZMW)</option>
  <option value="ZWL">Zimbabwean Dollar (ZWL)</option>


       
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
              
  <option value="USD">US Dollar (USD)</option>
  <option value="AED">United Arab Emirates Dirham (AED)</option>
  <option value="AFN">Afghan Afghani (AFN)</option>
  <option value="ALL">Albanian Lek (ALL)</option>
  <option value="AMD">Armenian Dram (AMD)</option>
  <option value="ANG">Netherlands Antillean Guilder (ANG)</option>
  <option value="AOA">Angolan Kwanza (AOA)</option>
  <option value="ARS">Argentine Peso (ARS)</option>
  <option value="AUD">Australian Dollar (AUD)</option>
  <option value="AWG">Aruban Florin (AWG)</option>
  <option value="AZN">Azerbaijani Manat (AZN)</option>
  <option value="BAM">Bosnia-Herzegovina Convertible Mark (BAM)</option>
  <option value="BBD">Barbadian Dollar (BBD)</option>
  <option value="BDT">Bangladeshi Taka (BDT)</option>
  <option value="BGN">Bulgarian Lev (BGN)</option>
  <option value="BHD">Bahraini Dinar (BHD)</option>
  <option value="BIF">Burundian Franc (BIF)</option>
  <option value="BMD">Bermudian Dollar (BMD)</option>
  <option value="BND">Brunei Dollar (BND)</option>
  <option value="BOB">Bolivian Boliviano (BOB)</option>
  <option value="BRL">Brazilian Real (BRL)</option>
  <option value="BSD">Bahamian Dollar (BSD)</option>
  <option value="BTN">Bhutanese Ngultrum (BTN)</option>
  <option value="BWP">Botswana Pula (BWP)</option>
  <option value="BYN">Belarusian Ruble (BYN)</option>
  <option value="BZD">Belize Dollar (BZD)</option>
  <option value="CAD">Canadian Dollar (CAD)</option>
  <option value="CDF">Congolese Franc (CDF)</option>
  <option value="CHF">Swiss Franc (CHF)</option>
  <option value="CLP">Chilean Peso (CLP)</option>
  <option value="CNY">Chinese Yuan (CNY)</option>
  <option value="COP">Colombian Peso (COP)</option>
  <option value="CRC">Costa Rican Colón (CRC)</option>
  <option value="CUP">Cuban Peso (CUP)</option>
  <option value="CVE">Cape Verdean Escudo (CVE)</option>
  <option value="CZK">Czech Koruna (CZK)</option>
  <option value="DJF">Djiboutian Franc (DJF)</option>
  <option value="DKK">Danish Krone (DKK)</option>
  <option value="DOP">Dominican Peso (DOP)</option>
  <option value="DZD">Algerian Dinar (DZD)</option>
  <option value="EGP">Egyptian Pound (EGP)</option>
  <option value="ERN">Eritrean Nakfa (ERN)</option>
  <option value="ETB">Ethiopian Birr (ETB)</option>
  <option value="EUR">Euro (EUR)</option>
  <option value="FJD">Fijian Dollar (FJD)</option>
  <option value="FKP">Falkland Islands Pound (FKP)</option>
  <option value="GBP">British Pound Sterling (GBP)</option>
  <option value="GEL">Georgian Lari (GEL)</option>
  <option value="GHS">Ghanaian Cedi (GHS)</option>
  <option value="GIP">Gibraltar Pound (GIP)</option>
  <option value="GMD">Gambian Dalasi (GMD)</option>
  <option value="GNF">Guinean Franc (GNF)</option>
  <option value="GTQ">Guatemalan Quetzal (GTQ)</option>
  <option value="GYD">Guyanese Dollar (GYD)</option>
  <option value="HKD">Hong Kong Dollar (HKD)</option>
  <option value="HNL">Honduran Lempira (HNL)</option>
  <option value="HRK">Croatian Kuna (HRK)</option>
  <option value="HTG">Haitian Gourde (HTG)</option>
  <option value="HUF">Hungarian Forint (HUF)</option>
  <option value="IDR">Indonesian Rupiah (IDR)</option>
  <option value="ILS">Israeli New Shekel (ILS)</option>
  <option value="INR">Indian Rupee (INR)</option>
  <option value="IQD">Iraqi Dinar (IQD)</option>
  <option value="IRR">Iranian Rial (IRR)</option>
  <option value="ISK">Icelandic Króna (ISK)</option>
  <option value="JMD">Jamaican Dollar (JMD)</option>
  <option value="JOD">Jordanian Dinar (JOD)</option>
  <option value="JPY">Japanese Yen (JPY)</option>
  <option value="KES">Kenyan Shilling (KES)</option>
  <option value="KGS">Kyrgyzstani Som (KGS)</option>
  <option value="KHR">Cambodian Riel (KHR)</option>
  <option value="KMF">Comorian Franc (KMF)</option>
  <option value="KRW">South Korean Won (KRW)</option>
  <option value="KWD">Kuwaiti Dinar (KWD)</option>
  <option value="KZT">Kazakhstani Tenge (KZT)</option>
  <option value="LAK">Lao Kip (LAK)</option>
  <option value="LBP">Lebanese Pound (LBP)</option>
  <option value="LKR">Sri Lankan Rupee (LKR)</option>
  <option value="LRD">Liberian Dollar (LRD)</option>
  <option value="LSL">Lesotho Loti (LSL)</option>
  <option value="LYD">Libyan Dinar (LYD)</option>
  <option value="MAD">Moroccan Dirham (MAD)</option>
  <option value="MDL">Moldovan Leu (MDL)</option>
  <option value="MGA">Malagasy Ariary (MGA)</option>
  <option value="MKD">Macedonian Denar (MKD)</option>
  <option value="MMK">Burmese Kyat (MMK)</option>
  <option value="MNT">Mongolian Tögrög (MNT)</option>
  <option value="MOP">Macanese Pataca (MOP)</option>
  <option value="MRU">Mauritanian Ouguiya (MRU)</option>
  <option value="MUR">Mauritian Rupee (MUR)</option>
  <option value="MVR">Maldivian Rufiyaa (MVR)</option>
  <option value="MWK">Malawian Kwacha (MWK)</option>
  <option value="MXN">Mexican Peso (MXN)</option>
  <option value="MYR">Malaysian Ringgit (MYR)</option>
  <option value="MZN">Mozambican Metical (MZN)</option>
  <option value="NAD">Namibian Dollar (NAD)</option>
  <option value="NGN">Nigerian Naira (NGN)</option>
  <option value="NIO">Nicaraguan Córdoba (NIO)</option>
  <option value="NOK">Norwegian Krone (NOK)</option>
  <option value="NPR">Nepalese Rupee (NPR)</option>
  <option value="NZD">New Zealand Dollar (NZD)</option>
  <option value="OMR">Omani Rial (OMR)</option>
  <option value="PAB">Panamanian Balboa (PAB)</option>
  <option value="PEN">Peruvian Sol (PEN)</option>
  <option value="PGK">Papua New Guinean Kina (PGK)</option>
  <option value="PHP">Philippine Peso (PHP)</option>
  <option value="PKR">Pakistani Rupee (PKR)</option>
  <option value="PLN">Polish Złoty (PLN)</option>
  <option value="PYG">Paraguayan Guaraní (PYG)</option>
  <option value="QAR">Qatari Riyal (QAR)</option>
  <option value="RON">Romanian Leu (RON)</option>
  <option value="RSD">Serbian Dinar (RSD)</option>
  <option value="RUB">Russian Ruble (RUB)</option>
  <option value="RWF">Rwandan Franc (RWF)</option>
  <option value="SAR">Saudi Riyal (SAR)</option>
  <option value="SBD">Solomon Islands Dollar (SBD)</option>
  <option value="SCR">Seychellois Rupee (SCR)</option>
  <option value="SDG">Sudanese Pound (SDG)</option>
  <option value="SEK">Swedish Krona (SEK)</option>
  <option value="SGD">Singapore Dollar (SGD)</option>
  <option value="SLL">Sierra Leonean Leone (SLL)</option>
  <option value="SOS">Somali Shilling (SOS)</option>
  <option value="SRD">Surinamese Dollar (SRD)</option>
  <option value="SSP">South Sudanese Pound (SSP)</option>
  <option value="STN">São Tomé and Príncipe Dobra (STN)</option>
  <option value="SYP">Syrian Pound (SYP)</option>
  <option value="SZL">Swazi Lilangeni (SZL)</option>
  <option value="THB">Thai Baht (THB)</option>
  <option value="TJS">Tajikistani Somoni (TJS)</option>
  <option value="TMT">Turkmenistani Manat (TMT)</option>
  <option value="TND">Tunisian Dinar (TND)</option>
  <option value="TOP">Tongan Paʻanga (TOP)</option>
  <option value="TRY">Turkish Lira (TRY)</option>
  <option value="TTD">Trinidad and Tobago Dollar (TTD)</option>
  <option value="TWD">New Taiwan Dollar (TWD)</option>
  <option value="TZS">Tanzanian Shilling (TZS)</option>
  <option value="UAH">Ukrainian Hryvnia (UAH)</option>
  <option value="UGX">Ugandan Shilling (UGX)</option>
  <option value="UYU">Uruguayan Peso (UYU)</option>
  <option value="UZS">Uzbekistani Soʻm (UZS)</option>
  <option value="VES">Venezuelan Bolívar Soberano (VES)</option>
  <option value="VND">Vietnamese Đồng (VND)</option>
  <option value="VUV">Vanuatu Vatu (VUV)</option>
  <option value="WST">Samoan Tala (WST)</option>
  <option value="XAF">Central African CFA Franc (XAF)</option>
  <option value="XCD">East Caribbean Dollar (XCD)</option>
  <option value="XDR">IMF Special Drawing Rights (XDR)</option>
  <option value="XOF">West African CFA Franc (XOF)</option>
  <option value="XPF">CFP Franc (XPF)</option>
  <option value="YER">Yemeni Rial (YER)</option>
  <option value="ZAR">South African Rand (ZAR)</option>
  <option value="ZMW">Zambian Kwacha (ZMW)</option>
  <option value="ZWL">Zimbabwean Dollar (ZWL)</option>


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



