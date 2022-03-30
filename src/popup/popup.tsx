import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './popup.css'
import FooterField from '../components/FooterField'
import HeaderField from '../components/HeaderField'
import InfoField from '../components/InfoField'
import YieldFieldHeader from '../components/YieldFieldHeader'
import WooNetworkFieldHeader from '../components/WooNetworkFieldHeader'
import LinksField from '../components/LinksField'
import InteractionField from '../components/InteractionField'

const BscIcon = require('../static/images/BNB_logo.png')
const AvaxIcon = require('../static/images/AVAX_logo.png')

import {
	fetchBscNetworkInfo,
	fetchBscStakedInfo,
	fetchBsc1DVolume,
	fetchAvaxNetworkInfo,
	fetchAvaxStakedInfo,
	fetchAvax1DVolume,
	fetchWooNetworkInfo,
	fetchWooNetworkFutureInfo,
} from '../utils/api'
import { amountFormatter } from '../utils/amountFormatter'

const App = () => {
	const [bscNetworkEarnInfo, setBscNetworkEarnInfo] = useState([])
	const [avaxNetworkEarnInfo, setAvaxNetworkEarnInfo] = useState([])
	const [wooFi1DTotalVolume, setWooFi1DTotalVolume] = useState(0)
	const [wooNetworkInfo, setWooNetworkInfo] = useState()
	const [wooNetworkFuturesVolume, setWooNetworkFuturesVolume] = useState(0)

	const [dispayCalculator, setDispayCalculator] = React.useState<boolean>(false)

	useEffect(() => {
		getFuturesInfo()
		getWooNetworkInfo()
		getWooFiVolumesInfo()
		getaWooFiApyInfo()
	}, [])

	const handleCalculatorChange = () => {
		setDispayCalculator(!dispayCalculator)
	}

	async function getaWooFiApyInfo() {
		let bscNetworkFetchedInfo: any = await fetchBscNetworkInfo()
		let bscTokensInfo = Object.values(
			bscNetworkFetchedInfo.data.auto_compounding
		)

		setBscNetworkEarnInfo(bscTokensInfo.sort(compare))

		let avaxNetworkFetchedInfo: any = await fetchAvaxNetworkInfo()
		let avaxTokensInfo = Object.values(
			avaxNetworkFetchedInfo.data.auto_compounding
		)

		setAvaxNetworkEarnInfo(avaxTokensInfo.sort(compare))
	}

	async function getWooNetworkInfo() {
		let wooNetworkfetchedInfo: any = await fetchWooNetworkInfo()

		setWooNetworkInfo(wooNetworkfetchedInfo)
	}

	async function getFuturesInfo() {
		let totalFuturesVolume = 0
		let wooNetworkfetchedFuturesInfo: any = await fetchWooNetworkFutureInfo()

		for (let i = 0; i < wooNetworkfetchedFuturesInfo.rows.length; i++) {
			totalFuturesVolume +=
				wooNetworkfetchedFuturesInfo.rows[i]['24h_volumn'] *
				wooNetworkfetchedFuturesInfo.rows[i]['mark_price']
		}
		setWooNetworkFuturesVolume(totalFuturesVolume)
	}

	async function getWooFiVolumesInfo() {
		let bsc1DVolumefetchedInfo: any = await fetchBsc1DVolume()
		let avax1DVolumefetchedInfo: any = await fetchAvax1DVolume()
		let totalWooFiVolume =
			parseInt(bsc1DVolumefetchedInfo.data['24h_volume_usd']) +
			parseInt(avax1DVolumefetchedInfo.data['24h_volume_usd'])

		setWooFi1DTotalVolume(totalWooFiVolume)
	}

	const compare = (a, b) => {
		if (a.apy > b.apy) {
			return -1
		}
		if (a.apy < b.apy) {
			return 1
		}

		return 0
	}

	return (
		<>
			<HeaderField />
			{dispayCalculator && <InteractionField />}

			<WooNetworkFieldHeader />
			{wooNetworkInfo && (
				<InfoField
					index={2}
					symbol={`$${amountFormatter(wooNetworkInfo.data.amount)}`}
					tvl={`$${amountFormatter(wooFi1DTotalVolume / 10 ** 18)}`}
					apy={`$${amountFormatter(wooNetworkFuturesVolume)} `}
				/>
			)}

			<YieldFieldHeader
				logo={BscIcon}
				value_2={'TVL'}
				value_3={'APY'}
				functionCallback={handleCalculatorChange}
			/>

			{bscNetworkEarnInfo.length > 0 &&
				bscNetworkEarnInfo.map((tokenInfo, index) => (
					<InfoField
						key={index}
						index={index}
						symbol={tokenInfo.symbol.replaceAll('_', '-').replace('-LP', '')}
						tvl={`$${amountFormatter(parseInt(tokenInfo.tvl) / 10 ** 18)}`}
						apy={`${tokenInfo.apy.toPrecision(3)}%`}
					/>
				))}

			<YieldFieldHeader
				logo={AvaxIcon}
				value_2={''}
				value_3={''}
				functionCallback={''}
			/>
			{avaxNetworkEarnInfo.length > 0 &&
				avaxNetworkEarnInfo.map((tokenInfo, index) => (
					<InfoField
						key={index}
						index={index}
						symbol={tokenInfo.symbol.replaceAll('_', '-').replace('-LP', '')}
						tvl={`$${amountFormatter(parseInt(tokenInfo.tvl) / 10 ** 18)}`}
						apy={`${tokenInfo.apy.toPrecision(3)}%`}
					/>
				))}
			<LinksField
				twitterHandle="WOOnetwork"
				discordHandle="woonetwork"
				telegramHandle="woonetwork"
			/>
			<FooterField />
		</>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
