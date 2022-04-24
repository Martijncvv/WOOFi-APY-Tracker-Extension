import React, { useState, useEffect } from 'react'
import './StakingFieldHeader.css'

const StakingFieldHeader = () => {
	return (
		<div className="staking-field-header-values">
			<div className="staking-field-header-value tooltip">WOOFi Staked</div>

			<div className="staking-field-header-value tooltip"></div>
			<div className="staking-field-header-value tooltip">APR</div>
		</div>
	)
}

export default StakingFieldHeader
