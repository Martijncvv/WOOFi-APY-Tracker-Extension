import './HeaderField.css'
import React from 'react'
const WOOFiIcon = require('../../static/images/WOOFi_logo.png')

const HeaderField: React.FC<{}> = ({}) => {
	return (
		<div id="header">
			<div id="img-box">
				<img src={WOOFiIcon} />
			</div>

			<div>
				<h1>WOOFi APYs</h1>
			</div>
		</div>
	)
}

export default HeaderField
