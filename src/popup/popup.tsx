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
const PolyIcon = require('../static/images/POLY_logo.png')

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
import EarnField from '../components/EarnField'

const App = () => {
	let chainIds: string[] = ['avax', 'bsc', 'fantom', 'polygon']
	let chainNames: string[] = ['Avax', 'Bsc', 'Ftm', 'Poly']
	let chainLogos: string[] = [AvaxIcon, BnbChainIcon, FtmIcon, PolyIcon]
	let chainColors: string[] = ['#E84142', '#F0B90B', '#13b5ec', '#8247e5']

	const [wooNetworkTradeInfo, setWooNetworkTradeInfo] = useState<
		IWooNetworkTradeInfo
	>()
	const [wooFuturesOi, setWooFuturesOi] = useState<number>(null)
	const [woofiEarnInfo, setWoofiEarnInfo] = useState<IWoofiEarnChainInfo>(
		{} as IWoofiEarnChainInfo
	)
	const [woofi1dTotalVolume, setWoofi1dTotalVolume] = useState<number>(null)
	const [woofi1mVolumeSources, setWoofi1mVolumeSources] = useState<
		IWoofi1mVolumeSources
	>({})
	const [woofiStakedWoo, setWoofiStakedWoo] = useState<IWoofiStakedWoo>({})

	const [woofiTotalStakedWoo, setWoofiTotalStakedWoo] = useState<number>(null)

	const [wooFuturesVolume, setWooFuturesVolume] = useState<number>(null)
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
		getWooNetworkTradeInfo()
		getFuturesInfo()
		getStakedWooInfo()
		getWooFiVolumesInfo()
		getWooFiVolume1mSourceInfo()
		getWoofiEarnInfo()
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
				console.log('FetchStakedWoo')
				console.log(chainId)
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
				{!displayDexTradesCallback ? (
					<>
						{wooNetworkTradeInfo && woofiTVL && wooFuturesOi && (
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

								<NetworkInfoSubHeaderField />

								<InfoField
									index={2}
									value_1={`$${amountFormatter(
										wooNetworkTradeInfo.data.amount
									)}`}
									value_2={`$${amountFormatter(woofiTVL)}`}
									value_3={`$${amountFormatter(wooFuturesOi)} `}
								/>
							</>
						)}

						{Object.keys(woofiStakedWoo).length > 0 &&
							Object.keys(woofi1mVolumeSources).length > 0 && (
								<>
									<PieChartFieldHeader />
									<PieChartField
										chainsInfo={chainsInfo}
										totalStakedWooAmount={woofiTotalStakedWoo}
										woofiStakingInfo={woofiStakedWoo}
										woofi1mVolumeSources={woofi1mVolumeSources}
										activeTab={activeTab}
									/>
								</>
							)}
						<TabsField
							chainsInfo={chainsInfo}
							activeTabCallback={handleActiveTabChange}
							activeTab={activeTab}
							tabsActive={
								Object.keys(woofiStakedWoo).length == chainsInfo.length &&
								Object.keys(woofi1mVolumeSources).length == chainsInfo.length
									? true
									: false
							}
						/>

						{displayCalculator && <CalcYieldField />}

						{Object.keys(woofiEarnInfo).length > 0 &&
							Object.keys(woofiEarnInfo[activeTab].data.auto_compounding)
								.length > 0 && (
								<>
									<EarnFieldHeader
										value_1={`Vault`}
										value_2={'TVL'}
										value_3={'APY'}
										displayCalculatorCallback={handleCalculatorChange}
										sortingOptionCallback={handleSortingChange}
										displayCalculator={displayCalculator}
									/>
									<EarnField
										activeTab={activeTab}
										sortingOption={sortingOption}
										woofiEarnInfo={woofiEarnInfo}
									/>
								</>
							)}
					</>
				) : (
					<>
						<DexTradesHeaderField />
						<DexTradesField />
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
