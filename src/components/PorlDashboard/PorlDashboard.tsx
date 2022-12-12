import React, { useEffect, useState } from 'react'
import { fetchPorlAssets, fetchPorlLiabilities } from '../../utils/api'
import InfoField from '../InfoField'

type Props = {}

export default function PorlDashboard({}: Props) {
	const [totalAssets, setTotalAssets] = useState<any>({})
	const [custodialStorage, setCustodialStorage] = useState<any>({})
	const [totalLiquiditySource, setTotalLiquiditySource] = useState<any>({})
	const [totalLiabilities, setTotalLiabilities] = useState<any>({})

	useEffect(() => {
		getPorlInfo()
	}, [])

	async function getPorlInfo() {
		try {
			let fetchedPorlAssets: any = {}
			fetchedPorlAssets = await fetchPorlAssets()
			setTotalAssets(fetchedPorlAssets.data.total_usdt_notional)

			let totalLiquiditySource = 0
			let custodialStorage = 0
			fetchedPorlAssets.data.venues.forEach((venue) => {
				if (venue.type == 'Custodian') {
					custodialStorage += venue.usdt_notional
				}
				if (venue.type == 'Exchange') {
					totalLiquiditySource += venue.usdt_notional
				}
			})
			setCustodialStorage(custodialStorage)
			setTotalLiquiditySource(totalLiquiditySource)

			let fetchedPorlLiabilities: any = {}
			fetchedPorlLiabilities = await fetchPorlLiabilities()

			let totalLiabilities = 0
			fetchedPorlLiabilities.data.forEach((token) => {
				totalLiabilities += token.usdt_notional
			})
			setTotalLiabilities(totalLiabilities)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			<InfoField
				index={2}
				value_1={''}
				value_2={``}
				value_3={``}
				value_3_colour=""
			/>
		</div>
	)
}
