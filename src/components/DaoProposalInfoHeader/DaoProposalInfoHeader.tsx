import React, { useState, useEffect } from 'react'
import './DaoProposalInfoHeader.css'

const DaoProposalInfoHeader = () => {
	return (
		<div className="dao-proposal-field-header-values">
			<div className="dao-proposal-field-header-value-1 tooltip">
				Proposals
				<span className="tooltiptext">DAO Proposals</span>
			</div>

			<div className="dao-proposal-field-header-value dao-proposal-field-header-value-2 tooltip"></div>
			<div className="dao-proposal-field-header-value dao-proposal-field-header-value-3 tooltip"></div>
		</div>
	)
}

export default DaoProposalInfoHeader
