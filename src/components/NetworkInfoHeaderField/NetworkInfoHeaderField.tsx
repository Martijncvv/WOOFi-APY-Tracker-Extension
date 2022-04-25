import React, { useState, useEffect } from 'react'
import './NetworkInfoHeaderField.css'

const NetworkInfoHeaderField = () => {
	return (
		<div className="network-info-header-field-values">
			<div className="network-info-header-field-value">
				Network
				{/* <span className="tooltiptext">24-hr WOO Network Vol.</span> */}
			</div>
			<div className="network-info-header-field-value network-info-header-field-value-2">
				WOOFi
				{/* <span className="tooltiptext">24-hr WOO X Trading Vol.</span> */}
			</div>

			<div className="network-info-header-field-value network-info-header-field-value-3">
				Futures
				{/* <span className="tooltiptext">24-hr WOO X Futures Vol.</span> */}
			</div>
		</div>
	)
}

export default NetworkInfoHeaderField
