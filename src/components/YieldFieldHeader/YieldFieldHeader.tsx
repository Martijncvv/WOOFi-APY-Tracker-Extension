import React, { useState, useEffect } from 'react'
import './YieldFieldHeader.css'

import IconButton from '@mui/material/IconButton'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import SortIcon from '@mui/icons-material/Sort'

interface YieldFieldHeaderProps {
	logo: string
	value_2: string
	value_3: string
	displayCalculatorCallback: any
	sortingOptionCallback: any
	displayCalculator: boolean
}

const YieldFieldHeader: React.FC<YieldFieldHeaderProps> = ({
	logo,
	value_2,
	value_3,
	displayCalculatorCallback,
	sortingOptionCallback,
	displayCalculator,
}) => {
	async function handleHeaderClick(sortingOtion) {
		sortingOptionCallback(sortingOtion)
	}

	return (
		<div className="yield-field-header-values">
			<div
				className="yield-field-header-value yield-field-header-logo"
				onClick={() => handleHeaderClick('quote')}
			>
				<img src={logo} />
			</div>
			<div
				className="yield-field-header-value"
				onClick={() => handleHeaderClick(value_2)}
			>
				{value_2 && (
					<>
						{value_2}
						<SortIcon
							style={{
								padding: '0',
								margin: '0 0 -1px -6px',
								color: '#3c404b',
							}}
							fontSize="small"
						/>
					</>
				)}
			</div>
			<div className="yield-field-header-value">
				<div onClick={() => handleHeaderClick(value_3)}>{value_3}</div>
				{displayCalculatorCallback && (
					<IconButton
						style={{
							padding: '0',
							margin: '0',
							color: displayCalculator ? '#73bef4' : '#3c404b',
						}}
						aria-label="Calculate Yield"
						onClick={() => displayCalculatorCallback()}
						size="small"
					>
						<CalculateOutlinedIcon
							fontSize="small"
							style={{
								padding: '0',
								margin: '0 0 -1px 0',
							}}
						/>
					</IconButton>
				)}
			</div>
		</div>
	)
}

export default YieldFieldHeader
