import React, { useState, useEffect } from 'react'
import './DaoGeneralInfoHeader.css'

const DaoGeneralInfoHeader = () => {
	return (
		<div className="dao-general-info-header-values">
			<div className="dao-general-info-header-value tooltip">
				Treasury
				{/* <span className="tooltiptext"></span> */}
			</div>

			<div className="dao-general-info-header-value dao-general-info-header-value-2 tooltip">
				Members
			</div>
			<div className="dao-general-info-header-value dao-general-info-header-value-3 tooltip">
				Proposals
			</div>
		</div>
	)
}

export default DaoGeneralInfoHeader
