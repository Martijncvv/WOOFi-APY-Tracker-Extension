import * as React from 'react'
import { useEffect, useState } from 'react'
import { fetchDaoCampaigns, fetchDaoProposals } from '../../utils/api'
import DaoProposalInfoField from '../DaoProposalInfoField'
import DaoGeneralInfoHeader from '../DaoGeneralInfoHeader'
import DaoProposalInfoHeader from '../DaoProposalInfoHeader'
import InfoField from '../InfoField'

interface IDaoInfoFieldProps {}

const DaoInfoField: React.FunctionComponent<IDaoInfoFieldProps> = (props) => {
	const [proposalsData, setProposalsData] = useState<any>([])
	const [campaignsData, setCampaignsData] = useState<any>([])
	const [daoGeneralData, setDaoGeneralData] = useState<any>({})

	useEffect(() => {
		getDaoProposalInfo()
		getDaoCampaignInfo()
	}, [])

	async function getDaoProposalInfo() {
		try {
			const daoProposalDataFetch = await fetchDaoProposals()

			setProposalsData(daoProposalDataFetch.data.proposals)
			setDaoGeneralData({
				followersCount: daoProposalDataFetch.data.space.followersCount,
				proposalsCount: daoProposalDataFetch.data.space.proposalsCount,
			})
		} catch (err) {
			console.log(err)
		}
	}

	async function getDaoCampaignInfo() {
		console.log('TEST')
		try {
			const daoCampaignDataFetch = await fetchDaoCampaigns()
			console.log(daoCampaignDataFetch)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			{/* <DaoGeneralInfoHeader />
			<InfoField
				index={2}
				value_1={''}
				value_2={daoGeneralData.followersCount}
				value_3={daoGeneralData.proposalsCount + 15}
			/> */}
			<DaoProposalInfoHeader />
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
