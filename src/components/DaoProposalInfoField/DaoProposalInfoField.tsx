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
	// option_4: number
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
	const [barData, setBarData] = useState<[VoteDataBar]>()

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
		return `${month} ${day}`
	}

	useEffect(() => {
		// let scores = [3, 5, 7]
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
		console.log(payload)

		return (
			<div className="custom-tooltip">
				{payload?.map((item, index) => (
					<div key={index}>
						{item.payload[`expl_${index}`]} {item.value}
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
					? { backgroundColor: '#313641' }
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
						state == 'closed' ? { color: '#7C3AED' } : { color: '#53b332' }
					}
				>
					{state}
				</div>
			</div>
			<div className="dao-proposal-vote-info">
				<div>Votes {scores.length}</div>
				<div>Total weight {scoresTotal} </div>
			</div>

			<div className="dao-proposal-bar-field">
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
							dataKey={scoresTotal}
							width={1}
							axisLine={false}
							hide={true}
							tick={false}
						/>

						<Tooltip content={CustomTooltip} />

						<Bar dataKey="option_0" stackId="a" fill="#4e8ff7" barSize={8}>
							{/* <LabelList dataKey="expl_0" position="center" /> */}
						</Bar>
						<Bar dataKey="option_1" stackId="a" fill="#e0a555" barSize={8}>
							{/* <LabelList dataKey="expl_1" position="center" /> */}
						</Bar>
						<Bar dataKey="option_2" stackId="a" fill="#ffffff" barSize={8}>
							{/* <LabelList dataKey="expl_2" position="center" /> */}
						</Bar>

						<Bar dataKey="option_3" stackId="a" fill="#de4437" barSize={8}>
							{/* <LabelList dataKey="expl_3" position="center" /> */}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default DaoProposalInfoField
