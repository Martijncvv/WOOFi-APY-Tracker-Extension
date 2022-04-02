import React, { useState, useEffect } from 'react'
import './WooNetworkFieldHeader.css'

const WooNetworkFieldHeader = () => {
	return (
		<div className="woonetwork-field-header-values">
			<div className="woonetwork-field-header-value woonetwork-field-header-logo tooltip">
				Network
				<span className="tooltiptext">24-hr WOO Network Vol. </span>
			</div>
			<div className="woonetwork-field-header-value tooltip">
				WOOFi
				<span className="tooltiptext">24-hr WOOFi Trading Vol. </span>
			</div>
			<div className="woonetwork-field-header-value tooltip">
				Futures
				<span className="tooltiptext">24-hr WOO X Futures Vol. </span>
			</div>
			<div className="woonetwork-field-header-value tooltip">
				Staked
				<span className="tooltiptext">WOO staked on WOOFi </span>
			</div>
		</div>
	)
}

export default WooNetworkFieldHeader
