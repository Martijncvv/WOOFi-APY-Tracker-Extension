import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './popup.css'
import FooterField from '../components/FooterField'
import HeaderField from '../components/HeaderField'
import InfoField from '../components/InfoField'
import EarnFieldHeader from '../components/EarnFieldHeader'
import NetworkInfoHeaderField from '../components/NetworkInfoHeaderField'
import NetworkInfoSubHeaderField from '../components/NetworkInfoSubHeaderField'
import LinksField from '../components/LinksField'
import CalcYieldField from '../components/CalcYieldField'
import TabsField from '../components/TabsField'
import VolumeBarField from '../components/VolumeBarField'
import PieChartField from '../components/PieChartField'
import PieChartFieldHeader from '../components/PieChartFieldHeader'
import DexTradesField from '../components/DexTradesField'
import DexTradesHeaderField from '../components/DexTradesHeaderField'

const AvaxIcon = require('../static/images/AVAX_logo.png')
const BnbChainIcon = require('../static/images/BNB-Chain_logo.png')
const FtmIcon = require('../static/images/FTM_logo.png')

import {
	fetchWoofiEarnChainInfo,
	fetchWooFiChainStakedInfo,
	fetchWoofiChain1DVolume,
	fetchWoofiChain1MVolumeSource,
	fetchWooNetworkInfo,
	fetchWooNetworkFutureInfo,
} from '../utils/api'
import { amountFormatter } from '../utils/amountFormatter'
import IChainInfo from '../models/ChainsInfo'

const App = () => {
	let chainIds: string[] = ['avax', 'bsc', 'fantom']
	let chainNames: string[] = ['Avalanche', 'BNB Chain', 'Fantom']
	let chainLogos: string[] = [AvaxIcon, BnbChainIcon, FtmIcon]
	let chainColors: string[] = ['#E84142', '#F0B90B', '#13b5ec']

	const [wooNetworkInfo, setWooNetworkInfo] = useState<any>()
	const [wooNetworkFuturesOi, setWooNetworkFuturesOi] = useState<number>(null)
	const [woofiEarnInfo, setWoofiEarnInfo] = useState<any>({})
	const [woofi1DTotalVolume, setWoofi1DTotalVolume] = useState<number>(null)
	const [woofi1MVolumeSources, setWoofi1MVolumeSources] = useState<any>({})
	const [woofiStakingInfo, setWoofiStakingInfo] = useState<any>({})

	const [totalStakedWooAmount, setTotalStakedWooAmount] = useState<number>(null)

	const [wooNetworkFuturesVolume, setWooNetworkFuturesVolume] = useState<
		number
	>(null)
	const [woofiTVL, setWoofiTVL] = useState<number>(null)

	const [displayCalculator, setDisplayCalculator] = React.useState<boolean>(
		false
	)
	const [sortingOption, setSortingOption] = React.useState<string>('apy')
	const [chainsInfo, setChainsInfo] = React.useState<IChainInfo[]>([])
	const [activeTab, setActiveTab] = React.useState<string>('avax')
	const [
		displayDexTradesCallback,
		setDisplayDexTradesCallback,
	] = React.useState<boolean>(false)

	useEffect(() => {
		getChainsInfo()
		getWoofiEarnInfo()
		getFuturesInfo()
		getWooNetworkInfo()
		getWooFiVolumesInfo()
		getStakedWooInfo()
		getWooFiVolumeSourceInfo()
	}, [])

	const getChainsInfo = () => {
		for (let i = 0; i < chainIds.length; i++) {
			setChainsInfo((chainsInfo) => [
				...chainsInfo,
				{
					chainId: chainIds[i],
					chainName: chainNames[i],
					icon: chainLogos[i],
					color: chainColors[i],
				},
			])
		}
	}

	async function getWoofiEarnInfo() {
		try {
			for (let chainId of chainIds) {
				let chainEarnInfo = {}
				chainEarnInfo[chainId] = await fetchWoofiEarnChainInfo(chainId)

				setWoofiEarnInfo((woofiEarnInfo) => ({
					...woofiEarnInfo,
					...chainEarnInfo,
				}))

				setWoofiTVL(
					(woofiTVL) =>
						woofiTVL +
						parseInt(chainEarnInfo[chainId].data.total_deposit) / 10 ** 18
				)
			}
		} catch (err) {
			console.log(err)
		}
	}

	async function getStakedWooInfo() {
		try {
			for (let chainId of chainIds) {
				let chainStakeInfo = {}
				chainStakeInfo[chainId] = await fetchWooFiChainStakedInfo(chainId)

				setWoofiStakingInfo((woofiStakingInfo) => ({
					...woofiStakingInfo,
					...chainStakeInfo,
				}))

				setTotalStakedWooAmount(
					(totalStakedWooAmount) =>
						totalStakedWooAmount +
						parseInt(chainStakeInfo[chainId].data.woo.total_staked) / 10 ** 18
				)
			}
		} catch (err) {
			console.log(err)
		}
	}

	async function getWooNetworkInfo() {
		try {
			setWooNetworkInfo(await fetchWooNetworkInfo())
		} catch (err) {
			console.log(err)
		}
	}

	async function getFuturesInfo() {
		try {
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
		} catch (err) {
			console.log(err)
		}
	}

	async function getWooFiVolumesInfo() {
		try {
			for (let chainId of chainIds) {
				let chain1DVolumeInfo: any = await fetchWoofiChain1DVolume(chainId)

				setWoofi1DTotalVolume(
					(woofi1DTotalVolume) =>
						woofi1DTotalVolume +
						parseInt(chain1DVolumeInfo.data['24h_volume_usd'])
				)
			}
		} catch (err) {
			console.log(err)
		}
	}

	async function getWooFiVolumeSourceInfo() {
		try {
			for (let chainId of chainIds) {
				let chainVolumeSourceInfo = {}
				chainVolumeSourceInfo[chainId] = await fetchWoofiChain1MVolumeSource(
					chainId
				)

				setWoofi1MVolumeSources((woofi1MVolumeSources) => ({
					...woofi1MVolumeSources,
					...chainVolumeSourceInfo,
				}))
			}
		} catch (err) {
			console.log(err)
		}

		console.log()
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
			case 'TVL':
				return quotes.sort(compareTvl)
			case 'Vault':
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
			<div id="dashboard">
				{displayDexTradesCallback && (
					<>
						<DexTradesHeaderField />
						<DexTradesField />
					</>
				)}
				{!displayDexTradesCallback && (
					<>
						{wooNetworkInfo && (
							<>
								<NetworkInfoHeaderField />
								<VolumeBarField
									wooxVolume={
										wooNetworkInfo.data.amount -
										wooNetworkFuturesVolume -
										woofi1DTotalVolume / 10 ** 18
									}
									woofiVolume={woofi1DTotalVolume / 10 ** 18}
									futuresVolume={wooNetworkFuturesVolume}
								/>

								<InfoField
									index={2}
									value_1={`$${amountFormatter(
										wooNetworkInfo.data.amount -
											woofi1DTotalVolume / 10 ** 18 -
											wooNetworkFuturesVolume
									)} `}
									value_2={`$${amountFormatter(woofi1DTotalVolume / 10 ** 18)}`}
									value_3={`$${amountFormatter(wooNetworkFuturesVolume)} `}
								/>
							</>
						)}

						<NetworkInfoSubHeaderField />
						{wooNetworkInfo && woofiTVL && wooNetworkFuturesOi && (
							<InfoField
								index={2}
								value_1={`$${amountFormatter(wooNetworkInfo.data.amount)}`}
								value_2={`$${amountFormatter(woofiTVL)}`}
								value_3={`$${amountFormatter(wooNetworkFuturesOi)} `}
							/>
						)}

						<PieChartFieldHeader />
						{chainsInfo.length > 0 &&
							Object.keys(woofiStakingInfo).length > 0 &&
							Object.keys(woofi1MVolumeSources).length > 0 && (
								<PieChartField
									chainsInfo={chainsInfo}
									totalStakedWooAmount={totalStakedWooAmount}
									woofiStakingInfo={woofiStakingInfo}
									woofi1MVolumeSources={woofi1MVolumeSources}
									activeTab={activeTab}
								/>
							)}

						<TabsField
							chainsInfo={chainsInfo}
							activeTabCallback={handleActiveTabChange}
							activeTab={activeTab}
						/>
						{displayCalculator && <CalcYieldField />}
						<EarnFieldHeader
							value_1={`Vault`}
							value_2={'TVL'}
							value_3={'APY'}
							displayCalculatorCallback={handleCalculatorChange}
							sortingOptionCallback={handleSortingChange}
							displayCalculator={displayCalculator}
						/>

						{Object.keys(woofiEarnInfo).length > 0 && (
							<>
								<InfoField
									index={0}
									value_1={'Total'}
									value_2={`$${amountFormatter(
										parseInt(woofiEarnInfo[activeTab].data.total_deposit) /
											10 ** 18
									)}`}
									value_3={`#${
										Object.values(
											woofiEarnInfo[activeTab].data.auto_compounding
										).length
									}`}
								/>

								{sortQuotes(
									Object.values(woofiEarnInfo[activeTab].data.auto_compounding)
								).map((tokenInfo, index) => (
									<InfoField
										key={index}
										index={index + 1}
										value_1={tokenInfo.symbol
											.replaceAll('_', '-')
											.replace('-LP', '')}
										value_2={`$${amountFormatter(
											parseInt(tokenInfo.tvl) / 10 ** tokenInfo.decimals
										)}`}
										value_3={`${tokenInfo.apy.toPrecision(3)}%`}
									/>
								))}
							</>
						)}
					</>
				)}
			</div>

			<LinksField
				twitterHandle="WOOnetwork"
				discordHandle="woonetwork"
				telegramHandle="woonetwork"
				displayDexTradesCallback={displayDexTradesCallback}
				setDisplayDexTradesCallback={setDisplayDexTradesCallback}
			/>
			<FooterField />
		</>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
