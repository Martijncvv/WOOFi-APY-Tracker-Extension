import './TabsField.css'
import React from 'react'
import IChainInfo from '../../models/IChainsInfo'

interface ChainsDataProps {
	chainsInfo: IChainInfo[]
	activeTabCallback: any
	activeTab: string
	tabsReady: number
}

const TabsField: React.FC<ChainsDataProps> = ({
	chainsInfo,
	activeTabCallback,
	activeTab,
	tabsReady,
}) => {
	async function handleTabClick(chainId: string) {
		tabsReady && activeTabCallback(chainId)
	}

	function tabStyle(chainId, index) {
		if (chainId !== activeTab && index > tabsReady) {
			return { cursor: 'wait', filter: 'grayscale(100%)' }
		}
	}

	return (
		<div className="tabs-field">
			{chainsInfo.map((tab, index) => (
				<div
					className="tab"
					key={index}
					onClick={() => handleTabClick(tab.chainId)}
					style={
						tab.chainId === activeTab
							? { backgroundColor: '#3C404B' }
							: { backgroundColor: '#313641' }
					}
				>
					<img
						className="tab-image"
						src={tab.icon}
						style={tabStyle(tab.chainId, index)}
					/>
					<span className="tab-name" style={tabStyle(tab.chainId, index)}>
						{tab.chainName}{' '}
					</span>
				</div>
			))}
		</div>
	)
}

export default TabsField
