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
	activeTab: string
}

const StakingInfoField: React.FC<StakingInfoFieldProps> = ({
	chainsInfo,
	totalStakedWooAmount,
	woofiStakingInfo,
	activeTab,
}) => {
	const [activePieIndex, setActivePieIndex] = useState<number>(0)

	useEffect(() => {
		getActivePieIndex()
	}, [activeTab])

	let COLORS = []
	for (let chain of chainsInfo) {
		COLORS.push(chain.color)
	}

	let stakingData = []
	let index = 0
	for (let key in woofiStakingInfo) {
		stakingData.push({
			name: `${woofiStakingInfo[key].data.woo.apr.toPrecision(3)}%`,
			value: parseInt(woofiStakingInfo[key].data.woo.total_staked),
			chainId: key,
			color: chainsInfo[index].color,
		})
		index++
	}
	console.log('stakingData', stakingData)

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
			{/* <ResponsiveContainer width={280} height="100%"> */}
			<div id="staking-info-field-chart">
				<ResponsiveContainer width={113} height="100%">
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
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>

						{/* <Legend
						layout="vertical"
						verticalAlign="middle"
						align="right"
						iconType="circle"
						iconSize={11}
						wrapperStyle={{
							lineHeight: '20px',
							padding: '0',
							marginRight: '91px',
						}}
					/> */}
					</PieChart>
				</ResponsiveContainer>
				<div id="staking-info-field-apr">
					{stakingData.map((chain, index) => (
						<span
							key={index}
							className="staking-info-field-line"
							style={{ color: chain.color }}
						>
							<span
								className="dot"
								style={{ backgroundColor: chain.color }}
							></span>
							{chain.name}
						</span>
					))}
				</div>
			</div>

			<div id="staking-info-field-total">
				{amountFormatter(totalStakedWooAmount)}
			</div>
		</div>
	)
}

export default StakingInfoField
