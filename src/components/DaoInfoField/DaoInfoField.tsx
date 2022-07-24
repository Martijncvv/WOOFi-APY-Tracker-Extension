import * as React from 'react'
import { useEffect, useState } from 'react'
import { fetchDaoProposals } from '../../utils/api'
import DaoProposalInfoField from '../DaoProposalInfoField'

interface IDaoInfoFieldProps {}

const DaoInfoField: React.FunctionComponent<IDaoInfoFieldProps> = (props) => {
	const [proposalsData, setProposalsData] = useState<any>([])

	useEffect(() => {
		getDaoProposalInfo()
		console.log('DAOTEST_FIELD')
	}, [])

	async function getDaoProposalInfo() {
		try {
			const proposalsDataFetch = await fetchDaoProposals()
			console.log(proposalsDataFetch)

			setProposalsData(proposalsDataFetch.data.proposals)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			{proposalsData?.map((proposal, index) => (
				<DaoProposalInfoField
					key={index}
					index={index}
					title={proposal.title}
					link={proposal.link}
					choices={proposal.choices}
					scores={proposal.scores}
					scoresTotal={proposal.scores_total}
					state={proposal.state}
					start={proposal.start}
					end={proposal.end}
				/>
			))}
		</div>
	)
}

export default DaoInfoField

// query Proposals {
// 	proposals (
// 	  where: {
// 		space_in: ["martycfly.eth"],

// 	  },
// 	  orderBy: "created",
// 	  orderDirection: desc
// 	) {
// 		id
// 	  title
// 	  choices
// 	  start
// 	  end
// 	  state
// 	  scores
// 	  votes

//     scores_total
//     link
// 	}

//   }
// https://docs.snapshot.org/graphql-api
// https://hub.snapshot.org/graphql
