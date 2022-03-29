import React, { useState, useEffect } from 'react'
import './WooNetworkFieldHeader.css'

const WooNetworkFieldHeader = () => {
	// const [logoUrl, setLogoUrl] = useState()

	// useEffect(() => {}, [])

	return (
		<div className="woonetwork-field-header-values">
			<div className="woonetwork-field-header-value woonetwork-field-header-logo">
				Total Volume
			</div>
			<div className="woonetwork-field-header-value">WOOFi</div>
			<div className="woonetwork-field-header-value">Futures</div>
		</div>
	)
}

export default WooNetworkFieldHeader
