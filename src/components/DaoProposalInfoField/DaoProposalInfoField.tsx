import * as React from 'react'
import { useEffect } from 'react'
import './DaoProposalInfoField.css'

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

	const handleTitleClick = (link) => {
		chrome.tabs.create({
			url: link,
			selected: false,
		})
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
				<div>{state}</div>
				<div>{dateFormat(start)}</div>
				<div>{dateFormat(end)}</div>
			</div>
			<div className="dao-proposal-vote-info">
				<div>{scores.length} votes</div>
				<div>{scoresTotal} weight</div>
			</div>
		</div>
	)
}

export default DaoProposalInfoField
