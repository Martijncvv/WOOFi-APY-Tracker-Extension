import * as React from 'react'
import { useEffect, useState } from 'react'
import './DaoProposalInfoField.css'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
	Label,
	LabelList,
} from 'recharts'

interface IDaoProposalInfoFieldProps {
	index: number
	title: string
	link: string
	choices: string[]
	scores: number[]
	scoresTotal: number

	state: string
	start: number
	end: number
}

interface VoteDataBar {
	total: number
	option_0: number
	expl_0: string
	option_1: number
	expl_1: string
	option_2?: number
	expl_2?: string
	option_3?: number
	expl_3?: string
}

const DaoProposalInfoField: React.FunctionComponent<IDaoProposalInfoFieldProps> = ({
	index,
	title,
	link,
	choices,
	scores,
	scoresTotal,
	state,
	start,
	end,
}) => {
	const [barData, setBarData] = useState<[VoteDataBar]>([
		{
			total: 0,
			option_0: 0,
			expl_0: '',
			option_1: 0,
			expl_1: '',
			option_2: 0,
			expl_2: '',
			option_3: 0,
			expl_3: '',
		},
	])
	const barRadius = 4

	const dateFormat = (unixTimestamp) => {
		let dateObject = new Date(unixTimestamp * 1000)
		let hours = dateObject.getHours()
		let minutes = '0' + dateObject.getMinutes()
		let day = dateObject.toLocaleString('en-US', { day: 'numeric' })
		let month = dateObject
			.toLocaleString('en-US', { month: 'long' })
			.substring(0, 3)
		return `${month} ${day}`
	}

	useEffect(() => {
		setBarData([
			{
				total: scoresTotal,
				option_0: scores[0],
				expl_0: choices[0],
				option_1: scores[1],
				expl_1: choices[1],
				option_2: scores[2] || null,
				expl_2: choices[2] || null,
				option_3: scores[3] || null,
				expl_3: choices[3] || null,
			},
		])
	}, [scores])

	const handleTitleClick = (link) => {
		chrome.tabs.create({
			url: link,
			selected: false,
		})
	}

	const CustomTooltip = ({ active, payload, label }) => {
		return (
			<div className="dao-proposal-custom-tooltip">
				<div
					key={index}
					className="dao-proposal-custom-tooltip-vote-option-header"
				>
					<div>Poll</div>
					<div>Weight</div>
				</div>
				{payload?.map((item, index) => (
					<div key={index} className="dao-proposal-custom-tooltip-vote-option">
						<div>{item.payload[`expl_${index}`]} </div>
						<div>{item.value}</div>
					</div>
				))}
			</div>
		)
	}

	return (
		<div
			className="dao-proposal-info-field"
			style={
				index % 2
					? {
							backgroundColor: '#313641',
					  }
					: { backgroundColor: '#3C404B', borderRadius: '5px' }
			}
		>
			<div
				className="dao-proposal-title"
				onClick={() => handleTitleClick(link)}
			>
				{title}
			</div>
			<div className="dao-proposal-time-data">
				<div className="dao-proposal-date-data">
					<div>{dateFormat(start)}</div>
					<div>-</div>
					<div>{dateFormat(end)}</div>
				</div>
				<div
					style={
						state == 'closed' ? { color: '#cc444b' } : { color: '#44AF69 ' }
					}
				>
					{state}
				</div>
			</div>

			<div className="dao-proposal-bar-field">
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
							dataKey={scoresTotal}
							width={1}
							axisLine={false}
							hide={true}
							tick={false}
						/>

						<Tooltip content={CustomTooltip} wrapperStyle={{ zIndex: 999 }} />

						<Bar
							dataKey="option_0"
							stackId="a"
							fill="#4e8ff7"
							barSize={8}
							radius={
								!barData[0].option_1 && !barData[0].option_2
									? barRadius
									: [barRadius, 0, 0, barRadius]
							}
						></Bar>
						<Bar
							dataKey="option_1"
							stackId="a"
							fill="#e0a555"
							barSize={8}
							radius={
								!barData[0].option_0 && !barData[0].option_2
									? barRadius
									: !barData[0].option_0
									? [barRadius, 0, 0, barRadius]
									: !barData[0].option_2
									? [0, barRadius, barRadius, 0]
									: [0, 0, 0, 0]
							}
						></Bar>
						<Bar
							dataKey="option_2"
							stackId="a"
							fill="#3ba99c"
							barSize={8}
							radius={
								!barData[0].option_0 && !barData[0].option_1
									? barRadius
									: [0, barRadius, barRadius, 0]
							}
						></Bar>

						{/* <Bar
							dataKey="option_3"
							stackId="a"
							fill="#ffffff"
							barSize={8}
						></Bar> */}
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default DaoProposalInfoField
