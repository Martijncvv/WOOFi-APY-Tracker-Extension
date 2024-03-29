import * as React from 'react'
import IWoofiEarnChainInfo from '../../models/IWoofiEarnChainInfo'
import { amountFormatter } from '../../utils/amountFormatter'
import { sortQuotes } from '../../utils/orderObjects'
import InfoField from '../InfoField'

interface IEarnFieldProps {
	activeTab: string
	sortingOption: string
	woofiEarnInfo: IWoofiEarnChainInfo
}

const EarnField: React.FunctionComponent<IEarnFieldProps> = ({
	activeTab,
	sortingOption,
	woofiEarnInfo,
}) => {
	return (
		<>
			<InfoField
				index={0}
				value_1={'Total'}
				value_2={`$${amountFormatter(
					parseInt(woofiEarnInfo[activeTab].data?.total_deposit) / 10 ** 18
				)}`}
				value_3={`#${
					Object.values(woofiEarnInfo[activeTab].data.auto_compounding).length
				}`}
				value_3_colour=""
			/>

			{sortQuotes(
				sortingOption,
				Object.values(woofiEarnInfo[activeTab].data.auto_compounding)
			).map((tokenInfo, index) => (
				<InfoField
					key={index}
					index={index + 1}
					value_1={tokenInfo.symbol.replaceAll('_', '-').replace('-LP', '')}
					value_2={`$${amountFormatter(
						parseInt(tokenInfo.tvl) / 10 ** tokenInfo.decimals
					)}`}
					value_3={
						tokenInfo.source === 'woofi_super_charger'
							? `${(
									tokenInfo.weighted_average_apr + tokenInfo.x_woo_rewards_apr
							  ).toPrecision(3)}%`
							: `${tokenInfo.apy.toPrecision(3)}%`
					}
					value_3_colour={
						tokenInfo.source === 'woofi_super_charger' && '#96d3ff'
					}
				/>
			))}
		</>
	)
}

export default EarnField
