import React, { useState, useEffect } from 'react'
import './NetworkInfoSubHeaderField.css'

const NetworkInfoSubHeaderField = () => {
	return (
		<div className="network-info-subheader-field-values">
			<div className="network-info-subheader-field-value">
				WOO X{/* <span className="tooltiptext">24-hr WOO Network Vol.</span> */}
			</div>
			<div className="network-info-subheader-field-value network-info-header-field-value-2">
				TVL
				{/* <span className="tooltiptext">24-hr WOO X Trading Vol.</span> */}
			</div>

			<div className="network-info-subheader-field-value network-info-header-field-value-3">
				Open Int.
				{/* <span className="tooltiptext">24-hr WOO X Futures Vol.</span> */}
			</div>
		</div>
	)
}

export default NetworkInfoSubHeaderField
