import './LinksField.css'
import React from 'react'

const WOOFiIcon = require('../../static/images/WOOFi_logo.png')
const TwitterIcon = require('../../static/images/Twitter_logo.png')
const DiscordIcon = require('../../static/images/Discord_logo.png')
const TelegramIcon = require('../../static/images/Telegram_logo.png')

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import QueryStatsIcon from '@mui/icons-material/QueryStats'

interface LinksFieldProps {
	twitterHandle: string
	discordHandle: string
	telegramHandle: string
	displayDexTradesCallback: boolean
	setDisplayDexTradesCallback: any
}

const LinksField: React.FC<LinksFieldProps> = ({
	twitterHandle,
	discordHandle,
	telegramHandle,
	setDisplayDexTradesCallback,
	displayDexTradesCallback,
}) => {
	function handleOpenTab(link) {
		chrome.tabs.create({ url: link, selected: false })
	}

	function handleDisplayDexTradesButton() {
		setDisplayDexTradesCallback(!displayDexTradesCallback)
	}

	return (
		<div id="links-field">
			<img
				className="link-icon"
				src={WOOFiIcon}
				onClick={() => handleOpenTab(`https://fi.woo.org/earn/`)}
			/>
			{twitterHandle && (
				<img
					className="link-icon"
					src={TwitterIcon}
					onClick={() =>
						handleOpenTab(`https://www.twitter.com/${twitterHandle}`)
					}
				/>
			)}
			{discordHandle && (
				<img
					className="link-icon"
					src={DiscordIcon}
					onClick={() => handleOpenTab(`https://discord.gg/mvnhMsZb`)}
				/>
			)}
			{telegramHandle && (
				<img
					className="link-icon"
					src={TelegramIcon}
					onClick={() => handleOpenTab(`https://t.me/${telegramHandle}`)}
				/>
			)}
			{displayDexTradesCallback ? (
				<QueryStatsIcon
					fontSize="small"
					className="link-icon"
					style={{
						height: '18px',
						padding: '0 4px 0 0',
						color: '#73bef4',
					}}
					onClick={() => handleDisplayDexTradesButton()}
				/>
			) : (
				<CurrencyExchangeIcon
					fontSize="small"
					className="link-icon"
					style={{
						height: '18px',
						padding: '0 4px 0 0',
						color: '#73bef4',
					}}
					onClick={() => handleDisplayDexTradesButton()}
				/>
			)}
		</div>
	)
}

export default LinksField
