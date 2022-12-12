import './ChainTabsField.css'
import React, { useEffect } from 'react'
import IChainInfo from '../../models/IChainsInfo'

interface ChainsDataProps {
	chainsInfo: IChainInfo[]
	activeTabCallback: any
	activeTab: string
	tabsReady: number
}

const ChainTabsField: React.FC<ChainsDataProps> = ({
	chainsInfo,
	activeTabCallback,
	activeTab,
	tabsReady,
}) => {
	useEffect(() => {
		console.log(activeTab)
	}, [activeTab])

	async function handleTabClick(chainId: string) {
		tabsReady && activeTabCallback(chainId)
	}

	function tabStyle(chainId, index) {
		if (chainId !== activeTab && index > tabsReady) {
			return { cursor: 'wait', filter: 'grayscale(100%)' }
		}
	}

	return (
		<div className="chain-tabs-field">
			{chainsInfo.map((tab, index) => (
				<div
					className="chain-tab"
					key={index}
					onClick={() => handleTabClick(tab.chainId)}
					style={
						tab.chainId === activeTab
							? { backgroundColor: '#3C404B' }
							: { backgroundColor: '#313641' }
					}
				>
					<img
						className="chain-tab-image"
						src={tab.icon}
						style={tabStyle(tab.chainId, index)}
					/>
					{/* <span className="chain-tab-name" style={tabStyle(tab.chainId, index)}>
						{tab.chainName}{' '}
					</span> */}
				</div>
			))}
		</div>
	)
}

export default ChainTabsField
