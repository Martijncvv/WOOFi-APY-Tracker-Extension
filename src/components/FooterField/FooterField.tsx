import './FooterField.css'
import React from 'react'
const WOOFiIcon = require('../../static/images/WOOFi_logo.png')

const FooterField: React.FC<{}> = ({}) => {
	return (
		<div id="footer-field">
			<p>
				Powered by WOO Network API{' '}
				<img id="WooFi_footer_icon" src={WOOFiIcon} />{' '}
			</p>
		</div>
	)
}

export default FooterField
