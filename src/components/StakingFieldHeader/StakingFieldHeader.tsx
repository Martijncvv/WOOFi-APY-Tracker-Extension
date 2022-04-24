import React, { useState, useEffect } from 'react'
import './StakingFieldHeader.css'

const StakingFieldHeader = () => {
	return (
		<div className="staking-field-header-values">
			<div className="staking-field-header-value tooltip">
				WOO Staked
				<span className="tooltiptext">24-hr WOO Network Vol. </span>
			</div>
		</div>
	)
}

export default StakingFieldHeader
