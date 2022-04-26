import React, { useState, useEffect } from 'react'
import './StakingFieldHeader.css'

const StakingFieldHeader = () => {
	return (
		<div className="staking-field-header-values">
			<div className="staking-field-header-value">Staked</div>

			<div className="staking-field-header-value staking-field-header-value-2 "></div>
			<div className="staking-field-header-value staking-field-header-value-3">
				Sources
			</div>
		</div>
	)
}

export default StakingFieldHeader
