import './InfoField.css'
import React from 'react'

interface InfoFieldProps {
	value_1: string
	value_2: string
	value_3: string
	value_3_colour: string
	index: number
}

const InfoField: React.FC<InfoFieldProps> = ({
	value_1,
	value_2,
	value_3,
	value_3_colour,
	index,
}) => {
	return (
		<div
			className="info-field-values"
			style={
				index % 2
					? { backgroundColor: '#313641' }
					: { backgroundColor: '#3C404B', borderRadius: '5px' }
			}
		>
			<div className="info-field-value ">{value_1}</div>

			<div className="info-field-value info-field-value-2">{value_2}</div>

			<div
				className="info-field-value info-field-value-3"
				style={{ color: value_3_colour }}
			>
				{value_3}
			</div>
		</div>
	)
}

export default InfoField
