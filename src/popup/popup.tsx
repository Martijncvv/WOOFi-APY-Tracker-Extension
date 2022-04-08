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
import TabsField from '../components/TabsField'
import VolumeChartField from '../components/VolumeChartField'

const AvaxIcon = require('../static/images/AVAX_logo.png')
const BnbChainIcon = require('../static/images/BNB-Chain_logo.png')

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
	const [bscNetworkEarnTvl, setBscNetworkEarnTvl] = useState<string>('')
	const [avaxNetworkEarnInfo, setAvaxNetworkEarnInfo] = useState<any[]>([])
	const [avaxNetworkEarnTvl, setAvaxNetworkEarnTvl] = useState<string>('')

	const [stakedWooAmount, setStakedWooAmount] = useState<number>(null)
	const [woofi1DTotalVolume, setWoofi1DTotalVolume] = useState<number>(null)
	const [wooNetworkInfo, setWooNetworkInfo] = useState<any>()
	const [wooNetworkFuturesVolume, setWooNetworkFuturesVolume] = useState<
		number
	>(null)
	const [wooNetworkFuturesOi, setWooNetworkFuturesOi] = useState<number>(null)
	const [woofiTVL, setWoofiTVL] = useState<number>(null)

	const [displayCalculator, setDisplayCalculator] = React.useState<boolean>(
		false
	)
	const [sortingOption, setSortingOption] = React.useState<string>('apy')
	const [chainsInfo, setChainsInfo] = React.useState<any>([])
	const [activeTab, setActiveTab] = React.useState<string>('avax')

	useEffect(() => {
		getaWoofiEarnInfo()
		getChainsInfo()
		getFuturesInfo()
		getWooNetworkInfo()
		getWooFiVolumesInfo()
		getStakedWooInfo()
	}, [])

	async function getaWoofiEarnInfo() {
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
		setBscNetworkEarnTvl(bscNetworkFetchedInfo.data.total_deposit)

		let avaxTokensInfo = Object.values(
			avaxNetworkFetchedInfo.data.auto_compounding
		)
		setAvaxNetworkEarnInfo(avaxTokensInfo)
		setAvaxNetworkEarnTvl(avaxNetworkFetchedInfo.data.total_deposit)

		setWoofiTVL(
			bscNetworkFetchedInfo.data.total_deposit +
				avaxNetworkFetchedInfo.data.total_deposit
		)
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
		let totalFuturesOI = 0
		let wooNetworkfetchedFuturesInfo: any = await fetchWooNetworkFutureInfo()
		console.log('wooNetworkfetchedFuturesInfo', wooNetworkfetchedFuturesInfo)
		for (let i = 0; i < wooNetworkfetchedFuturesInfo.rows.length; i++) {
			totalFuturesOI +=
				wooNetworkfetchedFuturesInfo.rows[i]['open_interest'] *
				wooNetworkfetchedFuturesInfo.rows[i]['mark_price']
			totalFuturesVolume +=
				wooNetworkfetchedFuturesInfo.rows[i]['24h_volumn'] *
				wooNetworkfetchedFuturesInfo.rows[i]['mark_price']
		}
		setWooNetworkFuturesVolume(totalFuturesVolume)
		setWooNetworkFuturesOi(totalFuturesOI)
	}

	async function getWooFiVolumesInfo() {
		let bsc1DVolumefetchedInfo: any = await fetchBsc1DVolume()
		let avax1DVolumefetchedInfo: any = await fetchAvax1DVolume()
		let totalWooFiVolume =
			parseInt(bsc1DVolumefetchedInfo.data['24h_volume_usd']) +
			parseInt(avax1DVolumefetchedInfo.data['24h_volume_usd'])

		setWoofi1DTotalVolume(totalWooFiVolume)
	}

	const handleCalculatorChange = () => {
		setDisplayCalculator(!displayCalculator)
	}

	const handleSortingChange = (_sortingOption) => {
		setSortingOption(_sortingOption)
		// console.log('_sortingOption', _sortingOption)
	}
	const handleActiveTabChange = (chainId) => {
		setActiveTab(chainId)
	}

	const sortQuotes = (quotes) => {
		// console.log('quotes', quotes)
		// console.log('sortingOption', sortingOption)
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

	const getChainsInfo = () => {
		let chainIds = ['avax', 'bnb']
		let chainNames = ['Avalanche', 'BNB Chain']
		let chainLogos = [AvaxIcon, BnbChainIcon]

		for (let i = 0; i < chainIds.length; i++) {
			setChainsInfo((chainsInfo) => [
				...chainsInfo,
				{ chainId: chainIds[i], chainName: chainNames[i], icon: chainLogos[i] },
			])
		}
	}

	return (
		<>
			<HeaderField />

			<WooNetworkFieldHeader />
			{wooNetworkInfo && (
				<VolumeChartField
					networkVolume={wooNetworkInfo.data.amount}
					wooxVolume={
						wooNetworkInfo.data.amount -
						wooNetworkFuturesVolume -
						woofi1DTotalVolume / 10 ** 18
					}
					woofiVolume={woofi1DTotalVolume / 10 ** 18}
					futuresVolume={wooNetworkFuturesVolume}
				/>
			)}
			{wooNetworkInfo && (
				<InfoField
					index={2}
					value_1={`$${amountFormatter(wooNetworkInfo.data.amount)}`}
					value_2={`$${amountFormatter(woofi1DTotalVolume / 10 ** 18)}`}
					value_3={`$${amountFormatter(wooNetworkFuturesVolume)} `}
					value_4={`${amountFormatter(stakedWooAmount)} `}
				/>
			)}

			{displayCalculator && <InteractionField />}
			<TabsField
				chainsInfo={chainsInfo}
				activeTabCallback={handleActiveTabChange}
				activeTab={activeTab}
			/>

			<YieldFieldHeader
				value_1={`vault`}
				value_2={'tvl'}
				value_3={'apy'}
				displayCalculatorCallback={handleCalculatorChange}
				sortingOptionCallback={handleSortingChange}
				displayCalculator={displayCalculator}
			/>
			{activeTab === 'avax' && avaxNetworkEarnInfo.length > 0 && (
				<>
					<InfoField
						index={0}
						value_1={'Total'}
						value_2={`$${amountFormatter(
							parseInt(avaxNetworkEarnTvl) / 10 ** 18
						)}`}
						value_3={`#${avaxNetworkEarnInfo.length}`}
						value_4={''}
					/>

					{sortQuotes(avaxNetworkEarnInfo).map((tokenInfo, index) => (
						<InfoField
							key={index}
							index={index + 1}
							value_1={tokenInfo.symbol.replaceAll('_', '-').replace('-LP', '')}
							value_2={`$${amountFormatter(
								parseInt(tokenInfo.tvl) / 10 ** tokenInfo.decimals
							)}`}
							value_3={`${tokenInfo.apy.toPrecision(3)}%`}
							value_4={''}
						/>
					))}
				</>
			)}

			{activeTab === 'bnb' && bscNetworkEarnInfo.length > 0 && (
				<>
					<InfoField
						index={0}
						value_1={'Total'}
						value_2={`$${amountFormatter(
							parseInt(bscNetworkEarnTvl) / 10 ** 18
						)}`}
						value_3={`#${bscNetworkEarnInfo.length}`}
						value_4={''}
					/>

					{sortQuotes(bscNetworkEarnInfo).map((tokenInfo, index) => (
						<InfoField
							key={index}
							index={index + 1}
							value_1={tokenInfo.symbol.replaceAll('_', '-').replace('-LP', '')}
							value_2={`$${amountFormatter(
								parseInt(tokenInfo.tvl) / 10 ** tokenInfo.decimals
							)}`}
							value_3={`${tokenInfo.apy.toPrecision(3)}%`}
							value_4={''}
						/>
					))}
				</>
			)}

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

// volumeWoofi		tvlWoofi		stakingAprWoofi	stakedWoofi
// networkVolume	futureVolume	futuresOi		stakedWoox

// networkVolume
// volumeWoofi
// futureVolume
// stakedWoofi

// futuresOi
// stakedWoox
// tvlWoofi
// stakingAprWoofi

// networkVolume volumeWoox volumeWoofi futureVolume

// futuresOi
// stakedWoofi
// tvlWoofi
// stakingAprWoofi

// stakedWoox
