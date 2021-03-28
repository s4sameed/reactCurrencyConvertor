import React from "react"

const CurrencyInput = (props) => {

    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props;

    return(

        <div>
            <input type="number" className="input" value={amount} onChange = {onChangeAmount}/>
            <select className="select" value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map( option => (
                    <option key={option} value={option}>{option}</option>
                ))}  
            </select>
        </div>
    )
}

export default CurrencyInput;