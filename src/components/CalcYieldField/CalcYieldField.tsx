import './CalcYieldField.css'
import React, { useState, useEffect } from 'react'

import { amountFormatter } from '../../utils/amountFormatter'

const CalcYieldField: React.FC<{}> = ({}) => {
	const [inputAmount, setInputAmount] = useState<number>(1000)
	const [inputApy, setInputApy] = useState<number>(6.81)
	const [inputDays, setInputDays] = useState<number>(30)
	const [yieldResult, setYieldResult] = useState<string>()

	useEffect(() => {
		calculateProfit()
	}, [])

	async function handleSearchInputKeyUpEvent() {
		calculateProfit()
	}

	function calculateProfit() {
		setYieldResult(
			amountFormatter(inputAmount * (inputApy / 365 / 100) * inputDays)
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
							onKeyUp={() => handleSearchInputKeyUpEvent()}
							onChange={(event) =>
								setInputAmount(parseFloat(event.target.value) | 0)
							}
							onClick={() => setInputAmount(0)}
						/>
					</div>

					<div className="input-field">
						<input
							id="input-apy"
							placeholder="%"
							autoComplete="off"
							value={inputApy}
							onKeyUp={() => handleSearchInputKeyUpEvent()}
							onChange={(event) =>
								setInputApy(parseFloat(event.target.value) | 0)
							}
							onClick={() => setInputApy(0)}
						/>
					</div>

					<div className="input-field">
						<input
							id="input-days"
							placeholder="#"
							autoComplete="off"
							value={inputDays}
							onKeyUp={() => handleSearchInputKeyUpEvent()}
							onChange={(event) =>
								setInputDays(parseFloat(event.target.value) | 0)
							}
							onClick={() => setInputDays(0)}
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
