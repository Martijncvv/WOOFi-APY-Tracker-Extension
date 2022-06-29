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
	fetchWoofiChainStakedInfo,
	fetchWoofiChain1dVolume,
	fetchWoofiChain1mVolumeSource,
	fetchWooNetworkTradeInfo,
	fetchWooFutureInfo,
} from '../utils/api'
import { amountFormatter } from '../utils/amountFormatter'

import IChainInfo from '../models/IChainsInfo'
import IWoofiEarnChainInfo from '../models/IWoofiEarnChainInfo'
import IWooFuturesInfo from '../models/IWooFuturesInfo'
import IWooNetworkTradeInfo from '../models/IWooNetworkTradeInfo'
import IWoofiChain1dVolume from '../models/IWoofiChain1dVolume'
import { IWoofiStakedWoo } from '../models/IWoofiChainStakedWoo'
import { IWoofi1mVolumeSources } from '../models/IWoofiChain1mVolumeSource'
import { sortQuotes } from '../utils/orderObjects'

const App = () => {
	let chainIds: string[] = ['avax', 'bsc', 'fantom']
	let chainNames: string[] = ['Avalanche', 'BNB Chain', 'Fantom']
	let chainLogos: string[] = [AvaxIcon, BnbChainIcon, FtmIcon]
	let chainColors: string[] = ['#E84142', '#F0B90B', '#13b5ec']

	const [wooNetworkTradeInfo, setWooNetworkTradeInfo] = useState<
		IWooNetworkTradeInfo
	>()
	const [wooFuturesOi, setWooFuturesOi] = useState<number>(0)
	const [woofiEarnInfo, setWoofiEarnInfo] = useState<IWoofiEarnChainInfo>(
		{} as IWoofiEarnChainInfo
	)
	const [woofi1dTotalVolume, setWoofi1dTotalVolume] = useState<number>(0)
	const [woofi1mVolumeSources, setWoofi1mVolumeSources] = useState<
		IWoofi1mVolumeSources
	>({})
	const [woofiStakedWoo, setWoofiStakedWoo] = useState<IWoofiStakedWoo>({})

	const [woofiTotalStakedWoo, setWoofiTotalStakedWoo] = useState<number>(0)

	const [wooFuturesVolume, setWooFuturesVolume] = useState<number>(0)
	const [woofiTVL, setWoofiTVL] = useState<number>(0)

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
		getWooNetworkTradeInfo()
		getWooFiVolumesInfo()
		getStakedWooInfo()
		getWooFiVolume1mSourceInfo()
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
				let woofiStakedWooInfo: IWoofiStakedWoo = {}
				woofiStakedWooInfo[chainId] = await fetchWoofiChainStakedInfo(chainId)

				setWoofiStakedWoo((woofiStakingInfo) => ({
					...woofiStakingInfo,
					...woofiStakedWooInfo,
				}))

				setWoofiTotalStakedWoo(
					(totalStakedWooAmount) =>
						totalStakedWooAmount +
						parseInt(woofiStakedWooInfo[chainId].data.woo.total_staked) /
							10 ** 18
				)
			}
		} catch (err) {
			console.log(err)
		}
	}

	async function getWooNetworkTradeInfo() {
		try {
			setWooNetworkTradeInfo(await fetchWooNetworkTradeInfo())
		} catch (err) {
			console.log(err)
		}
	}

	async function getFuturesInfo() {
		try {
			let totalFuturesVolume: number = 0
			let totalFuturesOi: number = 0
			let woofetchedFuturesInfo: IWooFuturesInfo = await fetchWooFutureInfo()

			for (let i = 0; i < woofetchedFuturesInfo.rows.length; i++) {
				totalFuturesOi +=
					woofetchedFuturesInfo.rows[i]['open_interest'] *
					woofetchedFuturesInfo.rows[i]['mark_price']
				totalFuturesVolume +=
					woofetchedFuturesInfo.rows[i]['24h_volumn'] *
					woofetchedFuturesInfo.rows[i]['mark_price']
			}
			setWooFuturesVolume(totalFuturesVolume)
			setWooFuturesOi(totalFuturesOi)
		} catch (err) {
			console.log(err)
		}
	}

	async function getWooFiVolumesInfo() {
		try {
			for (let chainId of chainIds) {
				let woofichain1dVolumeInfo: IWoofiChain1dVolume = await fetchWoofiChain1dVolume(
					chainId
				)

				setWoofi1dTotalVolume(
					(woofi1dTotalVolume) =>
						woofi1dTotalVolume +
						parseInt(woofichain1dVolumeInfo.data['24h_volume_usd'])
				)
			}
		} catch (err) {
			console.log(err)
		}
	}

	async function getWooFiVolume1mSourceInfo() {
		try {
			for (let chainId of chainIds) {
				let chainVolumeSourceInfo: IWoofi1mVolumeSources = {}
				chainVolumeSourceInfo[chainId] = await fetchWoofiChain1mVolumeSource(
					chainId
				)

				setWoofi1mVolumeSources((woofi1mVolumeSources) => ({
					...woofi1mVolumeSources,
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

	const handleSortingChange = (_sortingOption: string) => {
		setSortingOption(_sortingOption)
	}

	const handleActiveTabChange = (chainId: string) => {
		setActiveTab(chainId)
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
						{wooNetworkTradeInfo && (
							<>
								<NetworkInfoHeaderField />
								<VolumeBarField
									wooxVolume={
										wooNetworkTradeInfo.data.amount -
										wooFuturesVolume -
										woofi1dTotalVolume / 10 ** 18
									}
									woofiVolume={woofi1dTotalVolume / 10 ** 18}
									futuresVolume={wooFuturesVolume}
								/>

								<InfoField
									index={2}
									value_1={`$${amountFormatter(
										wooNetworkTradeInfo.data.amount -
											woofi1dTotalVolume / 10 ** 18 -
											wooFuturesVolume
									)} `}
									value_2={`$${amountFormatter(woofi1dTotalVolume / 10 ** 18)}`}
									value_3={`$${amountFormatter(wooFuturesVolume)} `}
								/>
							</>
						)}

						<NetworkInfoSubHeaderField />
						{wooNetworkTradeInfo && woofiTVL && wooFuturesOi && (
							<InfoField
								index={2}
								value_1={`$${amountFormatter(wooNetworkTradeInfo.data.amount)}`}
								value_2={`$${amountFormatter(woofiTVL)}`}
								value_3={`$${amountFormatter(wooFuturesOi)} `}
							/>
						)}

						<PieChartFieldHeader />
						{chainsInfo.length > 0 &&
							Object.keys(woofiStakedWoo).length > 0 &&
							Object.keys(woofi1mVolumeSources).length > 0 && (
								<PieChartField
									chainsInfo={chainsInfo}
									totalStakedWooAmount={woofiTotalStakedWoo}
									woofiStakingInfo={woofiStakedWoo}
									woofi1mVolumeSources={woofi1mVolumeSources}
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
									sortingOption,
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
