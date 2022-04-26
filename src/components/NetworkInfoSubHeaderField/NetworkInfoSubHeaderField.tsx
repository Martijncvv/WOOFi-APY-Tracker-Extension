import React, { useState, useEffect } from 'react'
import './NetworkInfoSubHeaderField.css'

const NetworkInfoSubHeaderField = () => {
	return (
		<div className="network-info-subheader-field-values">
			<div className="network-info-subheader-field-value tooltip">
				Network
				<span className="tooltiptext">24-hr WOO Network Vol.</span>
			</div>
			<div className="network-info-subheader-field-value network-info-header-field-value-2 tooltip">
				TVL
				<span className="tooltiptext">WOOFi Total Value Locked</span>
			</div>

			<div className="network-info-subheader-field-value network-info-header-field-value-3 tooltip">
				Open Int.
				<span className="tooltiptext">Open Interest WOO X Futures</span>
			</div>
		</div>
	)
}

export default NetworkInfoSubHeaderField
