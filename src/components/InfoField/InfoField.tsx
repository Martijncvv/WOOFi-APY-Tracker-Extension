import './InfoField.css'
import React from 'react'

const InfoField = ({ value_1, value_2, value_3, value_4, index }) => {
	return (
		<div
			className="info-field-values"
			style={
				parseInt(index) % 2
					? { backgroundColor: '#313641' }
					: { backgroundColor: '#3C404B', borderRadius: '5px' }
			}
		>
			<div className="info-field-value info-field-symbol">{value_1}</div>
			<div className="info-field-value">{value_2}</div>
			<div className="info-field-value">{value_3}</div>
			{value_4 && <div className="info-field-value">{value_4}</div>}
		</div>
	)
}

export default InfoField
