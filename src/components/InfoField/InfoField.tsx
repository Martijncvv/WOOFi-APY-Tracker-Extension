import './InfoField.css'
import React from 'react'

const InfoField = ({ symbol, apy, tvl, index }) => {
	console.log(index)
	return (
		<div
			className="info-field-values"
			style={
				parseInt(index) % 2
					? { backgroundColor: '#313641' }
					: { backgroundColor: '#3C404B', borderRadius: '4px' }
			}
		>
			<div className="info-field-value info-field-symbol">{symbol}</div>
			<div className="info-field-value">{tvl}</div>
			<div className="info-field-value">{apy}</div>
		</div>
	)
}

export default InfoField
