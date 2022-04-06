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
	fetchWooBscStakedInfo,
	fetchBsc1DVolume,
	fetchAvaxNetworkInfo,
	fetchWooAvaxStakedInfo,
	fetchAvax1DVolume,
	fetchWooNetworkInfo,
	fetchWooNetworkFutureInfo,
} from '../utils/api'
import { amountFormatter } from '../utils/amountFormatter'

const App = () => {
	const [bscNetworkEarnInfo, setBscNetworkEarnInfo] = useState<any[]>([])
	const [stakedWooAmount, setStakedWooAmount] = useState<number>(0)

	const [avaxNetworkEarnInfo, setAvaxNetworkEarnInfo] = useState<any[]>([])
	const [wooFi1DTotalVolume, setWooFi1DTotalVolume] = useState<number>(0)
	const [wooNetworkInfo, setWooNetworkInfo] = useState<any>()
	const [wooNetworkFuturesVolume, setWooNetworkFuturesVolume] = useState<
		number
	>(0)

	const [displayCalculator, setDisplayCalculator] = React.useState<boolean>(
		false
	)
	const [sortingOption, setSortingOption] = React.useState<string>('apy')

	useEffect(() => {
		getFuturesInfo()
		getWooNetworkInfo()
		getWooFiVolumesInfo()
		getaWooFiApyInfo()
		getStakedWooInfo()
	}, [])

	async function getaWooFiApyInfo() {
		let bscNetworkFetchedInfo: any
		let avaxNetworkFetchedInfo: any

		try {
			;[bscNetworkFetchedInfo, avaxNetworkFetchedInfo] = await Promise.all([
				fetchBscNetworkInfo(),
				fetchAvaxNetworkInfo(),
			])
			console.log('bscNetworkFetchedInfo', bscNetworkFetchedInfo)
			console.log('avaxNetworkFetchedInfo', avaxNetworkFetchedInfo)
		} catch (err) {
			console.log(err)
		}

		let bscTokensInfo = Object.values(
			bscNetworkFetchedInfo.data.auto_compounding
		)
		setBscNetworkEarnInfo(bscTokensInfo)

		let avaxTokensInfo = Object.values(
			avaxNetworkFetchedInfo.data.auto_compounding
		)
		setAvaxNetworkEarnInfo(avaxTokensInfo)
	}

	async function getStakedWooInfo() {
		let stakedWooBscFetchedInfo: any
		let stakedWooAvaxFetchedInfo: any

		try {
			;[stakedWooBscFetchedInfo, stakedWooAvaxFetchedInfo] = await Promise.all([
				fetchWooBscStakedInfo(),
				fetchWooAvaxStakedInfo(),
			])
		} catch (err) {
			console.log(err)
		}
		setStakedWooAmount(
			(parseInt(stakedWooBscFetchedInfo.data.woo.total_staked) +
				parseInt(stakedWooAvaxFetchedInfo.data.woo.total_staked)) /
				10 ** 18
		)
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

	const handleCalculatorChange = () => {
		setDisplayCalculator(!displayCalculator)
	}

	const handleSortingChange = (_sortingOption) => {
		setSortingOption(_sortingOption)
		console.log('_sortingOption', _sortingOption)
	}

	const sortQuotes = (quotes) => {
		console.log('quotes', quotes)
		console.log('sortingOption', sortingOption)
		switch (sortingOption) {
			case 'tvl':
				return quotes.sort(compareTvl)
			case 'quote':
				return quotes.sort(compareSymbol)
			default:
				return quotes.sort(compareApy)
		}
	}

	const compareApy = (a, b) => {
		if (a.apy > b.apy) {
			return -1
		}
		if (a.apy < b.apy) {
			return 1
		}
		return 0
	}

	const compareTvl = (a, b) => {
		if (
			parseInt(a.tvl) / 10 ** a.decimals >
			parseInt(b.tvl) / 10 ** b.decimals
		) {
			return -1
		}
		if (
			parseInt(a.tvl) / 10 ** a.decimals <
			parseInt(b.tvl) / 10 ** b.decimals
		) {
			return 1
		}
		return 0
	}

	const compareSymbol = (a, b) => {
		if (a.symbol[0] < b.symbol[0]) {
			return -1
		}
		if (a.symbol[0] > b.symbol[0]) {
			return 1
		}
		return 0
	}

	return (
		<>
			<HeaderField />
			{displayCalculator && <InteractionField />}

			<WooNetworkFieldHeader />
			{wooNetworkInfo && (
				<InfoField
					index={2}
					value_1={`$${amountFormatter(wooNetworkInfo.data.amount)}`}
					value_2={`$${amountFormatter(wooFi1DTotalVolume / 10 ** 18)}`}
					value_3={`$${amountFormatter(wooNetworkFuturesVolume)} `}
					value_4={`${amountFormatter(stakedWooAmount)} `}
				/>
			)}

			<YieldFieldHeader
				logo={BscIcon}
				value_2={'tvl'}
				value_3={'apy'}
				displayCalculatorCallback={handleCalculatorChange}
				sortingOptionCallback={handleSortingChange}
				displayCalculator={displayCalculator}
			/>

			{bscNetworkEarnInfo.length > 0 &&
				sortQuotes(bscNetworkEarnInfo).map((tokenInfo, index) => (
					<InfoField
						key={index}
						index={index}
						value_1={tokenInfo.symbol.replaceAll('_', '-').replace('-LP', '')}
						value_2={`$${amountFormatter(
							parseInt(tokenInfo.tvl) / 10 ** tokenInfo.decimals
						)}`}
						value_3={`${tokenInfo.apy.toPrecision(3)}%`}
						value_4={''}
					/>
				))}

			<YieldFieldHeader
				logo={AvaxIcon}
				value_2={''}
				value_3={''}
				displayCalculatorCallback={''}
				sortingOptionCallback={''}
				displayCalculator={displayCalculator}
			/>
			{avaxNetworkEarnInfo.length > 0 &&
				sortQuotes(avaxNetworkEarnInfo).map((tokenInfo, index) => (
					<InfoField
						key={index}
						index={index}
						value_1={tokenInfo.symbol.replaceAll('_', '-').replace('-LP', '')}
						value_2={`$${amountFormatter(
							parseInt(tokenInfo.tvl) / 10 ** tokenInfo.decimals
						)}`}
						value_3={`${tokenInfo.apy.toPrecision(3)}%`}
						value_4={''}
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
