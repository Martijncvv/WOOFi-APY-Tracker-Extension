import React, { useState, useEffect } from 'react'
import './YieldFieldHeader.css'

interface YieldFieldHeaderProps {
	logo: string
	value_2: string
	value_3: string
}

const YieldFieldHeader: React.FC<YieldFieldHeaderProps> = ({
	logo,
	value_2,
	value_3,
}) => {
	return (
		<div className="yield-field-header-values">
			<div className="yield-field-header-value yield-field-header-logo">
				<img src={logo} />
			</div>
			<div className="yield-field-header-value">{value_2}</div>
			<div className="yield-field-header-value">{value_3}</div>
		</div>
	)
}

export default YieldFieldHeader

// #E13F3F
