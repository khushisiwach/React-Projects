import React, { useId } from 'react';

function InputBox({
    label,
    amount = 0, // Default amount to avoid uncontrolled input warnings
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "eur",
    amountDisable = false,
    currencyDisable = false,
    className = "", // Additional user-defined CSS classes
}) {
    const amountInputId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            {/* Input Section */}
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (onAmountChange) onAmountChange(value >= 0 ? value : 0); // Ensure non-negative values
                    }}
                />
            </div>

            {/* Dropdown Section */}
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()} {/* Display uppercase currencies */}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
