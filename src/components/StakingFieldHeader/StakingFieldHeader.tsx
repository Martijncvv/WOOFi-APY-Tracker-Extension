import React, { useState, useEffect } from 'react'
import './StakingFieldHeader.css'

const StakingFieldHeader = () => {
	return (
		<div className="staking-field-header-values">
			<div className="staking-field-header-value tooltip">
				Staked
				<span className="tooltiptext">Staked WOO + Top APR</span>
			</div>

			<div className="staking-field-header-value staking-field-header-value-2 tooltip"></div>
			<div className="staking-field-header-value staking-field-header-value-3 tooltip">
				Sources
				<span className="tooltiptext">Past 30 days Volume Sources</span>
			</div>
		</div>
	)
}

export default StakingFieldHeader
