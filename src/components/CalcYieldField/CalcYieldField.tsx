import './CalcYieldField.css'
import React, { useState, useEffect } from 'react'

import { amountFormatter } from '../../utils/amountFormatter'

const CalcYieldField: React.FC<{}> = ({}) => {
	const [inputAmount, setInputAmount] = useState<any>(1000)
	const [inputApy, setInputApy] = useState<any>(6.81)
	const [inputDays, setInputDays] = useState<any>(30)
	const [yieldResult, setYieldResult] = useState<any>()

	useEffect(() => {
		calculateProfit()
	}, [])

	async function handleSearchInputKeyUpEvent(event) {
		if (inputAmount && inputApy && inputDays) {
			calculateProfit()
		}
		// }
	}

	function calculateProfit() {
		setYieldResult(
			amountFormatter(
				parseFloat(inputAmount) *
					(parseFloat(inputApy) / 100 / 365) *
					parseFloat(inputDays)
			)
		)
	}

	return (
		<div id="calc-yield-field">
			<div id="calc-yield-field-header" className="calc-yield-field-row">
				Calculate Yield
			</div>
			<div className="calc-yield-field-values ">
				<div className="calc-yield-field-row">
					<div className="input-field input-field-amount ">Amount</div>
					<div className="input-field">APY</div>
					<div className="input-field">Days</div>
					<div className="input-field">Yield</div>
				</div>
				<div className="calc-yield-field-row">
					<div className="input-field input-field-amount">
						${' '}
						<input
							id="input-amount"
							placeholder="$"
							autoComplete="off"
							value={inputAmount}
							onKeyUp={(event) => handleSearchInputKeyUpEvent(event)}
							onChange={(event) => setInputAmount(event.target.value)}
							onClick={() => setInputAmount('')}
						/>
					</div>

					<div className="input-field">
						<input
							id="input-apy"
							placeholder="%"
							autoComplete="off"
							value={inputApy}
							onKeyUp={(event) => handleSearchInputKeyUpEvent(event)}
							onChange={(event) => setInputApy(event.target.value)}
							onClick={() => setInputApy('')}
						/>
					</div>

					<div className="input-field">
						<input
							id="input-days"
							placeholder="#"
							autoComplete="off"
							value={inputDays}
							onKeyUp={(event) => handleSearchInputKeyUpEvent(event)}
							onChange={(event) => setInputDays(event.target.value)}
							onClick={() => setInputDays('')}
						/>
					</div>

					<div id="apy-profit-field" className="input-field">
						${yieldResult}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CalcYieldField
