import React, { useState, useEffect } from 'react'
import './DexTradesHeaderField.css'

const EthIcon = require('../../static/images/ETH_logo.png')

const DexTradesHeaderField = () => {
	return (
		<div className="dextrades-header-field-values">
			<div className="dextrades-header-field-value tooltip">
				Account
				<span className="tooltiptext">Taker Buy/ Sell Ratio</span>
			</div>

			<div className="dextrades-header-field-value network-info-header-field-value-2 tooltip">
				WOO
				<img id="dextrades-header-image" src={EthIcon} />
				<span className="tooltiptext">Taker Buy/ Sell Ratio</span>
			</div>

			<div className="dextrades-header-field-value network-info-header-field-value-3 tooltip">
				Age
				<span className="tooltiptext">Taker Buy/ Sell Ratio</span>
			</div>
		</div>
	)
}

export default DexTradesHeaderField
