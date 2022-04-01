import React, { useState, useEffect } from 'react'
import './WooNetworkFieldHeader.css'

const WooNetworkFieldHeader = () => {
	return (
		<div className="woonetwork-field-header-values">
			<div className="woonetwork-field-header-value woonetwork-field-header-logo">
				Network
			</div>
			<div className="woonetwork-field-header-value">WOOFi</div>
			<div className="woonetwork-field-header-value">Futures</div>
			<div className="woonetwork-field-header-value">Staked</div>
		</div>
	)
}

export default WooNetworkFieldHeader
