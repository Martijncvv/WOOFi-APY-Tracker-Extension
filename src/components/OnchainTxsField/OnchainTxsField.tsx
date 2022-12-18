import './OnchainTxsField.css'
import React, { useState, useEffect } from 'react'

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	ReferenceLine,
	Brush,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
import ITokenTxs from '../../models/ITokenTxs'
import { fetchTokenTxs } from '../../utils/api'
import IChainInfo from '../../models/IChainsInfo'

interface IOnchainTxsFieldProps {
	activeTab: string
	chainsInfo: IChainInfo[]
}

const OnchainTxsField: React.FunctionComponent<IOnchainTxsFieldProps> = ({
	activeTab,
	chainsInfo,
}) => {
	const [chartData, setChartData] = useState<any>([{}])
	const [chartTitleMessage, setChartTitleMessage] = useState<string>('')
	const [chainTicker, setChainTicker] = useState<string>('arbitrum')
	const [domain, setDomain] = useState<string>('api.arbiscan.io')
	const [txInfoDomain, setTxInfoDomain] = useState<string>('arbiscan.io')
	const [chainColour, setChainColour] = useState<string>('#97BEDD')

	useEffect(() => {
		getTxData()
	}, [activeTab])

	async function getTxData() {
		let loadedChart: string = ''
		let domain: string = ''
		let contractAddress: string = ''

		for (const chainInfo of chainsInfo) {
			if (chainInfo.chainId == activeTab) {
				loadedChart = chainInfo.chainName
				contractAddress = chainInfo.contractAddress
				domain = chainInfo.domain
				setChainTicker(chainInfo.chainName)
				setChainColour(chainInfo.color)
				setDomain(chainInfo.domain)
				setTxInfoDomain(chainInfo.txInfoDomain)
			}
		}

		let tokenTxData: ITokenTxs
		// setChartTitleMessage('')
		tokenTxData = await fetchTokenTxs(domain, contractAddress)

		if (tokenTxData.message == 'NOTOK') {
			setChartTitleMessage('API limit hit, wait 5s')
		} else {
			setChartTitleMessage('')
		}

		let priceData = [{}]

		tokenTxData?.result.forEach((tx) => {
			priceData.unshift({
				date: dateFormat(tx.timeStamp),
				WOO: parseFloat(
					(parseInt(tx.value) / 10 ** parseInt(tx.tokenDecimal)).toPrecision(3)
				),
				hash: tx.hash,
			})
		})

		setChartData(priceData)
	}

	const dateFormat = (unixTimestamp) => {
		let dateObject = new Date(unixTimestamp * 1000)
		let hours = dateObject.getHours()
		let minutes = '0' + dateObject.getMinutes()
		let day = dateObject.toLocaleString('en-US', { day: 'numeric' })
		let month = dateObject
			.toLocaleString('en-US', { month: 'long' })
			.substring(0, 3)
		// let seconds = '0' + dateObject.getSeconds()
		// return `${hours}:${minutes.substr(-2)} ${day} ${month}`
		return `${hours}:${minutes.substr(-2)} ${day} ${month}`
	}

	const handleBarClick = (data) => {
		chrome.tabs.create({
			url: 'https://' + txInfoDomain + '/tx/' + data.hash,
			selected: false,
		})
	}

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className="custom-tooltip">
					<p className="label">{`${label} `}</p>
					<p className="label">{`${payload[0].value} WOO`}</p>
				</div>
			)
		}

		return null
	}

	return (
		<div className="onchain-txs-field">
			<div className="onchain-txs-field-subtitle">{chartTitleMessage}</div>
			{chartData.length > 0 && (
				<>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							width={500}
							height={300}
							data={chartData}
							margin={{
								top: 4,
								right: 4,
								left: 0,
								bottom: 8,
							}}
							style={{ cursor: 'pointer', color: 'black' }}
						>
							<XAxis
								dataKey="date"
								stroke="#fefefe"
								interval="preserveStart"
								padding={{ right: 10 }}
							/>
							<YAxis
								scale="linear"
								stroke="#fefefe"
								mirror={true}
								interval="preserveStartEnd"
								type="number"
								domain={['auto', (dataMax) => Math.round(dataMax * 1.1)]}
							/>
							<Tooltip content={CustomTooltip} />

							<Bar
								dataKey="WOO"
								fill={chainColour}
								onClick={(event) => handleBarClick(event)}
							/>

							<ReferenceLine y={0} stroke="#000" />
							<Brush dataKey="date" height={6} stroke={chainColour} />
						</BarChart>
					</ResponsiveContainer>
				</>
			)}
		</div>
	)
}

export default OnchainTxsField
