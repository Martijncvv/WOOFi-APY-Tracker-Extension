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
import ChainTabsField from '../components/ChainTabsField'
import VolumeBarField from '../components/VolumeBarField'
import PieChartField from '../components/PieChartField'
import PieChartFieldHeader from '../components/PieChartFieldHeader'
import DexTradesField from '../components/DexTradesField'
import DexTradesHeaderField from '../components/DexTradesHeaderField'
import OnchainTxsField from '../components/OnchainTxsField'
import DaoInfoField from '../components/DaoInfoField'

const AvaxIcon = require('../static/images/AVAX_logo.png')
const BnbChainIcon = require('../static/images/BNB-Chain_logo.png')
const FtmIcon = require('../static/images/FTM_logo.png')
const PolyIcon = require('../static/images/POLY_logo.png')
const ArbIcon = require('../static/images/ARB_logo.png')
const EthIcon = require('../static/images/ETH_logo.png')

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
import OnchainTxsFieldHeader from '../components/OnchainTxsFieldHeader'
import DashboardTabsField from '../components/DashboardTabsField'

const App = () => {
	let chainIds: string[] = ['avax', 'bsc', 'fantom', 'polygon', 'arbitrum']
	let chainNames: string[] = ['Ava', 'Bsc', 'Ftm', 'Pol', 'Arb']
	let chainLogos: string[] = [
		AvaxIcon,
		BnbChainIcon,
		FtmIcon,
		PolyIcon,
		ArbIcon,
	]
	let chainColors: string[] = [
		'#E84142',
		'#F0B90B',
		'#13b5ec',
		'#8247e5',
		'#97BEDD',
	]
	let chainDomains: string[] = [
		'snowtrace.io',
		'bscscan.com',
		'ftmscan.com',
		'polygonscan.com',
		'arbiscan.io',
	]
	let chainContractAddress: string[] = [
		'0xabc9547b534519ff73921b1fba6e672b5f58d083',
		'0x4691937a7508860f876c9c0a2a617e7d9e945d4b',
		'0x6626c47c00f1d87902fc13eecfac3ed06d5e8d8a',
		'0x1b815d120b3ef02039ee11dc2d33de7aa4a8c603',
		'0xcAFcD85D8ca7Ad1e1C6F82F651fA15E33AEfD07b',
	]

	const [wooNetworkTradeInfo, setWooNetworkTradeInfo] =
		useState<IWooNetworkTradeInfo>()
	const [wooFuturesOi, setWooFuturesOi] = useState<number>(null)
	const [woofiEarnInfo, setWoofiEarnInfo] = useState<IWoofiEarnChainInfo>(
		{} as IWoofiEarnChainInfo
	)
	const [woofi1dTotalVolume, setWoofi1dTotalVolume] = useState<number>(null)
	const [woofi1mVolumeSources, setWoofi1mVolumeSources] =
		useState<IWoofi1mVolumeSources>({})
	const [woofiStakedWoo, setWoofiStakedWoo] = useState<IWoofiStakedWoo>({})

	const [woofiTotalStakedWoo, setWoofiTotalStakedWoo] = useState<number>(null)

	const [wooFuturesVolume, setWooFuturesVolume] = useState<number>(null)
	const [woofiTVL, setWoofiTVL] = useState<number>(null)

	const [displayCalculator, setDisplayCalculator] = useState<boolean>(false)
	const [sortingOption, setSortingOption] = useState<string>('apy')
	const [chainsInfo, setChainsInfo] = useState<IChainInfo[]>([])
	const [activeTab, setActiveTab] = useState<string>('avax')
	const [activeDashboardTab, setActiveDashboardTab] = useState<string>(
		// 'daoDashboard'
		'chainInfoDashboard'
	)

	const [displayDexTradesCallback, setDisplayDexTradesCallback] =
		useState<boolean>(false)

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
					domain: chainDomains[i],
					contractAddress: chainContractAddress[i],
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
				let woofichain1dVolumeInfo: IWoofiChain1dVolume =
					await fetchWoofiChain1dVolume(chainId)

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
	const handleActiveDashboardTabChange = (activeTab: string) => {
		setActiveDashboardTab(activeTab)
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
						{/* <DashboardTabsField
							activeDashboardTabCallback={handleActiveDashboardTabChange}
							activeDashboardTab={activeDashboardTab}
						/> */}
						{activeDashboardTab == 'chainInfoDashboard' ? (
							<>
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
											<OnchainTxsFieldHeader />
											<OnchainTxsField
												activeTab={activeTab}
												chainsInfo={chainsInfo}
											/>
										</>
									)}
								<ChainTabsField
									chainsInfo={chainsInfo}
									activeTabCallback={handleActiveTabChange}
									activeTab={activeTab}
									tabsReady={Object.keys(woofi1mVolumeSources).length}
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
								<DaoInfoField />
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

// query Proposals {
// 	proposals (
// 	  where: {
// 		space_in: ["martycfly.eth"],

// 	  },
// 	  orderBy: "created",
// 	  orderDirection: desc
// 	) {

// 	  title
// 	  choices
// 	  start
// 	  end
// 	  state
// 	  scores
// 	  votes
// 	}
//   }
