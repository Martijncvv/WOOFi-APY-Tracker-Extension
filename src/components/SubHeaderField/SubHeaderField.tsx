import React, { useState, useEffect } from 'react'
import './SubHeaderField.css'

const SubHeaderField = ({ subHeaderTitle }) => {
	return (
		<div className="subheader-field-header-values">
			<div className="subheader-field-header-value tooltip">
				{subHeaderTitle}
			</div>
		</div>
	)
}

export default SubHeaderField
