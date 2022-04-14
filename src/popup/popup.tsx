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
const FtmIcon = require('../static/images/FTM_logo.png')

import {
	fetchWooFiChainInfo,
	fetchWooFiChainStakedInfo,
	fetchWoofiChain1DVolume,
	fetchWooNetworkInfo,
	fetchWooNetworkFutureInfo,
} from '../utils/api'
import { amountFormatter } from '../utils/amountFormatter'

const App = () => {
	let chainIds = ['avax', 'bsc', 'fantom']
	let chainNames = ['Avalanche', 'BNB Chain', 'Fantom']
	let chainLogos = [AvaxIcon, BnbChainIcon, FtmIcon]

	const [wooNetworkInfo, setWooNetworkInfo] = useState<any>()
	const [wooFiEarnInfo, setWooFiEarnInfo] = useState<any>({})
	const [woofi1DTotalVolume, setWoofi1DTotalVolume] = useState<number>(null)
	const [stakedWooAmount, setStakedWooAmount] = useState<number>(null)
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
		getWoofiEarnInfo()
		getChainsInfo()
		getFuturesInfo()
		getWooNetworkInfo()
		getWooFiVolumesInfo()
		getStakedWooInfo()
	}, [])

	async function getWoofiEarnInfo() {
		try {
			for (let chainId of chainIds) {
				let chainEarnInfo = {}
				chainEarnInfo[chainId] = await fetchWooFiChainInfo(chainId)

				console.log('chainEarnInfo', chainEarnInfo)

				setWooFiEarnInfo((wooFiEarnInfo) => ({
					...wooFiEarnInfo,
					...chainEarnInfo,
				}))

				setWoofiTVL(
					(woofiTVL) => woofiTVL + chainEarnInfo[chainId].data.total_deposit
				)
			}
		} catch (err) {
			console.log(err)
		}
	}

	async function getStakedWooInfo() {
		try {
			for (let chainId of chainIds) {
				let stakedWooChainInfo: any = await fetchWooFiChainStakedInfo(chainId)

				setStakedWooAmount(
					(stakedWooAmount) =>
						stakedWooAmount +
						parseInt(stakedWooChainInfo.data.woo.total_staked) / 10 ** 18
				)
			}
		} catch (err) {
			console.log(err)
		}
	}

	async function getWooNetworkInfo() {
		setWooNetworkInfo(await fetchWooNetworkInfo())
	}

	async function getFuturesInfo() {
		let totalFuturesVolume = 0
		let totalFuturesOI = 0
		let wooNetworkfetchedFuturesInfo: any = await fetchWooNetworkFutureInfo()

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
		for (let chainId of chainIds) {
			let chain1DVolumeInfo: any = await fetchWoofiChain1DVolume(chainId)

			setWoofi1DTotalVolume(
				(woofi1DTotalVolume) =>
					woofi1DTotalVolume +
					parseInt(chain1DVolumeInfo.data['24h_volume_usd'])
			)
		}
	}

	const handleCalculatorChange = () => {
		setDisplayCalculator(!displayCalculator)
	}

	const handleSortingChange = (_sortingOption) => {
		setSortingOption(_sortingOption)
	}
	const handleActiveTabChange = (chainId) => {
		setActiveTab(chainId)
	}

	const sortQuotes = (quotes) => {
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

			{Object.keys(wooFiEarnInfo).length > 0 && (
				<>
					<InfoField
						index={0}
						value_1={'Total'}
						value_2={`$${amountFormatter(
							parseInt(wooFiEarnInfo[activeTab].data.total_deposit) / 10 ** 18
						)}`}
						value_3={`#${
							Object.values(wooFiEarnInfo[activeTab].data.auto_compounding)
								.length
						}`}
						value_4={''}
					/>

					{sortQuotes(
						Object.values(wooFiEarnInfo[activeTab].data.auto_compounding)
					).map((tokenInfo, index) => (
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

// volumeWoox 	volumeWoofi		futureVolume
//				networkVolume

// tvlWoofi 	stakedWoofi		futuresOi

// stakingAprWoofi stakedWoox
