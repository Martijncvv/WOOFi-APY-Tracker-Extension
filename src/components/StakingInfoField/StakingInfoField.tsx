import './StakingInfoField.css'
import React, { useState, useEffect, PureComponent } from 'react'
import {
	PieChart,
	Pie,
	Legend,
	Cell,
	ResponsiveContainer,
	Sector,
} from 'recharts'

import { amountFormatter } from '../../utils/amountFormatter'

interface StakingInfoFieldProps {
	chainsInfo: any
	totalStakedWooAmount: number
	woofiStakingInfo: any
	woofi1MVolumeSources: any
	activeTab: string
}

const StakingInfoField: React.FC<StakingInfoFieldProps> = ({
	activeTab,
	chainsInfo,
	woofiStakingInfo,
	totalStakedWooAmount,
	woofi1MVolumeSources,
}) => {
	const [activePieIndex, setActivePieIndex] = useState<number>(0)
	const [stakingData, setStakingData] = useState<any>([])
	const [topStakingChains, setTopStakingChains] = useState<any>([])
	const [stakingColors, setStakingColors] = useState<any>([])

	const [topVolumeSources, setTopVolumeSources] = useState<any>([])
	const [totalVolume1M, setTotalVolume1M] = useState<number>(0)

	let resourceColors = [
		'#4e8ff7',
		'#25CED1',
		'#FFFFFF',
		'#EFEA5A',
		'#EA526F',
		'#E0A555',
		'#FF7700',
	]

	useEffect(() => {
		getActivePieIndex()
		getVolumeSourcesChartData()
	}, [activeTab])

	useEffect(() => {
		getStakingChartData()
		getVolumeSourcesChartData()
	}, [woofiStakingInfo])

	async function getStakingColors() {
		let stakingColors = []
		for (let chain of chainsInfo) {
			stakingColors.push(chain.color)
		}
		setStakingColors(stakingColors)
		return true
	}

	async function getStakingChartData() {
		await getStakingColors()
		let index = 0
		let stakingData = []
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
		// console.log('stakingData', stakingData)

		let stakingDataCopy = stakingData.slice()
		// console.log('TopStakingChains', stakingDataCopy.sort(compareApr))
		setTopStakingChains(stakingDataCopy.sort(compareApr))
	}

	async function getVolumeSourcesChartData() {
		let volumeSourcesData = []
		let totalVolume1M = 0
		for (let source of woofi1MVolumeSources[activeTab].data) {
			volumeSourcesData.push({
				sourceName: `${source.name}`,
				value: parseInt(source.volume_usd) / 10 ** 18,
			})

			totalVolume1M += parseInt(source.volume_usd) / 10 ** 18
		}
		setTotalVolume1M(totalVolume1M)

		console.log('volumeSourcesData', volumeSourcesData)
		let otherVolumeResources =
			volumeSourcesData[volumeSourcesData.length - 1].value
		console.log('otherVolumeResources', otherVolumeResources)

		let orderedVolumeSources = volumeSourcesData
			.sort(compareVolume)
			.filter((source) => source.sourceName !== 'Other')
		console.log('orderedVolumeSources', orderedVolumeSources)

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

		console.log('topVolumeSources', topVolumeSources)
		console.log('otherVolumeResources', otherVolumeResources)
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
		if (parseInt(a.apr.slice(0, -1)) > parseInt(b.apr.slice(0, -1))) {
			return -1
		}
		if (parseInt(a.apr.slice(0, -1)) < parseInt(b.apr.slice(0, -1))) {
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

	return (
		<div className="staking-info-field">
			<div id="staking-info-field-chart">
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
					</PieChart>
				</ResponsiveContainer>
				<div id="charts-info-field-legenda">
					{topStakingChains.map(
						(chain, index) =>
							index < 4 && (
								<div
									key={index}
									className="charts-info-field-legenda-line"
									style={{ color: chain.color }}
								>
									<span
										className="dot"
										style={{ backgroundColor: chain.color }}
									></span>
									<span className="charts-info-field-legenda-text">
										{chain.apr}
									</span>
								</div>
							)
					)}
				</div>
			</div>

			<div id="staking-info-field-chart">
				<ResponsiveContainer width={280} height={58}>
					<PieChart>
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
					</PieChart>
				</ResponsiveContainer>

				<div id="charts-info-field-legenda">
					{topVolumeSources.map(
						(chain, index) =>
							index < 4 && (
								<div
									key={index}
									className="charts-info-field-legenda-line"
									style={{ color: resourceColors[index] }}
								>
									<div
										className="dot"
										style={{ backgroundColor: resourceColors[index] }}
									></div>
									<span className="charts-info-field-legenda-text">
										{chain.sourceName}
									</span>
								</div>
							)
					)}
				</div>
			</div>

			<div id="staking-info-field-total-staked">
				{amountFormatter(totalStakedWooAmount)}
			</div>
			<div id="staking-info-field-total-sources">
				{amountFormatter(totalVolume1M)}
			</div>
		</div>
	)
}

export default StakingInfoField
