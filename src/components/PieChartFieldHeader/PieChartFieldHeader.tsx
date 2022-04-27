import React, { useState, useEffect } from 'react'
import './PieChartFieldHeader.css'

const PieChartFieldHeader = () => {
	return (
		<div className="piechart-field-header-values">
			<div className="piechart-field-header-value tooltip">
				Staked
				<span className="tooltiptext">Staked WOO + APR</span>
			</div>

			<div className="piechart-field-header-value piechart-field-header-value-2 tooltip"></div>
			<div className="piechart-field-header-value piechart-field-header-value-3 tooltip">
				Sources
				<span className="tooltiptext">Past 30 days Volume Sources</span>
			</div>
		</div>
	)
}

export default PieChartFieldHeader
