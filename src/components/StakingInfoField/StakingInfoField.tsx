import './StakingInfoField.css'
import React, { useState, useEffect, PureComponent } from 'react'
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts'
import { amountFormatter } from '../../utils/amountFormatter'

// const data = [
// 	{ name: '5.1% apr', value: 700, label: '700M', apr: 5.13 },
// 	{ name: '12.4% apr', value: 300, label: '300M', apr: 12.4 },
// 	{ name: '27.8% apr', value: 100, label: '100M', apr: 27.83 },
// ]
// const COLORS = ['#E84142', '#F0B90B', '#13b5ec']

interface StakingInfoFieldProps {
	chainsInfo: any
	totalStakedWooAmount: number
	woofiStakingInfo: any
}

const StakingInfoField: React.FC<StakingInfoFieldProps> = ({
	chainsInfo,
	totalStakedWooAmount,
	woofiStakingInfo,
}) => {
	console.log('chainsInfo', chainsInfo)
	console.log('woofiStakingInfo', woofiStakingInfo)

	let COLORS = []
	for (let chain of chainsInfo) {
		COLORS.push(chain.color)
	}

	let data = []
	for (let key in woofiStakingInfo) {
		data.push({
			name: `${woofiStakingInfo[key].data.woo.apr.toPrecision(3)}% apr`,
			value: parseInt(woofiStakingInfo[key].data.woo.total_staked),
		})
	}

	console.log('data', data)
	return (
		<div className="staking-info-field">
			<ResponsiveContainer width="90%" height="100%">
				<PieChart width={300} height={60}>
					<Pie
						stroke="none"
						data={data}
						cx="56"
						cy="100%"
						startAngle={180}
						endAngle={0}
						innerRadius={40}
						outerRadius={50}
						fill="#8884d8"
						paddingAngle={5}
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>

					<Legend
						layout="vertical"
						verticalAlign="middle"
						align="right"
						iconType="circle"
						iconSize={14}
						wrapperStyle={{ lineHeight: '19px' }}
					/>
				</PieChart>
			</ResponsiveContainer>
			<div id="staking-info-field-total">
				{amountFormatter(totalStakedWooAmount)}
			</div>
		</div>
	)
}

export default StakingInfoField
