import React, { useState, useEffect } from 'react'
import './YieldFieldHeader.css'

const YieldFieldHeader = ({ logo }) => {
	return (
		<div className="yield-field-header-values">
			<div className="yield-field-header-value yield-field-header-logo">
				<img src={logo} />
			</div>
			<div className="yield-field-header-value">TVL</div>
			<div className="yield-field-header-value">APY</div>
		</div>
	)
}

export default YieldFieldHeader

// #E13F3F
