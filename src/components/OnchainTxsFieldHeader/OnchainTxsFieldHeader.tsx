import React, { useState, useEffect } from 'react'
import './OnchainTxsFieldHeader.css'

const OnchainTxsFieldHeader = () => {
	return (
		<div className="onchain-chart-field-header-values">
			<div className="onchain-chart-field-header-value tooltip">
				Onchain
				<span className="tooltiptext">Past 300 on-chain WOO txs</span>
			</div>

			<div className="onchain-chart-field-header-value onchain-chart-field-header-value-2 tooltip"></div>
			<div className="onchain-chart-field-header-value onchain-chart-field-header-value-3 tooltip"></div>
		</div>
	)
}

export default OnchainTxsFieldHeader
