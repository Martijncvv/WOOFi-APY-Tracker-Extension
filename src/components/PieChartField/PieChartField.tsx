import './PieChartField.css'
import React, { useState, useEffect } from 'react'
import {
	PieChart,
	Pie,
	Tooltip,
	Cell,
	ResponsiveContainer,
	Sector,
} from 'recharts'

import { amountFormatter } from '../../utils/amountFormatter'
import { IWoofiStakedWoo } from '../../models/IWoofiChainStakedWoo'
import { IWoofi1mVolumeSources } from '../../models/IWoofiChain1mVolumeSource'

interface PieChartFieldProps {
	chainsInfo: any
	totalStakedWooAmount: number
	woofiStakingInfo: IWoofiStakedWoo
	woofi1mVolumeSources: IWoofi1mVolumeSources
	activeTab: string
}

const PieChartField: React.FC<PieChartFieldProps> = ({
	activeTab,
	chainsInfo,
	woofiStakingInfo,
	totalStakedWooAmount,
	woofi1mVolumeSources,
}) => {
	const [activePieIndex, setActivePieIndex] = useState<number>(0)
	const [stakingData, setStakingData] = useState<any>([])
	const [topStakingChains, setTopStakingChains] = useState<any>([])
	const [stakingColors, setStakingColors] = useState<string[]>([])

	const [topVolumeSources, setTopVolumeSources] = useState<any>([])
	const [totalVolume1M, setTotalVolume1M] = useState<number>(0)

	let resourceColors: string[] = ['#4e8ff7', '#f0f0f0', '#e0a555', '#3ba99c']

	interface IStakingData {
		apr: string
		value: number
		chainId: string
		color: string
	}

	useEffect(() => {
		getActivePieIndex()
		getVolumeSourcesChartData()
	}, [activeTab])

	useEffect(() => {
		getStakingChartData()
		getVolumeSourcesChartData()
	}, [woofiStakingInfo])

	async function getStakingColors() {
		let stakingColors: string[] = []
		for (let chain of chainsInfo) {
			stakingColors.push(chain.color)
		}
		setStakingColors(stakingColors)
		return true
	}

	async function getStakingChartData() {
		await getStakingColors()
		let index: number = 0
		let stakingData: IStakingData[] = []
		for (let key in woofiStakingInfo) {
			stakingData.push({
				apr: `${woofiStakingInfo[key].data.woo.apr.toPrecision(3)}%`,
				value: parseInt(woofiStakingInfo[key].data.woo.total_staked) / 10 ** 18,
				chainId: key,
				color: chainsInfo[index].color,
			})
			index++
		}
		setStakingData(stakingData)

		let stakingDataCopy = stakingData.slice()
		setTopStakingChains(stakingDataCopy.sort(compareApr))
	}

	async function getVolumeSourcesChartData() {
		let volumeSourcesData = []
		let totalVolume1M = 0
		for (let source of woofi1mVolumeSources[activeTab].data) {
			volumeSourcesData.push({
				sourceName: `${source.name}`,
				value: parseInt(source.volume_usd) / 10 ** 18,
			})

			totalVolume1M += parseInt(source.volume_usd) / 10 ** 18
		}
		setTotalVolume1M(totalVolume1M)

		let otherVolumeResources =
			volumeSourcesData[volumeSourcesData.length - 1].value

		let orderedVolumeSources = volumeSourcesData
			.sort(compareVolume)
			.filter((source) => source.sourceName !== 'Other')

		let topVolumeSources = []
		for (let i = 0; i < orderedVolumeSources.length; i++) {
			if (i < 3) {
				topVolumeSources.push(orderedVolumeSources[i])
			} else {
				otherVolumeResources += orderedVolumeSources[i].value
			}
		}
		topVolumeSources.push({
			sourceName: `Other`,
			value: otherVolumeResources,
		})

		setTopVolumeSources(topVolumeSources)
	}

	const compareVolume = (a, b) => {
		if (a.value > b.value) {
			return -1
		}
		if (a.value < b.value) {
			return 1
		}
		return 0
	}
	const compareApr = (a, b) => {
		if (parseFloat(a.apr.slice(0, -1)) > parseFloat(b.apr.slice(0, -1))) {
			return -1
		}
		if (parseFloat(a.apr.slice(0, -1)) < parseFloat(b.apr.slice(0, -1))) {
			return 1
		}
		return 0
	}
	////////////////////////////////////////
	////////////////////////////////////////
	const renderActiveShape = (props) => {
		const {
			cx,
			cy,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle,
			fill,
		} = props

		return (
			<g>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={innerRadius - 5}
					outerRadius={innerRadius - 3}
					fill={fill}
				/>
			</g>
		)
	}

	function getActivePieIndex() {
		if (chainsInfo && activeTab) {
			setActivePieIndex(
				chainsInfo.findIndex((chain) => chain.chainId === activeTab)
			)
		}
	}

	const sourcesChartTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			let source = payload[0].payload.sourceName
			let volume = payload[0].payload.value
			let color = payload[0].payload.fill
			return (
				<div className="piechart-tooltip-box">
					<div
						className="piechart-tooltip"
						style={{ borderColor: color, color: color }}
					>
						<div>
							{`${source}  ${((volume / totalVolume1M) * 100).toPrecision(3)}%`}
						</div>
					</div>
				</div>
			)
		}

		return null
	}
	const stakingChartTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			console.log(payload)
			let chain = payload[0].payload.chainId
			let apr = payload[0].payload.apr
			let color = payload[0].payload.fill
			let wooStaked = amountFormatter(payload[0].payload.value)
			return (
				<div className="piechart-tooltip-box">
					<div
						className="piechart-tooltip"
						style={{ borderColor: color, color: color }}
					>
						<div>{`${chain} ${wooStaked}`}</div>
					</div>
				</div>
			)
		}

		return null
	}

	return (
		<div className="piechart-field">
			<div id="piechart-field-chart">
				<ResponsiveContainer width={280} height={58}>
					<PieChart>
						<Pie
							stroke="none"
							data={stakingData}
							cx="46"
							cy="100%"
							startAngle={180}
							endAngle={0}
							innerRadius={40}
							outerRadius={50}
							fill="#8884d8"
							paddingAngle={5}
							dataKey="value"
							activeIndex={activePieIndex > 0 ? activePieIndex : 0}
							activeShape={renderActiveShape}
						>
							{stakingData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={stakingColors[index % stakingColors.length]}
								/>
							))}
						</Pie>
						<Tooltip
							content={stakingChartTooltip}
							allowEscapeViewBox={{ x: true, y: true }}
							position={{ x: 60, y: -6 }}
						/>
					</PieChart>
				</ResponsiveContainer>

				<div id="piechart-field-legenda">
					{topStakingChains.map(
						(chain, index) =>
							index < 4 && (
								<div
									key={index}
									className="piechart-field-legenda-line"
									style={{ color: chain.color }}
								>
									<span
										className="dot"
										style={{ backgroundColor: chain.color }}
									></span>
									<span className="piechart-field-legenda-text">
										{chain.apr}
									</span>
								</div>
							)
					)}
					{topStakingChains.length > 2 && (
						<div id="piechart-field-total-staked">
							{amountFormatter(totalStakedWooAmount)}
						</div>
					)}
				</div>
			</div>

			<div id="piechart-field-chart">
				<ResponsiveContainer width={280} height={58}>
					<PieChart>
						syncId="anyId"
						<Pie
							stroke="none"
							data={topVolumeSources}
							cx="46"
							cy="100%"
							startAngle={180}
							endAngle={0}
							innerRadius={40}
							outerRadius={50}
							fill="#8884d8"
							paddingAngle={5}
							dataKey="value"
						>
							{topVolumeSources.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={resourceColors[index % resourceColors.length]}
								/>
							))}
						</Pie>
						<Tooltip
							content={sourcesChartTooltip}
							allowEscapeViewBox={{ x: true, y: true }}
							// position={{ x: -110, y: -34 }}
							position={{ x: -110, y: -6 }}
						/>
					</PieChart>
				</ResponsiveContainer>

				<div id="piechart-field-legenda">
					{topVolumeSources.map(
						(chain, index) =>
							index < 4 && (
								<div
									key={index}
									className="piechart-field-legenda-line"
									style={{ color: resourceColors[index] }}
								>
									<div
										className="dot"
										style={{ backgroundColor: resourceColors[index] }}
									></div>
									<span className="piechart-field-legenda-text">
										{chain.sourceName}
									</span>
								</div>
							)
					)}
					{topVolumeSources.length > 2 && (
						<div id="piechart-field-total-sources">
							{amountFormatter(totalVolume1M)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default PieChartField
