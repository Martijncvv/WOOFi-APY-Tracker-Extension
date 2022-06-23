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

import './DexTradesField.css'
import React, { useState, useEffect } from 'react'
import { fetchDexTradesInfo } from '../../utils/api'
import { amountFormatter } from '../../utils/amountFormatter'

const DexTradesField: React.FC<{}> = ({}) => {
	const [dexTrades, setDexTrades] = useState<any>()

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
		console.log(Date.now())
		try {
			const dexTrades: any = []
			for (const platform in dexContracts) {
				const platformTrades: any = await fetchDexTradesInfo(
					dexContracts[platform]
				)
				console.log(platformTrades)
				for (const trade in platformTrades.result) {
					dexTrades.push(platformTrades.result[trade])
				}
			}
			dexTrades.sort(compareTimestamp)
			console.log(dexTrades)

			const cleanedTradesInfo: any = []
			dexTrades.forEach((trade) => {
				cleanedTradesInfo.push({
					value: amountFormatter(
						parseInt(trade.value) / 10 ** parseInt(trade.tokenDecimal)
					),
					age: getAgeFormat(trade.timeStamp),
					tradeType: Object.values(dexContracts).includes(trade.from)
						? 'Sell'
						: 'Buy',
				})
			})

			setDexTrades(cleanedTradesInfo)
			console.log(cleanedTradesInfo)
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
			<div className="info-field-values">
				<div className="info-field-value ">WOO</div>

				<div className="info-field-value info-field-value-2">Trade</div>

				<div className="info-field-value info-field-value-3">Time Ago</div>
			</div>
			{dexTrades?.map((tradeInfo, index) => (
				<div
					key={index}
					className="info-field-values"
					style={
						parseInt(index) % 2
							? { backgroundColor: '#313641' }
							: { backgroundColor: '#3C404B', borderRadius: '5px' }
					}
				>
					<div className="info-field-value ">{tradeInfo.value}</div>

					<div className="info-field-value info-field-value-2">
						{tradeInfo.tradeType}
					</div>

					<div className="info-field-value info-field-value-3">
						{tradeInfo.age}
					</div>
				</div>
			))}
		</div>
	)
}

export default DexTradesField
