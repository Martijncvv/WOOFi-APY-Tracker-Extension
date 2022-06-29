// Uniswap V2 WOO-WETH
// https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x4691937a7508860f876c9c0a2a617e7d9e945d4b&address=0x6ada49aeccf6e556bb7a35ef0119cc8ca795294a&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8
// SELL: to 0x6ada49aeccf6e556bb7a35ef0119cc8ca795294a
// BUY: from 0x6ada49aeccf6e556bb7a35ef0119cc8ca795294a

// Uniswap V3 WOO-WETH
// https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x4691937a7508860f876c9c0a2a617e7d9e945d4b&address=0x122e55503a0b2e5cd528effa44d0b2fea300f24b&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8
// SELL: to 0x122e55503a0b2e5cd528effa44d0b2fea300f24b
// BUY: from 0x122e55503a0b2e5cd528effa44d0b2fea300f24b

// Uniswap V2 WOO-USDC
// https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x4691937a7508860f876c9c0a2a617e7d9e945d4b&address=0xbbc95e1eb6ee476e9cbb8112435e14b372563038&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8
// SELL: to 0xbbc95e1eb6ee476e9cbb8112435e14b372563038
// BUY: from 0xbbc95e1eb6ee476e9cbb8112435e14b372563038

// Sushi WOO-USDC
// https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x4691937a7508860f876c9c0a2a617e7d9e945d4b&address=0xf5ca27927ffb16bd8c870dcb49750146cce8217c&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8
// SELL: to 0xf5ca27927ffb16bd8c870dcb49750146cce8217c
// BUY: from 0xf5ca27927ffb16bd8c870dcb49750146cce8217c

// https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x4691937a7508860f876c9c0a2a617e7d9e945d4b&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8

import './DexTradesField.css'
import React, { useState, useEffect } from 'react'
import { fetchEthWooTxs } from '../../utils/api'
import { amountFormatter } from '../../utils/amountFormatter'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import IWooEthTxs from '../../models/IWooEthTxs'

const DexTradesField: React.FC<{}> = ({}) => {
	const [dexTrades, setDexTrades] = useState<any>()
	const [barData, setBarData] = useState<any>()
	const [errorMessage, setErrorMessage] = useState<string>()

	const dexContracts = {
		UniV2_WOO_WETH: '0x6ada49aeccf6e556bb7a35ef0119cc8ca795294a',
		UniV2_WOO_USDC: '0xbbc95e1eb6ee476e9cbb8112435e14b372563038',
		UniV3_WOO_WETH: '0x122e55503a0b2e5cd528effa44d0b2fea300f24b',
		Sushi_WOO_USDC: '0xf5ca27927ffb16bd8c870dcb49750146cce8217c',
	}

	useEffect(() => {
		getDexTradesInfo()
	}, [])

	async function getDexTradesInfo() {
		try {
			const wooTransactions: IWooEthTxs = await fetchEthWooTxs()
			console.log(wooTransactions)
			if (wooTransactions.message == 'NOTOK') {
				setErrorMessage('NOTOK')
			} else {
				setErrorMessage('-')
			}

			const wooDexTrades: any = wooTransactions.result.filter(function(tx) {
				return (
					Object.values(dexContracts).includes(tx.from) ||
					Object.values(dexContracts).includes(tx.to)
				)
			})

			const cleanedTradesInfo: any = []
			wooDexTrades.forEach((trade) => {
				cleanedTradesInfo.push({
					value: parseInt(trade.value) / 10 ** parseInt(trade.tokenDecimal),
					age: getAgeFormat(trade.timeStamp),
					tradeType: Object.values(dexContracts).includes(trade.from)
						? 'buy'
						: 'sell',
					txHash: trade.hash,
					account: Object.values(dexContracts).includes(trade.to)
						? trade.from.slice(2, 6)
						: trade.to.slice(2, 6),
					colour: Object.values(dexContracts).includes(trade.to)
						? `#${trade.from.slice(2, 8)}`
						: `#${trade.to.slice(2, 8)}`,
				})
			})

			setDexTrades(cleanedTradesInfo)

			let totalBought = 0
			let totalSold = 0
			cleanedTradesInfo.forEach((trade) => {
				if (trade.tradeType == 'buy') {
					totalBought += trade.value
				} else {
					totalSold += trade.value
				}
			})

			setBarData([
				{
					volume: 'all',
					wooSold: totalSold,
					wooBought: totalBought,
				},
			])
		} catch (err) {
			console.log(err)
		}
	}

	const getAgeFormat = (unixTimestamp) => {
		const hoursPassed = Math.floor(
			(Date.now() / 1000 - parseInt(unixTimestamp)) / 3600
		)
		const minutesPassed = Math.floor(
			(Date.now() / 1000 - parseInt(unixTimestamp) - hoursPassed * 3600) / 60
		)

		switch (true) {
			case unixTimestamp === null ||
				unixTimestamp == NaN ||
				unixTimestamp === undefined:
				return 'error'

			case hoursPassed > 1:
				return `${hoursPassed} hrs ${minutesPassed} mins`
			case hoursPassed == 1:
				return `${hoursPassed} hr ${minutesPassed} mins`

			case minutesPassed > 1:
				return `${minutesPassed} mins`
			case minutesPassed == 1:
				return `${minutesPassed} min`
			case minutesPassed == 0:
				return `<1 min`
		}
	}

	function handleOpenTab(link) {
		chrome.tabs.create({ url: link, selected: false })
	}

	const compareTimestamp = (a, b) => {
		if (parseInt(a.timeStamp) > parseInt(b.timeStamp)) {
			return -1
		}
		if (parseInt(a.timeStamp) < parseInt(b.timeStamp)) {
			return 1
		}
		return 0
	}

	return (
		<div>
			{errorMessage === 'NOTOK' && (
				<div className="dex-trades-values">
					<div className="dex-trades-value dex-trades-error-message">
						Refresh rate hit, wait 5 secs
					</div>

					<div className="dex-trades-value dex-trades-value-2"></div>

					<div className="dex-trades-value dex-trades-value-3"></div>
				</div>
			)}

			<div className="dex-trades-ratio-bar-field">
				{/* Taker Buy/Sell ratio */}
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={barData}
						layout="vertical"
						margin={{
							top: 0,
							right: 0,
							left: 0,
							bottom: 0,
						}}
					>
						<XAxis
							type="number"
							domain={['dataMin', 'dataMax']}
							axisLine={false}
							hide={true}
							tick={false}
						/>
						<YAxis
							type="category"
							dataKey={'volume'}
							width={1}
							axisLine={false}
							hide={true}
							tick={false}
						/>

						<Bar dataKey="wooBought" stackId="a" fill="#009600" barSize={1} />
						<Bar dataKey="wooSold" stackId="a" fill="#de4437" />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{dexTrades?.map((tradeInfo, index) => (
				<div
					key={index}
					className="dex-trades-values"
					style={
						parseInt(index) % 2
							? { backgroundColor: '#313641' }
							: { backgroundColor: '#3C404B', borderRadius: '5px' }
					}
				>
					<div
						className="dex-trades-value dex-trades-value-1"
						onClick={() =>
							handleOpenTab(`https://etherscan.io/tx/${tradeInfo.txHash}`)
						}
					>
						{/* <span style={{ color: tradeInfo.colour }}>- </span> */}
						{tradeInfo.account}
					</div>

					<div
						className="dex-trades-value dex-trades-value-2"
						style={
							tradeInfo.tradeType == 'buy'
								? { color: '#009600' }
								: { color: '#de4437' }
						}
					>
						{amountFormatter(tradeInfo.value)}
					</div>

					<div className="dex-trades-value dex-trades-value-3">
						{tradeInfo.age}
					</div>
				</div>
			))}
		</div>
	)
}

export default DexTradesField
