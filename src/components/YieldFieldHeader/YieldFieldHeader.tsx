import React, { useState, useEffect } from 'react'
import './YieldFieldHeader.css'

import IconButton from '@mui/material/IconButton'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'

interface YieldFieldHeaderProps {
	logo: string
	value_2: string
	value_3: string
	functionCallback: any
	displayCalculator: boolean
}

const YieldFieldHeader: React.FC<YieldFieldHeaderProps> = ({
	logo,
	value_2,
	value_3,
	functionCallback,
	displayCalculator,
}) => {
	return (
		<div className="yield-field-header-values">
			<div className="yield-field-header-value yield-field-header-logo">
				<img src={logo} />
			</div>
			<div className="yield-field-header-value">{value_2}</div>
			<div className="yield-field-header-value">
				{value_3}
				{functionCallback && (
					<IconButton
						style={{
							padding: '0 0 3px 8px',
							color: displayCalculator ? '#73bef4' : '#3c404b',
						}}
						aria-label="Calculate Yield"
						onClick={() => functionCallback()}
						size="small"
					>
						<CalculateOutlinedIcon fontSize="small" />
					</IconButton>
				)}
			</div>
		</div>
	)
}

export default YieldFieldHeader
