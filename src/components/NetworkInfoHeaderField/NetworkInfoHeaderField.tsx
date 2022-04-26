import React, { useState, useEffect } from 'react'
import './NetworkInfoHeaderField.css'

const NetworkInfoHeaderField = () => {
	return (
		<div className="network-info-header-field-values">
			<div className="network-info-header-field-value tooltip">
				WOO X<span className="tooltiptext">24-hr WOO X Vol.</span>
			</div>
			<div className="network-info-header-field-value network-info-header-field-value-2 tooltip">
				WOOFi
				<span className="tooltiptext">24-hr WOOFi Trading Vol.</span>
			</div>

			<div className="network-info-header-field-value network-info-header-field-value-3 tooltip">
				Futures
				<span className="tooltiptext">24-hr WOO X Futures Vol.</span>
			</div>
		</div>
	)
}

export default NetworkInfoHeaderField
