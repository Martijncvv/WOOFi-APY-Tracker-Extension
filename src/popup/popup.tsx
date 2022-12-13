import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { getActiveTabStorage, setActiveTabStorage } from '../utils/storage'

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
const OptIcon = require('../static/images/OPT_logo.png')
const EthIcon = require('../static/images/ETH_logo.png')

import {
	fetchWoofiEarnChainInfo,
	fetchWoofiChainStakedInfo,
	fetchWoofiChain1dVolume,
	fetchWoofiChain1mVolumeSource,
	fetchWooNetworkTradeInfo,
	fetchWooFutureInfo,
	fetchPorlAssets,
	fetchPorlLiabilities,
} from '../utils/api'
import { amountFormatter } from '../utils/amountFormatter'

import IChainInfo from '../models/IChainsInfo'
import IWoofiEarnChainInfo from '../models/IWoofiEarnChainInfo'
import IWooFuturesInfo from '../models/IWooFuturesInfo'
import IWooNetworkTradeInfo from '../models/IWooNetworkTradeInfo'
import IWoofiChain1dVolume from '../models/IWoofiChain1dVolume'
import { IWoofiStakedWoo } from '../models/IWoofiChainStakedWoo'

import EarnField from '../components/EarnField'
import OnchainTxsFieldHeader from '../components/OnchainTxsFieldHeader'
// import DashboardTabsField from '../components/DashboardTabsField'
import PorlDashboard from '../components/PorlDashboard'
import PorlInfoHeaderField from '../components/PorlInfoHeaderField'

const App = () => {
	const [chainIds, setChainIds] = useState<string[]>([
		'arbitrum',
		'avax',
		'bsc',
		'fantom',
		'optimism',
		'polygon',
	])

	const [chainsInfo, setChainsInfo] = useState<IChainInfo[]>([
		{
			chainId: 'arbitrum',
			chainName: 'Arb',
			icon: ArbIcon,
			color: '#97BEDD',
			domain: 'api.arbiscan.io',
			contractAddress: '0xcAFcD85D8ca7Ad1e1C6F82F651fA15E33AEfD07b',
		},
		{
			chainId: 'avax',
			chainName: 'Ava',
			icon: AvaxIcon,
			color: '#E84142',
			domain: 'api.snowtrace.io',
			contractAddress: '0xabc9547b534519ff73921b1fba6e672b5f58d083',
		},
		{
			chainId: 'bsc',
			chainName: 'Bsc',
			icon: BnbChainIcon,
			color: '#F0B90B',
			domain: 'api.bscscan.com',
			contractAddress: '0x4691937a7508860f876c9c0a2a617e7d9e945d4b',
		},
		{
			chainId: 'fantom',
			chainName: 'Ftm',
			icon: FtmIcon,
			color: '#13b5ec',
			domain: 'api.ftmscan.com',
			contractAddress: '0x6626c47c00f1d87902fc13eecfac3ed06d5e8d8a',
		},
		{
			chainId: 'optimism',
			chainName: 'Op',
			icon: OptIcon,
			color: '#FE0420',
			domain: 'api-optimistic.etherscan.io',
			contractAddress: '0x871f2F2ff935FD1eD867842FF2a7bfD051A5E527',
		},
		{
			chainId: 'polygon',
			chainName: 'Pol',
			icon: PolyIcon,
			color: '#8247e5',
			domain: 'api.polygonscan.com',
			contractAddress: '0x1b815d120b3ef02039ee11dc2d33de7aa4a8c603',
		},
	])

	const [wooNetworkTradeInfo, setWooNetworkTradeInfo] =
		useState<IWooNetworkTradeInfo>()
	const [wooFuturesOi, setWooFuturesOi] = useState<number>(null)
	const [woofiEarnInfo, setWoofiEarnInfo] = useState<IWoofiEarnChainInfo>(
		{} as IWoofiEarnChainInfo
	)
	const [woofi1dTotalVolume, setWoofi1dTotalVolume] = useState<number>(null)

	const [woofiStakedWoo, setWoofiStakedWoo] = useState<IWoofiStakedWoo>({})

	const [woofiTotalStakedWoo, setWoofiTotalStakedWoo] = useState<number>(null)

	const [wooFuturesVolume, setWooFuturesVolume] = useState<number>(null)
	const [woofiTVL, setWoofiTVL] = useState<number>(null)

	const [displayCalculator, setDisplayCalculator] = useState<boolean>(false)
	const [sortingOption, setSortingOption] = useState<string>('apy')

	const [activeTab, setActiveTab] = useState<string>('arbitrum')
	// const [activeTab, setActiveTab] = useState<string>('avax')
	const [activeDashboardTab, setActiveDashboardTab] = useState<string>(
		// 'daoDashboard'
		'chainInfoDashboard'
	)

	const [displayDexTradesCallback, setDisplayDexTradesCallback] =
		useState<boolean>(false)

	const [totalAssets, setTotalAssets] = useState<any>({})
	const [custodialStorage, setCustodialStorage] = useState<any>()
	const [totalLiquiditySource, setTotalLiquiditySource] = useState<any>()
	const [totalLiabilities, setTotalLiabilities] = useState<any>()

	useEffect(() => {
		getWooNetworkTradeInfo()
		getFuturesInfo()
		getPorlInfo()
		getStakedWooInfo()
		getWooFiVolumesInfo()
		getWoofiEarnInfo()
	}, [])

	async function getActivetabState() {
		let activeTabStorage = await getActiveTabStorage()
		console.log('activeTabStorage')
		console.log(activeTabStorage)

		if (activeTabStorage) {
			setActiveTab(activeTabStorage)
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
	async function getPorlInfo() {
		try {
			let fetchedPorlAssets: any = {}
			fetchedPorlAssets = await fetchPorlAssets()
			setTotalAssets(fetchedPorlAssets.data.total_usdt_notional)

			let totalLiquiditySource = 0
			let custodialStorage = 0
			fetchedPorlAssets.data.venues.forEach((venue) => {
				if (venue.type == 'Custodian') {
					custodialStorage += venue.usdt_notional
				}
				if (venue.type == 'Exchange') {
					totalLiquiditySource += venue.usdt_notional
				}
			})
			setCustodialStorage(custodialStorage)
			// setTotalLiquiditySource(totalLiquiditySource)

			let fetchedPorlLiabilities: any = {}
			fetchedPorlLiabilities = await fetchPorlLiabilities()

			let totalLiabilities = 0
			fetchedPorlLiabilities.data.forEach((token) => {
				totalLiabilities += token.usdt_notional
			})
			setTotalLiabilities(totalLiabilities)
		} catch (err) {
			console.log(err)
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

				if (woofiStakedWooInfo[chainId].status === 'fail') {
					woofiStakedWooInfo[chainId] = {
						data: {
							woo: {
								apr: 0,
								total_staked: '0',
							},
							status: 'fetch error',
						},
						status: '',
					}
				}
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

	const handleCalculatorChange = () => {
		setDisplayCalculator(!displayCalculator)
	}

	const handleSortingChange = (_sortingOption: string) => {
		setSortingOption(_sortingOption)
	}

	const handleActiveTabChange = (chainId: string) => {
		setActiveTabStorage(chainId)
		setActiveTab(chainId)
	}
	const handleActiveDashboardTabChange = (activeTab: string) => {
		setActiveDashboardTab(activeTab)
	}
	console.log('activeTab:', activeTab)
	return (
		<>
			<HeaderField />
			<div id="dashboard">
				{!displayDexTradesCallback ? (
					<>
						{wooNetworkTradeInfo &&
							woofiTVL &&
							wooFuturesOi &&
							totalLiabilities && (
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
										value_2={`$${amountFormatter(
											woofi1dTotalVolume / 10 ** 18
										)}`}
										value_3={`$${amountFormatter(wooFuturesVolume)} `}
										value_3_colour=""
									/>

									<NetworkInfoSubHeaderField />

									<InfoField
										index={2}
										value_1={`$${amountFormatter(
											wooNetworkTradeInfo.data.amount
										)}`}
										value_2={`$${amountFormatter(woofiTVL)}`}
										value_3={`$${amountFormatter(wooFuturesOi)} `}
										value_3_colour=""
									/>
									{totalAssets && totalLiabilities && custodialStorage && (
										<>
											<PorlInfoHeaderField />
											<InfoField
												index={2}
												value_1={`$${amountFormatter(totalAssets)}`}
												value_2={`${Math.round(
													(totalAssets / totalLiabilities) * 100
												)}%`}
												value_3={`${Math.round(
													(custodialStorage / totalLiabilities) * 100
												)}%`}
												value_3_colour=""
											/>
										</>
									)}
								</>
							)}

						{/* <DashboardTabsField
							activeDashboardTabCallback={handleActiveDashboardTabChange}
							activeDashboardTab={activeDashboardTab}
						/> */}
						{activeDashboardTab == 'chainInfoDashboard' ? (
							<>
								<ChainTabsField
									chainsInfo={chainsInfo}
									activeTabCallback={handleActiveTabChange}
									activeTab={activeTab}
									tabsReady={Object.keys(woofiStakedWoo).length}
								/>
								{
									Object.keys(woofiStakedWoo).length > 2 && (
										<>
											<PieChartFieldHeader activeTab={activeTab} />
											<PieChartField
												chainsInfo={chainsInfo}
												totalStakedWooAmount={woofiTotalStakedWoo}
												woofiStakingInfo={woofiStakedWoo}
												activeTab={activeTab}
											/>
											<OnchainTxsFieldHeader />
											<OnchainTxsField
												activeTab={activeTab}
												chainsInfo={chainsInfo}
											/>

											{displayCalculator && <CalcYieldField />}

											{Object.keys(woofiEarnInfo).length > 0 &&
												Object.keys(
													woofiEarnInfo[activeTab].data.auto_compounding
												).length > 0 && (
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
									)
									// )
								}
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
