import React, { useState, useEffect } from 'react'
import './PorlInfoHeaderField.css'

const PorlInfoHeaderField = () => {
	return (
		<div className="porl-info-header-field-values">
			<div className="porl-info-header-field-value tooltip">
				Total assets
				<span className="tooltiptext">Total assets on WOOX</span>
			</div>
			<div className="porl-info-header-field-value network-info-header-field-value-2 tooltip">
				Reserves
				<span className="tooltiptext">
					Reserve ratio: Total assets / Total liabilities
				</span>
			</div>

			<div className="porl-info-header-field-value network-info-header-field-value-3 tooltip">
				Custodial
				<span className="tooltiptext">
					Custody ratio: Custodial storage / Total liabilities
				</span>
			</div>
		</div>
	)
}

export default PorlInfoHeaderField
