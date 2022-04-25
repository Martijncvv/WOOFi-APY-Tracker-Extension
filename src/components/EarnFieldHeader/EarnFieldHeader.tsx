import React, { useState, useEffect } from 'react'
import './EarnFieldHeader.css'

import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import SortIcon from '@mui/icons-material/Sort'

interface EarnFieldHeaderProps {
	value_1: string
	value_2: string
	value_3: string
	displayCalculatorCallback: any
	sortingOptionCallback: any
	displayCalculator: boolean
}

const EarnFieldHeader: React.FC<EarnFieldHeaderProps> = ({
	value_1,
	value_2,
	value_3,
	displayCalculatorCallback,
	sortingOptionCallback,
	displayCalculator,
}) => {
	async function handleHeaderClick(sortingOption) {
		sortingOptionCallback(sortingOption)
	}

	return (
		<div className="earn-field-header-values">
			<div
				className="earn-field-header-value"
				onClick={() => handleHeaderClick('Vault')}
			>
				<div>{value_1}</div>
			</div>
			<div
				className="earn-field-header-value earn-field-header-value-2"
				onClick={() => handleHeaderClick(value_2)}
			>
				{value_2 && (
					<>
						{value_2}
						<SortIcon
							style={{
								height: '18px',
								padding: '0  0 0 4px',
								margin: '0',
								color: '#5d6169',
							}}
							fontSize="small"
						/>
					</>
				)}
			</div>
			<div className="earn-field-header-value earn-field-header-value-3">
				{displayCalculatorCallback && (
					<CalculateOutlinedIcon
						fontSize="small"
						style={{
							height: '18px',
							padding: '0 4px 0 0',
							margin: '0',
							color: displayCalculator ? '#73bef4' : '#5d6169',
						}}
						onClick={() => displayCalculatorCallback()}
					/>
				)}
				<div onClick={() => handleHeaderClick(value_3)}>{value_3}</div>
			</div>
		</div>
	)
}

export default EarnFieldHeader
