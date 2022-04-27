import './HeaderField.css'
import React from 'react'
const WOOFiIcon = require('../../static/images/WOOFi_logo.png')

const HeaderField: React.FC<{}> = ({}) => {
	return (
		<div id="header">
			<div id="img-box">
				<img src={WOOFiIcon} />
			</div>

			<div id="header-text">
				<h1>WOO Stats</h1>
			</div>
		</div>
	)
}

export default HeaderField
