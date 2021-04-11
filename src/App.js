import React,{useEffect, useState} from "react"
import "./App.css"
import CurrencyInput from "./Components/CurrencyInput"
import {FaRupeeSign, FaDollarSign, FaEuroSign} from "react-icons/fa"



const App = () =>{

    const[currencyOptions, setCurrencyOptions] = useState([]);
    const[fromCurrency, setFromCurrency] = useState();
    const[toCurrency, setToCurrency] = useState();
    const[amount, setAmount] = useState(1);
    const[amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const[exchangeRate, setExchangeRate] = useState();

    let toAmount, fromAmount;

    if(amountInFromCurrency){
        fromAmount = amount;
        toAmount = exchangeRate * amount;
    }else{
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    const fetchRates = () => {
        fetch("http://api.exchangeratesapi.io/v1/latest?access_key=968fd9ab880709607925700c3959b6aa&format=1")
        .then((res) => (
            res.json()
        ))
        .then(data => {
            const firstCurrency = Object.keys(data.rates)[0];
            setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
            setFromCurrency(data.base);
            setToCurrency(firstCurrency);
            setExchangeRate(data.rates[firstCurrency]);
        })
    }


    function handleFromAmountChange(e){
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }


    function handleToAmountChange(e){
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }


    useEffect(()=>{
        if(fromCurrency!=null && toCurrency!=null){
            fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=968fd9ab880709607925700c3959b6aa&format=1?base=${fromCurrency}&symbols=${toCurrency}`)
                .then(res => res.json())
                .then(data => setExchangeRate(data.rates[toCurrency]))
        }
        
    },[fromCurrency, toCurrency]);



    useEffect(()=>{
        fetchRates();
    },[]);




    return(
        <>
            <div className="title">
                <h1>Currency Convertor</h1>
                <FaDollarSign />
                <FaRupeeSign />
                <FaEuroSign />
            </div>

            <div className="sub-heads">Converts from: {fromCurrency}</div>

            <CurrencyInput
                currencyOptions={currencyOptions}
                selectedCurrency= {fromCurrency}
                onChangeCurrency = {(e) =>{
                    setFromCurrency(e.target.value);
                    console.log(fromCurrency);
                } }
                amount = {fromAmount}
                onChangeAmount = {handleFromAmountChange}
            />

            <div className="sub-heads">Converts to: {toCurrency}</div>

            <CurrencyInput
                currencyOptions={currencyOptions}  
                selectedCurrency = {toCurrency}
                onChangeCurrency = {(e) =>{
                    setToCurrency(e.target.value);
                    console.log(toCurrency);
                } }
                amount = {toAmount}
                onChangeAmount = {handleToAmountChange}
            />
        </>
    )
}

export default App;